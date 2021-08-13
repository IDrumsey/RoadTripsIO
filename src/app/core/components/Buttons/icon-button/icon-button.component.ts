import { Component, OnInit, Input, ElementRef } from '@angular/core';

import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '../button/button.component';
import {AppColors} from 'src/app/core/data/models/app-colors'

@Component({
  selector: 'app-icon-button',
  // https://github.com/angular/angular/issues/8580
  providers: [{provide: ButtonComponent, useExisting: IconButtonComponent}],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent extends ButtonComponent implements OnInit {
  @Input() icon: IconDefinition | null = null;
  @Input() iconSize: string = "25px";
  @Input() regularColor: string = AppColors.onColorLight;
  @Input() highlightColor: string | null = AppColors.onContrastBlue;

  iconColor: string = this.regularColor;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  ngOnInit(): void {
    this.iconColor = this.regularColor;
  }

  onIconMouseEnter = this.defaultOnIconMouseEnter;

  onIconMouseExit = this.defaultOnIconMouseExit;

  defaultOnIconMouseEnter() {
    this.highlightIcon();
  }

  defaultOnIconMouseExit() {
    this.removeIconHighlight();
  }

  highlightIcon() {
    if(this.highlightColor){
      this.iconColor = this.highlightColor;
    }
  }

  removeIconHighlight() {
    this.iconColor = this.regularColor;
  }

  getIconStyles(): {} {
    return {
      color: this.iconColor,
      fontSize: this.iconSize
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

  select(foregroundColor: string): void {
    this.disableIconHoverEffects()
    this.iconColor = foregroundColor;
  }

  unselect(): void {
    this.enableIconHoverEffects()
    this.onIconMouseEnter()
  }

  disableIconHoverEffects(): void {
    this.onIconMouseEnter = () => {}
    this.onIconMouseExit = () => {}
  }

  enableIconHoverEffects(): void {
    this.onIconMouseEnter = this.defaultOnIconMouseEnter
    this.onIconMouseExit = this.defaultOnIconMouseExit
  }
}
