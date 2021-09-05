import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { DtoDataObject } from "../../dto-data-object"
import { Comment } from "../client/comment"
import { DataModel } from "../data-model"

export class CommentDTO extends DataModel implements DtoDataObject<CommentDTO, Comment> {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
        super(api, asyncService)
    }
    
    // ------------------------------------ DATA ------------------------------------
    id: number
    text: string
    datePosted: Date
    replyIds: number[]
    parentCommentId: number | null
    ownerId: number

    // ------------------------------------ FUNCTIONALITY ------------------------------------
    initFromData(data: CommentDTO): void {
        this.id = data.id
        this.text = data.text
        this.datePosted = data.datePosted
        this.replyIds = data.replyIds
        this.parentCommentId = data.parentCommentId
        this.ownerId = data.ownerId
    }

    toClient(): Comment {
        let client = new Comment(this.api, this.asyncService)
        client.id = this.id
        client.text = this.text
        client.datePosted = new Date(this.datePosted)
        client.replyIds = this.replyIds
        client.parentCommentId = this.parentCommentId
        client.ownerId = this.ownerId

        return client
    }

    getUploadFormat(): {} {
        return {
            id: this.id,
            text: this.text,
            datePosted: this.datePosted,
            replyIds: this.replyIds,
            parentCommentId: this.parentCommentId,
            ownerId: this.ownerId
        }
    }

    upload(): Promise<Comment> {
        return this.api.addComment(this)
    }

    update(): Promise<Comment> {
        return this.api.updateComment(this)
    }

    delete(): Promise<void> {
        return this.api.deleteComment(this.id)
    }
}
