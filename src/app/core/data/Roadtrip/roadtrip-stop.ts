import { AsyncService } from "../../services/async.service"
import { DataAccessService } from "../../services/data/data-access.service"
import { RoadtripStopDTO } from "../DTO/roadtrip-stop-dto"
import { Location } from "../location"

export class RoadtripStop {
    constructor(private api: DataAccessService, private asyncService: AsyncService){}
    
    // ------------------------------------------ DATA ------------------------------------------
    id: number
    location: Location
    description: string

    // ------------------------------------------ PUBLIC FUNCTIONALITY ------------------------------------------
    upload(): Promise<RoadtripStop> {
        return new Promise(resolve => {
            // upload location
            this.location.upload().then(uploadedLocation => {
                this.location = uploadedLocation

                // convert to dto
                let dtoUpload = this.toDTO()

                // send call
                dtoUpload.upload().then(stopDTO => {
                    let newStopDTO = new RoadtripStopDTO(this.api, this.asyncService)
                    newStopDTO.initFromRawData(stopDTO)
                    // convert back
                    newStopDTO.toRoadtripStop().then(newStop => {
                        resolve(newStop)
                    })
                })
            })
        })
    }

    remove(): Promise<RoadtripStop> {
        // convert to dto and remove
        return this.toDTO().remove().then(dtoData => {
            return this
        })
    }

    toDTO(): RoadtripStopDTO {
        let dto = new RoadtripStopDTO(this.api, this.asyncService)

        dto.id = this.id
        dto.locationId = this.location.id
        dto.description = this.description

        return dto
    }
}
