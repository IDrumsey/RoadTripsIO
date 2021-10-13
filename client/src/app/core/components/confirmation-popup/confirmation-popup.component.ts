import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
  }

  // ------------------------------ DATA ------------------------------
  @Input() message: string = "Are you sure?"
  @Input() errorMessage: string = "Please confirm or cancel"

  // ------------------------------ STATE ------------------------------
  isShowingErrorMessage = false

  // ------------------------------ EVENTS ------------------------------
  @Output() cancelEvent = new EventEmitter()
  @Output() confirmEvent = new EventEmitter()

  // ------------------------------ EVENT HANDLERS ------------------------------
  onCancelClick(): void {
    this.cancelEvent.emit()
  }

  onConfirmClick(): void {
    this.confirmEvent.emit()
  }

  onOutsideClick(): void {
    this.showErrorMessage()
  }

  // ------------------------------ FUNCTIONALITY ------------------------------
  showErrorMessage(): void {
    this.isShowingErrorMessage = true
  }

  // Not working because of custom click event handlers still running and I don't know a way to stop them that isn't really complicated
  listenForOutsideClicks(): void {
    // https://stackoverflow.com/questions/14188654/detect-click-outside-element-vanilla-javascript
    
    document.addEventListener("click", (e) => {
      if(!(this.element.nativeElement.contains(e.target))){
        // clicked outside
        this.onOutsideClick()
      }
    })
  }


  // ------------------------------ STYLES ------------------------------
  wrapperStyles = {
    backgroundColor: AppColors.elevation3,
    fontFamily: AppFonts.Data,
    borderRadius: "5px",
    minWidth: "50vw",
    textAlign: "center"
  }

  mainMessageStyles = {
    color: AppColors.onColorLight
  }

  errorMessageStyles = {
    color: AppColors.onContrastDarkRed
  }

  cancelButtonBgColor = AppColors.onContrastRed
  cancelButtonBgHoverColor = AppColors.onContrastDarkRed

  confirmButtonBgColor = AppColors.onContrastGreen
  confirmButtonBgHoverColor = AppColors.onContrastDarkGreen
}
