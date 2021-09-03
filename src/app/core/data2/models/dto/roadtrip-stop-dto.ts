import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { DtoDataObject } from "../../dto-data-object"
import { RoadtripStop } from "../client/roadtrip-stop"
import { DataModel } from "../data-model"

export class RoadtripStopDTO extends DataModel implements DtoDataObject<RoadtripStopDTO, RoadtripStop> {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
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

    getUploadFormat(): {} {
        return {
            id: this.id,
            locationId: this.locationId,
            description: this.description
        }
    }

    upload(): Promise<RoadtripStop> {
        return new Promise((resolve, reject) => {
            this.api.addRoadtripStop(this).then(newStop => {
                resolve(newStop)
            }, err => {
                reject(err)
            })
        })
    }
}
