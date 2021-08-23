import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faBan, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  // events
  @Output() close = new EventEmitter()

  // data
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  // styles
  signInIcon = faSignInAlt
  signInBtnColor = AppColors.onContrastGreen
  signInBtnHoverColor = AppColors.onContrastDarkGreen

  cancelIcon = faBan
  cancelBtnColor = AppColors.onContrastRed
  cancelBtnHoverColor = AppColors.onContrastDarkRed

  wrapperStyles = {
    backgroundColor: AppColors.elevation3,
    padding: "10px 25px",
    color: AppColors.onColorLight,
    borderRadius: "5px"
  }

  inputBgColor = AppColors.elevation4

  fieldTitleStyles = {
    fontFamily: AppFonts.Handwriting,
    fontSize: "25px"
  }

  errorMsgStyles = {
    color: AppColors.onContrastRed,
    fontFamily: AppFonts.Data
  }

  constructor() { }

  ngOnInit(): void {
  }

  onCloseBtnClick(): void {
    this.close.emit()
  }
}
