import { Component } from '@angular/core';
import { faArrowCircleUp, faUmbrella } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from './core/data/models/app-colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
