// Native
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'


// Third Party
import { GoogleMapsModule } from '@angular/google-maps';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import {ProgressBarModule} from 'ui-loaders'

// Local
import { AppComponent } from './app.component';
import { IconButtonComponent } from './core/components/Buttons/icon-button/icon-button.component';
import { CircularIconButtonComponent } from './core/components/Buttons/Icon/CircularIconButton/circular-icon-button/circular-icon-button.component';
import { SquareIconButtonComponent } from './core/components/Buttons/Icon/SquareIconButton/square-icon-button/square-icon-button.component';
import { ToolbarComponent } from './core/components/Toolbars/toolbar/toolbar.component';
import { ExpandableToolbarComponent } from './core/components/Toolbars/expandable-toolbar/expandable-toolbar.component';
import { ButtonComponent } from './core/components/Buttons/button/button.component';
import { MainNavigationBarComponent } from './core/components/Toolbars/main-navigation-bar/main-navigation-bar.component';
import { SelectToolbarComponent } from './core/components/Toolbars/select-toolbar/select-toolbar.component';
import { SingleSelectToolbarComponent } from './core/components/Toolbars/single-select-toolbar/single-select-toolbar.component';
import { EditableTextComponent } from './core/components/Text/editable-text/editable-text.component';
import { TextInputComponent } from './core/components/Text/text-input/text-input.component';
import { RoadtripPageComponent } from './core/pages/roadtrip/roadtrip-page.component';
import { RoadtripLocationCardComponent } from './core/components/roadtrip-locations/roadtrip-location-card/roadtrip-location-card.component';
import { RoadtripLocationCardHeadComponent } from './core/components/roadtrip-locations/roadtrip-location-card-head/roadtrip-location-card-head.component';
import { RoadtripLocationCardDetailsComponent } from './core/components/roadtrip-locations/roadtrip-location-card-details/roadtrip-location-card-details.component';
import { RoadtripLocationCardEditFormComponent } from './core/components/roadtrip-locations/roadtrip-location-card-edit-form/roadtrip-location-card-edit-form.component';
import { RectangleButtonComponent } from './core/components/Buttons/rectangle-button/rectangle-button.component';
import { ImageComponent } from './core/components/Images/image/image.component';
import { ImageTemplateComponent } from './core/components/Images/image-template/image-template.component';
import { ImageGalleryComponent } from './core/components/Images/image-gallery/image-gallery.component';
import { GeneralImageComponent } from './core/components/Images/general-image/general-image.component';
import { ImagesFormComponent } from './core/components/Images/images-form/images-form.component';
import { CommentComponent } from './core/components/Comments/comment/comment.component';
import { CommentHeadComponent } from './core/components/Comments/comment-head/comment-head.component';
import { CommentBodyComponent } from './core/components/Comments/comment-body/comment-body.component';
import { ReplyComponent } from './core/components/Comments/reply/reply.component';
import { UserPageComponent } from './core/pages/user-page/user-page.component';
import { UserProfileImageComponent } from './core/components/Users/user-profile-image/user-profile-image.component';
import { RoadtripCardComponent } from './core/components/Roadtrips/roadtrip-card/roadtrip-card.component';
import { LocationCardComponent } from './core/components/Locations/location-card/location-card.component';
import { PersonalInfoCardComponent } from './core/components/Users/personal-info-card/personal-info-card.component';
import { BrowseRoadtripsPageComponent } from './core/pages/browse-roadtrips-page/browse-roadtrips-page.component';
import { SelectedCoordinatesComponent } from './core/components/Maps/selected-coordinates/selected-coordinates.component';
import { SelectedCoordinateCardComponent } from './core/components/Maps/selected-coordinate-card/selected-coordinate-card.component';
import { MapRadiusFormComponent } from './core/components/Maps/map-radius-form/map-radius-form.component';
import { LoginFormComponent } from './core/components/Users/login-form/login-form.component';
import { InteractiveMapComponent } from './core/components/Maps/interactive-map/interactive-map.component';
import { MapUiComponent } from './core/components/Maps/map-ui/map-ui.component';
import { ToolbarGroupComponent } from './core/components/Toolbars/toolbar-group/toolbar-group.component';
import { MapToolbarComponent } from './core/components/Maps/map-toolbar/map-toolbar.component';
import { ShapeIconButtonComponent } from './core/components/Buttons/shape-icon-button/shape-icon-button.component';
import { NewLocationFormComponent } from './core/components/Locations/new-location-form/new-location-form.component';
import { ConfirmationPopupComponent } from './core/components/confirmation-popup/confirmation-popup.component';
import { NewRoadtripFormComponent } from './core/components/Roadtrips/new-roadtrip-form/new-roadtrip-form.component';
import { SelectUsersFormComponent } from './core/components/Users/select-users-form/select-users-form.component';
import { NavURLComponent } from './core/components/nav-url/nav-url.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentGroupComponent } from './core/components/Comments/comment-group/comment-group.component';
import { IMapUIComponent } from './core/components/Maps/i-map-ui/i-map-ui.component';
import { TesterPageComponent } from './core/pages/tester-page/tester-page.component';
import { IMapComponent } from './core/components/Maps/i-map/i-map.component';
import { IconButtonV2Component } from './core/components/icon-button-v2/icon-button-v2.component';
import { IndividualRoadtripPageComponent } from './core2/pages/individual-roadtrip-page/individual-roadtrip-page.component';
import { NotificationComponent } from './core2/components/notifications/notification/notification.component';

const routes: Routes = [
  {path: 'roadtrips/:roadtripId', component: RoadtripPageComponent},
  {path: 'users/:userId', component: UserPageComponent},
  {path: '', component: BrowseRoadtripsPageComponent},
  {path: 'test', component: TesterPageComponent},
  {path: 'rt', component: IndividualRoadtripPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    IconButtonComponent,
    CircularIconButtonComponent,
    SquareIconButtonComponent,
    ToolbarComponent,
    ExpandableToolbarComponent,
    ButtonComponent,
    MainNavigationBarComponent,
    SelectToolbarComponent,
    SingleSelectToolbarComponent,
    EditableTextComponent,
    TextInputComponent,
    RoadtripPageComponent,
    RoadtripLocationCardComponent,
    RoadtripLocationCardHeadComponent,
    RoadtripLocationCardDetailsComponent,
    RoadtripLocationCardEditFormComponent,
    RectangleButtonComponent,
    ImageComponent,
    ImageTemplateComponent,
    ImageGalleryComponent,
    GeneralImageComponent,
    ImagesFormComponent,
    CommentComponent,
    CommentHeadComponent,
    CommentBodyComponent,
    ReplyComponent,
    UserPageComponent,
    UserProfileImageComponent,
    RoadtripCardComponent,
    LocationCardComponent,
    PersonalInfoCardComponent,
    BrowseRoadtripsPageComponent,
    SelectedCoordinatesComponent,
    SelectedCoordinateCardComponent,
    MapRadiusFormComponent,
    LoginFormComponent,
    InteractiveMapComponent,
    MapUiComponent,
    ToolbarGroupComponent,
    MapToolbarComponent,
    ShapeIconButtonComponent,
    NewLocationFormComponent,
    ConfirmationPopupComponent,
    NewRoadtripFormComponent,
    SelectUsersFormComponent,
    NavURLComponent,
    CommentGroupComponent,
    IMapUIComponent,
    TesterPageComponent,
    IMapComponent,
    IconButtonV2Component,
    IndividualRoadtripPageComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ProgressBarModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
