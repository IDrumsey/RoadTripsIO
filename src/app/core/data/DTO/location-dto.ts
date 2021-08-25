import { DataAccessService } from "../../services/data/data-access.service"
import { Coordinate } from "../coordinate"
import { Location } from "../location"

export class LocationDTO {
    constructor(private api: DataAccessService){}

    // -------------------------- DATA --------------------------
    id: number
    address: string
    latitude: number
    longitude: number

    // -------------------------- FUNCTIONALITY --------------------------
    initFromRawData(data: LocationDTO): void {
        this.id = data.id
        this.address = data.address
        this.latitude = data.latitude
        this.longitude = data.longitude
    }

    toLocation(): Location {
        let location = new Location(this.api)
        location.id = this.id
        location.address = this.address
        location.coordinates = new Coordinate(this.latitude, this.longitude)

        return location
    }

    upload(): Promise<LocationDTO> {
        return new Promise(resolve => {
            this.api.addLocation(this).then( locationDTO => {
                let uploadedLocationDTO = new LocationDTO(this.api)
                uploadedLocationDTO.initFromRawData(locationDTO)
                resolve(uploadedLocationDTO)
            })
        })
    }

    getUploadFormat(): {} {
        return {
            id: this.id,
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude
        }
    }
}
