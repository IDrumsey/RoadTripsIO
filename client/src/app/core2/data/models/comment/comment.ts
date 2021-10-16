import { DataAccessService } from "../../services/data-access.service";
import { ClientDataObject } from "../client-data-object";
import { User } from "../user/user";
import { CommentDTO } from "./comment-dto";

export class Comment implements ClientDataObject<CommentDTO> {
    id: number
    text: string
    datePosted: Date
    replies: Comment[] = []
    owner: User | null

    ownerId: number | null
    replyIds: number[] = []

    toDTO(): CommentDTO {
        let dto = new CommentDTO()
        dto.id = this.id
        dto.text = this.text
        dto.datePosted = this.datePosted
        dto.replyIds = this.replies.map(reply => reply.id)
        if(this.owner){
            dto.ownerId = this.owner.id
        }

        return dto
    }
}
