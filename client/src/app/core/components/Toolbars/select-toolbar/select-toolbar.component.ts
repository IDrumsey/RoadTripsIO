import { Component, Input, OnInit, AfterViewInit, QueryList, ContentChildren } from '@angular/core';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { ButtonComponent } from '../../Buttons/button/button.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-select-toolbar',
  templateUrl: './select-toolbar.component.html',
  styleUrls: ['./select-toolbar.component.scss']
})
export class SelectToolbarComponent extends ToolbarComponent implements OnInit, AfterViewInit {
  @Input() selectForegroundColor: string = "#fff";
  @Input() selectBackgroundColor: string;
  selectedButtons: ButtonComponent[] = [];

  @ContentChildren("Selected") selectedButtonChildComponents: QueryList<ButtonComponent>;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.buttons = this.buttonContentChildren.toArray();
    this.initSelectedBtns(this.selectedButtonChildComponents.toArray())
    this.listenForBtnClicks()
  }

  initSelectedBtns(initialSelectedBtns: ButtonComponent[]): void {
    initialSelectedBtns.forEach(btn => {
      this.selectBtn(btn)
    })
  }

  listenForBtnClicks(): void {
    // this.buttons.forEach(btn => {
    //   btn.buttonClick.subscribe(() => {
    //     if(!this.isBtnSelected(btn)){
    //       this.selectBtn(btn);
    //     }
    //     else{
    //       this.unselectBtn(btn);
    //     }
    //   })
    // })
  }

  isBtnSelected(btn: ButtonComponent): boolean {
    if(this.selectedButtons.find(selectedBtn => btn == selectedBtn)){
      return true;
    }
    return false;
  }

  selectBtn(btn: ButtonComponent): void {
    this.selectedButtons.push(btn)
  }

  unselectBtn(btn: ButtonComponent): void {
    this.selectedButtons.splice(this.selectedButtons.indexOf(btn), 1)
  }
}
