import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject} from 'rxjs';
import { IMapComponent } from 'src/app/core/components/Maps/i-map/i-map.component';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { NewStopFormComponent } from '../../components/forms/new-stop-form/new-stop-form.component';
import { NotificationManagerComponent } from '../../components/notifications/notification-manager/notification-manager.component';
import { StopCardComponent } from '../../components/stop-card/stop-card.component';
import { Comment } from '../../data/models/comment/comment';
import { Coordinate } from '../../data/models/coordinate/coordinate';
import { Location } from '../../data/models/location/location';
import { Roadtrip } from '../../data/models/roadtrip/roadtrip';
import { Stop } from '../../data/models/stop/stop';
import { DataAccessService } from '../../data/services/data-access.service';
import { ButtonTool } from '../../interfaces/button-tool';
import { IMapService } from 'src/app/core/services/maps/i-map.service';
import { PageService } from '../../services/page.service';
import { CommentParams, CommentV2Service, SortingDirections, SortingOptions } from '../../services/comment-v2.service';

@Component({
  selector: 'app-individual-roadtrip-page',
  templateUrl: './individual-roadtrip-page.component.html',
  styleUrls: ['./individual-roadtrip-page.component.scss']
})
export class IndividualRoadtripPageComponent implements OnInit, AfterViewInit {

  constructor(private api: DataAccessService, private changeDetector: ChangeDetectorRef, private router: Router, private url: ActivatedRoute, private mapService: IMapService, private pageService: PageService, private commentService: CommentV2Service) { }

  ngOnInit(): void {
    this.url.paramMap.subscribe(params => {
      // get roadtrip id
      let roadtripIdString = params.get("roadtripId");
      let roadtripId = roadtripIdString ? parseInt(roadtripIdString) : null

      // fetch data or forward to not found page
      if(roadtripId){
        this.loadData(roadtripId).then(() => {
          this.dataLoaded = true
          this.runAfterDataLoaded()
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
    this.stopCardComponents.changes.subscribe(components => {
      this.stopCards = components.toArray()
    })
  }

  // --------------------------- DATA ---------------------------

  @ViewChild('NotificationManager') notificationManager: NotificationManagerComponent
  @ViewChild('map') map: IMapComponent
  @ViewChildren('newStopForm') newStopForm = new QueryList<NewStopFormComponent>()
  newStopInfo: NewStopFormComponent
  @ViewChildren(StopCardComponent) stopCardComponents = new QueryList<StopCardComponent>()
  stopCards: StopCardComponent[] = []

  roadtrip: Roadtrip

  newStopMarker: google.maps.Marker | null = null

  // --------------------------- STATE ---------------------------

  dataLoaded = false

  viewInitialized = false
  fillingOutStopForm = false;

  commentSortParam = CommentParams.Date
  commentSortDirection = SortingDirections.Descending

  get commentSortOptions(): SortingOptions {
    return {
      param: this.commentSortParam,
      direction: this.commentSortDirection
    }
  }

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
    let stopToDelete = this.findStopWithMarker(markerDeleted)

    if(stopToDelete){
      this.deleteStop(stopToDelete).then(() => {
        let note = this.notificationManager.createNotification('Stop deleted', {bgColor: '#8a203c'})
        this.notificationManager.addTempNotification(note, 3)
      })
    }
  }

  onStopCardSeeOnMapButtonClick(stop: Stop): void {
    // find the marker
    let latlng = new google.maps.LatLng(stop.location.coordinate.latitude, stop.location.coordinate.longitude)
    let markerFound = this.map.findMarker(latlng)
    if(markerFound){
      this.pageService.scrollToTop()
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

  onStopCardDeleteBtnClick(stop: Stop): void {
    this.deleteStop(stop);
  }

  onMarkerSelected(markerSelected: google.maps.Marker): void {
    // let stopFound = this.findStopWithMarker(markerSelected)
    // if(stopFound){
    //   let cardComponent = this.findStopCard(stopFound.location.coordinate.latitude, stopFound.location.coordinate.longitude)
    //   if(cardComponent){
    //     // BUG (possible) : possible null value might cause unexpected operations with the scrollToElement function
    //     // This should fix it
    //     if(cardComponent.element.nativeElement){
    //       this.pageService.scrollToElement(cardComponent.element.nativeElement)
    //     }
    //   }
    // }
  }

  runAfterDataLoaded(): void {
    this.commentService.sort(this.roadtrip.comments, this.commentSortParam, this.commentSortDirection)
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

      let images = this.newStopInfo.imageSelectorForm.images

      let uploadStop = new Stop()
      uploadStop.description = description
      let uploadLocation = new Location();
      uploadLocation.address = address
      uploadLocation.title = title
      let uploadCoords = new Coordinate(latitude, longitude)
      uploadLocation.coordinate = uploadCoords

      this.api.addLocation(uploadLocation).then(stopLocation => {
        uploadStop.location = stopLocation
        uploadStop.location.photos = images
        // FIX : new stop can't store images in test db because I think there's too much data
        this.api.addStop(uploadStop).then(newStop => {
          this.roadtrip.addStop(newStop)
          this.api.updateRoadtrip(this.roadtrip).then(updatedRoadtrip => {
            this.roadtrip = updatedRoadtrip
          })
          this.closeNewStopForm()
        })
      })
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

  deleteStop(stop: Stop): Promise<void> {
    // remove necessary data from api
    return new Promise((resolve, reject) => {
      this.api.deleteStop(stop).then(() => {
          this.roadtrip.removeStop(stop)
          this.api.updateRoadtrip(this.roadtrip).then(updatedRoadtrip => {
            this.roadtrip = updatedRoadtrip
          }, err => reject(err))
      }, err => reject(err))
    })
  }

  findStopCard(lat: number, lng: number): StopCardComponent | undefined {
    return this.stopCards.find(card => card.stop.location.coordinate.latitude == lat && card.stop.location.coordinate.longitude == lng)
  }

  findStopWithMarker(marker: google.maps.Marker): Stop | undefined {
    let coord = this.mapService.getMarkerPosition(marker)
    if(coord){
      return this.roadtrip.findStop(coord)
    }
    else{
      throw new Error("Couldn't extract coordinates from the marker")
    }
  }

  // --------------------------- STYLES ---------------------------

  commentGap = "10px"

  sectionTitleStyles(): {} {
    return {
      fontFamily: AppFonts.Handwriting,
      fontSize: "25px",
      fontWeight: "bold"
    }
  }
}
