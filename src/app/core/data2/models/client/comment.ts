import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { DataModel } from "../data-model"
import { CommentDTO } from "../dto/comment-dto"

export class Comment extends DataModel implements ClientDataObject<CommentDTO, Comment>, ComplexDataObject {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
        super(api, asyncService)
    }

    // ------------------------------------ DATA ------------------------------------
    id: number
    text: string
    datePosted: Date
    replies: Comment[]
    parentComment: Comment

    // ------------------------------------ PRIVATE DATA ------------------------------------
    private _replyIds: number[]
    private _parentCommentId: number

    // ------------------------------------ GETTERS AND SETTERS ------------------------------------

    set replyIds(ids: number[]) {
        this._replyIds = ids
    }

    set parentCommentId(id: number) {
        this._parentCommentId = id
    }

    // ------------------------------------ FUNCTIONALITY ------------------------------------

    toDTO(): CommentDTO {
        let dto = new CommentDTO(this.api, this.asyncService)

        dto.id = this.id
        dto.text = this.text
        dto.datePosted = this.datePosted
        dto.replyIds = this.replyIds
        dto.parentCommentId = this.parentCommentId

        return dto
    }

    loadAdditionalData(): Promise<void> {
        let loaders: (Promise<Comment[]> | Promise<Comment>)[] = [this.fetchReplies()]

        if(this._parentCommentId != null) {
            loaders.push(this.fetchParentComment())
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
            this.api.getCommentById(this._parentCommentId).subscribe(parentComment => {
                this.parentComment = parentComment
                resolve(parentComment)
            })
        })
    }
}
