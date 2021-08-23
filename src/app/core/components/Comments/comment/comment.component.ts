import { Component, OnInit, Input, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { AppColors } from 'src/app/core/data/models/app-colors';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {
  // data
  @ContentChildren(CommentComponent) replyChildren: QueryList<CommentComponent> = new QueryList()
  replies: CommentComponent[]

  // state
  showingHead: boolean = true
  showingBody: boolean = false
  replying: boolean = false

  // styles
  @Input() width: string = "100%"
  replyWidth = "90%"

  @Input() borderHighlightColor: string = "rgba(116, 162, 193, .75)"
  @Input() borderColor: string | null

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.replies = this.replyChildren.toArray()
  }

  toggleBody(): void {
    this.showingBody = !this.showingBody
  }

  reply(): void {
    this.replying = true
  }

  closeReply(): void {
    this.replying = false
  }

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
