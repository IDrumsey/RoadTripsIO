import { Component, OnInit, Input } from '@angular/core';

import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../models/Buttons/Button/button';
import {AppColors} from 'src/app/core/data/models/app-colors'

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent extends Button implements OnInit {
  @Input() icon: IconDefinition | null = null;
  @Input() iconSize: string = "25px";
  @Input() regularColor: string = AppColors.onColorLight;
  @Input() highlightColor: string | null = AppColors.onContrastBlue;

  iconColor: string = this.regularColor;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.iconColor = this.regularColor;
  }

  onIconMouseEnter() {
    this.highlightIcon();
  }

  onIconMouseExit() {
    this.removeIconHighlight();
  }

  highlightIcon() {
    if(this.highlightColor){
      this.iconColor = this.highlightColor;
    }
  }

  removeIconHighlight() {
    this.iconColor = this.regularColor;
  }

  getIconStyles(): {} {
    return {
      color: this.iconColor,
      fontSize: this.iconSize
    }
  }
}
