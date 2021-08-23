import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

import { ButtonComponent } from '../button/button.component';
import {AppColors} from 'src/app/core/data/models/app-colors'
import { IconButtonManager } from '../functionality/icon-button-manager';

@Component({
  selector: 'app-icon-button[icon]',
  // https://github.com/angular/angular/issues/8580
  providers: [{provide: ButtonComponent, useExisting: IconButtonComponent}],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent extends ButtonComponent implements OnInit {
  // data

  // initial styles
  @Input() icon: IconDefinition;
  @Input() iconSize: string = "25px";
  @Input() iconRegularColor: string = AppColors.onColorLight
  @Input() iconHoverColor: string = AppColors.onColor
  @Input() iconSelectColor: string

  // outputs
  @Output() buttonClick = new EventEmitter();
  @Output() buttonMouseEnter = new EventEmitter();
  @Output() buttonMouseExit = new EventEmitter();

  constructor(elementRef: ElementRef) {
    super(elementRef);

  }

  ngOnInit(): void {
    this.manager = new IconButtonManager(this.icon, this.iconRegularColor, false, true, this.disabled, this.selectable, this.iconHoverColor, this.iconSelectColor, this.enabledMessage, this.disabledMessage, this.iconSize)

    this.manager.clickEmitter.subscribe(() => {
      this.buttonClick.emit()
    })

    this.manager.mouseEnterEmitter.subscribe(() => {
      this.buttonMouseEnter.emit()
    })

    this.manager.mouseExitEmitter.subscribe(() => {
      this.buttonMouseExit.emit()
    })
  }

  hide(): void {
    this.hideWrapper();
  }

  show(): void {
    this.showWrapper();
  }
}
