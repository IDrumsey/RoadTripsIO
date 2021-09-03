import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/core/data2/models/client/comment';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { Roadtrip } from 'src/app/core/data2/models/client/roadtrip';

@Component({
  selector: 'app-comment[comment][roadtrip]',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  // ----------------------------------- DATA -----------------------------------
  @Input() comment: Comment
  @Input() roadtrip: Roadtrip

  // ----------------------------------- STATE -----------------------------------
  showingHead: boolean = true
  showingBody: boolean = false
  replying: boolean = false

  // ----------------------------------- FUNCTIONALITY -----------------------------------
  toggleBody(): void {
    this.showingBody = !this.showingBody
  }

  reply(): void {
    this.replying = true
  }

  closeReply(): void {
    this.replying = false
  }

  sortReplies(): Comment[] {
    return this.comment.replies.sort((a, b) => this.compareDates(a.datePosted, b.datePosted))
  }

  compareDates(date1: Date, date2: Date): number {
    if(date1 <= date2){
      return -1
    }
    else{
      return 1
    }
  }

  // ----------------------------------- STYLES -----------------------------------
  @Input() width: string = "100%"
  replyWidth = "90%"

  @Input() borderHighlightColor: string = "rgba(116, 162, 193, .75)"
  @Input() borderColor: string | null

  getWrapperStyles(): {} {
    return {
      width: this.width
    }
  }

  highlightComment(): void {
    this.borderColor = this.borderHighlightColor
  }

  removeCommentHighlight(): void {
    this.borderColor = null
  }

  getCommentStyles(): {} {
    return {
      boxShadow: this.borderColor ?  `-4px 0 ${this.borderColor}` : "none"
    }
  }
}
