import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-rectangle-button[text]',
  templateUrl: './rectangle-button.component.html',
  styleUrls: ['./rectangle-button.component.css']
})
export class RectangleButtonComponent extends ButtonComponent implements OnInit {
  // data
  @Input() text: string

  // styles
  @Input() fontSize: string = "25px"
  @Input() defaultFontColor: string = AppColors.onColorLight
  @Input() font: string = AppFonts.Data
  @Input() fontHoverColor: string | null

  fontColor: string = this.defaultFontColor

  @Input() width: string = "100%"
  @Input() height: string
  @Input() defaultBgColor: string = AppColors.elevation2
  @Input() padding: string = "10px"
  @Input() bgHoverColor: string | null

  bgColor: string

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit(): void {
    this.bgColor = this.defaultBgColor
    this.fontColor = this.defaultFontColor
    this.setHoverColors()
  }

  getButtonStyles(): {} {
    return {
      backgroundColor: this.bgColor,
      width: this.width,
      height: this.height,
      padding: this.padding
    }
  }

  getTextStyles(): {} {
    return {
      fontFamily: this.font,
      color: this.fontColor,
      fontSize: this.fontSize
    }
  }

  onMouseEnter(): void {
    this.setHoverColors()
  }

  onMouseExit(): void {
    this.bgColor = this.defaultBgColor
    this.fontColor = this.defaultFontColor
  }

  setHoverColors(): void {
    if(this.bgHoverColor){
      this.bgColor = this.bgHoverColor
    }
    if(this.fontHoverColor){
      this.fontColor = this.fontHoverColor
    }
  }
}