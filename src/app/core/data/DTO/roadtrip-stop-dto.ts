import { DataAccessService } from "../../services/data/data-access.service"
import { RoadtripStop } from "../Roadtrip/roadtrip-stop"

export class RoadtripStopDTO {
    constructor(private api: DataAccessService){}
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
            let stop = new RoadtripStop()

            // transfer primitives
            stop.id = this.id
            stop.title = this.title
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
}
