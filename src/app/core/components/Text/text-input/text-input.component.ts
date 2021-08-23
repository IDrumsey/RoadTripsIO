import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-text-input[name]',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  // events
  @Output() focusEvent = new EventEmitter()
  @Output() blurEvent = new EventEmitter()
  @Output() fieldChange = new EventEmitter<string>()

  // state
  isFocused: boolean = false;

  // data inputs
  @Input() text: string = ""
  @Input() placeholder: string = ""
  @Input() name: string
  @Input() control: any
  @Input() inputType: string = "text"


  // style inputs
  @Input() textColor: string = AppColors.onColorLighter
  @Input() fontSize: string = "20px"
  @Input() font: string = AppFonts.Data
  @Input() padding: number = 5
  @Input() width: string = "100%"
  @Input() bgColor: string = AppColors.elevation3
  @Input() borderColor: string | null = AppColors.elevation1

  @Input() focusBoxShadowBlurRadius: number = 5
  @Input() focusBoxShadowColor: string = AppColors.onColorLight

  @Input() blurStyles: {}

  @Input() focusStyles: {}

  ngOnChanges(): void {
    this.defineStyles()
  }

  constructor() { }

  ngOnInit(): void {
    this.defineStyles()
  }

  onFocus(): void {
    this.isFocused = true;
    this.focusEvent.emit()
  }

  onBlur(): void {
    this.isFocused = false;
    this.blurEvent.emit()
  }

  mergeBlurAndFocusStyles(): {} {
    // https://www.javascripttutorial.net/javascript-merge-objects/
    return {
      ... this.blurStyles,
      ... this.focusStyles
    }
  }

  defineStyles(): void {
    this.blurStyles = {
      color: this.textColor,
      fontSize: this.fontSize,
      fontFamily: this.font,
      backgroundColor: this.bgColor,
      border: `2px solid ${this.borderColor}`,
      padding: `${this.padding}px`,
      width: this.width
    }

    this.focusStyles = {
      boxShadow: `0 0 ${this.focusBoxShadowBlurRadius}px ${this.focusBoxShadowColor}`
    }
  }

  getStyles(): {} {
    let currentStyles;
    if(this.isFocused){
      currentStyles = this.mergeBlurAndFocusStyles()
    }
    else{
      currentStyles = this.blurStyles
    }

    return currentStyles;
  }
}
