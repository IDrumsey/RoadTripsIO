import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { DataModel } from "../data-model"
import { RoadtripStopDTO } from "../dto/roadtrip-stop-dto"
import { Location } from "./location"

export class RoadtripStop extends DataModel implements ClientDataObject<RoadtripStopDTO, RoadtripStop>, ComplexDataObject {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
        super(api, asyncService)
    }

    // ----------------------------------- DATA -----------------------------------
    id: number
    location: Location
    description: string

    // ----------------------------------- PRIVATE DATA -----------------------------------
    private _locationId: number

    // ----------------------------------- GETTERS AND SETTERS -----------------------------------
    set locationId(id: number) {
        this._locationId = id
    }

    // ----------------------------------- FUNCTIONALITY -----------------------------------
    toDTO(): RoadtripStopDTO {
        let dto = new RoadtripStopDTO(this.api, this.asyncService)
        dto.id = this.id
        dto.locationId = this._locationId
        dto.description = this.description

        return dto
    }

    loadAdditionalData(): Promise<void> {
        let loaders = [
            this.fetchLocation()
        ]

        return new Promise(resolve => {
            this.asyncService.runMultiplePromises(loaders).then(() => {
                resolve()
            })
        })
    }

    private fetchLocation(): Promise<Location> {
        return new Promise(resolve => {
            this.api.getLocationById(this._locationId).subscribe(location => {
                this.location = location
                resolve(location)
            })
        })
    }

    upload(): Promise<RoadtripStop> {
        return new Promise((resolve, reject) => {
            this.toDTO().upload().then(newStop => {
                resolve(newStop)
            }, err => {
                reject(err)
            })
        })
    }

    removeFromAPI(): Promise<RoadtripStop> {
        return new Promise((resolve, reject) => {
            this.location.removeFromAPI(this.api).then(locationRemoved => {
                this.api.deleteRoadtripStop(this.id).then(() => {
                    resolve(this)
                }, err => {
                    // rollback
                    this.api.addLocation(locationRemoved.toDTO())
                })
            }, err => {reject(err)})
        })
    }
}
