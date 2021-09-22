import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { faDrawPolygon, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'src/app/core2/interfaces/button';
import { IMapTool } from "src/app/core2/interfaces/i-map-tool";
import { AddMarkerTool } from 'src/app/core/models/i-map-tools/add-marker-tool';
import { DeleteMarkerTool } from 'src/app/core/models/i-map-tools/delete-marker-tool';
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
  @ViewChild('polygonButton') polygonAreaButtonComponent: Button

  addMarkerTool: AddMarkerTool
  deleteMarkerTool: DeleteMarkerTool

  // ----- TOOLBAR BUTTON ICONS -----

  addMarkerIcon = faPlus
  deleteMarkerIcon = faTrashAlt
  polygonAreaIcon = faDrawPolygon

  toolButtonSize = "20px"

  // --------------------------------- STATE ---------------------------------
  selectedTools: IMapTool[] = []

  // --------------------------------- EVENTS ---------------------------------
  @Output() markerAdded = new EventEmitter<google.maps.Marker>()
  @Output() markerDeleted = new EventEmitter<google.maps.Marker>()

  // --------------------------------- EVENT HANDLERS ---------------------------------

  onAddMarkerButtonClick(): void {
    if(this.isToolActive(this.addMarkerTool)){
      this.unselectTool(this.addMarkerTool)
    }
    else{
      this.selectTool(this.addMarkerTool)
      this.removeConflictingTools(this.addMarkerTool)
    }
  }

  onDeleteMarkerButtonClick(): void {
    if(this.isToolActive(this.deleteMarkerTool)){
      this.unselectTool(this.deleteMarkerTool)
    }
    else{
      if(this.UIComponent.selectedMarkers.length > 0){
        let selectedMarkersCopy: google.maps.Marker[] = [...this.UIComponent.selectedMarkers]
        let markersSuccessfullyDeleted = this.deleteMarkerTool.deleteMarkers(selectedMarkersCopy)
        markersSuccessfullyDeleted.forEach(deletedMarker => {
          this.markerDeleted.emit(deletedMarker)
        })
      }
      else{
        try{
          this.selectTool(this.deleteMarkerTool)
          this.removeConflictingTools(this.deleteMarkerTool)
        }
        catch(e){
          console.log(e)
        }
      }
    }
  }

  onMapClick(coordinates: google.maps.LatLng): void {
    this.selectedTools.forEach(tool => {
      switch(tool){
        case this.addMarkerTool: {
          let markerAdded = this.addMarkerTool.doJob(coordinates)
          this.signal_markerAdded(markerAdded)
          this.unselectTool(this.addMarkerTool)
          break
        }
      }
    })
  }

  onMarkerClick(markerClicked: google.maps.Marker): void {
    if(this.selectedTools.length == 0){
      if(this.UIComponent.markerIsSelected(markerClicked)){
        this.UIComponent.unselectMarker(markerClicked)
      }
      else{
        this.UIComponent.selectMarker(markerClicked)
      }
    }

    this.selectedTools.forEach(tool => {
      switch(tool){
        case this.deleteMarkerTool: {
          if(this.deleteMarkerTool.deleteMarker(markerClicked)){
            this.signal_markerDeleted(markerClicked)
          }
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

  signal_markerDeleted(markerDeleted: google.maps.Marker): void {
    this.markerDeleted.emit(markerDeleted)
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

  isToolActive(tool: IMapTool): boolean {
    let index = this.selectedTools.indexOf(tool)

    return index == -1 ? false : true
  }

  removeConflictingTools(toolToActivate: IMapTool): void {
    let toolsToDeactivate: IMapTool[] = []

    switch(toolToActivate){
      case this.addMarkerTool: {
        toolsToDeactivate = []
        break;
      }
      case this.deleteMarkerTool: {
        toolsToDeactivate = []
        break;
      }
    }

    toolsToDeactivate.forEach(toolToDeactivate => {
      this.unselectTool(toolToDeactivate)
    })
  }
}
