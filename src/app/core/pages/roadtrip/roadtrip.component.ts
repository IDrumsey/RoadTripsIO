import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { RoadtripLocationCardComponent } from '../../components/roadtrip-locations/roadtrip-location-card/roadtrip-location-card.component';

import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { Roadtrip } from '../../data/Roadtrip/roadtrip';
import { RoadtripStop } from '../../data/Roadtrip/roadtrip-stop';
import { AuthenticationService } from '../../services/authentication.service';
import { DataAccessService } from '../../services/data/data-access.service';

@Component({
  selector: 'app-roadtrip',
  templateUrl: './roadtrip.component.html',
  styleUrls: ['./roadtrip.component.css']
})
export class RoadtripComponent implements OnInit, AfterViewInit {
  constructor(private api: DataAccessService, private auth: AuthenticationService, private route: ActivatedRoute) {
    this.initPage()
  }

  @ViewChildren(RoadtripLocationCardComponent) private stopCardElements: QueryList<RoadtripLocationCardComponent> = new QueryList()
  stopCards: RoadtripLocationCardComponent[]

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.defineStopCards()

    this.stopCardElements.changes.subscribe(() => {
      this.defineStopCards()
      console.log(this.stopCards)
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

  addRoadtripLocation(location: any): void {
    console.log("adding location to page : ", location)
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

  onStopSelect(stop: RoadtripStop): void {
    console.log("selecting stop : ", stop)
    let stopCard = this.stopCards.find(card => card.stop == stop)
    let pxFromTop = stopCard?.element.getBoundingClientRect().top
    setTimeout(() => {
      window.scrollTo(0, pxFromTop)
    }, 800)
    stopCard?.showDetails()
  }
}
