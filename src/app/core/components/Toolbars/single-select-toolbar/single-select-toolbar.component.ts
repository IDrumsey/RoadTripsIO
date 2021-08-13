import { Component, OnInit } from '@angular/core';

import { ButtonComponent } from '../../Buttons/button/button.component';
import { SelectToolbarComponent } from '../select-toolbar/select-toolbar.component';

@Component({
  selector: 'app-single-select-toolbar',
  templateUrl: './single-select-toolbar.component.html',
  styleUrls: ['./single-select-toolbar.component.css']
})
export class SingleSelectToolbarComponent extends SelectToolbarComponent implements OnInit {
  selectedButton: ButtonComponent;

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

  initSelectedBtns(initialSelectedBtns: ButtonComponent[]): void {
    if(initialSelectedBtns.length > 0){
      this.selectedButton = initialSelectedBtns[0]
      this.selectBtn(initialSelectedBtns[0])
    }
  }

  selectBtn(btn: ButtonComponent): void {
    if(this.selectedButton){
      this.selectedButton.unselect(true);
    }

    btn.select(this.selectForegroundColor, this.selectBackgroundColor)
    this.selectedButton = btn;
    this.selectedButtons[0] = btn
  }
}
