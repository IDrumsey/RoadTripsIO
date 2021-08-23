import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppColors } from 'src/app/core/data/models/app-colors';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  // events
  @Output() close = new EventEmitter()
  @Output() typing = new EventEmitter()
  @Output() stoppedTyping = new EventEmitter()

  // data
  text = new FormControl(null, Validators.required)

  // styles
  @Input() width: string = "95%"
  discardBtnColor = AppColors.onContrastDarkRed
  discardBtnHoverColor = AppColors.onContrastRed
  submitBtnColor = AppColors.onContrastDarkGreen
  submitBtnHoverColor = AppColors.onContrastGreen
  btnFontSize = "15px"

  constructor() { }

  ngOnInit(): void {
  }

  getReplyStyles(): {} {
    return {
      width: this.width
    }
  }

  submit(): void{
    console.log("submitting reply : ", this.text.value)
  }

  onCancelClick(): void {
    this.close.emit()
  }

  onSubmitClick(): void {
    this.submit()
    this.close.emit()
  }

  onFocus(): void {
    this.typing.emit()
  }

  onBlur(): void {
    this.stoppedTyping.emit()
  }
}
