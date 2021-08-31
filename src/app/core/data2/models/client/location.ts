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
}
