import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-notification[text]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // -------------------------------- DATA --------------------------------
  @Input() text: string
  
  // -------------------------------- EVENTS --------------------------------
  @Output() clicked = new EventEmitter()

  // -------------------------------- SIGNALERS --------------------------------
  signal_clicked(): void {
    this.clicked.emit()
  }

  // -------------------------------- STATE --------------------------------
  hovering = false

  // -------------------------------- STYLES --------------------------------
  @Input() bgBlurColor = AppColors.elevation3
  @Input() bgFocusColor = AppColors.elevation2
  @Input() textBlurColor = AppColors.onColorLight
  @Input() textFocusColor = AppColors.onColorLighter

  getStyles(): {} {
    let bgColor = this.bgBlurColor
    let textColor = this.textBlurColor
    if(this.hovering){
      bgColor = this.bgFocusColor
      textColor = this.textFocusColor
    }
    return {
      backgroundColor: bgColor,
      color: textColor,
      fontSize: "25px",
      fontFamily: AppFonts.Handwriting
    }
  }

  // -------------------------------- FUNCTIONALITY --------------------------------
  onMouseEnter(): void {
    this.hovering = true
  }

  onMouseExit(): void {
    this.hovering = false
  }
}
