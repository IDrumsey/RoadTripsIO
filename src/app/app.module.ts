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

@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    CircularIconButtonComponent,
    SquareIconButtonComponent
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
