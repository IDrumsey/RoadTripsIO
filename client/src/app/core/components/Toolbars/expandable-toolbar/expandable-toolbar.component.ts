import { Component, OnInit, Input, AfterViewInit, ContentChild } from '@angular/core';
import { ButtonComponent } from '../../Buttons/button/button.component';
import { ComponentOrientations } from '../../models/component-orientations';
import { ExpandDirections } from '../../models/Toolbars/expand-directions';

import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-expandable-toolbar',
  templateUrl: './expandable-toolbar.component.html',
  styleUrls: ['./expandable-toolbar.component.css']
})
export class ExpandableToolbarComponent extends ToolbarComponent implements OnInit, AfterViewInit {
  @Input() isExpanded: boolean = false;
  @ContentChild('toggle') toggleButton: ButtonComponent;
  expandDirection: ExpandDirections;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonContentChildren.toArray();

    // close toolbar if needed
    if(!this.isExpanded){
      this.close()
    }

    if(this.toggleButton){
      this.toggleButton = this.toggleButton
      this.toggleButton.manager.clickEmitter.subscribe(() => {
        this.onToggleBtnClick()
      })
    }
  }

  onToggleBtnClick(): void {
    if(this.isExpanded){
      this.close()
    }
    else{
      this.open()
    }
  }

  close(): void {
    this.isExpanded = false
    this.getOtherBtns().forEach(btn => {
      btn.hideWrapper()
    })
  }

  open(): void {
    this.isExpanded = true
    this.getOtherBtns().forEach(btn => {
      btn.showWrapper()
    })
  }

  getOtherBtns(): ButtonComponent[] {
    return this.buttons.filter(btn => btn != this.toggleButton)
  }
}
