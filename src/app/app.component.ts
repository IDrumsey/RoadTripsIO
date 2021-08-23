import { Component } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from './core/data/models/app-colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // data
  title = 'RoadTripsIOClient';

  // state
  showingLoginForm = false;

  // styles
  textColor = AppColors.onColorLight

  openLoginForm(): void {
    this.showingLoginForm = true
  }

  closeLoginForm(): void {
    this.showingLoginForm = false
  }

  icon=faMapMarkerAlt
}
