import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAddressCard, faCameraRetro, faMapPin, faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { Roadtrip } from '../../data2/models/client/roadtrip';
import { User } from '../../data2/models/client/user';
import { AsyncService } from '../../services/async.service';
import { Location } from '../../data2/models/client/location';
import { AuthenticationService } from '../../services/authentication.service';
import { RoadtripDTO } from '../../data2/models/dto/roadtrip-dto';
import { NavURLPiece } from '../../components/data/models/nav-urlpiece';
import { AbstractDataAccessService } from '../../services/data/abstract-data-access.service';
import { DataAccess2Service } from '../../services/data/data-access-2.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: DataAccess2Service, private api2: AbstractDataAccessService, private asyncService: AsyncService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.initPage()
  }

  // data
  user: User
  createdRoadtrips: Roadtrip[] = []
  collabRoadtrips: Roadtrip[] = []
  locationsToVisit: Location[] = []

  navPieces: NavURLPiece[]

  // state
  dataLoaded = false
  addingNewRoadtrip = false
  
  isOwner(): boolean {
    return this.auth.currentlyLoggedInUserId == this.user.id
  }

  // styles
  textColor = AppColors.onColorLight
  addBtnIcon = faPlus
  personalInfoIcon = faAddressCard
  mapPinIcon = faMapPin
  cameraIcon = faCameraRetro

  iconSize = "30px"

  usernameStyles = {
    fontFamily: AppFonts.Handwriting,
    fontSize: "50px",
    textAlign: "center"
  }

  sectionTitleStyles = {
    fontFamily: AppFonts.Handwriting
  }

  sectionTopIconStyles = {
    fontSize: this.iconSize,
    margin: "25px"
  }

  getWrapperStyles(): {} {
    return {
      color: this.textColor
    }
  }

  // -------------------------------------- PRIVATE FUNCTIONALITY --------------------------------------
  initPage(): void {
    // get user id from url
    this.route.paramMap.subscribe(params => {
      let userIdString = params.get("userId")
      if(userIdString != null){
        let userId = parseInt(userIdString)

        // load data
        this.loadData(userId).then(() => {
          console.log("done loading data")

          // setup nav url pieces
          this.navPieces = [new NavURLPiece(this.router, "home", ""), new NavURLPiece(this.router, "users"), new NavURLPiece(this.router, this.user.username, "/users/" + this.user.id)]

          this.dataLoaded = true
        })
      }
    })
  }
  
  async loadData(userId: number): Promise<void> {
    return new Promise(resolve => {
      this.api2.getUserById(userId).then(user => {
        this.user = user
        user.fetchCreatedRoadtrips().then(createdRoadtrips => {
          this.createdRoadtrips = createdRoadtrips
          console.log(this.createdRoadtrips)
        })
        resolve()
      })
    })
  }

  getPlacesVisited(): Location[] {
    let locations: Location[] = []
    // search in created roadtrips
    this.createdRoadtrips.forEach(roadtrip => {
      locations.push(...roadtrip.stops.map(stop => stop.location))
    })
    
    return locations
  }

  /**
   * Gets all the photos related to this user
   * 1. Roadtrip location pictures
   * 2. Locations to visit pictures
   * 3. Locations visited pictures
   */
  getPhotos(): string[] {
    let pictures: string[] = []
    // get roadtrip pictures
    this.createdRoadtrips.forEach(rt => {
      rt.stops.map(stop => stop.location).forEach(location => pictures.push(...location.photos))
    })

    // I don't think collab roadtrip pictures should be featured on a user's page until functionality is made for linking photos directly with a user
    // this.collabRoadtrips.forEach(rt => {
    //   rt.stops.map(stop => stop.location).forEach(location => pictures.push(...location.photos))
    // })

    this.locationsToVisit.forEach(location => pictures.push(...location.photos))

    return pictures
  }

  onAddRoadtripBtnClick(): void {
    this.addingNewRoadtrip = true
  }

  onNewRoadtripCancel(): void {
    this.addingNewRoadtrip = false
  }

  onNewRoadtripSubmit(newRoadtrip: RoadtripDTO): void {
    console.log("uploading new roadtrip data : ", newRoadtrip)
    // TODO
    // this.api.addRoadtrip(newRoadtrip).then(rawDTO => {
    //   let dto = new RoadtripDTO(this.api, this.asyncService)
    //   dto.initFromRawData(rawDTO)
    //   dto.toRoadtrip().then(roadtrip => {
    //     this.router.navigate(['/roadtrips', roadtrip.id])
    //   })
    // })
  }
}
