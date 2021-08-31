import { Component, OnInit } from '@angular/core';
import { faArrowCircleUp, faUmbrella } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from './core/data/models/app-colors';
import { AbstractDataAccessService } from './core/services/data/abstract-data-access.service';
import { DataAccess2Service } from './core/services/data/data-access-2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private api2: AbstractDataAccessService){}

  ngOnInit(): void {
    this.api2.getUserById(1).then(user => {
      console.log(user)
    })
  }

  // data
  title = 'RoadTripsIOClient';

  toTopBtnIcon = faArrowCircleUp

  // state
  showingLoginForm = false;

  testIcon = faUmbrella

  // styles
  textColor = AppColors.onColorLight

  toTopBtnColor = AppColors.onColor
  toTopBtnHoverColor = AppColors.onContrastBlue

  openLoginForm(): void {
    this.showingLoginForm = true
  }

  closeLoginForm(): void {
    this.showingLoginForm = false
  }

  scrollToTop(): void {
    window.scrollTo(0, 0)
  }
}
