import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
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

    this.selectedMarkers.forEach(selectedMarker => {
      this.selectMarker(selectedMarker)
    })
  }

  ngAfterViewInit(): void {
    if(this.mapComponent.googleMap){
      this.map = this.mapComponent.googleMap

      this.map.setOptions(this.generateMapOptions())
    }

    this.fitAllMarkersInView()
  }

  // --------------------------------- PROPERTIES ---------------------------------
  markers: google.maps.Marker[] = []
  selectedMarkers: google.maps.Marker[] = []
  @ViewChild("map") private mapComponent: GoogleMap
  map: google.maps.Map

  // --------------------------------- STATE ---------------------------------
  @Input() cursor: string
  @Input() defaultMarkerIcon: string = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

  // --------------------------------- EVENTS ---------------------------------
  @Output() mapClick = new EventEmitter<google.maps.LatLng>()
  @Output() markerClick = new EventEmitter<google.maps.Marker>()

  // --------------------------------- EVENT HANDLERS ---------------------------------
  
  onMapClickEvent(mapEvent: google.maps.MapMouseEvent): void {
    this.mapClick.emit(mapEvent.latLng)
  }

  onMarkerClick(markerClicked: google.maps.Marker): void {
    // find the marker because markerClicked is a copy
    let actualMarkerClicked = this.markers.find(marker => marker == markerClicked)
    if(actualMarkerClicked){
      this.markerClick.emit(markerClicked)
      this.selectMarker(markerClicked)
    }
  }

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

  private generateMapOptions(): google.maps.MapOptions {
    return {
      draggableCursor: this.cursor
    }
  }

  /**
   * Zooms in on a marker
   * @param marker The marker on the map to zoom in on
   */
  zoomInOnMarker(marker: google.maps.Marker): void {
    let zoomLevel = 15

    // https://stackoverflow.com/questions/5054515/zoom-in-to-marker-google-maps
    let position = marker.getPosition()
    if(position){
        this.map.setZoom(zoomLevel)
        this.map.panTo(position)
    }
  }

  addMarker(markerToAdd: google.maps.Marker): void {
    this.markers.push(markerToAdd)
  }

  removeMarker(markerToRemove: google.maps.Marker): void {
    let indexToRemove = this.markers.findIndex(tempMarker => tempMarker == markerToRemove)
    if(indexToRemove != -1) {
      this.markers.splice(indexToRemove, 1)
    }
  }

  selectMarker(markerToSelect: google.maps.Marker): void {
    this.selectedMarkers.push(markerToSelect)
    markerToSelect.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png")
  }

  getMarkerOptions(marker: google.maps.Marker): google.maps.MarkerOptions {
    return {
      icon: marker.getIcon() ? marker.getIcon() as string : this.defaultMarkerIcon
    }
  }
}
