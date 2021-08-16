import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-roadtrip-location-card',
  templateUrl: './roadtrip-location-card.component.html',
  styleUrls: ['./roadtrip-location-card.component.css']
})
export class RoadtripLocationCardComponent implements OnInit {
  address = "123 Street ave. City, State Zip"
  latitude = 1.0252
  longitude = -24.915

  // state
  showingContent = false;
  showingEditForm = false;
  @Input() isOwner = true

  constructor() { }

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
