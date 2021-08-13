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
    this.initExpandDirection();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonContentChildren.toArray();
    this.toggleButton = this.buttons[0];
    if(this.toggleButtonContentChild){
      this.toggleButton = this.toggleButtonContentChild
    }

    this.listenForToggleBtnClick();
  }

  initExpandDirection(){
    if(this.orientation == ComponentOrientations.Horizontal){
      this.expandDirection = ExpandDirections.Right;
    }
    else{
      this.expandDirection = ExpandDirections.Down;
    }
  }

  expand(): void {
    this.isExpanded = true;
    this.getOtherBtns().forEach(btn => btn.show())
  }

  collapse(): void {
    this.isExpanded = false;
    this.getOtherBtns().forEach(btn => {
      btn.hide()
    })
  }

  listenForToggleBtnClick(): void {
    this.toggleButton.click.subscribe(() => {
      this.onToggleBtnClick()
    })
  }

  onToggleBtnClick(): void {
    this.toggleExpand()
  }

  toggleExpand(): void {
    this.isExpanded ? this.collapse() : this.expand()
  }

  getOtherBtns(): ButtonComponent[] {
    return this.buttons.filter(btn => btn != this.toggleButton)
  }
}
