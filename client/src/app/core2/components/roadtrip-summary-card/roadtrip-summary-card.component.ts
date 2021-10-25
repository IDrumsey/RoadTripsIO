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

  // ----------------------------------- EVENT HANDLERS -----------------------------------

  onProfileImageClick(user: User): void {
    this.profileImageClick.emit(user)
  }

  onHover(): void {
    this.showDetails()
  }

  onMouseOut(): void {
    this.hideDetails()
  }

  // ----------------------------------- FUNCTIONALITY -----------------------------------

  showDetails(): void {
    this.showingDetails = true
  }

  hideDetails(): void {
    this.showingDetails = false
  }

  // ----------------------------------- STYLES -----------------------------------
  userIcon = faUserCircle

  get titleStyles(): {} {
    return {
      marginBottom: this.showingDetails ? "25px" : 0
    }
  }
}
