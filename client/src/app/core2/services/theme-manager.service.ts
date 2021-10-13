import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppColorThemes } from '../themes/app-color-themes';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

  constructor() { }

  // -------------------------------------- STATE --------------------------------------
  isDarkMode = true
  currentColor: string = AppColorThemes.Green

  // -------------------------------------- DATA --------------------------------------
  private _SETTINGS_COLOR_KEY = "theme-color"
  private _SETTINGS_MODE_KEY = "theme-mode"

  prevClassname: string = this.genThemeClassname()

  // -------------------------------------- EVENTS --------------------------------------
  modeChanged = new Subject<boolean>()

  // -------------------------------------- FUNCTIONALITY --------------------------------------
  init(): void {
    let settings = this.fetchSettings()
    if(settings.color){
      this.currentColor = settings.color
    }
    if(settings.isDarkMode != null){
      this.isDarkMode = settings.isDarkMode
    }

    this.applySettings()
  }

  cacheSettings(): void {
    localStorage.setItem(this._SETTINGS_COLOR_KEY, this.currentColor)
    localStorage.setItem(this._SETTINGS_MODE_KEY, this.isDarkMode ? "dark" : "light")
  }

  private fetchSettings(): {color: string | null, isDarkMode: boolean | null} {
    let color = localStorage.getItem(this._SETTINGS_COLOR_KEY)
    let mode = localStorage.getItem(this._SETTINGS_MODE_KEY)

    return {
      color: color,
      isDarkMode: mode == "dark"
    }
  }

  private getDomHook() {
    return document.querySelector('body')
  }

  applySettings() {
    let rootElement = this.getDomHook()

    if(rootElement){
      // html tag is defined, don't know why it wouldn't be but eh whatever
      rootElement.classList.remove(this.prevClassname)
      rootElement.classList.add(this.genThemeClassname())

      let topSection = document.getElementById('top');

      if(this.isDarkMode){
        rootElement.classList.remove('light-mode')
        rootElement.classList.add('dark-mode')
        topSection?.classList.remove('top-light-mode')
        topSection?.classList.add('top-dark-mode')
      }
      else{
        rootElement.classList.remove('dark-mode')
        rootElement.classList.add('light-mode')
        topSection?.classList.remove('top-dark-mode')
        topSection?.classList.add('top-light-mode')
      }

      this.prevClassname = this.genThemeClassname()
    }

    this.cacheSettings()
  }

  private genThemeClassname(): string {
    return `${this.currentColor}-${this.isDarkMode ? 'dark' : 'light'}-theme`
  }

  changeMode(darkMode: boolean): void {
    this.isDarkMode = darkMode
    this.applySettings()
    this.modeChanged.next(darkMode)
  }
}
