export class Coordinate {
    constructor(lat: number, lng: number){
        this.latitude = lat
        this.longitude = lng
    }
    
    latitude: number
    longitude: number

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
