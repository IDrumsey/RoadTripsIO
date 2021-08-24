import { AsyncService } from "../../services/async.service"
import { DataAccessService } from "../../services/data/data-access.service"
import { Comment } from "../comment"
import { RequestErrors } from "../models/request-errors"

export class CommentDTO {
    constructor(private api: DataAccessService, private asyncService: AsyncService){}
    // --------------------------------- DATA ---------------------------------
    id: number
    text: string
    datePosted: Date
    ownerId: number
    replyIds: number[]
    parentCommentId: number

    errors: RequestErrors[] = []

    // --------------------------------- FUNCTIONALITY ---------------------------------
    initFromRawData(data: CommentDTO): void {
        this.id = data.id
        this.text = data.text
        this.datePosted = new Date(data.datePosted)
        this.ownerId = data.ownerId
        this.replyIds = data.replyIds
        this.parentCommentId = data.parentCommentId
    }

    toComment(): Promise<Comment> {
        let comment = new Comment()

        // transfer primitive data
        comment.id = this.id
        comment.text = this.text
        comment.datePosted = this.datePosted

        // call api endpoints
        return new Promise(resolve => {
            this.asyncService.runMultiplePromises([
                // get owner user
                this.api.getUserById(this.ownerId).then(user => {
                    comment.owner = user
                }).catch(err => this.errors.push(err)),

                // get replies
                ... this.replyIds.map(replyId => {
                    return this.api.getCommentById(replyId).then(replyDTO => {
                        replyDTO.toComment().then(reply => {
                            comment.replies.push(reply)
                        })
                        
                    })
                })
                
            ]).then(() => resolve(comment))
        })
    }
}
