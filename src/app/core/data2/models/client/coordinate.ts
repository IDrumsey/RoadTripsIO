export class Coordinate {
    constructor(latitude: number, longitude: number){
        this.latitude = latitude
        this.longitude = longitude
    }

    // ----------------------------------- DATA -----------------------------------
    latitude: number
    longitude: number

    // ----------------------------------- FUNCTIONALITY -----------------------------------
    genFormattedString(): string {
        return `(${this.latitude}, ${this.longitude})`
    }

    compare(coord: google.maps.LatLngLiteral): boolean{
        return this.latitude == coord.lat && this.longitude == coord.lng
    }

    toLatLngLiteral(): google.maps.LatLngLiteral {
        return {lat: this.latitude, lng: this.longitude}
    }
}
