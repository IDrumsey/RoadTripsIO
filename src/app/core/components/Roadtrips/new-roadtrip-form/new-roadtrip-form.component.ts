import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoadtripDTO } from 'src/app/core/data/DTO/roadtrip-dto';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { User } from 'src/app/core/data/user';
import { AsyncService } from 'src/app/core/services/async.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataAccessService } from 'src/app/core/services/data/data-access.service';

@Component({
  selector: 'app-new-roadtrip-form',
  templateUrl: './new-roadtrip-form.component.html',
  styleUrls: ['./new-roadtrip-form.component.css']
})
export class NewRoadtripFormComponent implements OnInit {

  constructor(private api: DataAccessService, private asyncService: AsyncService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.data.get('title')?.errors)
  }

  // ----------------------------------------- DATA -----------------------------------------
  data = new FormGroup({
    title: new FormControl("", [Validators.minLength(10), Validators.required]),
    description: new FormControl(),
    allowComments: new FormControl(true)
  })

  collaborators: User[] = []

  // ----------------------------------------- STATE -----------------------------------------
  page = "info"

  // ----------------------------------------- EVENTS -----------------------------------------
  @Output() cancelEvent = new EventEmitter()
  @Output() submitEvent = new EventEmitter<RoadtripDTO>()

  // ----------------------------------------- FUNCTIONALITY -----------------------------------------
  changePage(newPage: string): void {
    this.page = newPage
  }

  cancel(): void {
    this.cancelEvent.emit()
  }

  submit(): void {
    // create new roadtrip object
    if(this.auth.currentlyLoggedInUserId){
      let newRoadtripDTO = new RoadtripDTO(this.api, this.asyncService);
      newRoadtripDTO.ownerId = this.auth.currentlyLoggedInUserId
      newRoadtripDTO.datePosted = new Date()
      newRoadtripDTO.title = this.data.get('title')?.value
      newRoadtripDTO.description = this.data.get('description')?.value
      newRoadtripDTO.collaboratorIds = this.collaborators.map(user => user.id)

      this.submitEvent.emit(newRoadtripDTO)
    }
  }

  // ----------------------------------------- STYLES -----------------------------------------
  wrapperStyles = {
    backgroundColor: AppColors.elevation3
  }

  selectedTabColor = AppColors.elevation3
  defaultTabColor = AppColors.elevation4

  toolbarStyles = {
    backgroundColor: this.defaultTabColor
  }

  getButtonBgColor(page: string): string {
    if(page == this.page){
      return this.selectedTabColor
    }
    else{
      return this.defaultTabColor
    }
  }

  getButtonBgHoverColor(page: string): string {
    return this.selectedTabColor
  }

  btnFont = AppFonts.Data
  btnFontSize = "20px"
  btnPadding = "5px 20px"

  cancelBtnBgColor = AppColors.onContrastRed
  cancelBtnBgHoverColor = AppColors.onContrastDarkRed

  submitBtnBgColor = AppColors.onContrastGreen
  submitBtnBgHoverColor = AppColors.onContrastDarkGreen

  errorMsgColor = AppColors.onContrastRed

  warningMsgStyles = {
    color: this.errorMsgColor,
    fontFamily: AppFonts.Data
  }
}