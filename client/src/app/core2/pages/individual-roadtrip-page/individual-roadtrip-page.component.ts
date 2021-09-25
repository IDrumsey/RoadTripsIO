import { Component, OnInit, ViewChild } from '@angular/core';
import { RoadtripStop } from 'src/app/core/data2/models/client/roadtrip-stop';
import { DataAccessService } from 'src/app/core/services/data/data-access.service';
import { NotificationManagerComponent } from '../../components/notifications/notification-manager/notification-manager.component';

@Component({
  selector: 'app-individual-roadtrip-page',
  templateUrl: './individual-roadtrip-page.component.html',
  styleUrls: ['./individual-roadtrip-page.component.css']
})
export class IndividualRoadtripPageComponent implements OnInit {

  constructor(private dataLoader: DataAccessService) { }

  ngOnInit(): void {
    this.loadData()
  }

  // --------------------------- DATA ---------------------------

  @ViewChild('NotificationManager') notificationManager: NotificationManagerComponent

  stops: RoadtripStop[] = []

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

  // --------------------------- FUNCTIONALITY ---------------------------
  loadData(): Promise<void> {
    return new Promise((resolve) => {
      this.dataLoader.getAllRoadtripStops().subscribe(stopsFound => {
        stopsFound.forEach(stop => {
          stop.loadAdditionalData().then(() => {
            this.stops.push(stop)
          })
        })
      })
    })
  }
}
