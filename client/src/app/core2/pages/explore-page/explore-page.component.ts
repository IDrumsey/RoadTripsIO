import { Component, OnInit } from '@angular/core';
import { faInfo, faRoute } from '@fortawesome/free-solid-svg-icons';
import { AsyncService } from 'src/app/core/services/async.service';
import { RoadtripSummaryCardComponent } from '../../components/roadtrip-summary-card/roadtrip-summary-card.component';
import { Roadtrip } from '../../data/models/roadtrip/roadtrip';
import { User } from '../../data/models/user/user';
import { DataAccessService } from '../../data/services/data-access.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {

  constructor(private api: DataAccessService, private nav: NavService, private asyncService: AsyncService) { }

  ngOnInit(): void {
    this.loadData().then(() => {
      this.onDataLoaded()
    })
  }

  // ------------------------------------ DATA ------------------------------------
  roadtrips: Roadtrip[]
  users: User[]

  // ------------------------------------ STATE ------------------------------------
  dataLoaded = false

  // ------------------------------------ EVENTS ------------------------------------

  // ------------------------------------ EVENT HANDLERS ------------------------------------

  onDataLoaded(): void {
    this.dataLoaded = true
  }

  onRoadtripCardInfoBtnClick(card: RoadtripSummaryCardComponent): void {
    card.toggleDetails()
  }

  onRoadtripCardRouteBtnClick(card: RoadtripSummaryCardComponent): void {
    this.nav.routeToRoadtripPage(card.roadtrip)
  }

  onMatchingUserCardClick(user: User): void {
    this.nav.routeToUserPage(user)
  }

  // ------------------------------------ FUNCTIONALITY ------------------------------------

  loadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      let loaders: Promise<any>[] = []
      loaders.push(this.api.getAllRoadtrips().then(allRoadtrips => {
        this.roadtrips = allRoadtrips
      }))
      loaders.push(this.api.getAllUsers().then(allUsers => {
        this.users = allUsers
      }))

      // run loaders asynchronously
      this.asyncService.runMultiplePromises(loaders).then(() => {
        resolve()
      })
    })
  }

  // ------------------------------------ STYLES ------------------------------------
  roadtripIcon = faRoute
  infoIcon = faInfo
}
