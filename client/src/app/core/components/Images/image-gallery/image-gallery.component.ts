import { Component, OnInit, ContentChildren, QueryList, AfterViewInit, Input } from '@angular/core';

import { ImageTemplateComponent } from '../image-template/image-template.component';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  // data
  @ContentChildren(ImageTemplateComponent) templateImageChildren: QueryList<ImageTemplateComponent> = new QueryList();
  @ContentChildren(ImageComponent) filledImageChildren: QueryList<ImageComponent> = new QueryList();

  filledImages: ImageComponent[]
  templateImages: ImageTemplateComponent[]

  // styles
  @Input() width: string = "100%"
  @Input() height: string = "auto"
  @Input() numCols: number = 3;
  @Input() rowHeight: string = "auto"
  @Input() gap: string = "25px"

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.filledImages = this.filledImageChildren.toArray()
    this.templateImages = this.templateImageChildren.toArray()
    this.alterImageStyles()
  }

  alterImageStyles(): void {
    this.filledImages.forEach(img => {
      img.height = this.rowHeight
      img.width = "auto"
    })

    this.templateImages.forEach(img => {
      img.width = "100%"
      img.height = "100%"
    })
  }

  getGalleryStyles(): {} {
    return {
      width: this.width,
      height: this.height,
      gridTemplateColumns: `repeat(${this.numCols}, 1fr)`,
      gap: this.gap
    }
  }
}
