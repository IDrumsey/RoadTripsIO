import { Coordinate } from "../coordinate/coordinate"
import { DataTransferObject } from "../data-transfer-object"
import { Location } from "./location"

export class LocationDto implements DataTransferObject<LocationDto, Location> {
    id: number
    title: string
    address: string
    latitude: number
    longitude: number
    photos: string[] = []

    init(data: LocationDto): void {
        this.id = data.id
        this.title = data.title
        this.address = data.address
        this.latitude = data.latitude
        this.longitude = data.longitude
        if(data.photos){
            this.photos = data.photos
        }
    }

    toClient(): Location {
        let client = new Location()
        client.id = this.id
        client.title = this.title
        client.address = this.address
        client.coordinate = new Coordinate(this.latitude, this.longitude)
        client.photos = this.photos

        return client
    }
}
