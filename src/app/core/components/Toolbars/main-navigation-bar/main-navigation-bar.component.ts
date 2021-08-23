import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faRoute, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit {
  // events
  @Output() openLogin = new EventEmitter()

  toggleIcon = faBars;
  otherIcons = [faUser, faRoute, faSignInAlt]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToUserPage(userId: number): void {
    this.router.navigate(['users', userId])
  }

  routeToBrowseRoadtripsPage(): void {
    this.router.navigate([''])
  }

  onSignInBtnClick(): void {
    this.openLogin.emit()
  }
}
