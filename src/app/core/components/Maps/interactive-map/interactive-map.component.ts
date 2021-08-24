import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { Roadtrip } from 'src/app/core/data/Roadtrip/roadtrip';
import { RoadtripStop } from 'src/app/core/data/Roadtrip/roadtrip-stop';
import { InteractiveMapService } from 'src/app/core/services/maps/interactive-map.service';
import { IMapManager } from '../functionality/i-map-manager';

@Component({
  selector: 'app-interactive-map',
  templateUrl: './interactive-map.component.html',
  styleUrls: ['./interactive-map.component.css']
})
export class InteractiveMapComponent implements OnInit {
  manager: IMapManager
  @Input() roadtrip: Roadtrip

  @Output() markerSelected = new EventEmitter<RoadtripStop>()

  constructor(private mapServices: InteractiveMapService) {
  }

  ngOnInit(): void {
    this.manager = new IMapManager(this.getDefaultCoords(), this.mapServices)
    this.initListening()

    this.manager.markerClickEvent.subscribe(selectedMarkerCoords => {
      let stopSelected = this.roadtrip.stops.find(stop => stop.location.coordinates.compare(selectedMarkerCoords))
      this.markerSelected.emit(stopSelected)
    })
  }

  getDefaultCoords(): google.maps.LatLngLiteral[] {
    return this.roadtrip.stops.map(stop => {
      return {lat: stop.location.coordinates.latitude, lng: stop.location.coordinates.longitude}
    })
  }

  // styles

  actionHintStyles = {
    color: AppColors.onColorLight,
    fontFamily: AppFonts.Data
  }

  // data

  defaultCoords: google.maps.LatLngLiteral[] = [
    {lat: 40.68939990124159, lng: -74.04445748465636},
    {lat: 39.90524641157898, lng: -74.65001090669422},
    {lat: 39.7533802173312, lng: -107.16954193416196},
  ]

  actionHint: string

  // state

  showingActionHint = false;
  showingNewLocationForm = false

  // events
  @Output() newLocationAdded = new EventEmitter<any>()

  // functionality

  initListening(): void {
    this.manager.addNewLocationEvent.subscribe(() => this.onaddMarkerEventOpen())
    this.manager.newLocationCompleteEvent.subscribe(() => this.onStopAddingLocation())
    this.manager.addLocationCancelEvent.subscribe(() => this.onStopAddingLocation())
  }

  // -------------------------------------------------- EVENT HANDLERS --------------------------------------------------

  onaddMarkerEventOpen(): void {
    this.showActionHint("Click anywhere on the map to add a new marker")
    this.showingNewLocationForm = true
  }

  onStopAddingLocation(): void {
    this.hideForm()
    this.hideActionHint()
  }

  // -------------------------------------------------- HELPER FUNCTIONS --------------------------------------------------

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

  onFormSubmit(form: FormGroup): void {
    // convert to the location obj and signal to page
    this.newLocationAdded.emit({
      address: form.get('address')?.value,
      latitude: form.get('latitude')?.value,
      longitude: form.get('longitude')?.value,
      title: form.get('title')?.value,
      description: form.get('description')?.value,
    })
    this.manager.finishAddingLocation()
  }
}
