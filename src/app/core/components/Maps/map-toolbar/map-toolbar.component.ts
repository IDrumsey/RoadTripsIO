import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { faExpandArrowsAlt, faInfo, faMapMarkerAlt, faPencilAlt, faPlus, faRoute, faSearchLocation, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { Roadtrip } from 'src/app/core/data/Roadtrip/roadtrip';

import { ButtonComponent } from '../../Buttons/button/button.component';
import { IMapManager } from '../functionality/i-map-manager';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit, AfterViewInit {
  @Input() roadtrip: Roadtrip
  @Input() manager: IMapManager
  // data
  @ViewChildren(ButtonComponent) buttonChildren: QueryList<ButtonComponent> = new QueryList()
  buttons: ButtonComponent[]

  @Output() detailsBtnClick = new EventEmitter()

  // styles
  plusIcon = faPlus
  mapMarkerIcon = faMapMarkerAlt
  pencilIcon = faPencilAlt
  trashIcon = faTrashAlt
  routeIcon = faRoute
  zoomMarkerIcon = faSearchLocation
  detailsIcon = faInfo
  expandMapIcon = faExpandArrowsAlt

  iconSize = "20px"
  buttonGap = 25
  toolbarGap = 100

  addMarkerBtnClickColor = AppColors.onContrastGreen
 
  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonChildren.toArray()
    this.initEventListening()
  }

  // events

  onAddMarkerBtnClick(): void {
    // if(this.manager.editing && this.manager.currentAction == IMapActions.AddMarker){
    //   // turn off action and editing
    //   this.manager.stopEditing()
    // }
    // else{
    //   // switch over to add marker action
    //   this.manager.startEditing(IMapActions.AddMarker)
    // }
  }

  initEventListening(): void {
    this.manager.newLocationCompleteEvent.subscribe(() => this.onDoneAddingNewLocation())
    this.manager.addLocationFormCancelEvent.subscribe(() => this.onDoneAddingNewLocation())
  }

  // -------------------------------------------------- EVENT HANDLERS --------------------------------------------------

  onDoneAddingNewLocation(): void {
    this.buttons[1].manager.quietClickHandler()
  }

  onDetailsToolBtnClick(): void {
    this.detailsBtnClick.emit()
  }

  onZoomOutToolBtnClick(): void {
    this.manager.panMapToFitCoordinates(this.manager.coordinates)
  }
}
