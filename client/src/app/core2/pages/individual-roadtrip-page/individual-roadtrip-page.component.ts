import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject} from 'rxjs';
import { IMapComponent } from 'src/app/core/components/Maps/i-map/i-map.component';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { NewStopFormComponent } from '../../components/forms/new-stop-form/new-stop-form.component';
import { NotificationManagerComponent } from '../../components/notifications/notification-manager/notification-manager.component';
import { Comment } from '../../data/models/comment/comment';
import { Coordinate } from '../../data/models/coordinate/coordinate';
import { Location } from '../../data/models/location/location';
import { Roadtrip } from '../../data/models/roadtrip/roadtrip';
import { Stop } from '../../data/models/stop/stop';
import { DataAccessService } from '../../data/services/data-access.service';
import { ButtonTool } from '../../interfaces/button-tool';

@Component({
  selector: 'app-individual-roadtrip-page',
  templateUrl: './individual-roadtrip-page.component.html',
  styleUrls: ['./individual-roadtrip-page.component.scss']
})
export class IndividualRoadtripPageComponent implements OnInit, AfterViewInit {

  constructor(private api: DataAccessService, private changeDetector: ChangeDetectorRef, private router: Router, private url: ActivatedRoute) { }

  ngOnInit(): void {
    this.url.paramMap.subscribe(params => {
      // get roadtrip id
      let roadtripIdString = params.get("roadtripId");
      let roadtripId = roadtripIdString ? parseInt(roadtripIdString) : null

      // fetch data or forward to not found page
      if(roadtripId){
        this.loadData(roadtripId).then(() => {
          this.dataLoaded = true
          if(this.viewInitialized){
            this.initializeMap()
          }
        }, err => {
          if(err.status == 404){
            this.routeToNotFoundPage()
          }
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true
    this.changeDetector.detectChanges()
    if(this.dataLoaded){
      this.initializeMap()
    }
    this.newStopForm.changes.subscribe(components => {
      this.defineNewStopForm()
      if(this.newStopInfo){
        this.newStopFormShown.next()
      }
    })
  }

  // --------------------------- DATA ---------------------------

  @ViewChild('NotificationManager') notificationManager: NotificationManagerComponent
  @ViewChild('map') map: IMapComponent
  @ViewChildren('newStopForm') newStopForm = new QueryList<NewStopFormComponent>()
  newStopInfo: NewStopFormComponent

  roadtrip: Roadtrip
  dataLoaded = false

  newStopMarker: google.maps.Marker | null = null

  // --------------------------- STATE ---------------------------

  viewInitialized = false
  fillingOutStopForm = false;

  // --------------------------- EVENTS ---------------------------
  newStopFormShown = new Subject()
  
  // --------------------------- EVENT HANDLERS ---------------------------
  onMarkerAdded(markerAdded: google.maps.Marker): void {
    // add notification
    let note = this.notificationManager.createNotification('Marker added', {bgColor: '#218a55'})
    this.notificationManager.addTempNotification(note, 3)

    // show form to fill out stop details
    this.showNewStopForm()
    // The subscribing waits for the actual component to be defined and THEN defines the fields
    this.newStopFormShown.subscribe(() => {
      this.newStopInfo.form.controls["latitude"].setValue(markerAdded.getPosition()?.lat())
      this.newStopInfo.form.controls["longitude"].setValue(markerAdded.getPosition()?.lng())
    })
    this.map.unselectTool(this.map.addMarkerTool) // necessary because of internal imap unselect doesn't happen soon enough
    this.map.lockTool(this.map.addMarkerTool)
    this.newStopMarker = markerAdded
  }

  onMarkerDeleted(markerDeleted: google.maps.Marker): void {
    let note = this.notificationManager.createNotification('Marker deleted', {bgColor: '#8a203c'})
    this.notificationManager.addTempNotification(note, 3)
  }

  onStopCardSeeOnMapButtonClick(stop: Stop): void {
    // find the marker
    let latlng = new google.maps.LatLng(stop.location.coordinate.latitude, stop.location.coordinate.longitude)
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

  onMapToolClick(toolClicked: ButtonTool): void {
    switch(toolClicked){
      case this.map.addMarkerTool: {
        if(this.fillingOutStopForm){
          // already adding stop
          let note = this.notificationManager.createNotification("Already adding a stop, finish or cancel adding the new stop.", {
            bgColor: AppColors.onContrastRed
          })
          this.notificationManager.addTempNotification(note, 5)
        }
        break;
      }
    }
  }

  // --------------------------- FUNCTIONALITY ---------------------------
  loadData(roadtripId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.api.getRoadtrip(roadtripId).then(roadtrip => {
        this.roadtrip = roadtrip
        resolve()
      }, err => {
        reject(err)
      })
    })
  }

  initializeMap(): void {
    this.addInitialStopsToMap()
  }

  addInitialStopsToMap(): void {
    this.roadtrip.stops.forEach(stop => {
      // convert coordinates to latlng
      let latlng = new google.maps.LatLng(stop.location.coordinate.latitude, stop.location.coordinate.longitude)
      // add to map
      this.map.addMarkerByCoordinates(latlng)
    })
  }

  routeToNotFoundPage(): void {
    this.router.navigate(['404']);
  }

  showNewStopForm(): void {
    this.fillingOutStopForm = true;
  }

  hideNewStopForm(): void {
    this.fillingOutStopForm = false;
  }

  submitNewStopForm(): void {
    if(!this.newStopInfo.form.valid){
      this.notificationManager.addTempNotification(this.notificationManager.createNotification("Check the info again, something's wrong...", {
        bgColor: AppColors.onContrastRed,
        textColor: "#fff"
      }), 5)
    }
    else{
      let title = this.newStopInfo.form.controls["title"].value
      let description = this.newStopInfo.form.controls["description"].value
      let address = this.newStopInfo.form.controls["address"].value
      let latitude = this.newStopInfo.form.controls["latitude"].value
      let longitude = this.newStopInfo.form.controls["longitude"].value

      console.log("submitting form : ", title)

      let uploadStop = new Stop()
      uploadStop.description = description
      let uploadLocation = new Location();
      uploadLocation.address = address
      uploadLocation.title = title
      let uploadCoords = new Coordinate(latitude, longitude)
      uploadLocation.coordinate = uploadCoords
      uploadStop.location = uploadLocation

      // TODO
      // this.roadtrip.addStop(uploadStop).then(newStop => {
      //   this.closeNewStopForm()
      // })
    }
  }

  cancelNewStopForm(): void {
    this.closeNewStopForm()
    if(this.newStopMarker){
      this.map.deleteMarkerTool.deleteMarker(this.newStopMarker)
    }
  }

  closeNewStopForm(): void {
    this.newStopInfo.form.controls["latitude"].setValue(0)
    this.newStopInfo.form.controls["longitude"].setValue(0)
    this.fillingOutStopForm = false
    this.map.unlockTool(this.map.addMarkerTool)
    if(this.newStopMarker){
      this.newStopMarker = null
    }
  }

  defineNewStopForm(): void {
    let form = this.newStopForm.toArray()[0]
    this.newStopInfo = form
  }

  // --------------------------- STYLES ---------------------------

  sectionTitleStyles(): {} {
    return {
      fontFamily: AppFonts.Handwriting,
      fontSize: "25px",
      fontWeight: "bold"
    }
  }
}
