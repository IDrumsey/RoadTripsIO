import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractiveMapService {

  constructor() { }

  extendBoundsToMarkers(bounds: google.maps.LatLngBounds, markers: google.maps.Marker[]): void {
    markers.forEach(marker => {
      bounds.extend(marker.getPosition() as google.maps.LatLng)
    })
  }

  extendBoundsToCoords(bounds: google.maps.LatLngBounds, coords: google.maps.LatLng[]): void {
    coords.forEach(coord => {
      bounds.extend(coord)
    })
  }

  // getBounds(markers: google.maps.Marker[]): google.maps.LatLngBoundsLiteral {
  //   let positions = markers.map(marker => marker.getPosition())
  //   return {east: this.getMaxLat(positions as google.maps.LatLng[]), south: this.getMinLng(positions as google.maps.LatLng[]), west: this.getMinLat(positions as google.maps.LatLng[]), north: this.getMaxLng(positions as google.maps.LatLng[])}
  // }

  // getMaxLat(coordinates: google.maps.LatLng[]): number {
  //   let lats = coordinates.map(coord => coord.lat())
  //   return Math.max(...lats)
  // }

  // getMinLat(coordinates: google.maps.LatLng[]): number {
  //   let lats = coordinates.map(coord => coord.lat())
  //   return Math.min(...lats)
  // }

  // getMaxLng(coordinates: google.maps.LatLng[]): number {
  //   let lngs = coordinates.map(coord => coord.lng())
  //   return Math.max(...lngs)
  // }

  // getMinLng(coordinates: google.maps.LatLng[]): number {
  //   let lngs = coordinates.map(coord => coord.lng())
  //   return Math.min(...lngs)
  // }

  findMarkerFromCoord(coord: google.maps.LatLng, markers: google.maps.Marker[]): google.maps.Marker | undefined {
    return markers.find(marker => {
      let currMarkerPos = marker.getPosition()
      let currLat = currMarkerPos?.lat()
      let currLng = currMarkerPos?.lng()

      if(!currLat || !currLng){
        return undefined
      }

      return (currLat == coord.lat() && currLng == coord.lng())
    })
  }

  LatLngToLiteral(obj: google.maps.LatLng): google.maps.LatLngLiteral {
    return {lat: obj.lat(), lng: obj.lng()}
  }

  LatLngToMarker(coord: google.maps.LatLng): google.maps.Marker {
    return new google.maps.Marker({position: coord})
  }

  getMarkerCoordinates(marker: google.maps.Marker): google.maps.LatLngLiteral | null {
    let pos = marker.getPosition()
    if(pos){
      return {
        lat: pos.lat(),
        lng: pos.lng()
      }
    }
    else{
      return null
    }
  }
}
