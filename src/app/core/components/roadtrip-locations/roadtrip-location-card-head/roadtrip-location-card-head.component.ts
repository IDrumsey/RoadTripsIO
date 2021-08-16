import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-roadtrip-location-card-head',
  templateUrl: './roadtrip-location-card-head.component.html',
  styleUrls: ['./roadtrip-location-card-head.component.css']
})
export class RoadtripLocationCardHeadComponent implements OnInit {
  @Output() detailsClick = new EventEmitter()

  // data
  @Input() address: string;
  @Input() latitude: number;
  @Input() longitude: number;

  // state
  @Input() showingContent: boolean;
  @Input() isOwner: boolean

  detailsBtn = faInfoCircle;
  deleteBtn = faTrashAlt;

  constructor() { }

  ngOnInit(): void {
  }

  getWrapperStyles(): {} {
    let borderRadius = "5px"
    let wrapperCornerStyles;
    if(this.showingContent){
      wrapperCornerStyles = {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius
      }
    }
    else{
      wrapperCornerStyles = {
        borderRadius: borderRadius
      }
    }
    return {
      backgroundColor: AppColors.elevation3,
      ... wrapperCornerStyles
    }
  }

  getAddressStyles(): {} {
    return {
      color: AppColors.onColorLight,
      fontFamily: AppFonts.Data,
      fontSize: "25px"
    }
  }

  getCoordinateStyles(): {} {
    return {
      color: AppColors.onColorLight,
      fontFamily: AppFonts.Data,
      fontSize: "22px"
    }
  }

  onDetailsClick(): void {
    this.detailsClick.emit()
  }
}
