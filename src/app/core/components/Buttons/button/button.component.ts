import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  manager: any
  
  // styles
  @Input() disabled: boolean = false;
  @Input() selectable: boolean = false
  @Input() disabledMessage: string
  @Input() enabledMessage: string

  // data
  wrapperElement: any;

  constructor(elementRef: ElementRef) {
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
