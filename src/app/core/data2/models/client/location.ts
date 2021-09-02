import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { LocationDTO } from "../dto/location-dto"
import { Coordinate } from "./coordinate"

export class Location implements ClientDataObject<LocationDTO, Location> {
    // ----------------------------- DATA -----------------------------

    id: number
    title: string
    address: string
    coordinates: Coordinate
    photos: string[] = []

    // ----------------------------- FUNCTIONALITY -----------------------------

    toDTO(): LocationDTO {
        let dto = new LocationDTO()
        dto.id = this.id
        dto.title = this.title
        dto.address = this.address
        dto.latitude = this.coordinates.latitude
        dto.longitude = this.coordinates.longitude
        dto.photos = this.photos

        return dto
    }

    getUploadFormat(): {} {
        return {
            id: this.id,
            title: this.title,
            address: this.address,
            coordinates: this.coordinates,
            photos: this.photos
        }
    }

    upload(api: DataAccessService): Promise<Location>{
        return new Promise((resolve, reject) => {
            this.toDTO().upload(api).then(newLocation=> {
                resolve(newLocation)
            }, (err => {
                reject(err)
            }))
        })
    }
}
