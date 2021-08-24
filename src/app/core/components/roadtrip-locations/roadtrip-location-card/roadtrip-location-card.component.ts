import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { RoadtripStop } from 'src/app/core/data/Roadtrip/roadtrip-stop';

@Component({
  selector: 'app-roadtrip-location-card',
  templateUrl: './roadtrip-location-card.component.html',
  styleUrls: ['./roadtrip-location-card.component.css']
})
export class RoadtripLocationCardComponent implements OnInit {
  @Input() stop: RoadtripStop
  element: any

  // state
  showingContent = false;
  showingEditForm = false;
  @Input() isOwner = true

  constructor(element: ElementRef) {
    this.element = element.nativeElement
  }

  ngOnInit(): void {
  }

  toggleContent(): void {
    this.showingContent = !this.showingContent
  }

  showDetails(): void {
    this.showingContent = true;
  }

  hideDetails(): void {
    this.showingContent = false;
  }

  showEditForm(): void {
    this.showingEditForm = true;
  }

  hideEditForm(): void {
    this.showingEditForm = false;
  }

  persistChanges(newData: any): void {
    console.log("submitting changes : ", newData)
    this.hideEditForm()
  }
}
