// Native
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Third Party
import { GoogleMapsModule } from '@angular/google-maps';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

// Local
import { AppComponent } from './app.component';
import { IconButtonComponent } from './core/components/Buttons/icon-button/icon-button.component';
import { CircularIconButtonComponent } from './core/components/Buttons/Icon/CircularIconButton/circular-icon-button/circular-icon-button.component';
import { SquareIconButtonComponent } from './core/components/Buttons/Icon/SquareIconButton/square-icon-button/square-icon-button.component';
import { ToolbarComponent } from './core/components/Toolbars/toolbar/toolbar.component';
import { ExpandableToolbarComponent } from './core/components/Toolbars/expandable-toolbar/expandable-toolbar.component';
import { ButtonComponent } from './core/components/Buttons/button/button.component';
import { MainNavigationBarComponent } from './core/components/Toolbars/main-navigation-bar/main-navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    CircularIconButtonComponent,
    SquareIconButtonComponent,
    ToolbarComponent,
    ExpandableToolbarComponent,
    ButtonComponent,
    MainNavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
