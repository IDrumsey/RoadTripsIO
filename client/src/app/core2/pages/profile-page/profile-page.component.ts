import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Roadtrip } from '../../data/models/roadtrip/roadtrip';
import { User } from '../../data/models/user/user';
import { DataAccessService } from '../../data/services/data-access.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private api: DataAccessService, private url: ActivatedRoute, private nav: NavService) { }

  ngOnInit(): void {
    this.loadData().then(() => {
      this.dataLoaded = true
      this.runAfterData()
      console.log(this.userRoadtrips)
    })
  }

  // -------------------------------------- DATA --------------------------------------

  user: User

  userRoadtrips: Roadtrip[] = []

  photos: string[] = []

  // -------------------------------------- STATE --------------------------------------

  dataLoaded = false

  // -------------------------------------- EVENTS --------------------------------------

  // -------------------------------------- EVENT HANDLERS --------------------------------------

  onRoadtripCardProfileImageClick(user: User): void {
    this.nav.routeToUserPage(user)
  }

  // -------------------------------------- FUNCTIONALITY --------------------------------------

  loadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.url.paramMap.subscribe(params => {
        // get roadtrip id
        let userIdString = params.get("userId");
        let userId = userIdString ? parseInt(userIdString) : null

        if(userId){
          this.api.getUser(userId).then(userFound => {
            this.user = userFound
            this.api.getUserRoadtrips(this.user).then(userRoadtrips => {
              this.userRoadtrips = userRoadtrips
              resolve()
            }, err => reject(err))
          }, err => {
            console.log(err)
            if(err.status == 404){
              this.nav.routeToNotFoundPage()
            }
          })
        }
      })
    })
  }

  runAfterData(): void {
    this.initPhotos()
  }

  initPhotos(): void {
    this.userRoadtrips.forEach(rt => {
      this.photos.push(...rt.getPhotos())
    })
  }

  // -------------------------------------- STYLES --------------------------------------
}
