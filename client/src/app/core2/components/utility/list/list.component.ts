import { Component, Input, OnInit } from '@angular/core';
import { ComponentOrientations } from 'src/app/core/components/models/component-orientations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // ----------------------------------- DATA -----------------------------------

  // ----------------------------------- STATE -----------------------------------
  
  // ----------------------------------- EVENTS -----------------------------------

  // ----------------------------------- EVENT HANDLERS -----------------------------------

  // ----------------------------------- FUNCTIONALITY -----------------------------------

  // ----------------------------------- STYLES -----------------------------------

  @Input() orientation: "Horizontal" | "Vertical"
  @Input() gap: string = "25px"

  get listStyles(): {} {
    return {
      flexDirection: this.orientation == "Horizontal" ? "row" : "column",
      gap: this.gap
    }
  }
}
