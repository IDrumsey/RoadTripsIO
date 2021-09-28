import { Component, Input, OnInit } from '@angular/core';
import { faCampground, faEllipsisH, faEllipsisV, faGlasses, faHiking, faInfo, faLandmark, faMapMarkerAlt, faUtensils, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ExpandDirections } from 'src/app/core/components/models/Toolbars/expand-directions';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { LocationTypes } from 'src/app/core/data/models/location-types';
import { RoadtripStop } from 'src/app/core/data2/models/client/roadtrip-stop';

@Component({
  selector: 'app-stop-card',
  templateUrl: './stop-card.component.html',
  styleUrls: ['./stop-card.component.css']
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
  @Input() stop: RoadtripStop
  
  headToolbarToggleIcon = faEllipsisV
  detailsIcon = faInfo

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
  headToolbarInitialExpandedState = true
  showingDetails = false
  headToolbarToggleButtonTooltip = "Show options"
  toggleDetailsButtonTooltip = () => {
    return this.showingDetails ? "Hide stop details" : "Show stop details"
  }

  // -------------------------------- STYLES --------------------------------
  @Input() titleColor: string = AppColors.onColorLight
  cardPadding = "10px 20px"
  toolButtonSize = "20px"
  
  getTitleStyles(): {} {
    return {
      color: this.titleColor,
      fontFamily: AppFonts.Data,
      fontSize: "17px"
    }
  }

  getCardStyles(): {} {
    return {}
  }

  getHeadWrapperStyles(): {} {
    return {
      backgroundColor: AppColors.elevation4,
      padding: this.cardPadding
    }
  }

  getDetailStyles(): {} {
    return {
      color: AppColors.onColorLighter,
      padding: this.cardPadding,
      backgroundColor: AppColors.elevation3
    }
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
    return this.stop.location.coordinates.genFormattedString()
  }
}
