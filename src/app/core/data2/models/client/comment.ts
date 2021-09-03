import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { DataModel } from "../data-model"
import { CommentDTO } from "../dto/comment-dto"
import { User } from "./user"

export class Comment extends DataModel implements ClientDataObject<CommentDTO, Comment>, ComplexDataObject {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
        super(api, asyncService)
    }

    // ------------------------------------ DATA ------------------------------------
    id: number
    text: string
    datePosted: Date = new Date()
    replies: Comment[] = []
    parentComment: Comment | null
    owner: User

    // ------------------------------------ PRIVATE DATA ------------------------------------
    private _replyIds: number[]
    private _parentCommentId: number | null
    private _ownerId: number

    // ------------------------------------ GETTERS AND SETTERS ------------------------------------

    set replyIds(ids: number[]) {
        this._replyIds = ids
    }

    set parentCommentId(id: number | null) {
        this._parentCommentId = id
    }

    get parentCommentId() {
        return this._parentCommentId
    }

    set ownerId(id: number) {
        this._ownerId = id
    }

    // ------------------------------------ FUNCTIONALITY ------------------------------------

    toDTO(): CommentDTO {
        let dto = new CommentDTO(this.api, this.asyncService)

        dto.id = this.id
        dto.text = this.text
        dto.datePosted = this.datePosted
        dto.replyIds = this.replies.map(reply => reply.id)
        dto.parentCommentId = this._parentCommentId
        dto.ownerId = this._ownerId

        return dto
    }

    loadAdditionalData(): Promise<void> {
        let loaders: (Promise<Comment[]> | Promise<Comment> | Promise<User>)[] = [this.fetchReplies()]

        if(this._parentCommentId != null) {
            loaders.push(this.fetchParentComment())
        }

        if(this._ownerId != null) {
            loaders.push(this.fetchOwner())
        }

        return new Promise(resolve => {
            this.asyncService.runMultiplePromises(loaders).then(() => {
                resolve()
            })
        })
    }

    private fetchReplies(): Promise<Comment[]> {
        return new Promise(resolve => {
            let replies: Comment[] = []

            let replyLoaders = this._replyIds.map(replyId => {
                return new Promise<void>(resolve => {
                    this.api.getCommentById(replyId).subscribe(reply => {
                        replies.push(reply)
                        reply.loadAdditionalData().then(() => {
                            resolve()
                        })
                    })
                })
            })

            this.asyncService.runMultiplePromises(replyLoaders).then(() => {
                this.replies = replies
                resolve(replies)
            })
        })
    }

    private fetchParentComment(): Promise<Comment> {
        return new Promise(resolve => {
            if(this._parentCommentId){
                this.api.getCommentById(this._parentCommentId).subscribe(parentComment => {
                    this.parentComment = parentComment
                    resolve(parentComment)
                })
            }
        })
    }

    private fetchOwner(): Promise<User> {
        return new Promise(resolve => {
            this.api.getUser(this._ownerId).subscribe(owner => {
                this.owner = owner
                resolve(owner)
            })
        })
    }

    upload(): Promise<Comment> {
        return this.toDTO().upload()
    }

    update(): Promise<Comment> {
        return this.toDTO().update()
    }

    addReply(reply: Comment): Promise<Comment> {
        return new Promise((resolve, reject) => {
            reply.toDTO().upload().then(newReply => {
                this.replies.push(newReply)
                // update array in database
                this.update().then(updatedComment => {
                    resolve(newReply)
                }, err => {
                    reject(err)
                })
            }, err => {
                reject(err)
            })
        })
    }
}
