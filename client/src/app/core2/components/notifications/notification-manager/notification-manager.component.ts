import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notification } from '../notification';
import { NotificationFactory } from '../notification-factory';
import { NotificationOptions } from '../notification-options';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrls: ['./notification-manager.component.scss']
})
export class NotificationManagerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private notificationFactory = new NotificationFactory()

  // ------------------------------- DATA -------------------------------

  notifications: Notification[] = []

  // ------------------------------- STATE -------------------------------
  @Input() exclusive = false

  // ------------------------------- EVENTS -------------------------------

  @Output() notificationAdded = new EventEmitter<Notification>()
  @Output() notificationRemoved = new EventEmitter<Notification>()

  // ------------------------------- SIGNALERS -------------------------------

  signal_notificationAdded(addedNotification: Notification): void {
    this.notificationAdded.emit(addedNotification)
  }

  signal_notificationRemoved(deletedNotification: Notification): void {
    this.notificationRemoved.emit(deletedNotification)
  }

  // ------------------------------- EVENT HANDLING -------------------------------
  onNotificationClick(notificationClicked: Notification): void {
    // BUG : the timers may still be trying to remove the already removed notification after this remove call
    this.removeNotification(notificationClicked)
  }

  // ------------------------------- FUNCTIONALITY -------------------------------

  addNotification(notification: Notification): void {
    if(this.exclusive){
      this.notifications.forEach(note => {
        this.removeNotification(note)
      })
    }
    this.notifications.push(notification)
    this.signal_notificationAdded(notification)
  }

  addTempNotification(notification: Notification, seconds: number): void {
    this.addNotification(notification)
    this.startDeleteTimer(seconds, notification)
  }

  removeNotification(notification: Notification): void {
    let index = this.notifications.indexOf(notification)
    if(index != -1){
      this.notifications.splice(index, 1)
      this.signal_notificationRemoved(notification)
    }
  }

  createNotification(message: string, options: NotificationOptions){
    let createdNotification = this.notificationFactory.generateNotification(message, options)
    return createdNotification
  }

  startDeleteTimer(seconds: number, notification: Notification): void {
    setTimeout(() => {
      this.removeNotification(notification)
    }, seconds * 1000)
  }
}
