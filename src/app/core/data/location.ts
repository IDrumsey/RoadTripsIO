import { DataAccessService } from "../services/data/data-access.service"
import { Coordinate } from "./coordinate"
import { LocationDTO } from "./DTO/location-dto"

export class Location {
    constructor(private api: DataAccessService){}

    // ------------------------------------------ DATA ------------------------------------------
    id: number
    title: string
    address: string
    coordinates: Coordinate
    photos: string[] = []

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
        dto.title = this.title
        dto.address = this.address
        dto.latitude = this.coordinates.latitude
        dto.longitude = this.coordinates.longitude
        dto.photos = this.photos

        return dto
    }
}
