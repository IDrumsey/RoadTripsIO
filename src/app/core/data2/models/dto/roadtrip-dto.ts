import { AsyncService } from "src/app/core/services/async.service"
import { DataAccess2Service } from "src/app/core/services/data/data-access-2.service"
import { DtoDataObject } from "../../dto-data-object"
import { Roadtrip } from "../client/roadtrip"
import { DataModel } from "../data-model"

export class RoadtripDTO extends DataModel implements DtoDataObject<RoadtripDTO, Roadtrip> {
    constructor(private api: DataAccess2Service, private asyncService: AsyncService){
        super(api, asyncService)
    }
    
    // ---------------------------------------- DATA ----------------------------------------
    id: number
    title: string
    description: string
    datePosted: Date
    ownerId: number
    collaboratorIds: number[]
    stopIds: number[]
    commentIds: number[]

    // ---------------------------------------- FUNCTIONALITY ----------------------------------------
    initFromData(data: RoadtripDTO): void {
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
        let client = new Roadtrip(this.api, this.asyncService)
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
