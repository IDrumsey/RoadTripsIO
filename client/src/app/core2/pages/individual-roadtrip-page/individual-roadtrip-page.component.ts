import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationManagerComponent } from '../../components/notifications/notification-manager/notification-manager.component';

@Component({
  selector: 'app-individual-roadtrip-page',
  templateUrl: './individual-roadtrip-page.component.html',
  styleUrls: ['./individual-roadtrip-page.component.css']
})
export class IndividualRoadtripPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // --------------------------- DATA ---------------------------

  @ViewChild('NotificationManager') notificationManager: NotificationManagerComponent

  // --------------------------- EVENTS ---------------------------
  
  // --------------------------- EVENT HANDLERS ---------------------------
  onMarkerAdded(markerAdded: google.maps.Marker): void {
    let note = this.notificationManager.createNotification('Marker added', {bgColor: '#218a55'})

    this.notificationManager.addTempNotification(note, 3)
  }

  onMarkerDeleted(markerDeleted: google.maps.Marker): void {
    let note = this.notificationManager.createNotification('Marker deleted', {bgColor: '#8a203c'})

    this.notificationManager.addTempNotification(note, 3)
  }
}
