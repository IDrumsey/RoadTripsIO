import { AsyncService } from "src/app/core/services/async.service"
import { DataAccess2Service } from "src/app/core/services/data/data-access-2.service"
import { DtoDataObject } from "../../dto-data-object"
import { RoadtripStop } from "../client/roadtrip-stop"
import { DataModel } from "../data-model"

export class RoadtripStopDTO extends DataModel implements DtoDataObject<RoadtripStopDTO, RoadtripStop> {
    constructor(private api: DataAccess2Service, private asyncService: AsyncService){
        super(api, asyncService)
    }
    
    // ----------------------------------- DATA -----------------------------------
    id: number
    locationId: number
    description: string

    // ----------------------------------- FUNCTIONALITY -----------------------------------
    initFromData(data: RoadtripStopDTO): void {
        this.id = data.id
        this.locationId = data.locationId
        this.description = data.description
    }

    toClient(): RoadtripStop {
        let client = new RoadtripStop(this.api, this.asyncService)
        client.id = this.id
        client.locationId = this.locationId
        client.description = this.description

        return client
    }
}
