import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input } from '@angular/core';
import { faMapMarkerAlt, faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { AppColors } from 'src/app/core/data/models/app-colors';

import { ButtonComponent } from '../../Buttons/button/button.component';
import { IMapManager } from '../functionality/i-map-manager';
import { IMapActions } from '../models/imap-actions';

@Component({
  selector: 'app-map-toolbar',
  templateUrl: './map-toolbar.component.html',
  styleUrls: ['./map-toolbar.component.css']
})
export class MapToolbarComponent implements OnInit, AfterViewInit {
  @Input() manager: IMapManager
  // data
  @ViewChildren(ButtonComponent) buttonChildren: QueryList<ButtonComponent> = new QueryList()
  buttons: ButtonComponent[]

  // styles
  plusIcon = faPlus
  mapMarkerIcon = faMapMarkerAlt
  pencilIcon = faPencilAlt
  trashIcon = faTrashAlt

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
}
