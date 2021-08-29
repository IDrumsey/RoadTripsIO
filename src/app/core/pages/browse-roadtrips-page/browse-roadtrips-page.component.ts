import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavURLPiece } from '../../components/data/models/nav-urlpiece';
import { RoadtripDTO } from '../../data/DTO/roadtrip-dto';
import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { Roadtrip } from '../../data/Roadtrip/roadtrip';
import { AsyncService } from '../../services/async.service';
import { DataAccessService } from '../../services/data/data-access.service';

@Component({
  selector: 'app-browse-roadtrips-page',
  templateUrl: './browse-roadtrips-page.component.html',
  styleUrls: ['./browse-roadtrips-page.component.css']
})
export class BrowseRoadtripsPageComponent implements OnInit {
  constructor(private api: DataAccessService, private asyncService: AsyncService, private router: Router) {
    this.loadData()
  }

  ngOnInit(): void {
  }

  // ----------------------------------- DATA -----------------------------------
  dataLoaded: boolean = false
  roadtrips: Roadtrip[] = []

  navPieces = [new NavURLPiece(this.router, "home", "")]

  // ----------------------------------- STYLES -----------------------------------
  titleStyles = {
    fontFamily: AppFonts.Handwriting,
    color: AppColors.onColorLight
  }

  // ----------------------------------- FUNCTIONALITY -----------------------------------
  loadData(): void {
    this.loadRoadtrips().then(() => {
      this.dataLoaded = true
    })
  }

  loadRoadtrips(): Promise<void> {
    return new Promise(resolve => {
      this.api.getAllRoadtrips().then(dtoData => {
        this.asyncService.runMultiplePromises([... dtoData.map(dtoWithoutFunctionality => {
          return new Promise(resolve => {
            let dtoWithFunctionality = new RoadtripDTO(this.api, this.asyncService)
            dtoWithFunctionality.initFromRawData(dtoWithoutFunctionality)
            dtoWithFunctionality.toRoadtrip().then(roadtrip => {
              this.roadtrips.push(roadtrip)
              resolve(null)
            })
          })
        })]).then(() => {
          resolve()
        })
      })
    })
  }
}
