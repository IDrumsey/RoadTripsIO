import { Component, Input, OnInit } from '@angular/core';
import { faEllipsisH, faEllipsisV, faInfo, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { ExpandDirections } from 'src/app/core/components/models/Toolbars/expand-directions';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
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

  // -------------------------------- STATE --------------------------------
  headToolbarExpandDirection = ExpandDirections.Left
  headToolbarInitialExpandedState = false

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

  // -------------------------------- EVENT HANDLERS --------------------------------

  onHeadToolbarExpand(): void {
    this.headToolbarToggleIcon = faEllipsisH
  }

  onHeadToolbarCollapse(): void {
    this.headToolbarToggleIcon = faEllipsisV
  }

  // -------------------------------- FUNCTIONALITY --------------------------------
}
