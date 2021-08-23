import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { ShapeIconButtonManager } from '../functionality/shape-icon-button-manager';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'app-shape-icon-button',
  templateUrl: './shape-icon-button.component.html',
  styleUrls: ['./shape-icon-button.component.css']
})
export class ShapeIconButtonComponent extends IconButtonComponent implements OnInit {
  constructor(element: ElementRef) {
    super(element)
  }

  ngOnInit(): void {
    this.manager = new ShapeIconButtonManager(this.icon, this.iconRegularColor, false, true, this.disabled, this.selectable, this.iconHoverColor, this.iconSelectColor, this.enabledMessage, this.disabledMessage, this.iconSize, this.bgRegularColor, this.bgHoverColor, this.bgSelectColor, this.borderRegularColor, this.borderHoverColor, this.borderSelectColor, this.padding, this.size, this.borderWidth)

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
  @Input() padding: number
  @Input() bgRegularColor: string
  @Input() bgHoverColor: string
  @Input() bgSelectColor: string
  @Input() borderWidth: number
  @Input() borderRegularColor: string
  @Input() borderHoverColor: string
  @Input() borderSelectColor: string
  @Input() size: string
}
