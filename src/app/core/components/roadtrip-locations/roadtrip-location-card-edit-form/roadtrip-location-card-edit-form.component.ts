import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'

import { AppColors } from 'src/app/core/data/models/app-colors';

@Component({
  selector: 'app-roadtrip-location-card-edit-form',
  templateUrl: './roadtrip-location-card-edit-form.component.html',
  styleUrls: ['./roadtrip-location-card-edit-form.component.css']
})
export class RoadtripLocationCardEditFormComponent implements OnInit {
  // data
  form = new FormGroup({
    address: new FormControl(),
    latitude: new FormControl(),
    longitude: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
  })

  // styles
  inputBgColor = AppColors.elevation2
  cancelBtnColor = "rgba(232, 53, 58, .75)"
  confirmBtnColor = "rgba(56, 143, 75, .75)"

  cancelBtnHoverColor = "rgba(232, 53, 58, 1)"
  confirmBtnHoverColor = "rgba(56, 143, 75, 1)"

  // events
  @Output() cancel = new EventEmitter()
  @Output() confirm = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  getWrapperDetails(): {} {
    return {
      backgroundColor: AppColors.elevation4
    }
  }

  getInputStyles(): {} {
    return {
      backgroundColor: this.inputBgColor
    }
  }

  cancelEdit(): void {
    this.cancel.emit()
  }
  
  confirmEdit(): void {
    console.log(this.form.controls)
    this.confirm.emit()
  }
}
