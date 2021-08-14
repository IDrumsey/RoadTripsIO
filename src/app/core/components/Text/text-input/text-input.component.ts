import { Component, OnInit, Input } from '@angular/core';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-text-input[name]',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  // state
  isFocused: boolean = false;

  // data inputs
  @Input() text: string = ""
  @Input() placeholder: string
  @Input() name: string


  // style inputs
  @Input() textColor: string = AppColors.onColorLighter
  @Input() fontSize: string = "20px"
  @Input() font: string = AppFonts.Data
  @Input() padding: number = 5
  @Input() width: string = "100%"
  @Input() bgColor: string = AppColors.elevation3

  @Input() focusBoxShadowBlurRadius: number = 5
  @Input() focusBoxShadowColor: string = AppColors.onColorLight

  @Input() blurStyles: {}

  @Input() focusStyles: {}

  constructor() { }

  ngOnInit(): void {
    this.blurStyles = {
      color: this.textColor,
      fontSize: this.fontSize,
      fontFamily: this.font,
      backgroundColor: this.bgColor,
      border: `2px solid ${AppColors.elevation1}`,
      padding: `${this.padding}px`,
      width: this.width
    }

    this.focusStyles = {
      boxShadow: `0 0 ${this.focusBoxShadowBlurRadius}px ${this.focusBoxShadowColor}`
    }
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }

  mergeBlurAndFocusStyles(): {} {
    // https://www.javascripttutorial.net/javascript-merge-objects/
    return {
      ... this.blurStyles,
      ... this.focusStyles
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
