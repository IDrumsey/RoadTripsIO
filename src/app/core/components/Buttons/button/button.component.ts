import { Component, ElementRef, OnInit } from '@angular/core';

import { Button } from '../../models/Buttons/Button/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent extends Button implements OnInit {
  showing: boolean = true;
  wrapperElement: any;

  constructor(elementRef: ElementRef) {
    super();
    this.wrapperElement = elementRef.nativeElement;
  }

  ngOnInit(): void {
  }

  hideWrapper(): void {
    this.wrapperElement.style.display = "none"
  }

  showWrapper(): void {
    this.wrapperElement.style.display = "block"
  }
}
