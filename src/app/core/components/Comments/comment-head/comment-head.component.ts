import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faFlag, faInfoCircle, faReply } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';

@Component({
  selector: 'app-comment-head',
  templateUrl: './comment-head.component.html',
  styleUrls: ['./comment-head.component.css']
})
export class CommentHeadComponent implements OnInit {
  // events
  @Output() detailsClick = new EventEmitter()
  @Output() replyClick = new EventEmitter()

  // data
  text: string = "Definitely some highlights on this trip!"

  // styles
  replyIcon = faReply
  reportIcon = faFlag
  detailsIcon = faInfoCircle

  // state
  reported: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onDetailsClick(): void {
    this.detailsClick.emit()
  }

  onReplyClick(): void {
    this.replyClick.emit()
  }

  getWrapperStyles(): {} {
    return {
      backgroundColor: AppColors.elevation4,
      color: AppColors.onColorLight,
      padding: "5px 20px",
      paddingTop: "10px",
      fontFamily: AppFonts.Handwriting
    }
  }
}
