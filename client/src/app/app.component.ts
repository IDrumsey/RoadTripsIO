import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { faArrowCircleUp, faMoon, faSun, faUmbrella, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from './core/data/models/app-colors';
import { AuthenticationService } from './core/services/authentication.service';
import { DataAccessService } from './core2/data/services/data-access.service';
import { ThemeManagerService } from './core2/services/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthenticationService, private themeManager: ThemeManagerService, private data: DataAccessService){}

  ngOnInit(): void {
    this.auth.attemptSignIn()
    this.themeManager.init()

    // tests
    this.data.getRoadtrip(1).then(data => {
      console.log(data)
    })
  }

  // ----------------------------------- DATA -----------------------------------
  title = 'RoadTripsIOClient';

  toTopBtnIcon = faArrowCircleUp

  // ----------------------------------- STATE -----------------------------------
  showingLoginForm = false;

  modeIcon(): IconDefinition {
    return this.themeManager.isDarkMode ? faMoon : faSun
  }

  isDarkMode(): boolean {
    return this.themeManager.isDarkMode
  }

  // ----------------------------------- EVENT HANDLERS -----------------------------------
  onThemeModeToggle(change: MatSlideToggleChange): void {
    if(change.checked){
      // changed to dark mode
      this.themeManager.changeMode(true)
    }
    else{
      // changed to light mode
      this.themeManager.changeMode(false)
    }
  }

  // ----------------------------------- STYLES -----------------------------------
  textColor = AppColors.onColorLight

  // ----------------------------------- FUNCTIONALITY -----------------------------------

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
