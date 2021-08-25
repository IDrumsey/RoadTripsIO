import { Subject } from "rxjs"

import { InteractiveMapService } from "src/app/core/services/maps/interactive-map.service"
import { IMapActions } from "../models/imap-actions"

export class IMapManager {
    constructor(existingMarkerCoordinates: google.maps.LatLngLiteral[], private mapServices: InteractiveMapService){
        this.startingCoordinates = existingMarkerCoordinates
        this.initEventListening()
    }

    // data
    startingCoordinates: google.maps.LatLngLiteral[]
    coordinates: google.maps.LatLngLiteral[] = []
    mapObj: google.maps.Map
    markers: google.maps.Marker[] = []
    mapBounds = new google.maps.LatLngBounds()

    // state
    initialized: boolean = false
    editing: boolean = false
    currentAction: IMapActions
    selectedMarkers: google.maps.Marker[] = []

    markerCoordinatesBeingAdded: google.maps.LatLngLiteral | null

    // styles
    defaultMarkerIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    selectedMarkerIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    newMarkerIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    defaultMarkerOpacity = .8
    selectedMarkerOpacity = 1

    markerOptions: google.maps.MarkerOptions = {
        icon: this.defaultMarkerIcon,
        opacity: this.defaultMarkerOpacity,
        animation: google.maps.Animation.DROP
    }

    isSelected(marker: google.maps.Marker): boolean {
        let found = this.selectedMarkers.find(tempMarker => tempMarker == marker)
        return found ? true : false
    }

    // -------------------------------------------------- EVENTS --------------------------------------------------

    addMarkerBtnClickEvent = new Subject()
    addNewLocationEvent = new Subject()
    addLocationFormCancelEvent = new Subject()
    addLocationCancelEvent = new Subject()
    newLocationCompleteEvent = new Subject()

    mapClickEvent = new Subject<google.maps.MapMouseEvent>()
    markerClickEvent = new Subject<google.maps.LatLngLiteral>()

    newLocationFormSubmitEvent = new Subject()

    initEventListening(): void {
        this.addMarkerBtnClickEvent.subscribe(() => this.onAddMarkerBtnClick())
        this.mapClickEvent.subscribe(mapEvent => this.onMapClick(mapEvent.latLng))
    }

    // -------------------------------------------------- SIGNALERS --------------------------------------------------
 
    signal_addMarkerBtnClickEvent(): void {
        this.addMarkerBtnClickEvent.next()
    }

    signal_addNewLocationEvent(): void {
        this.addNewLocationEvent.next()
    }

    signal_newLocationCompleteEvent(): void {
        this.newLocationCompleteEvent.next()
    }

    signal_newLocationFormSubmitEvent(): void {
        this.newLocationFormSubmitEvent.next()
    }

    signal_mapClickEvent(mapEvent: google.maps.MapMouseEvent): void {
        this.mapClickEvent.next(mapEvent)
    }

    // -------------------------------------------------- EVENT HANDLERS --------------------------------------------------

    onFormSubmit(): void {
        this.signal_newLocationFormSubmitEvent()
        // change marker color
        if(this.markerCoordinatesBeingAdded){
            let markerFound = this.findMarker(this.markerCoordinatesBeingAdded)
            if(markerFound){
                markerFound.setIcon(this.defaultMarkerIcon)
            }
        }
    }

    onAddMarkerBtnClick(): void {
        if(this.alreadyAddingLocation()){
            this.cancelAddingLocation()
        }
        else{
            this.addNewLocationEvent.next()
            this.mapObj.setOptions({draggableCursor: "crosshair"})
            this.startEditing(IMapActions.AddMarker)
        }
    }

    onNewLocationFormCancelBtnClick(): void {
        this.addLocationFormCancelEvent.next()
        this.cancelAddingLocation()
    }

    onMapClick(coord: google.maps.LatLng): void {
        switch(this.currentAction){
            case IMapActions.AddMarker: {
                // check if a location has been added already
                if(!this.newMarkerHasBeenAddedToMap()){
                    this.addLocation(coord)
                    this.mapObj.setOptions({draggableCursor: "grab"})
                }
                break
            }
        }
    }

    onNewLocationFormSubmit(): void {
        this.signal_newLocationCompleteEvent()
        this.stopEditing()
    }

    onMarkerClick(coord: google.maps.LatLngLiteral): void {
        this.markerClickEvent.next(coord)
        // can only select one marker at a time
        // find the marker
        if(!(coord == this.markerCoordinatesBeingAdded)){
            let markerToSelect = this.findMarker(coord)

            if(markerToSelect){
                this.changeSelectedMarker(markerToSelect)
                this.bounceMarker(markerToSelect)
            }
        }
    }

    onMarkerEnter(coord: google.maps.LatLngLiteral): void {
        let marker = this.findMarker(coord)

        if(marker){
            marker.setOpacity(1)
        }
    }

    onMarkerExit(coord: google.maps.LatLngLiteral): void {
        // set the opacity
        let marker = this.findMarker(coord)

        if(marker && !this.isSelected(marker)){
            marker.setOpacity(this.defaultMarkerOpacity)
        }
    }

    onformCoordinatesDefined(coord: google.maps.LatLngLiteral): void {
        if(coord.lat && coord.lng){
            // change current
            if(this.newMarkerHasBeenAddedToMap()){
                if(this.markerCoordinatesBeingAdded){
                    this.removeCoordinate(this.markerCoordinatesBeingAdded)
                }
                this.addCoordinate(coord)
                this.markerCoordinatesBeingAdded = coord
            }
            else{
                this.addCoordinate(coord)
                this.markerCoordinatesBeingAdded = coord
            }
            // pan map
            this.panMapToFitCoordinates(this.coordinates)
            this.mapObj.setOptions({draggableCursor: "grab"})
        }
        else{
            // remove new marker from map
            this.removeNewMarker()
        }
    }

    onAddOrDropMarker(): void {
        // look for new icon and set the styles
        if(this.markerCoordinatesBeingAdded){
            let markerFound = this.findMarker(this.markerCoordinatesBeingAdded)
            if(markerFound){
                // change styles
                markerFound.setIcon(this.newMarkerIcon)
            }
        }
    }

    // functions

    changeSelectedMarker(markerToSelect: google.maps.Marker): void {
        // unselect the other marker
        this.selectedMarkers.forEach(marker => {
            if(marker != markerToSelect)
            this.unselectMarker(marker)
        })
        this.selectMarker(markerToSelect)
    }

    cancelAddingLocation(): void {
        this.addLocationCancelEvent.next()
        this.mapObj.setOptions({draggableCursor: "grab"})
        if(this.newMarkerHasBeenAddedToMap()){
            // remove the marker from map
            this.removeNewMarker()
        }
        this.stopEditing()
    }

    finishAddingLocation(): void {
        this.onFormSubmit()
        this.signal_newLocationCompleteEvent()
        this.markerCoordinatesBeingAdded = null
        this.stopEditing()
    }

    private newMarkerHasBeenAddedToMap(): boolean {
        return this.markerCoordinatesBeingAdded != null
    }

    private alreadyAddingLocation(): boolean {
        return this.currentAction == IMapActions.AddMarker
    }

    removeCoordinate(coord: google.maps.LatLngLiteral): void {
        let index = this.coordinates.indexOf(coord)
        if(index){
            this.coordinates.splice(index)
        }
    }

    removeNewMarker(): void {
        if(this.markerCoordinatesBeingAdded){
            this.removeCoordinate(this.markerCoordinatesBeingAdded)
        }
        this.markerCoordinatesBeingAdded = null
    }

    findMarker(coord: google.maps.LatLngLiteral): google.maps.Marker | undefined {
        return this.markers.find(marker => {
            let pos = marker.getPosition() as google.maps.LatLng
            let tempCoord: google.maps.LatLngLiteral = {
                lat: pos.lat(),
                lng: pos.lng()
            }
            return tempCoord.lat == coord.lat && tempCoord.lng == coord.lng
        })
    }

    addCoordinate(coord: google.maps.LatLngLiteral): void {
        this.coordinates.push(coord)
    }

    addLocation(coord: google.maps.LatLng): void {
        let coordLiteral = this.mapServices.LatLngToLiteral(coord)
        this.markerCoordinatesBeingAdded = coordLiteral
        console.log(this.markerCoordinatesBeingAdded)
        this.addCoordinate(coordLiteral)
    }

    startEditing(action: IMapActions){
        // turn on editing
        this.editing = true
        // select action
        this.currentAction = action
    }

    stopEditing(): void {
        this.editing = false;
        this.currentAction = IMapActions.NoAction
    }

    panMapToFitCoordinates(coordinates: google.maps.LatLngLiteral[]): void {
        this.mapServices.extendBoundsToCoords(this.mapBounds, coordinates.map(coord => new google.maps.LatLng(coord)))
        this.mapObj.fitBounds(this.mapBounds)
    }

    selectMarker(marker: google.maps.Marker){
        this.selectedMarkers.push(marker)
        marker.setIcon(this.selectedMarkerIcon)
    }

    unselectMarker(marker: google.maps.Marker){
        let markerIndex = this.selectedMarkers.indexOf(marker)
        if(markerIndex != -1){
            this.selectedMarkers.splice(markerIndex, 1)
        }
        marker.setIcon(this.defaultMarkerIcon)
        marker.setOpacity(this.defaultMarkerOpacity)
    }

    initMarkers(): void {
        let interval = 450
    
        let currMarkerIndex = 1;
    
        // add first marker
        this.addCoordinate(this.startingCoordinates[0])
        
        let loop = setInterval(() => {
          this.addCoordinate(this.startingCoordinates[currMarkerIndex])
          if(currMarkerIndex == this.startingCoordinates.length - 1){
            clearInterval(loop)
          }
          currMarkerIndex++
        }, interval)
    }

    bounceMarker(marker: google.maps.Marker): void {
        marker.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(() => {
            marker.setAnimation(null)
        }, 700)
    }

    zoomInOnSelectedMarker(): void {
        if(this.selectedMarkers[0]){
            this.zoomInOnMarker(this.selectedMarkers[0])
        }
    }

    private zoomInOnMarker(marker: google.maps.Marker): void {
        // https://stackoverflow.com/questions/5054515/zoom-in-to-marker-google-maps
        let position = marker.getPosition()
        if(position){
            this.mapObj.setZoom(15)
            this.mapObj.panTo(position)
        }
    }

    onMarkerDblClick(coord: google.maps.LatLngLiteral): void {
        // find the marker
        let marker = this.findMarker(coord)
        if(marker){
            this.zoomInOnMarker(marker)
        }
    }
}
