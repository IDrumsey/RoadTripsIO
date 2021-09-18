import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { IMapService } from '../../services/maps/i-map.service';

@Component({
  selector: 'app-i-map',
  templateUrl: './i-map.component.html',
  styleUrls: ['./i-map.component.css']
})
export class IMapComponent implements OnInit, AfterViewInit {

  constructor(private imapService: IMapService) { }

  ngOnInit(): void {
    this.markers.push(
      new google.maps.Marker({position: {lat: 42.548336429673455, lng: -72.46051052640635}}),
      new google.maps.Marker({position: {lat: 40.548336429673455, lng: -70.46051052640635}})
      )
  }

  ngAfterViewInit(): void {
    if(this.mapComponent.googleMap){
      this.map = this.mapComponent.googleMap
    }

    this.fitAllMarkersInView()
  }

  // --------------------------------- PROPERTIES ---------------------------------
  markers: google.maps.Marker[] = []
  @ViewChild("map") mapComponent: GoogleMap
  map: google.maps.Map

  // --------------------------------- METHODS ---------------------------------
  /**
   * Gets the lat/lng position of the provided marker
   */
  getMarkerPosition(marker: google.maps.Marker): google.maps.LatLng {
    return marker.getPosition() as google.maps.LatLng
  }

  /**
   * Pan the map to a position and zoom level that fits all of the current markers
   */
  fitAllMarkersInView(): void {
    let bounds = this.getFullViewBounds()

    this.map.fitBounds(bounds)
  }

  /**
   * Determines the bounds in which all the markers can fit
   */
  getFullViewBounds(): google.maps.LatLngBounds {
    let coordinates: google.maps.LatLngLiteral[] = this.markers.map(marker => {
      let markerPosition = this.getMarkerPosition(marker)
      let literal: google.maps.LatLngLiteral = {lat: markerPosition.lat(), lng: markerPosition.lng()}
      return literal
    })
    let westCoordinate = this.imapService.getFurthestWestCoordinate(coordinates)
    let eastCoordinate = this.imapService.getFurthestEastCoordinate(coordinates)
    let northCoordinate = this.imapService.getFurthestNorthCoordinate(coordinates)
    let southCoordinate = this.imapService.getFurthestSouthCoordinate(coordinates)

    let bounds = new google.maps.LatLngBounds({lat: westCoordinate.lat, lng: southCoordinate.lng}, {lat: eastCoordinate.lat, lng: northCoordinate.lng})

    return bounds
  }
}
