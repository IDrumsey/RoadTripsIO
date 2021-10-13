import { AfterViewInit, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { User } from 'src/app/core/data2/models/client/user';

@Component({
  selector: 'app-personal-info-card',
  templateUrl: './personal-info-card.component.html',
  styleUrls: ['./personal-info-card.component.scss']
})
export class PersonalInfoCardComponent implements OnInit {
  @Input() user: User
  
  // data
  firstName: string = "Charlie"
  lastName: string = "Hm"
  username: string = "theCharles123"
  email: string = "theCharles123@email.email"

  form = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    username: new FormControl(),
    email: new FormControl()
  })

  // styles
  lockIcon = faLock

  font = AppFonts.Data

  fieldTitleStyles = {
    fontSize: "22px"
  }

  inputFontSize = "19px"

  wrapperStyles = {
    backgroundColor: AppColors.elevation4,
    padding: "25px"
  }

  constructor() { }

  ngOnInit(): void {
  }

  // not using the clear functions until the editable text component bug is fixed - when the value updates and I go to edit again, the placeholder is replaced with the control value
  updateFirstName(): void {
    this.firstName = this.form.controls['firstName'].value
  }

  clearFirstName(): void {
    console.log("clearing fn")
    this.form.controls['firstName'].setValue("")
  }

  updateLastName(): void {
    this.lastName = this.form.controls['lastName'].value
  }

  clearLastName(): void {
    this.form.controls['lastName'].setValue("")
  }

  updateUsername(): void {
    this.username = this.form.controls['username'].value
  }

  clearUsername(): void {
    this.form.controls['username'].setValue("")
  }

  updateEmail(): void {
    this.email = this.form.controls['email'].value
  }

  clearEmail(): void {
    this.form.controls['email'].setValue("")
  }

  changePassword(): void {
    console.log("changing password")
  }
}
