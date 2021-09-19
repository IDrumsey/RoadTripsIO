import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AddMarkerTool } from 'src/app/core/models/i-map-tools/add-marker-tool';
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
  }

  // --------------------------------- DATA ---------------------------------

  @ViewChild('ui') UIComponent: IMapUIComponent

  // ----- TOOLBAR BUTTON ICONS -----

  addMarkerIcon = faPlus

  // --------------------------------- STATE ---------------------------------
  selectedTools: string[] = []


  // --------------------------------- EVENT HANDLERS ---------------------------------

  onAddMarkerButtonClick(): void {
    this.selectedTools.push('add')
    this.UIComponent.changeCursor('crosshair')
  }

  onMapClick(coordinates: google.maps.LatLng): void {
    this.selectedTools.forEach(tool => {
      if(tool == 'add'){
        let markerToAdd = this.genNewMarker(coordinates)
        this.UIComponent.addMarker(markerToAdd)
        let toolIndex = this.selectedTools.indexOf('add')
        if(toolIndex != -1){
          // remove add tool from selection
          this.selectedTools.splice(toolIndex, 1)
          this.UIComponent.changeCursor('grab')
        }
      }
    })
  }

  genNewMarker(position: google.maps.LatLng): google.maps.Marker {
    return new google.maps.Marker({
      position: position,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    })
  }
}
