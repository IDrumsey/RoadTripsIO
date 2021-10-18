import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IMapService {

  constructor() { }

  /**
   * Returns the coordinate that is furthest to the west
   * @param coordinates Coordinates array of which to find the furthest west
   */
  getFurthestWestCoordinate(coordinates: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    let reducerFunction = (previousCoordinate: google.maps.LatLngLiteral, currentCoordinate: google.maps.LatLngLiteral) => {
      return previousCoordinate.lat < currentCoordinate.lat ? previousCoordinate : currentCoordinate
    }
    return coordinates.reduce(reducerFunction)
  }

  /**
   * Returns the coordinate that is furthest to the east
   * @param coordinates Coordinates array of which to find the furthest east
   */
   getFurthestEastCoordinate(coordinates: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    let reducerFunction = (previousCoordinate: google.maps.LatLngLiteral, currentCoordinate: google.maps.LatLngLiteral) => {
      return previousCoordinate.lat > currentCoordinate.lat ? previousCoordinate : currentCoordinate
    }
    return coordinates.reduce(reducerFunction)
  }

  /**
   * Returns the coordinate that is furthest to the North
   * @param coordinates Coordinates array of which to find the furthest North
   */
   getFurthestNorthCoordinate(coordinates: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    let reducerFunction = (previousCoordinate: google.maps.LatLngLiteral, currentCoordinate: google.maps.LatLngLiteral) => {
      return previousCoordinate.lng > currentCoordinate.lng ? previousCoordinate : currentCoordinate
    }
    return coordinates.reduce(reducerFunction)
  }

  /**
   * Returns the coordinate that is furthest to the South
   * @param coordinates Coordinates array of which to find the furthest South
   */
   getFurthestSouthCoordinate(coordinates: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {
    let reducerFunction = (previousCoordinate: google.maps.LatLngLiteral, currentCoordinate: google.maps.LatLngLiteral) => {
      return previousCoordinate.lng < currentCoordinate.lng ? previousCoordinate : currentCoordinate
    }
    return coordinates.reduce(reducerFunction)
  }

  compareCoordinates(coordinateA: google.maps.LatLng, coordinateB: google.maps.LatLng): boolean {
    return (coordinateA?.lat() == coordinateB.lat() && coordinateA.lng() == coordinateB.lng())
  }

  getMarkerPosition(marker: google.maps.Marker): google.maps.LatLngLiteral | null {
    let pos = marker.getPosition()
    if(pos){
      let lat = pos.lat()
      let lng = pos.lng()

      if(lat && lng){
        return {
          lat: lat,
          lng: lng
        }
      }else{
        return null
      }
    }else{
      return null
    }
  }
}
