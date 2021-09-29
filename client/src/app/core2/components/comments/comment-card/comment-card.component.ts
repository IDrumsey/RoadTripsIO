import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { faCalendarDay, faClock, faEllipsisH, faEllipsisV, faExclamationCircle, faInfoCircle, faUserCircle, faUserSecret, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ExpandDirections } from 'src/app/core/components/models/Toolbars/expand-directions';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { Comment } from 'src/app/core/data2/models/client/comment';
import { CalendarService } from 'src/app/core/services/utilities/calendar.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit, AfterViewInit {

  constructor(private changeDetector: ChangeDetectorRef, private calendarService: CalendarService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true
    this.changeDetector.detectChanges()
  }

  // ------------------------------------ DATA ------------------------------------

  @Input() comment: Comment

  @ViewChild('card') cardElement: ElementRef<HTMLElement>

  noProfileImageOwnerName(): string {
    return this.comment.owner ? this.comment.owner.username : "Anonymous User"
  }

  // ------------------------------------ STATE ------------------------------------

  showingDetails = false
  toolsExpanded = false
  toolsExpandDirection = ExpandDirections.Left

  showingOverflowingText = false
  toggleOverflowTextButtonText = () => {
    return this.showingOverflowingText ? "Show less" : "Show all"
  }

  viewInitialized = false

  // ------------------------------------ EVENTS ------------------------------------
  @Output() profileImageClicked = new EventEmitter()

  // ------------------------------------ SIGNALERS ------------------------------------
  signal_profileImageClicked(): void {
    this.profileImageClicked.emit()
  }

  // ------------------------------------ EVENT HANDLERS ------------------------------------

  onToggleDetailsButtonClick(): void {
    this.toggleDetails()
  }

  onShowAllTextButtonClick(): void {
    this.toggleOverflowingText()
  }

  onProfileImageClick(): void {
    this.signal_profileImageClicked()
  }

  // ------------------------------------ FUNCTIONALITY ------------------------------------

  toggleDetails(): void {
    this.showingDetails ? this.hideDetails() : this.showDetails()
  }

  showDetails(): void {
    this.showingDetails = true
  }
  
  hideDetails(): void {
    this.showingDetails = false
  }

  hasProfileImage(): boolean {
    return this.comment.owner && this.comment.owner.photo ? true : false
  }

  doesTextOverlow(): boolean {
    let textElement = this.cardElement.nativeElement.getElementsByClassName('comment-card-text')[0]
    let textHeight = textElement.clientHeight;

    return textHeight > this.textOverflowHeight
  }

  displayShowAllButton(): boolean {
    return this.viewInitialized ? this.doesTextOverlow() : false
  }

  toggleOverflowingText(): void {
    this.showingOverflowingText ? this.hideOverflowingText() : this.showOverflowingText()
  }

  showOverflowingText(): void {
    this.showingOverflowingText = true
  }

  hideOverflowingText(): void {
    this.showingOverflowingText = false
  }

  getDate(): string {
    return this.calendarService.getDateStandard(this.comment.datePosted)
  }

  getTime(): string {
    return this.calendarService.getTime(this.comment.datePosted)
  }

  // ------------------------------------ STYLES ------------------------------------
  noProfileImageReplacementIcon = faUserCircle
  anonymousOwnerIcon = faUserSecret

  toggleToolsIconExpanded = faEllipsisV
  toggleToolsIconCollapsed = faEllipsisH

  reportIcon = faExclamationCircle
  detailsIcon = faInfoCircle

  dateIcon = faCalendarDay
  timeIcon = faClock

  textSize = 15

  textOverflowHeight = (this.textSize * 1.35) * 3

  toggleButtonIcon(): IconDefinition {
    return this.toolsExpanded ? this.toggleToolsIconCollapsed : this.toggleToolsIconExpanded
  }

  cardPadding = "10px 20px"

  headStyles(): {} {
    return {
      backgroundColor: AppColors.elevation4,
      padding: this.cardPadding
    }
  }

  detailsStyles(): {} {
    return {
      backgroundColor: AppColors.elevation3,
      padding: this.cardPadding,
      color: AppColors.lightGrey,
      fontWeight: "bold"
    }
  }

  textWrapperStyles(): {} {
    return {
      maxHeight: !this.showingOverflowingText ? `${this.textOverflowHeight}px` : "fit-content"
    }
  }

  textStyles(): {} {
    return {
      fontFamily: AppFonts.Data,
      fontSize: `${this.textSize}px`,
      color: AppColors.onColorLight
    }
  }

  noProfileImageIconStyles(): {} {
    return {
      color: AppColors.onColorLight,
      fontSize: this.comment.owner ? "35px" : "25px",
      padding: this.comment.owner ? "0" : "0 5px"
    }
  }

  noProfileImageIcon(): IconDefinition {
    return this.comment.owner ? this.noProfileImageReplacementIcon : this.anonymousOwnerIcon
  }
}
