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
}
