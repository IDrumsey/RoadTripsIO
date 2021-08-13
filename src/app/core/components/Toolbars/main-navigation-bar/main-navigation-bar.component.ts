import { Component, OnInit } from '@angular/core';
import { faBars, faRoute, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit {

  toggleIcon = faBars;
  otherIcons = [faUser, faRoute, faSignInAlt]

  constructor() { }

  ngOnInit(): void {
  }

}
