import { Component, OnInit, Input } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { GeneralImageComponent } from '../general-image/general-image.component';

@Component({
  selector: 'app-image-template',
  providers: [{provide: GeneralImageComponent, useExisting: ImageTemplateComponent}],
  templateUrl: './image-template.component.html',
  styleUrls: ['./image-template.component.scss']
})
export class ImageTemplateComponent extends GeneralImageComponent implements OnInit {

  @Input() bgColor: string = AppColors.elevation3;

  @Input() icon = faImage
  @Input() iconSize: string = "50px"

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getWrapperStyles(): {} {
    return {
      width: this.width,
      height: this.height,
      backgroundColor: this.bgColor,
      maxWidth: this.maxWidth
    }
  }

  getIconStyles(): {} {
    return {
      fontSize: this.iconSize
    }
  }
}
