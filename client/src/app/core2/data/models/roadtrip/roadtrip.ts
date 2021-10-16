import { ClientDataObject } from "../client-data-object";
import { Comment } from "../comment/comment";
import { Stop } from "../stop/stop";
import { User } from "../user/user";
import { RoadtripDTO } from "./roadtrip-dto";

export class Roadtrip implements ClientDataObject<RoadtripDTO> {
    id: number
    title: string
    description: string
    datePosted: Date

    owner: User
    collaborators: User[] = []
    stops: Stop[] = []
    comments: Comment[] = []

    ownerId: number
    collaboratorIds: number[] = []
    stopIds: number[] = []
    commentIds: number[] = []

    toDTO(): RoadtripDTO {
        let dto = new RoadtripDTO()
        dto.id = this.id
        dto.title = this.title
        dto.description = this.description
        dto.datePosted = this.datePosted
        dto.ownerId = this.owner.id
        dto.collaboratorIds = this.collaborators.map(user => user.id)
        dto.stopIds = this.stops.map(stop => stop.id)
        dto.commentIds = this.comments.map(comment => comment.id)

        return dto
    }
}
