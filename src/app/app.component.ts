import { Component } from '@angular/core';

import {faBars, faUser, faRoute, faSignInAlt, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import { ComponentOrientations } from './core/components/models/component-orientations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RoadTripsIOClient';

  icons: IconDefinition[] = [
    faUser,
    faRoute,
    faSignInAlt,
    faBars
  ]

  vertical = ComponentOrientations.Vertical;
  horizontal = ComponentOrientations.Horizontal;
}
