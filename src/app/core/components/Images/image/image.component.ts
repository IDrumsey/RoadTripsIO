import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

import { GeneralImageComponent } from '../general-image/general-image.component';

@Component({
  selector: 'app-image[filePath]',
  providers: [{provide: GeneralImageComponent, useExisting: ImageComponent}],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent extends GeneralImageComponent implements OnInit {
  // data
  @Input() filePath: string

  reportIcon = faFlag
  reportColor = "#FFFDBB"
  reportHoverColor = "#F9F685"

  // state
  reported: boolean = true;

  constructor(private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
  }

  getFilePath(): SafeUrl {
    // https://stackoverflow.com/questions/57743966/getting-unsafe-url-error-while-displaying-image
    return this.sanitizer.bypassSecurityTrustUrl(this.filePath);
  }

  getImageStyles(): {} {
    return {
      width: this.width,
      height: this.height,
      maxWidth: this.maxWidth
    }
  }

  reportImage(): void {
    console.log("reporting image")
  }
}
