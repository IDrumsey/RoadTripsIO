import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageSelectorFormComponent } from '../image-selector-form/image-selector-form.component';

@Component({
  selector: 'app-new-stop-form',
  templateUrl: './new-stop-form.component.html',
  styleUrls: ['./new-stop-form.component.scss']
})
export class NewStopFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('imageSelector') imageSelectorForm: ImageSelectorFormComponent

  // ------------------------------- DATA -------------------------------
  form = new FormGroup({
    title: new FormControl("", Validators.required),
    description: new FormControl(""),
    address: new FormControl(""),
    latitude: new FormControl(0),
    longitude: new FormControl(0)
  })

  // ------------------------------- FUNCTIONALITY -------------------------------

  titleInvalid(): boolean {
    let titleControl = this.form.controls['title']
    if(titleControl){
      return titleControl.invalid && titleControl.dirty
    }
    return false;
  }
}
