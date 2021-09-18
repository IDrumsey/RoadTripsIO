import { Component, OnInit, Input } from '@angular/core';

import { ButtonComponent } from '../../../button/button.component';
import { ElementRef } from '@angular/core';
import { ShapeIconButtonComponent } from '../../../shape-icon-button/shape-icon-button.component';

@Component({
  selector: 'app-square-icon-button',
  providers: [{provide: ButtonComponent, useExisting: SquareIconButtonComponent}],
  templateUrl: './square-icon-button.component.html',
  styleUrls: ['./square-icon-button.component.css']
})
export class SquareIconButtonComponent extends ShapeIconButtonComponent implements OnInit {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
