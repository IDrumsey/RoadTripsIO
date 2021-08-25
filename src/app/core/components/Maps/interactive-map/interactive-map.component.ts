import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Coordinate } from 'src/app/core/data/coordinate';
import { Location } from 'src/app/core/data/location';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { Roadtrip } from 'src/app/core/data/Roadtrip/roadtrip';
import { RoadtripStop } from 'src/app/core/data/Roadtrip/roadtrip-stop';
import { AsyncService } from 'src/app/core/services/async.service';
import { DataAccessService } from 'src/app/core/services/data/data-access.service';
import { InteractiveMapService } from 'src/app/core/services/maps/interactive-map.service';
import { IMapManager } from '../functionality/i-map-manager';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {
  constructor(private mapServices: InteractiveMapService, private api: DataAccessService, private asyncService: AsyncService) {}

  ngOnInit(): void {
    this.manager = new IMapManager(this.getDefaultCoords(), this.mapServices)
    this.initListening()

    this.manager.markerClickEvent.subscribe(selectedMarkerCoords => {
      let stopSelected = this.roadtrip.stops.find(stop => stop.location.coordinates.compare(selectedMarkerCoords))
      this.markerSelected.emit(stopSelected)
    })
  }

  // --------------------------------------------- DATA ---------------------------------------------

  // ----------- REGULAR DATA -----------
  manager: IMapManager
  actionHint: string

  // ----------- INPUT DATA -----------
  @Input() roadtrip: Roadtrip

  // --------------------------------------------- EVENTS ---------------------------------------------
  @Output() markerSelected = new EventEmitter<RoadtripStop>()
  @Output() newLocationAdded = new EventEmitter<any>()
  @Output() detailsToolBtnClick = new EventEmitter<RoadtripStop>()

  // --------------------------------------------- STATE ---------------------------------------------
  showingActionHint = false;
  showingNewLocationForm = false

  // --------------------------------------------- STYLES ---------------------------------------------
  actionHintStyles = {
    color: AppColors.onColorLight,
    fontFamily: AppFonts.Data
  }

  // --------------------------------------------- PUBLIC FUNCTIONALITY ---------------------------------------------

  getDefaultCoords(): google.maps.LatLngLiteral[] {
    return this.roadtrip.stops.map(stop => {
      return {lat: stop.location.coordinates.latitude, lng: stop.location.coordinates.longitude}
    })
  }

  initListening(): void {
    this.manager.addNewLocationEvent.subscribe(() => this.onaddMarkerEventOpen())
    this.manager.newLocationCompleteEvent.subscribe(() => this.onStopAddingLocation())
    this.manager.addLocationCancelEvent.subscribe(() => this.onStopAddingLocation())
  }

  showActionHint(hint: string): void {
    this.actionHint = hint
    this.showingActionHint = true
  }

  hideActionHint(): void {
    this.actionHint = ""
    this.showingActionHint = false
  }

  hideForm(): void {
    this.showingNewLocationForm = false
  }

  // ----------------- EVENT HANDLERS -----------------

  onaddMarkerEventOpen(): void {
    this.showActionHint("Click anywhere on the map to add a new marker")
    this.showingNewLocationForm = true
  }

  onStopAddingLocation(): void {
    this.hideForm()
    this.hideActionHint()
  }

  onFormSubmit(form: FormGroup): void {
    // BUG : might add marker to map even if api fails
    this.manager.finishAddingLocation()

    // convert form to stop
    let newStopData = this.convertFormToStop(form)

    console.log(newStopData)

    // add to roadtrip
    this.roadtrip.addStop(newStopData)
  }

  onDetailsToolBtnClick(): void {
    if(this.manager.selectedMarkers[0]){
      let selectedMarkerCoords = this.mapServices.getMarkerCoordinates(this.manager.selectedMarkers[0])
      let stop = this.roadtrip.stops.find(stop => {
        // BUG: the 'as' could cause errors
          return stop.location.coordinates.compare(selectedMarkerCoords as google.maps.LatLngLiteral)
      })
      this.detailsToolBtnClick.emit(stop)
    }
  }

  // --------------------------------------------- PRIVATE FUNCTIONALITY ---------------------------------------------
  private convertFormToStop(form: FormGroup): RoadtripStop {
    let stop = new RoadtripStop(this.api, this.asyncService)
    stop.location = new Location(this.api)

    stop.location.address = form.get('address')?.value
    stop.location.coordinates = new Coordinate(form.get('latitude')?.value, form.get('longitude')?.value)
    stop.title = form.get('title')?.value
    stop.description = form.get('description')?.value

    return stop
  }
}
