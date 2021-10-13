import { Component, OnInit } from '@angular/core';
import { faMapPin, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-selected-coordinate-card',
  templateUrl: './selected-coordinate-card.component.html',
  styleUrls: ['./selected-coordinate-card.component.scss']
})
export class SelectedCoordinateCardComponent implements OnInit {
  // data
  latitude: number = 12321321
  longitude: number = 123123123

  // styles
  pinIcon = faMapPin
  xCircleIcon = faTimesCircle

  wrapperStyles = {
    color: AppColors.onColorLight,
    backgroundColor: AppColors.elevation3,
    padding: "10px 15px",
    width: "100%"
  }

  textStyles = {
    fontFamily: AppFonts.Data
  }

  deleteBtnColor = AppColors.onContrastRed
  deleteBtnHoverColor = AppColors.onContrastDarkRed

  iconSize = "25px"

  pinStyles = {
    fontSize: this.iconSize
  }

  constructor() { }

  ngOnInit(): void {
  }
}
