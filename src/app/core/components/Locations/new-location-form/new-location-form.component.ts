import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Subject } from 'rxjs';

import { AppColors } from 'src/app/core/data/models/app-colors';

@Component({
  selector: 'app-new-location-form',
  templateUrl: './new-location-form.component.html',
  styleUrls: ['./new-location-form.component.css']
})
export class NewLocationFormComponent implements OnInit, OnChanges {
  // data
  @Input() coordinates: google.maps.LatLngLiteral | null

  form = new FormGroup({
    address: new FormControl(),
    latitude: new FormControl(null, Validators.required),
    longitude: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
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
  @Output() confirm = new EventEmitter<FormGroup>()
  @Output() coordinatesDefined = new EventEmitter<google.maps.LatLngLiteral>()

  confirmObservable = new Subject();

  // state
  @Input() descriptionDisabled: boolean = false

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.coordinates){
      this.coordinates = changes.coordinates.currentValue
      if(this.coordinates){
        this.form.controls["latitude"].setValue(this.coordinates.lat)
        this.form.controls["longitude"].setValue(this.coordinates.lng)
      }
    }
  }

  // styles
  inputValidBorderColor = AppColors.elevation1
  inputInvalidBorderColor = AppColors.onContrastRed

  errorFieldMsgStyles = {
    color: AppColors.onContrastRed
  }

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
    this.confirm.emit(this.form)
    this.confirmObservable.next(this.form.controls)
  }

  onCoordinateChange(fieldVal: string){
    let latVal = this.form.get('latitude')?.value
    let lngVal = this.form.get('longitude')?.value
    this.coordinatesDefined.emit({
      lat: parseInt(latVal),
      lng: parseInt(lngVal)
    })
  }
}
