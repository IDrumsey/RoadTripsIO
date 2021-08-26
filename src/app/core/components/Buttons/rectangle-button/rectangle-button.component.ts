import { Component, OnInit, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { ButtonComponent } from '../button/button.component';
import { RectangleTextButtonManager } from '../functionality/rectangle-text-button-manager';

@Component({
  selector: 'app-rectangle-button[text]',
  templateUrl: './rectangle-button.component.html',
  styleUrls: ['./rectangle-button.component.css']
})
export class RectangleButtonComponent extends ButtonComponent implements OnInit {
  constructor(element: ElementRef) {
    super(element)
  }

  ngOnInit(): void {
    this.manager = new RectangleTextButtonManager(this.text, this.fgRegularColor, false, true, this.disabled, this.selectable, this.fgHoverColor, this.fgSelectColor, this.enabledMessage, this.disabledMessage, this.bgRegularColor, this.bgHoverColor, this.bgSelectColor, this.borderRegularColor, this.borderHoverColor, this.borderSelectColor, this.borderWidth, this.padding, this.width, this.height, this.fontSize, this.fontFamily, this.borderRadius)

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

  // inputs
  @Input() padding: string
  @Input() fgRegularColor: string = AppColors.onColorLight
  @Input() fgHoverColor: string
  @Input() fgSelectColor: string
  @Input() bgRegularColor: string
  @Input() bgHoverColor: string
  @Input() bgSelectColor: string
  @Input() borderWidth: number
  @Input() borderRegularColor: string
  @Input() borderHoverColor: string
  @Input() borderSelectColor: string
  @Input() width: string
  @Input() height: string
  @Input() fontSize: string
  @Input() text: string
  @Input() fontFamily: string
  @Input() borderRadius: number = 5

  // outputs
  @Output() buttonClick = new EventEmitter();
  @Output() buttonMouseEnter = new EventEmitter();
  @Output() buttonMouseExit = new EventEmitter();

  // ------------------------------- STYLES -------------------------------
  wrapperStyles = {
    borderRadius: `${this.borderRadius}px`
  }
}