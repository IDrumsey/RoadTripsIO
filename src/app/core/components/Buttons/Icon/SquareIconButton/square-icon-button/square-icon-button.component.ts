import { Component, OnInit, Input } from '@angular/core';

import {IconButtonComponent} from '../../../icon-button/icon-button.component';
import {OutlinedButtonInterface} from '../../../../models/Buttons/outlined-button-interface';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { ButtonComponent } from '../../../button/button.component';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-square-icon-button',
  providers: [{provide: ButtonComponent, useExisting: SquareIconButtonComponent}],
  templateUrl: './square-icon-button.component.html',
  styleUrls: ['./square-icon-button.component.css']
})
export class SquareIconButtonComponent extends IconButtonComponent implements OnInit, OutlinedButtonInterface {
  @Input() regularBackgroundColor: string = AppColors.bgColor;
  @Input() backgroundHighlightColor: string | null = null;
  @Input() padding: number = 5;
  @Input() regularBorderColor: string | null = AppColors.onColorLight;
  @Input() borderHighlightColor: string | null = null;
  @Input() borderWidth: number = 2;
  @Input() size: string = "25px";

  backgroundColor: string = this.regularBackgroundColor;
  borderColor: string | null = this.regularBorderColor;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit(): void {
    this.iconSize = "auto"
    this.backgroundColor = this.regularBackgroundColor
    this.borderColor = this.regularBorderColor
  }

  onOutlineMouseEnter(): void {
    this.onIconMouseEnter();

    this.highlightBackground();
    this.highlightBorder();
  }

  onOutlineMouseExit(): void {
    this.onIconMouseExit();

    this.removeBackgroundHighlight();
    this.removeBorderHighlight();
  }

  highlightBackground(): void {
    if(this.backgroundHighlightColor){
      this.backgroundColor = this.backgroundHighlightColor;
    }
  }

  removeBackgroundHighlight(): void {
    this.backgroundColor = this.regularBackgroundColor;
  }

  highlightBorder(): void {
    if(this.borderHighlightColor){
      this.borderColor = this.borderHighlightColor;
    }
  }

  removeBorderHighlight(): void {
    this.borderColor = this.regularBorderColor;
  }

  getOutlineStyles(): {} {
    return {
      backgroundColor: this.backgroundColor,
      border: this.borderColor ? `${this.borderWidth}px solid ${this.borderColor}` : "none",
      padding: `${this.padding}px`,
      width: this.size,
      height: this.size
    }
  }

  hide(): void {
    this.showing = false;
    this.hideWrapper();
  }

  show(): void {
    this.showWrapper();
    this.showing = true;
  }
}
