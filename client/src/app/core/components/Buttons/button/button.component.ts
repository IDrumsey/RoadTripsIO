import { Component, ElementRef, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges){
    console.log(changes)
    if(this.manager){
      if(changes.disabled != null){
        this.manager.disabled = changes.disabled.currentValue
        this.manager.disableChangeHandler()
      }
      if(changes.enabledMessage != null){
        this.manager.enabledTitle = changes.enabledMessage.currentValue
        this.manager.titleChangeHandler()
      }
    }
  }

  hideWrapper(): void {
    this.wrapperElement.style.display = "none"
  }

  showWrapper(): void {
    this.wrapperElement.style.display = "block"
  }
}
