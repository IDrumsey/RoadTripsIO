import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'src/app/core/interfaces/button';
import { IMapTool } from 'src/app/core/interfaces/i-map-tool';
import { AddMarkerTool } from 'src/app/core/models/i-map-tools/add-marker-tool';
import { DeleteMarkerTool } from 'src/app/core/models/i-map-tools/delete-marker-tool';
import { IconButtonV2Component } from '../../icon-button-v2/icon-button-v2.component';
import { IMapUIComponent } from '../i-map-ui/i-map-ui.component';

@Component({
  selector: 'app-i-map',
  templateUrl: './i-map.component.html',
  styleUrls: ['./i-map.component.css']
})
export class IMapComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.UIComponent)
    if(this.UIComponent){
      // initialize tools that depend on the ui
      this.addMarkerTool = new AddMarkerTool(this.UIComponent, this.addMarkerButtonComponent)
      this.deleteMarkerTool = new DeleteMarkerTool(this.UIComponent, this.deleteMarkerButtonComponent)
    }
  }

  // --------------------------------- DATA ---------------------------------

  @ViewChild('ui') UIComponent: IMapUIComponent
  @ViewChild('addButton') addMarkerButtonComponent: Button
  @ViewChild('deleteButton') deleteMarkerButtonComponent: Button

  addMarkerTool: AddMarkerTool
  deleteMarkerTool: DeleteMarkerTool

  // ----- TOOLBAR BUTTON ICONS -----

  addMarkerIcon = faPlus
  deleteMarkerIcon = faTrashAlt

  toolButtonSize = "20px"

  // --------------------------------- STATE ---------------------------------
  selectedTools: IMapTool[] = []

  // --------------------------------- EVENTS ---------------------------------
  @Output() markerAdded = new EventEmitter<google.maps.Marker>()

  // --------------------------------- EVENT HANDLERS ---------------------------------

  onAddMarkerButtonClick(): void {
    this.selectTool(this.addMarkerTool)
  }

  onDeleteMarkerButtonClick(): void {
    if(this.UIComponent.selectedMarkers.length > 0){
      let selectedMarkersCopy: google.maps.Marker[] = [...this.UIComponent.selectedMarkers]
      this.deleteMarkerTool.deleteMarkers(selectedMarkersCopy)
    }
    else{
      try{
        this.selectTool(this.deleteMarkerTool)
        
        // remove all of the conflicting tools
        let conflictingTools: IMapTool[] = []
        conflictingTools.forEach(conflictingTool => {
          this.unselectTool(conflictingTool)
        })
      }
      catch(e){
        console.log(e)
      }
    }
  }

  onMapClick(coordinates: google.maps.LatLng): void {
    this.selectedTools.forEach(tool => {
      switch(tool){
        case this.addMarkerTool: {
          this.addMarkerTool.doJob(coordinates)
          this.unselectTool(this.addMarkerTool)
        }
      }
    })
  }

  onMarkerClick(markerClicked: google.maps.Marker): void {
    if(this.selectedTools.length == 0){
      this.UIComponent.selectMarker(markerClicked)
    }

    this.selectedTools.forEach(tool => {
      switch(tool){
        case this.deleteMarkerTool: {
          this.deleteMarkerTool.deleteMarker(markerClicked)
          this.unselectTool(this.deleteMarkerTool)
          break
        }
      }
    })
  }

  // --------------------------------- SIGNLERS ---------------------------------
  signal_markerAdded(markerAdded: google.maps.Marker): void {
    this.markerAdded.emit(markerAdded)
  }

  // --------------------------------- FUNCTIONALITY ---------------------------------
  selectTool(tool: IMapTool): void {
    // check if already selected
    let foundTool = this.selectedTools.find(tempTool => tempTool == tool)
    if(!foundTool){
      this.selectedTools.push(tool)
      tool.onSelect()
    }
    else{
      throw 'Tool already selected'
    }
  }

  unselectTool(tool: IMapTool): void {
    let indexOfTool = this.selectedTools.indexOf(tool)
    if(indexOfTool != -1){
      this.selectedTools.splice(indexOfTool, 1)
      tool.onUnselect()
    }
    else{
      throw 'Tool already unselected'
    }
  }
}
