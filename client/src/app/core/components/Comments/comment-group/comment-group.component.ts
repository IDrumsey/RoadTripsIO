import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/core/data2/models/client/comment';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss']
})
export class CommentGroupComponent implements OnInit, AfterContentInit {
  /*
  Used for holding multiple comments
  Only holds references to the root comments, but those comments recursively have refs to the nested comments
  comment added listened to from reply added event passed up through the thread to a root comment
  */

  constructor() { }

  @ContentChildren(CommentComponent, {descendants: true}) commentElements: QueryList<CommentComponent> = new QueryList()
  commentComponents: CommentComponent[]

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.defineCommentComponents()
    this.listenForRepliesAdded()

    this.commentElements.changes.subscribe(() => {
      this.defineCommentComponents()
      this.listenForRepliesAdded()
    })
  }

  // --------------------------------- DATA ---------------------------------

  // --------------------------------- EVENTS ---------------------------------
  @Output() commentAdded = new EventEmitter<Comment>()

  // --------------------------------- FUNCTIONALITY ---------------------------------

  defineCommentComponents(): void {
    this.commentComponents = this.commentElements.toArray()
  }

  listenForRepliesAdded(): void {
    this.commentComponents.forEach(commentComponent => {
      commentComponent.replyAdded.subscribe(newReply => {
        this.onCommentAdded(newReply)
      })
    })
  }

  onCommentAdded(newComment: Comment): void {
    this.commentAdded.emit(newComment)
  }
}
