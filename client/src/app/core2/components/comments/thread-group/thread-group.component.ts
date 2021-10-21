import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core2/data/models/comment/comment';
import { CommentV2Service, CommentParams, SortingDirections } from 'src/app/core2/services/comment-v2.service';

@Component({
  selector: 'app-thread-group',
  templateUrl: './thread-group.component.html',
  styleUrls: ['./thread-group.component.scss']
})
export class ThreadGroupComponent implements OnInit {

  constructor(private commentService: CommentV2Service) { }

  ngOnInit(): void {
    this.rootComments = this.commentService.sort(this.rootComments, CommentParams.Date, SortingDirections.Ascending)
  }

  // ----------------------------------- DATA -----------------------------------
  @Input() rootComments: Comment[]

  // ----------------------------------- FUNCTIONALITY -----------------------------------
}
