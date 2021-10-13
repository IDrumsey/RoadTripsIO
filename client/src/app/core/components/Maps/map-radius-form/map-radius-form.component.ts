import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faArrowAltCircleRight, faArrowsAlt, faMapPin } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-map-radius-form',
  templateUrl: './map-radius-form.component.html',
  styleUrls: ['./map-radius-form.component.scss']
})
export class MapRadiusFormComponent implements OnInit {
  // events
  @Output() updated = new EventEmitter()

  // data
  form = new FormGroup({
    latitude: new FormControl(),
    longitude: new FormControl(),
    radius: new FormControl()
  })

  // styles
  pinIcon = faMapPin
  rangeIcon = faArrowsAlt
  updateIcon = faArrowAltCircleRight

  updateBtnColor = AppColors.onContrastGreen
  updateBtnHoverColor = AppColors.onContrastDarkGreen
  updateBtnSize = "30px"

  iconStyles = {
    fontSize: "25px"
  }

  wrapperStyles = {
    backgroundColor: AppColors.elevation4,
    color: AppColors.onColorLight,
    fontFamily: AppFonts.Data,
    padding: "25px"
  }

  titleStyles = {
    fontSize: "25px",
    fontFamily: AppFonts.Handwriting
  }

  fieldStyles = {
    backgroundColor: AppColors.elevation3,
    padding: "10px"
  }

  inputStyles = {
    backgroundColor: AppColors.elevation2,
    border: "none",
    padding: "5px 10px",
    width: "30%",
    color: AppColors.onColorLight,
    borderRadius: "4px",
    margin: "0 4px"
  }

  constructor() { }

  ngOnInit(): void {
  }

  updateMap(): void {
    console.log("update map : ", this.form.controls)
    this.updated.emit()
  }
}
