import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-i-map',
  templateUrl: './i-map.component.html',
  styleUrls: ['./i-map.component.css']
})
export class IMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.markers.push(new google.maps.Marker({position: {lat: 123, lng: 123}}))
  }

  // --------------------------------- DATA ---------------------------------
  markers: google.maps.Marker[] = []

  getMarkerPosition(marker: google.maps.Marker): google.maps.LatLng {
    return marker.getPosition() as google.maps.LatLng
  }
}
