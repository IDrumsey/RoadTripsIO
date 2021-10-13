import { Component, ContentChildren, OnInit, QueryList, AfterViewInit, Input } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-toolbar-group',
  templateUrl: './toolbar-group.component.html',
  styleUrls: ['./toolbar-group.component.scss']
})
export class ToolbarGroupComponent implements OnInit, AfterViewInit {
  // data
  @ContentChildren(ToolbarComponent) private toolbarChildren: QueryList<ToolbarComponent> = new QueryList()
  toolbars: ToolbarComponent[]

  // styles
  @Input() gap: number = 25
  @Input() width: string = "100%"

  wrapperStyles: {}
  

  constructor() { }

  ngOnInit(): void {
    this.wrapperStyles = {
      gap: `${this.gap}px`,
      width: this.width
    }
  }

  ngAfterViewInit(): void {
    this.toolbars = this.toolbarChildren.toArray()
  }
}
