import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Roadtrip } from '../../data/models/roadtrip/roadtrip';
import { User } from '../../data/models/user/user';

@Component({
  selector: 'app-roadtrip-summary-card',
  templateUrl: './roadtrip-summary-card.component.html',
  styleUrls: ['./roadtrip-summary-card.component.scss']
})
export class RoadtripSummaryCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // ----------------------------------- DATA -----------------------------------

  @Input() roadtrip: Roadtrip

  // ----------------------------------- STATE -----------------------------------

  showingDetails = false

  // ----------------------------------- EVENTS -----------------------------------

  @Output() profileImageClick = new EventEmitter<User>()
  @Output() detailsOpened = new EventEmitter()
  @Output() detailsClosed = new EventEmitter()

  // ----------------------------------- EVENT HANDLERS -----------------------------------

  onProfileImageClick(user: User): void {
    this.profileImageClick.emit(user)
  }

  // ----------------------------------- FUNCTIONALITY -----------------------------------

  showDetails(): void {
    this.showingDetails = true
    this.detailsOpened.emit()
  }

  hideDetails(): void {
    this.showingDetails = false
    this.detailsClosed.emit()
  }

  // ----------------------------------- STYLES -----------------------------------
  userIcon = faUserCircle

  get titleStyles(): {} {
    return {
      marginBottom: this.showingDetails ? "25px" : 0
    }
  }
}
