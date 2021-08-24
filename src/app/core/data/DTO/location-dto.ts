import { Coordinate } from "../coordinate"
import { Location } from "../location"

export class LocationDTO {
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
        let location = new Location()
        location.id = this.id
        location.address = this.address
        location.coordinates = new Coordinate(this.latitude, this.longitude)

        return location
    }
}
