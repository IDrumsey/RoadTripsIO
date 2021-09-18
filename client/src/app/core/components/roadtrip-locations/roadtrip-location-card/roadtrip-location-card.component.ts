import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';

import { RoadtripStop } from 'src/app/core/data2/models/client/roadtrip-stop';

@Component({
  selector: 'app-roadtrip-location-card',
  templateUrl: './roadtrip-location-card.component.html',
  styleUrls: ['./roadtrip-location-card.component.css']
})
export class RoadtripLocationCardComponent implements OnInit {
  constructor(element: ElementRef) {
    this.element = element.nativeElement
  }

  ngOnInit(): void {
  }

  // ------------------------------------------ DATA ------------------------------------------
  @Input() stop: RoadtripStop
  element: any

  // ------------------------------------------ STATE ------------------------------------------
  showingContent = false;
  showingEditForm = false;
  @Input() isOwner = true
  showingDeleteConfirmationPopup = false
  deleteEnabled = true

  // ------------------------------------------ EVENTS ------------------------------------------
  @Output() deleteStopEvent = new EventEmitter<RoadtripStop>()

  // ------------------------------------------ EVENT HANDLERS ------------------------------------------
  onDetailsClick(): void {
    this.toggleContent()
  }

  onDeleteClick(): void {
    this.showConfirmation()
    this.disableDeleteButton()
  }

  onConfirmationCancel(): void {
    this.enableDeleteButton()
    this.hideConfirmation()
  }

  onConfirmationConfirm(): void {
    this.deleteStopEvent.emit(this.stop)
    this.hideConfirmation()
  }

  // ------------------------------------------ FUNCTIONALITY ------------------------------------------

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

  private showConfirmation(): void {
    this.showingDeleteConfirmationPopup = true
  }

  private hideConfirmation(): void {
    this.showingDeleteConfirmationPopup = false
  }

  private disableDeleteButton(): void {
    this.deleteEnabled = false
  }

  private enableDeleteButton(): void {
    this.deleteEnabled = true
  }
}
