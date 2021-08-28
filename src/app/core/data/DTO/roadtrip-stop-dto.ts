import { AsyncService } from "../../services/async.service"
import { DataAccessService } from "../../services/data/data-access.service"
import { RoadtripStop } from "../Roadtrip/roadtrip-stop"

export class RoadtripStopDTO {
    constructor(private api: DataAccessService, private asyncService: AsyncService){}
    // ------------------------------------------ DATA ------------------------------------------
    id: number
    locationId: number
    title: string
    description: string

    // ------------------------------------------ FUNCTIONALITY ------------------------------------------
    initFromRawData(data: RoadtripStopDTO): void {
        this.id = data.id
        this.locationId = data.locationId
        this.title = data.title
        this.description = data.description
    }

    toRoadtripStop(): Promise<RoadtripStop> {
        return new Promise((resolve) => {
            let stop = new RoadtripStop(this.api, this.asyncService)

            // transfer primitives
            stop.id = this.id
            stop.description = this.description

            // make api calls
            this.api.getLocationById(this.locationId).then(locationDTO => {
                stop.location = locationDTO.toLocation()
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                resolve(stop)
            })
        })
    }

    upload(): Promise<RoadtripStopDTO> {
        return new Promise(resolve => {
            this.api.addStop(this).then(stopDTO => {
                let stopUploadedDTO = new RoadtripStopDTO(this.api, this.asyncService)
                stopUploadedDTO.initFromRawData(stopDTO)
                resolve(stopUploadedDTO)
            })
        })
    }

    async remove(): Promise<RoadtripStopDTO> {
        return this.api.removeStop(this)
    }

    getUploadFormat(): {} {
        return {
            id: this.id,
            locationId: this.locationId,
            title: this.title,
            description: this.description
        }
    }
}
