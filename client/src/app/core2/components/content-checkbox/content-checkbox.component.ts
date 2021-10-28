import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-content-checkbox',
  templateUrl: './content-checkbox.component.html',
  styleUrls: ['./content-checkbox.component.scss']
})
export class ContentCheckboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // -------------------------------- STATE --------------------------------

  private _selected = false

  @Input() set selected(value: boolean) {
    this._selected = value
    this._selected ? this.checked.emit() : this.unchecked.emit()
  }

  get selected(): boolean {
    return this._selected
  }

  // -------------------------------- EVENTS --------------------------------

  @Output() checked = new EventEmitter()
  @Output() unchecked = new EventEmitter()
}
