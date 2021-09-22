import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-individual-roadtrip-page',
  templateUrl: './individual-roadtrip-page.component.html',
  styleUrls: ['./individual-roadtrip-page.component.css']
})
export class IndividualRoadtripPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // --------------------------- EVENTS ---------------------------
  
  // --------------------------- EVENT HANDLERS ---------------------------
  onMarkerAdded(markerAdded: google.maps.Marker): void {
    console.log("marker added to map : ", markerAdded)
  }

  onMarkerDeleted(markerDeleted: google.maps.Marker): void {
    console.log("marker deleted to map : ", markerDeleted)
  }
}
