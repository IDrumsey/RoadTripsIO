import { DtoDataObject } from "../../dto-data-object"
import { Coordinate } from "../client/coordinate"
import { Location } from "../client/location"

export class LocationDTO implements DtoDataObject<LocationDTO, Location> {
    // ----------------------------- DATA -----------------------------

    id: number
    title: string
    address: string
    latitude: number
    longitude: number
    photos: string[]

    // ----------------------------- FUNCTIONALITY -----------------------------

    initFromData(data: LocationDTO): void {
        this.id = data.id
        this.title = data.title
        this.address = data.address
        this.latitude = data.latitude
        this.longitude = data.longitude
        this.photos = data.photos
    }

    toClient(): Location {
        let client = new Location()
        client.id = this.id
        client.title = this.title
        client.address = this.address
        client.coordinates = new Coordinate(this.latitude, this.longitude)
        client.photos = this.photos

        return client
    }
}
