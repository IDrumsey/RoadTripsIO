import { DataAccessService } from "../services/data/data-access.service"
import { Coordinate } from "./coordinate"
import { LocationDTO } from "./DTO/location-dto"

export class Location {
    constructor(private api: DataAccessService){}

    // ------------------------------------------ DATA ------------------------------------------
    id: number
    address: string
    coordinates: Coordinate

    // ------------------------------------------ PUBLIC FUNCTIONALITY ------------------------------------------
    upload(): Promise<Location> {
        return new Promise(resolve => {
            // convert to DTO
            let dto = this.toDTO()
            dto.upload().then(locationDTO => {
                let newLocationDTO = new LocationDTO(this.api)
                newLocationDTO.initFromRawData(locationDTO)
                resolve(newLocationDTO.toLocation())
            })
        })
    }

    toDTO(): LocationDTO {
        let dto = new LocationDTO(this.api)

        dto.id = this.id
        dto.address = this.address
        dto.latitude = this.coordinates.latitude
        dto.longitude = this.coordinates.longitude

        return dto
    }
}
