import { Component, OnInit } from '@angular/core';
import { faInfo, faRoute } from '@fortawesome/free-solid-svg-icons';
import { RoadtripSummaryCardComponent } from '../../components/roadtrip-summary-card/roadtrip-summary-card.component';
import { Roadtrip } from '../../data/models/roadtrip/roadtrip';
import { DataAccessService } from '../../data/services/data-access.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.scss']
})
export class ExplorePageComponent implements OnInit {

  constructor(private api: DataAccessService, private nav: NavService) { }

  ngOnInit(): void {
    this.loadData().then(() => {
      this.onDataLoaded()
    })
  }

  // ------------------------------------ DATA ------------------------------------
  roadtrips: Roadtrip[]

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

  // ------------------------------------ FUNCTIONALITY ------------------------------------

  loadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.api.getAllRoadtrips().then(allRoadtrips => {
        this.roadtrips = allRoadtrips
        resolve()
      })
    })
  }

  // ------------------------------------ STYLES ------------------------------------
  roadtripIcon = faRoute
  infoIcon = faInfo
}
