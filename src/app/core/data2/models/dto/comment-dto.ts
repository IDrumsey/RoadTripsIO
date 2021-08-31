import { AsyncService } from "src/app/core/services/async.service"
import { DataAccess2Service } from "src/app/core/services/data/data-access-2.service"
import { DtoDataObject } from "../../dto-data-object"
import { Comment } from "../client/comment"
import { DataModel } from "../data-model"

export class CommentDTO extends DataModel implements DtoDataObject<CommentDTO, Comment> {
    constructor(private api: DataAccess2Service, private asyncService: AsyncService){
        super(api, asyncService)
    }
    
    // ------------------------------------ DATA ------------------------------------
    id: number
    text: string
    datePosted: Date
    replyIds: number[]
    parentCommentId: number

    // ------------------------------------ FUNCTIONALITY ------------------------------------
    initFromData(data: CommentDTO): void {
        this.id = data.id
        this.text = data.text
        this.datePosted = data.datePosted
        this.replyIds = data.replyIds
        this.parentCommentId = data.parentCommentId
    }

    toClient(): Comment {
        let client = new Comment(this.api, this.asyncService)
        client.id = this.id
        client.text = this.text
        client.datePosted = this.datePosted
        client.replyIds = this.replyIds
        client.parentCommentId = this.parentCommentId

        return client
    }
}
