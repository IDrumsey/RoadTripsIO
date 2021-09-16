import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ViewChild, ContentChildren, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { CommentComponent } from '../../components/Comments/comment/comment.component';
import { NavURLPiece } from '../../components/data/models/nav-urlpiece';
import { InteractiveMapComponent } from '../../components/Maps/interactive-map/interactive-map.component';
import { RoadtripLocationCardComponent } from '../../components/roadtrip-locations/roadtrip-location-card/roadtrip-location-card.component';

import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { Comment } from '../../data2/models/client/comment';
import { Roadtrip } from '../../data2/models/client/roadtrip';
import { RoadtripStop } from '../../data2/models/client/roadtrip-stop';
import { AuthenticationService } from '../../services/authentication.service';
import { CommentSortService } from '../../services/comments/comment-sort.service';
import { AbstractDataAccessService } from '../../services/data/abstract-data-access.service';
import { DataAccessService } from '../../services/data/data-access.service';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-roadtrip-page',
  templateUrl: './roadtrip-page.component.html',
  styleUrls: ['./roadtrip-page.component.css']
})
export class RoadtripPageComponent implements OnInit, AfterContentInit {
  constructor(private api2: AbstractDataAccessService, private api: DataAccessService, private auth: AuthenticationService, private route: ActivatedRoute, private router: Router, private commentSort: CommentSortService, private userService: UserService) {
    this.initPage()
  }

  @ViewChild("RoadtripMap") roadtripMap: InteractiveMapComponent

  @ViewChildren(RoadtripLocationCardComponent) private stopCardElements: QueryList<RoadtripLocationCardComponent> = new QueryList()
  stopCards: RoadtripLocationCardComponent[]

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.stopCardElements.changes.subscribe(() => {
      this.defineStopCards()
    })
  }

  defineStopCards(): void {
    this.stopCards = this.stopCardElements.toArray()
  }
  
  // ----------------------------------------------- DATA -----------------------------------------------
  roadtrip: Roadtrip

  navPieces: NavURLPiece[]

  // ----------------------------------------------- STATE -----------------------------------------------
  dataLoaded: boolean = false
  addingRootReply: boolean = false

  // ----------------------------------------------- STYLES -----------------------------------------------
  titleFontFamily = AppFonts.Handwriting
  titleColor = '#fff'
  titleFontSize = "50px"

  getTitleStyles(): {} {
    return {
      color: this.titleColor,
      fontFamily: this.titleFontFamily,
      fontSize: this.titleFontSize
    }
  }

  getOwnerLinkStyles(): {} {
    return {
      color: AppColors.onColor,
      fontFamily: AppFonts.Data
    }
  }

  descriptionFontFamily = AppFonts.Data
  descriptionColor = '#fff'
  descriptionFontSize = "20px"
  
  getDescriptionStyles(): {} {
    return {
      color: this.descriptionColor,
      fontFamily: this.descriptionFontFamily,
      fontSize: this.descriptionFontSize
    }
  }

  sectionTitleFontSize = "35px"
  sectionTitleFont = AppFonts.Handwriting
  sectionTitleColor = AppColors.onColor

  getSectionTitleStyles(): {} {
    return {
      fontSize: this.sectionTitleFontSize,
      fontFamily: this.sectionTitleFont,
      color: this.sectionTitleColor
    }
  }

  commentSectionIcon = faCommentAlt

  getCommentSectionIconStyles(): {} {
    return {
      color: AppColors.onColor,
      fontSize: "25px"
    }
  }

  // ------------------- FUNCTIONALITY -------------------

  isOwner(): boolean {
    return this.auth.isCurrentlyLoggedInUser(this.roadtrip.owner)
  }

  initPage(): void {
    // get the roadtrip id
    this.route.paramMap.subscribe(params => {
      let roadtripIdString = params.get("roadtripId")
      
      if(roadtripIdString){
        let roadtripId = parseInt(roadtripIdString)

        // setup nav url pieces
        this.navPieces = [new NavURLPiece(this.router, "home", ""), new NavURLPiece(this.router, "roadtrips"), new NavURLPiece(this.router, roadtripId.toString(), "/roadtrips/" + roadtripId)]

        // load data
        this.loadData(roadtripId).then(() => {
          this.dataLoaded = true
          console.log("done loading data")
        })
      }
    })
  }

  loadData(roadtripId: number): Promise<void> {
    return new Promise((resolve) => {
      this.api2.getRoadtripById(roadtripId).then(roadtrip => {
        this.roadtrip = roadtrip
        this.onAfterDataLoad()
        resolve()
      })
    })
  }

  onAfterDataLoad(): void {
    this.defineStopCards()
  }

  onMarkerSelect(stop: RoadtripStop): void {
    // do nothing right now
  }

  onDeleteStop(stopToDelete: RoadtripStop): void {
    this.deleteStop(stopToDelete)
  }

  deleteStop(stop: RoadtripStop): void {
    // this.roadtrip.removeStop(stop).then(() => {
    //   this.roadtripMap.manager.removeCoordinate(stop.location.coordinates.toLatLngLiteral())
    // })
    stop.removeFromAPI().then(stopRemoved => {
      if(this.roadtrip.removeStop(stopRemoved)){
        console.log(1)
        this.roadtrip.update().then(updatedRoadtrip => {
          console.log(2)
          this.roadtripMap.manager.removeCoordinate(stop.location.coordinates.toLatLngLiteral())
        }, err => {
          // rollback
          stopRemoved.location.upload(this.api).then(rolledBackLocation => {
            stopRemoved.location = rolledBackLocation
            stopRemoved.upload().then(rolledBackStop => {
              this.roadtrip.addStopOnly(rolledBackStop)
              this.roadtrip.update().then(rolledBackRoadtrip => {
                // done
              }, err => {
                console.log("error removing stop : ", err, "Contact admin")
              })
            }, err => {
              console.log("error removing stop : ", err, "Contact admin")
            })
          })
        })
      }
      else{
        // rollback
        stopRemoved.upload().then(rolledBackStop => {
          // done
        }, err => {
          console.log("error removing stop : ", err, "Contact admin")
        })
      }
    }, err => {console.log("error removing stop : ", err)})
  } 

  stopDelete(stop: RoadtripStop): Promise<boolean> {
    return new Promise(resolve => {
       this.api.deleteRoadtripStop(stop.id).then(() => {
          if(this.roadtrip.removeStop(stop)){
            this.roadtrip.update().then(updatedRoadtrip => {
              this.userService.isLocationBeingReferenced(stop.location).then(locationStillBeingReferenced => {
                if(locationStillBeingReferenced){
                  resolve(true)
                }
                else{
                  this.api.deleteLocation(stop.location.id).then(() => {
                    resolve(true)
                  }, err => {
                    console.log("couldn't rollback operation : Delete roadtrip stop - remove location from api. Reason : couldn't add location back to api")
                    this.deleteStop_removeLocationFromAPI_ROLLBACK(stop).then(rolledBack => {
                      resolve(false)
                    })
                  })
                }
              })
            }, err => {
              console.log("couldn't update roadtrip")
              this.deleteStop_removeStopFromAPI_ROLLBACK(stop).then(stopAddedBackToAPI => {
                this.deleteStop_removeStopFromRoadtrip_ROLLBACK(stopAddedBackToAPI).then(stopAddedBackToRoadtrip => {
                  console.log("rolled back")
                }, err => {
                  console.log("couldn't rollback operation : Delete roadtrip stop - update roadtrip. Reason : Couldn't add stop back to roadtrip")
                })
              }, err => {
                console.log("couldn't rollback operation : Delete roadtrip stop - update roadtrip. Reason : Couldn't add stop back to api")
              })
              resolve(false)
            })
          }
          else{
            console.log("couldn't remove stop from roadtrip")
            this.deleteStop_removeStopFromAPI_ROLLBACK(stop)
            resolve(false)
          }
       }, err => {
         console.log("Couldn't remove stop from api")
         resolve(false)
       })
    })
  }

  deleteStop_removeStopFromAPI_ROLLBACK(stopToRollback: RoadtripStop): Promise<RoadtripStop> {
    return new Promise((resolve, reject) => {
      this.api.addRoadtripStop(stopToRollback.toDTO()).then(rolledBackStop => {
        console.log("rolled back")
        resolve(rolledBackStop)
      }, err => {
        console.log("Couldn't roll back stop deletion")
        // TODO : manual removal of stop references in roadtrip (Gen report)
        reject(err)
      })
    })
  }

  deleteStop_removeStopFromRoadtrip_ROLLBACK(stopToRollback: RoadtripStop): Promise<RoadtripStop> {
    return new Promise((resolve, reject) => {
      this.roadtrip.addStopOnly(stopToRollback)
      resolve(stopToRollback)
    })
  }

  deleteStop_removeLocationFromAPI_ROLLBACK(stop: RoadtripStop): Promise<boolean> {
    return new Promise(resolve => {
      this.deleteStop_removeStopFromAPI_ROLLBACK(stop).then(stopAddedBackToAPI => {
        this.deleteStop_removeStopFromRoadtrip_ROLLBACK(stopAddedBackToAPI).then(stopAddedBackToRoadtrip => {
          console.log("rolled back")
          resolve(true)
        }, err => {
          console.log("couldn't rollback operation : Delete roadtrip stop - update roadtrip. Reason : Couldn't add stop back to roadtrip")
          resolve(false)
        })
      }, err => {
        console.log("couldn't rollback operation : Delete roadtrip stop - update roadtrip. Reason : Couldn't add stop back to api")
        resolve(false)
      })
    })
  }

  onDetailsToolBtnClick(selectedStop: RoadtripStop): void {
    let cardToScrollTo = this.stopCards.find(card => card.stop == selectedStop)
    if(cardToScrollTo){
      let pxFromTop = cardToScrollTo.element.getBoundingClientRect().top
      setTimeout(() => {
        window.scrollTo(0, pxFromTop)
      }, 800)
      cardToScrollTo.showDetails()
    }
  }

  getRoadtripRootComments(): Comment[] {
    let rootComments = this.roadtrip.comments.filter(comment => comment.parentCommentId == null)
    return this.commentSort.sortByDatePosted(rootComments)
  }

  onRootCommentBtnClick(): void {
    this.addRootReply()
  }

  addRootReply(): void {
    this.addingRootReply = true
  }

  closeRootReply(): void {
    this.addingRootReply = false
  }

  onCommentAdded(newComment: Comment): void {
    if(newComment.isRoot()){
      let addedToRoadtrip = this.roadtrip.addCommentWithoutUpload(newComment)
      if(addedToRoadtrip) {
        // done
        this.roadtrip.update()
      }
      else{
        // rollback
        newComment.deleteFromAPI()
      }
    }
  }
}
