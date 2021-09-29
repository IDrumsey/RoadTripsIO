import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IMapComponent } from 'src/app/core/components/Maps/i-map/i-map.component';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { Comment } from 'src/app/core/data2/models/client/comment';
import { Roadtrip } from 'src/app/core/data2/models/client/roadtrip';
import { RoadtripStop } from 'src/app/core/data2/models/client/roadtrip-stop';
import { AbstractDataAccessService } from 'src/app/core/services/data/abstract-data-access.service';
import { NotificationManagerComponent } from '../../components/notifications/notification-manager/notification-manager.component';

@Component({
  selector: 'app-individual-roadtrip-page',
  templateUrl: './individual-roadtrip-page.component.html',
  styleUrls: ['./individual-roadtrip-page.component.css']
})
export class IndividualRoadtripPageComponent implements OnInit, AfterViewInit {

  constructor(private dataLoader: AbstractDataAccessService, private changeDetector: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.loadData().then(() => {
      this.dataLoaded = true
      if(this.viewInitialized){
        this.initializeMap()
      }
    })
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true
    this.changeDetector.detectChanges()
    if(this.dataLoaded){
      this.initializeMap()
    }
  }

  // --------------------------- DATA ---------------------------

  @ViewChild('NotificationManager') notificationManager: NotificationManagerComponent
  @ViewChild('map') map: IMapComponent

  roadtrip: Roadtrip
  dataLoaded = false

  // --------------------------- STATE ---------------------------

  viewInitialized = false

  // --------------------------- EVENTS ---------------------------
  
  // --------------------------- EVENT HANDLERS ---------------------------
  onMarkerAdded(markerAdded: google.maps.Marker): void {
    let note = this.notificationManager.createNotification('Marker added', {bgColor: '#218a55'})

    this.notificationManager.addTempNotification(note, 3)
  }

  onMarkerDeleted(markerDeleted: google.maps.Marker): void {
    let note = this.notificationManager.createNotification('Marker deleted', {bgColor: '#8a203c'})

    this.notificationManager.addTempNotification(note, 3)
  }

  onStopCardSeeOnMapButtonClick(stop: RoadtripStop): void {
    // find the marker
    let latlng = new google.maps.LatLng(stop.location.coordinates.latitude, stop.location.coordinates.longitude)
    let markerFound = this.map.findMarker(latlng)
    if(markerFound){
      this.map.zoomMarkerTool.zoomInOnMarker(markerFound)
    }
  }

  onCommentProfileImageClick(comment: Comment): void {
    if(comment.owner){
      this.router.navigate(['users', comment.owner.id])
    }
  }

  // --------------------------- FUNCTIONALITY ---------------------------
  loadData(): Promise<void> {
    return new Promise((resolve) => {
      this.dataLoader.getRoadtripById(1).then(roadtrip => {
        this.roadtrip = roadtrip
        resolve()
      })
    })
  }

  // --------------------------- STYLES ---------------------------

  sectionTitleStyles(): {} {
    return {
      fontFamily: AppFonts.Handwriting,
      fontSize: "25px",
      fontWeight: "bold",
      color: AppColors.onColorLighter
    }
  }

  initializeMap(): void {
    this.addInitialStopsToMap()
  }

  addInitialStopsToMap(): void {
    this.roadtrip.stops.forEach(stop => {
      // convert coordinates to latlng
      let latlng = new google.maps.LatLng(stop.location.coordinates.latitude, stop.location.coordinates.longitude)
      // add to map
      this.map.addMarkerByCoordinates(latlng)
    })
  }
}
