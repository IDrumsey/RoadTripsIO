import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NotificationManagerComponent } from 'src/app/core2/components/notifications/notification-manager/notification-manager.component';

@Component({
  selector: 'app-tester-page',
  templateUrl: './tester-page.component.html',
  styleUrls: ['./tester-page.component.css']
})
export class TesterPageComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    let newNote = this.noteManager.createNotification("this is a notification", {
      bgColor: "#f00"
    })

    this.noteManager.addTempNotification(newNote, 2);

    let newNote2 = this.noteManager.createNotification("this is a notification 2", {
      bgColor: "#00f"
    })

    this.noteManager.addTempNotification(newNote2, 5);
  }

  @ViewChild('notes') noteManager: NotificationManagerComponent
}
