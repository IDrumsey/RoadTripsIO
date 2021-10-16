import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCampground, faEllipsisH, faEllipsisV, faGlasses, faHiking, faInfo, faLandmark, faMapMarkedAlt, faMapMarkerAlt, faTrashAlt, faUtensils, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ExpandDirections } from 'src/app/core/components/models/Toolbars/expand-directions';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { LocationTypes } from 'src/app/core/data/models/location-types';
import { Stop } from '../../data/models/stop/stop';

@Component({
  selector: 'app-stop-card',
  templateUrl: './stop-card.component.html',
  styleUrls: ['./stop-card.component.scss']
})
export class StopCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(this.headToolbarInitialExpandedState){
      this.onHeadToolbarExpand()
    }
    else{
      this.onHeadToolbarCollapse()
    }
  }

  // -------------------------------- DATA --------------------------------
  @Input() stop: Stop
  
  headToolbarToggleIcon = faEllipsisV
  detailsIcon = faInfo
  deleteIcon = faTrashAlt
  seeOnMapIcon = faMapMarkedAlt

  stopTypeIcons = new Map([
    [LocationTypes.Landmark, faLandmark],
    [LocationTypes.Camping, faCampground],
    [LocationTypes.Food, faUtensils],
    [LocationTypes.General, faMapMarkerAlt],
    [LocationTypes.Hiking, faHiking],
    [LocationTypes.Sightseeing, faGlasses]
  ])

  stopType = LocationTypes.General // Temporary

  // -------------------------------- STATE --------------------------------
  headToolbarExpandDirection = ExpandDirections.Left
  headToolbarInitialExpandedState = false
  showingDetails = false
  headToolbarToggleButtonTooltip = "Show options"
  toggleDetailsButtonTooltip = () => {
    return this.showingDetails ? "Hide stop details" : "Show stop details"
  }

  // -------------------------------- STYLES --------------------------------
  cardPadding = "10px 20px"
  toolButtonSize = "20px"
  
  getTitleStyles(): {} {
    return {
      fontFamily: AppFonts.Data,
      fontSize: "17px"
    }
  }

  getCardStyles(): {} {
    return {}
  }

  getHeadWrapperStyles(): {} {
    return {
      padding: this.cardPadding
    }
  }

  getDetailStyles(): {} {
    return {
      padding: this.cardPadding
    }
  }

  // -------------------------------- EVENTS --------------------------------

  @Output() detailsExpanded = new EventEmitter()
  @Output() detailsCollapsed = new EventEmitter()
  @Output() deleteStopButtonClicked = new EventEmitter()
  @Output() seeOnMapButtonClicked = new EventEmitter()

  // -------------------------------- SIGNALERS --------------------------------
  signal_detailsExpanded(): void {
    this.detailsExpanded.emit()
  }

  signal_detailsCollapsed(): void {
    this.detailsCollapsed.emit()
  }

  signal_deleteStopButtonClicked(): void {
    this.deleteStopButtonClicked.emit()
  }

  signal_seeOnMapButtonClicked(): void {
    this.seeOnMapButtonClicked.emit()
  }

  // -------------------------------- EVENT HANDLERS --------------------------------

  onHeadToolbarExpand(): void {
    this.headToolbarToggleIcon = faEllipsisH
    this.headToolbarToggleButtonTooltip = "Hide options"
  }

  onHeadToolbarCollapse(): void {
    this.headToolbarToggleIcon = faEllipsisV
    this.headToolbarToggleButtonTooltip = "Show options"
  }

  onToggleDetailsButtonClick(): void {
    this.toggleDetails()
  }

  onDeleteButtonClick(): void {
    this.signal_deleteStopButtonClicked()
  }

  onSeeOnMapButtonClick(): void {
    this.signal_seeOnMapButtonClicked()
  }

  // -------------------------------- FUNCTIONALITY --------------------------------

  toggleDetails(): void {
    this.showingDetails ? this.hideDetails() : this.showDetails()
  }

  showDetails(): void {
    this.showingDetails = true
  }

  hideDetails(): void {
    this.showingDetails = false
  }

  getTypeIcon(): IconDefinition {
    return this.stopTypeIcons.get(this.stopType) as IconDefinition
  }

  getDetailsMainTitle(): string {
      return this.stop.location.address ? this.stop.location.address : this.stop.location.title
  }

  getDetailsSubtitle(): string {
    return this.stop.location.coordinate.genFormattedString()
  }
}
