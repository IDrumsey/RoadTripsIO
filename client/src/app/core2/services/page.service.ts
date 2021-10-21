import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor() { }

  scrollToTop(): void {
    window.scrollTo(0, 0)
  }

  scrollToElement(element: HTMLElement): void {
    let coords = element.getBoundingClientRect()

    let scrollPx = coords.y

    let topElement = document.getElementById("top")
    if(topElement){
      scrollPx -= topElement.getBoundingClientRect().height
    }

    window.scrollBy(0, scrollPx)
  }
}
