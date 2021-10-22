import { DataTransferObject } from "../data-transfer-object"
import { Comment } from "./comment"

export class CommentDTO implements DataTransferObject<CommentDTO, Comment> {
    id: number
    text: string
    datePosted: Date
    replyIds: number[] = []
    ownerId: number | null

    init(data: CommentDTO): void {
        this.id = data.id
        this.text = data.text
        this.datePosted = data.datePosted
        this.replyIds = data.replyIds
        this.ownerId = data.ownerId
    }

    toClient(): Comment {
        let client = new Comment()
        client.id = this.id
        client.text = this.text
        client.datePosted = new Date(this.datePosted)

        return client
    }
}
