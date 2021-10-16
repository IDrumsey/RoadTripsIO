import { DataTransferObject } from "../data-transfer-object";
import { Roadtrip } from "./roadtrip";

export class RoadtripDTO implements DataTransferObject<RoadtripDTO, Roadtrip> {
    id: number
    title: string
    description: string
    datePosted: Date
    ownerId: number
    collaboratorIds: number[]
    stopIds: number[]
    commentIds: number[]
    
    init(data: RoadtripDTO): void {
        this.id = data.id
        this.title = data.title
        this.description = data.description
        this.datePosted = data.datePosted
        this.ownerId = data.ownerId
        this.collaboratorIds = data.collaboratorIds
        this.stopIds = data.stopIds
        this.commentIds = data.commentIds
    }

    toClient(): Roadtrip {
        let client = new Roadtrip()
        client.id = this.id
        client.title = this.title
        client.description = this.description
        client.datePosted = this.datePosted

        client.ownerId = this.ownerId
        client.collaboratorIds = this.collaboratorIds
        client.stopIds = this.stopIds
        client.commentIds = this.commentIds

        return client
    }
}
