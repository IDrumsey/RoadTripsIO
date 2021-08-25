import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { InteractiveMapComponent } from '../../components/Maps/interactive-map/interactive-map.component';
import { RoadtripLocationCardComponent } from '../../components/roadtrip-locations/roadtrip-location-card/roadtrip-location-card.component';

import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { Roadtrip } from '../../data/Roadtrip/roadtrip';
import { RoadtripStop } from '../../data/Roadtrip/roadtrip-stop';
import { AuthenticationService } from '../../services/authentication.service';
import { DataAccessService } from '../../services/data/data-access.service';

@Component({
  selector: 'app-roadtrip-page',
  templateUrl: './roadtrip-page.component.html',
  styleUrls: ['./roadtrip-page.component.css']
})
export class RoadtripPageComponent implements OnInit, AfterViewInit {
  constructor(private api: DataAccessService, private auth: AuthenticationService, private route: ActivatedRoute) {
    this.initPage()
  }

  @ViewChild("RoadtripMap") roadtripMap: InteractiveMapComponent

  @ViewChildren(RoadtripLocationCardComponent) private stopCardElements: QueryList<RoadtripLocationCardComponent> = new QueryList()
  stopCards: RoadtripLocationCardComponent[]

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.defineStopCards()

    this.stopCardElements.changes.subscribe(() => {
      this.defineStopCards()
    })
  }

  defineStopCards(): void {
    this.stopCards = this.stopCardElements.toArray()
  }
  
  // ----------------------------------------------- DATA -----------------------------------------------
  roadtrip: Roadtrip

  title = "Some Cool Roadtrip!"
  owner = {
    id: 1,
    username: "someUser1"
  }
  description = "This is the description of the roadtrip. It was a good roadtrip and I would recommend it."

  // ----------------------------------------------- STATE -----------------------------------------------
  dataLoaded: boolean = false

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
    return this.roadtrip.owner.id == this.auth.currentlyLoggedInUserId
  }

  initPage(): void {
    // get the roadtrip id
    this.route.paramMap.subscribe(params => {
      let roadtripIdString = params.get("roadtripId")
      if(roadtripIdString){
        let roadtripId = parseInt(roadtripIdString)
        this.loadData(roadtripId).then(() => {
          this.dataLoaded = true
          console.log("done loading data")
        })
      }
    })
  }

  loadData(roadtripId: number): Promise<void> {
    return new Promise((resolve) => {
      this.api.getRoadtripById(roadtripId).then(roadtripDTO => {
        roadtripDTO.toRoadtrip().then(roadtrip => {
          this.roadtrip = roadtrip
          resolve()
        })
      })
    })
  }

  onMarkerSelect(stop: RoadtripStop): void {
    // do nothing right now
  }

  onDeleteStop(stopToDelete: RoadtripStop): void {
    this.deleteStop(stopToDelete)
  }

  deleteStop(stop: RoadtripStop): void {
    this.roadtrip.removeStop(stop).then(() => {
      this.roadtripMap.manager.removeCoordinate(stop.location.coordinates.toLatLngLiteral())
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
}
