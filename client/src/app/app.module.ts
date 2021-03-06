// Native
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'


// Third Party
import { GoogleMapsModule } from '@angular/google-maps';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {MaterialModule} from './core2/components/material/material.module';
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
import { RoadtripPageComponent as OldRoadtripPage } from './core/pages/roadtrip/roadtrip-page.component';
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
import { NotificationManagerComponent } from './core2/components/notifications/notification-manager/notification-manager.component';
import { StopCardComponent } from './core2/components/stop-card/stop-card.component';
import { ExpandableToolbar2Component } from './core2/components/toolbars/expandable-toolbar2/expandable-toolbar2.component';
import { ButtonAliasComponent } from './core2/components/buttons/button-alias/button-alias.component';
import { CommentCardComponent } from './core2/components/comments/comment-card/comment-card.component';
import { CommentThreadComponent } from './core2/components/comments/comment-thread/comment-thread.component';
import { NotFoundPageComponent } from './core2/pages/not-found-page/not-found-page.component';
import { NewStopFormComponent } from './core2/components/forms/new-stop-form/new-stop-form.component';
import { ApiRequestInterceptor } from './core2/interceptors/api-request.interceptor';
import { ReplyFieldComponent } from './core2/components/comments/reply-field/reply-field.component';
import { ThreadGroupComponent } from './core2/components/comments/thread-group/thread-group.component';
import { ImageSelectorFormComponent } from './core2/components/forms/image-selector-form/image-selector-form.component';
import { ImageV2Component } from './core2/components/images/image-v2/image-v2.component';
import { ImageGalleryV2Component } from './core2/components/images/image-gallery-v2/image-gallery-v2.component';
import { ProfilePageComponent } from './core2/pages/profile-page/profile-page.component';
import { RoadtripSummaryCardComponent } from './core2/components/roadtrip-summary-card/roadtrip-summary-card.component';
import { ExplorePageComponent } from './core2/pages/explore-page/explore-page.component';
import { ContentCheckboxComponent } from './core2/components/content-checkbox/content-checkbox.component';
import { UserSelectListComponent } from './core2/components/users/user-select-list/user-select-list.component';
import { UserSearchComponent } from './core2/components/users/user-search/user-search.component';
import { ListComponent } from './core2/components/utility/list/list.component';

const routes: Routes = [
  {path: 'roadtrips/:roadtripId', component: IndividualRoadtripPageComponent},
  {path: 'users/:userId', component: ProfilePageComponent},
  {path: '', component: ExplorePageComponent},
  {path: 'test', component: TesterPageComponent},
  {path: 'rt', component: OldRoadtripPage},
  {path: '404', component: NotFoundPageComponent}
]

const interceptors = [
  {provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true}
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
    OldRoadtripPage,
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
    NotificationComponent,
    NotificationManagerComponent,
    StopCardComponent,
    ExpandableToolbar2Component,
    ButtonAliasComponent,
    CommentCardComponent,
    CommentThreadComponent,
    NotFoundPageComponent,
    NewStopFormComponent,
    ReplyFieldComponent,
    ThreadGroupComponent,
    ImageSelectorFormComponent,
    ImageV2Component,
    ImageGalleryV2Component,
    ProfilePageComponent,
    RoadtripSummaryCardComponent,
    ExplorePageComponent,
    ContentCheckboxComponent,
    UserSelectListComponent,
    UserSearchComponent,
    ListComponent
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
    ProgressBarModule,
    MaterialModule
  ],
  exports: [RouterModule],
  providers: [interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
