import { Component, OnInit, Input, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';

@Component({
  selector: 'app-image-gallery-v2',
  templateUrl: './image-gallery-v2.component.html',
  styleUrls: ['./image-gallery-v2.component.scss']
})
export class ImageGalleryV2Component implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.wrapperList.changes.subscribe(() => {
      this.defineWrappers()
    })

    this.defineWrappers()
  }

  // ---------------------------------- DATA ----------------------------------
  @Input() images: string[] = []

  @ViewChildren('imageWrapper') wrapperList: QueryList<ElementRef<HTMLElement>>
  wrappers: ElementRef<HTMLElement>[] = []

  // ---------------------------------- FUCNTIONALITY ----------------------------------
  defineWrappers(): void {
    this.wrappers = this.wrapperList.toArray()
    this.defineGrid()
  }

  defineGrid(): void {
    this.wrappers.forEach(wrapper => {
      wrapper.nativeElement.classList.add(`col-lg-${this.columns ? this.columns : "auto"}`)
      wrapper.nativeElement.classList.add(`col-md-${this.columns ? this.columns + 2 : "auto"}`)
      wrapper.nativeElement.classList.add(`col-sm-${this.columns ? this.columns + 2 : "auto"}`)
    })
  }
  
  
  // ---------------------------------- STYLES ----------------------------------

  private _columns: number = 4

  get columns(): number {
    return this._columns
  }
  
  @Input() set columns(num: number) {
    this._columns = 12 / num
  }
}
