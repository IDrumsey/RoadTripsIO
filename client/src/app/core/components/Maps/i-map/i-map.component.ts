import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { faDrawPolygon, faExpandArrowsAlt, faPlus, faSearchLocation, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'src/app/core2/interfaces/button';
import { ButtonTool } from "src/app/core2/interfaces/button-tool";
import { AddMarkerTool } from 'src/app/core2/components/imap/i-map-tools/add-marker-tool';
import { DeleteMarkerTool } from 'src/app/core2/components/imap/i-map-tools/delete-marker-tool';
import { IMapUIComponent } from '../i-map-ui/i-map-ui.component';
import { ZoomOnMarkerTool } from 'src/app/core2/components/imap/i-map-tools/zoom-on-marker-tool';
import { NotificationManagerComponent } from 'src/app/core2/components/notifications/notification-manager/notification-manager.component';
import { AppColors } from 'src/app/core/data/models/app-colors';

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
      this.zoomMarkerTool = new ZoomOnMarkerTool(this.UIComponent, this.zoomInOnMarkerButtonComponent)
    }
  }

  // --------------------------------- DATA ---------------------------------

  @ViewChild('ui') UIComponent: IMapUIComponent
  @ViewChild('addButton') addMarkerButtonComponent: Button
  @ViewChild('deleteButton') deleteMarkerButtonComponent: Button
  @ViewChild('polygonButton') polygonAreaButtonComponent: Button
  @ViewChild('zoomMarkerButton') zoomInOnMarkerButtonComponent: Button

  addMarkerTool: AddMarkerTool
  deleteMarkerTool: DeleteMarkerTool
  zoomMarkerTool: ZoomOnMarkerTool

  @ViewChild('noteManager') notificationManager: NotificationManagerComponent

  // ----- TOOLBAR BUTTON ICONS -----

  addMarkerIcon = faPlus
  deleteMarkerIcon = faTrashAlt
  polygonAreaIcon = faDrawPolygon
  zoomMarkerIcon = faSearchLocation
  expandMapIcon = faExpandArrowsAlt

  toolButtonSize = "20px"

  // --------------------------------- STATE ---------------------------------
  selectedTools: ButtonTool[] = []

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

  onZoomInOnMarkerButtonClick(): void {
    if(this.isToolActive(this.zoomMarkerTool)){
      this.unselectTool(this.zoomMarkerTool)
    }
    else{
      if(this.UIComponent.selectedMarkers.length == 0){
        this.selectTool(this.zoomMarkerTool)
        this.removeConflictingTools(this.zoomMarkerTool)
      }
      else{
        if(this.UIComponent.selectedMarkers.length > 1){
          let tooManySelectedNote = this.notificationManager.createNotification("Can only zoom in on 1 marker", {
            bgColor: "rgba(0, 0, 0, 0)",
            textColor: AppColors.onColorLighter
          })
          this.notificationManager.addTempNotification(tooManySelectedNote, 5)
        }
        else{
          this.zoomMarkerTool.zoomInOnMarker(this.UIComponent.selectedMarkers[0])
        }
      }
    }
  }

  onZoomOutBtnClick(): void {
    this.UIComponent.fitAllMarkersInView()
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
        case this.zoomMarkerTool: {
          this.zoomMarkerTool.zoomInOnMarker(markerClicked)
          this.unselectTool(this.zoomMarkerTool)
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
  selectTool(tool: ButtonTool): void {
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

  unselectTool(tool: ButtonTool): void {
    let indexOfTool = this.selectedTools.indexOf(tool)
    if(indexOfTool != -1){
      this.selectedTools.splice(indexOfTool, 1)
      tool.onUnselect()
    }
    else{
      throw 'Tool already unselected'
    }
  }

  isToolActive(tool: ButtonTool): boolean {
    let index = this.selectedTools.indexOf(tool)

    return index == -1 ? false : true
  }

  removeConflictingTools(toolToActivate: ButtonTool): void {
    let toolsToDeactivate: ButtonTool[] = []

    switch(toolToActivate){
      case this.addMarkerTool: {
        toolsToDeactivate = []
        break;
      }
      case this.deleteMarkerTool: {
        toolsToDeactivate = [this.zoomMarkerTool]
        break;
      }
      case this.zoomMarkerTool: {
        toolsToDeactivate = [this.deleteMarkerTool]
        break;
      }
    }

    toolsToDeactivate.forEach(toolToDeactivate => {
      this.unselectTool(toolToDeactivate)
    })
  }
}
