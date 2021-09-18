import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faRoute, faSignInAlt, faSignOutAlt, faUser, faFlask } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-main-navigation-bar',
  templateUrl: './main-navigation-bar.component.html',
  styleUrls: ['./main-navigation-bar.component.css']
})
export class MainNavigationBarComponent implements OnInit {
  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  // events
  @Output() openLogin = new EventEmitter()

  toggleIcon = faBars;
  otherIcons = [faUser, faRoute, faSignInAlt, faSignOutAlt, faFlask]

  routeToUserPage(): void {
    if(this.auth.currentlyLoggedInUser){
      this.router.navigate(['users', this.auth.currentlyLoggedInUser.id])
    }
    else{
      alert("You must be signed in to do this")
      // maybe show the login component here
    }
  }

  routeToBrowseRoadtripsPage(): void {
    this.router.navigate([''])
  }

  onSignInBtnClick(): void {
    this.openLogin.emit()
  }

  isUserSignedIn(): boolean {
    return this.auth.currentlyLoggedInUser != null
  }

  onSignOutBtnClick(): void {
    this.auth.signOut()
  }

  routeToExperimentPage(): void {
    this.router.navigate(['test'])
  }
}
