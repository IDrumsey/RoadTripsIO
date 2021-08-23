import { Component, OnInit, ViewChildren, AfterViewInit, QueryList, ViewChild, Input} from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

import { InteractiveMapService } from 'src/app/core/services/maps/interactive-map.service';
import { IMapManager } from '../functionality/i-map-manager';

@Component({
  selector: 'app-map-ui',
  templateUrl: './map-ui.component.html',
  styleUrls: ['./map-ui.component.css']
})
export class MapUiComponent implements OnInit, AfterViewInit {
  @Input() manager: IMapManager

  // map
  @ViewChild(GoogleMap) private angularMap: GoogleMap
  @ViewChildren(MapMarker) markerComponents: QueryList<MapMarker> = new QueryList()

  options: google.maps.MapOptions = {
    zoom: 5,
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // ref the actual map object so you can use the functions on it
    if(this.angularMap.googleMap){
      this.manager.mapObj = this.angularMap.googleMap
    }
    this.manager.mapObj = this.angularMap.googleMap as google.maps.Map

    this.listenForMarkerAdd()

    // fit all markers into the map view
    this.manager.panMapToFitCoordinates(this.manager.startingCoordinates)

    this.manager.initMarkers()

    this.manager.initialized = true
  }

  listenForMarkerAdd(): void {
    this.markerComponents.changes.subscribe(() => {
      this.defineMarkerChildren()
    })
  }

  private defineMarkerChildren(): void {
    this.manager.markers = this.markerComponents.map(childMarker => childMarker.marker as google.maps.Marker)
    this.manager.onAddOrDropMarker()
  }
}
