import { Component, OnInit, Input } from '@angular/core';

import { ButtonComponent } from '../../../button/button.component';
import { ElementRef } from '@angular/core';
import { ShapeIconButtonComponent } from '../../../shape-icon-button/shape-icon-button.component';


@Component({
  selector: 'app-circular-icon-button',
  providers: [{provide: ButtonComponent, useExisting: CircularIconButtonComponent}],
  templateUrl: './circular-icon-button.component.html',
  styleUrls: ['./circular-icon-button.component.scss']
})
export class CircularIconButtonComponent extends ShapeIconButtonComponent implements OnInit {

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
