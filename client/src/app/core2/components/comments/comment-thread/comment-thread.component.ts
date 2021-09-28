import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/data2/models/client/comment';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css']
})
export class CommentThreadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // ------------------------------------ DATA ------------------------------------

  @Input() rootComment: Comment

  // ------------------------------------ STYLES ------------------------------------

  @Input() gap: string = "10px"
  @Input() offset: number = 5

  threadStyles(): {} {
    return {
      gap: this.gap
    }
  }

  replyStyles(): {} {
    return {
      width: `${100-this.offset}%`,
      marginLeft: "auto"
    }
  }
}
