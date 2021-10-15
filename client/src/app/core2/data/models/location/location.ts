import { ClientDataObject } from "../client-data-object"
import { Coordinate } from "../coordinate/coordinate"
import { LocationDto } from "./location-dto"


export class Location implements ClientDataObject<LocationDto> {
    id: number
    title: string
    address: string
    coordinate: Coordinate
    photos: string[]

    toDTO(): LocationDto {
        let dto = new LocationDto()
        dto.id = this.id
        dto.title = this.title
        dto.address = this.address
        dto.latitude = this.coordinate.latitude
        dto.longitude = this.coordinate.longitude
        dto.photos = this.photos

        return dto
    }
}
