import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { IMapMarkerColor } from 'src/app/core/models/imap/i-map-marker-color';
import { IMapService } from '../../../services/maps/i-map.service';

@Component({
  selector: 'app-i-map-ui',
  templateUrl: './i-map-ui.component.html',
  styleUrls: ['./i-map-ui.component.css']
})
export class IMapUIComponent implements OnInit, AfterViewInit {

  constructor(private imapService: IMapService) { }

  ngOnInit(): void {
    this.selectedMarkers.forEach(selectedMarker => {
      this.selectMarker(selectedMarker)
    })
  }

  ngAfterViewInit(): void {
    if(this.mapComponent.googleMap){
      this.map = this.mapComponent.googleMap

      this.updateMapOptions()
    }

    this.fitAllMarkersInView()
  }

  // --------------------------------- PROPERTIES ---------------------------------
  markers: google.maps.Marker[] = []
  selectedMarkers: google.maps.Marker[] = []

  @ViewChild("map") private mapComponent: GoogleMap
  map: google.maps.Map

  // --------------------------------- STATE ---------------------------------
  cursor: string
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

    if(coordinates.length > 0){
      let westCoordinate = this.imapService.getFurthestWestCoordinate(coordinates)
      let eastCoordinate = this.imapService.getFurthestEastCoordinate(coordinates)
      let northCoordinate = this.imapService.getFurthestNorthCoordinate(coordinates)
      let southCoordinate = this.imapService.getFurthestSouthCoordinate(coordinates)

      return new google.maps.LatLngBounds({lat: westCoordinate.lat, lng: southCoordinate.lng}, {lat: eastCoordinate.lat, lng: northCoordinate.lng})
    }
    else{
      return new google.maps.LatLngBounds({lat: 5.131768357473487, lng: -129.35439460739414}, {lat: 60.21652070431071, lng: 12.237400247890385})
    }
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

  addMarker(markerToAdd: google.maps.Marker): google.maps.Marker {
    this.markers.push(markerToAdd)
    return markerToAdd
  }

  removeMarker(markerToRemove: google.maps.Marker): boolean {
    let startingLength = this.markers.length

    // remove from selected array if there
    this.unselectMarker(markerToRemove)
    let indexToRemove = this.markers.findIndex(tempMarker => tempMarker == markerToRemove)
    if(indexToRemove != -1) {
      this.markers.splice(indexToRemove, 1)
    }

    return this.markers.length == startingLength - 1 ? true : false
  }

  selectMarker(markerToSelect: google.maps.Marker): void {
    this.selectedMarkers.push(markerToSelect)
    markerToSelect.setIcon(IMapMarkerColor.Blue)
    this.bounceMarker(this.markers[0])
  }

  unselectMarker(markerToUnselect: google.maps.Marker): void {
    let indexOfMarker = this.selectedMarkers.indexOf(markerToUnselect)
    if(indexOfMarker != -1){
      this.selectedMarkers.splice(indexOfMarker, 1)
      markerToUnselect.setIcon(IMapMarkerColor.Red)
    }
  }

  getMarkerOptions(marker: google.maps.Marker): google.maps.MarkerOptions {
    let options = {
      icon: marker.getIcon() ? marker.getIcon() as string : this.defaultMarkerIcon,
    }
    return options
  }

  changeCursor(cursor: string): void {
    this.cursor = cursor
    this.updateMapOptions()
  }

  updateMapOptions(): void {
    let options = this.generateMapOptions()
    this.map.setOptions(options)
  }

  markerIsSelected(marker: google.maps.Marker): boolean {
    let index = this.selectedMarkers.indexOf(marker)
    return index == -1 ? false : true
  }

  bounceMarker(marker: google.maps.Marker): void {
    marker.setAnimation(google.maps.Animation.BOUNCE)
      setTimeout(() => {
          marker.setAnimation(null)
      }, 700)
  }
}
