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
  @Input() bgColor: string
  @Input() textColor: string

  getStyles(): {} {
    let bgColor = this.bgColor
    let textColor = this.textColor
    let opacity = 0.75
    if(this.hovering){
      opacity = 1
    }
    return {
      backgroundColor: bgColor,
      color: textColor,
      fontSize: "20px",
      fontFamily: AppFonts.Handwriting,
      opacity: opacity
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
