import { Component } from '@angular/core';
import { AppColors } from './core/data/models/app-colors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoadTripsIOClient';

  textColor = AppColors.onColorLight
}
