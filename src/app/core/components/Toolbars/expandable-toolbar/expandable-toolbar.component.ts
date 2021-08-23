import { Component, OnInit, Input, AfterViewInit, ContentChild, ElementRef } from '@angular/core';
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
  @Input() isExpanded: boolean = true;
  toggleButton: ButtonComponent;
  expandDirection: ExpandDirections;
  @ContentChild('toggle') toggleButtonContentChild: ButtonComponent | null;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonContentChildren.toArray();
    this.toggleButton = this.buttons[0];

    if(this.toggleButtonContentChild){
      this.toggleButton = this.toggleButtonContentChild
      this.toggleButton.manager.clickEmitter.subscribe(() => {
        this.getOtherBtns().forEach(btn => {
          if(this.isExpanded){
            this.getOtherBtns().forEach(btn => {
              btn.hideWrapper()
              this.isExpanded = false
            })
          }
          else{
            this.getOtherBtns().forEach(btn => {
              btn.showWrapper()
              this.isExpanded = true
            })
          }
        })
      })
    }
  }

  onToggleBtnClick(): void {
    console.log("toggle click")
  }

  getOtherBtns(): ButtonComponent[] {
    return this.buttons.filter(btn => btn != this.toggleButton)
  }
}
