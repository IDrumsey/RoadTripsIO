import { Component } from '@angular/core';

import {faBars, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoadTripsIOClient';

  navToggleIcon = faBars;
  userIcon = faUser;
}
