import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-images-form',
  templateUrl: './images-form.component.html',
  styleUrls: ['./images-form.component.css']
})
export class ImagesFormComponent implements OnInit {
  // events
  @Output() cancel = new EventEmitter();

  // data
  form = new FormGroup({
    images: new FormControl(null, Validators.required)
  })

  imagePreviews: string[] = []

  // styles
  selectImagesButtonColor: string = AppColors.elevation3
  selectImagesButtonHoverColor: string = AppColors.elevation4
  selectImagesButtonFont: string = AppFonts.Data
  selectImagesButtonFontSize: string = "20px"
  
  cancelButtonColor: string = AppColors.onContrastDarkRed
  cancelButtonHoverColor: string = AppColors.onContrastRed

  confirmButtonColor: string = AppColors.onContrastDarkGreen
  confirmButtonHoverColor: string = AppColors.onContrastGreen

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.cancel.emit()
  }

  onSubmit(): void {
    console.log("submitting images : ", this.form.controls["images"].value)
  }

  getGalleryHeight(): string {
    return this.imagePreviews.length == 0 ? "200px" : "auto"
  }
}
