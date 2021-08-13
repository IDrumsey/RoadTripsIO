import { Component } from '@angular/core';

import {faBars, faUser, faRoute, faSignInAlt, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoadTripsIOClient';

  mainNavToggleBtn = faBars;
  mainNavBarBtnIcons: IconDefinition[] = [
    faUser,
    faRoute,
    faSignInAlt,
  ]
}
