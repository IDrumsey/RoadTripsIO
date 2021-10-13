import { Component, OnInit, Input, ContentChildren, QueryList, AfterViewInit } from '@angular/core';

import { ComponentOrientations } from '../../models/component-orientations';
import { ButtonComponent } from '../../Buttons/button/button.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Input() orientation: ComponentOrientations = ComponentOrientations.Horizontal;
  @Input() height: string = "auto";
  @Input() width: string = "auto";
  @Input() gap: number = 5;
  // https://codecraft.tv/courses/angular/components/viewchildren-and-contentchildren/
  @ContentChildren(ButtonComponent) buttonContentChildren: QueryList<ButtonComponent> = new QueryList();
  buttons: ButtonComponent[] = []

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonContentChildren.toArray();
  }

  getToolbarStyles(): {} {
    return {
      gap: `${this.gap}px`,
      height: this.height,
      width: this.width,
      flexDirection: this.orientation == ComponentOrientations.Horizontal ? "row" : "column"
    }
  }
}
