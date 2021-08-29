import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAddressCard, faCameraRetro, faMapPin, faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { Roadtrip } from '../../data/Roadtrip/roadtrip';
import { User } from '../../data/user';
import { AsyncService } from '../../services/async.service';
import { DataAccessService } from '../../services/data/data-access.service';
import { Location } from '../../data/location';
import { AuthenticationService } from '../../services/authentication.service';
import { RoadtripDTO } from '../../data/DTO/roadtrip-dto';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: DataAccessService, private asyncService: AsyncService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.initPage()
  }

  // data
  user: User
  createdRoadtrips: Roadtrip[] = []
  collabRoadtrips: Roadtrip[] = []
  locationsToVisit: Location[] = []

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
      let userId = params.get("userId")
      if(userId != null){
        // load data
        this.loadData(parseInt(userId)).then(() => {
          console.log("done loading data")
          this.dataLoaded = true
        })
      }
    })
  }
  
  async loadData(userId: number): Promise<void> {
    return new Promise(resolve => {
      this.api.getUserById(userId).then(user => {
        this.user = user
        this.asyncService.runMultiplePromises([
          // get the roadtrip data
          user.getCreatedRoadtrips().then(roadtrips => {
            this.createdRoadtrips = roadtrips
          }),
          user.getCollabRoadtrips().then(roadtrips => [
            this.collabRoadtrips = roadtrips
          ]),
          this.user.getLocationsToVisit().then(locations => {
            this.locationsToVisit = locations
          })
        ]).then(() => {
          resolve()
        })
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

    this.collabRoadtrips.forEach(rt => {
      rt.stops.map(stop => stop.location).forEach(location => pictures.push(...location.photos))
    })

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
    this.api.addRoadtrip(newRoadtrip).then(rawDTO => {
      let dto = new RoadtripDTO(this.api, this.asyncService)
      dto.initFromRawData(rawDTO)
      dto.toRoadtrip().then(roadtrip => {
        this.router.navigate(['/roadtrips', roadtrip.id])
      })
    })
  }
}
