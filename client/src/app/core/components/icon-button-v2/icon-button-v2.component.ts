import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { AppColors } from '../../data/models/app-colors';
import { Button } from '../../../core2/interfaces/button';

@Component({
  selector: 'app-icon-button-v2[icon]',
  templateUrl: './icon-button-v2.component.html',
  styleUrls: ['./icon-button-v2.component.css']
})
export class IconButtonV2Component implements OnInit, Button {

  constructor() { }

  ngOnInit(): void {
  }

  // ------------------------------ STATE ------------------------------

  @Input() selected = false
  hovering = false;

  // ------------------------------ STYLES ------------------------------

  @Input() icon: IconDefinition
  @Input() iconSize = '25px'
  @Input() blurColor: string = AppColors.onColorLight
  @Input() focusColor: string = AppColors.onContrastGreen

  getStyles(): {} {
    let color = this.blurColor
    if(this.selected || this.hovering){
      color = this.focusColor
    }

    return {
      color: color,
      fontSize: this.iconSize
    }
  }

  // ------------------------------ EVENTS ------------------------------
  @Output() clicked = new EventEmitter()

  // ------------------------------ EVENT HANDLERS ------------------------------

  onMouseEnter(): void {
    this.hovering = true
  }

  onMouseExit(): void {
    this.hovering = false
  }

  onMouseClick(): void {
    this.clicked.emit()
  }

  // ------------------------------ FUNCTIONALITY ------------------------------

  select(): void {
    this.selected = true
  }

  unselect(): void {
    this.selected = false
  }

}
