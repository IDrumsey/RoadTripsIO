import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ElementRef } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { AppColors } from '../../data/models/app-colors';
import { Button } from '../../../core2/interfaces/button';
import { ButtonAliasComponent } from 'src/app/core2/components/buttons/button-alias/button-alias.component';
import { ThemeManagerService } from 'src/app/core2/services/theme-manager.service';

@Component({
  selector: 'app-icon-button-v2[icon]',
  templateUrl: './icon-button-v2.component.html',
  styleUrls: ['./icon-button-v2.component.scss'],
  providers: [{
    provide: ButtonAliasComponent,
    useExisting: forwardRef(() => IconButtonV2Component)
  }]
})
export class IconButtonV2Component implements OnInit, Button {

  constructor(elementRef: ElementRef, private theme: ThemeManagerService) {
    this.element = elementRef
  }

  ngOnInit(): void {
  }

  // ------------------------------ DATA ------------------------------
  element: ElementRef
  @Input() enabledTooltip: string
  @Input() disabledTooltip: string

  // ------------------------------ STATE ------------------------------

  @Input() selected = false
  hovering = false;
  @Input() disabled = false

  // ------------------------------ STYLES ------------------------------

  @Input() icon: IconDefinition
  @Input() iconSize = '25px'
  @Input() blurColor: string
  @Input() focusColor: string

  enabledOpacity = 1
  disabledOpacity = .8

  getStyles(): {} {
    let color = this.blurColor
    if(this.selected || this.hovering){
      color = this.focusColor
    }

    let opacity = this.disabled ? this.disabledOpacity : this.enabledOpacity

    let cursor = this.disabled ? "auto" : "pointer"

    return {
      color: color,
      fontSize: this.iconSize,
      opacity: opacity,
      cursor: cursor
    }
  }

  // ------------------------------ EVENTS ------------------------------
  @Output() clicked = new EventEmitter()

  // ------------------------------ EVENT HANDLERS ------------------------------

  onMouseEnter(): void {
    if(!this.disabled){
      this.hovering = true
    }
  }

  onMouseExit(): void {
    if(!this.disabled){
      this.hovering = false
    }
  }

  onMouseClick(): void {
    if(!this.disabled){
      this.clicked.emit()
    }
  }

  // ------------------------------ FUNCTIONALITY ------------------------------

  select(): void {
    this.selected = true
  }

  unselect(): void {
    this.selected = false
  }

  getElement(): ElementRef {
    return this.element
  }

  getToolTip(): string {
    if(this.disabled){
      return this.disabledTooltip
    }
    else{
      return this.enabledTooltip
    }
  }
}
