import { Injectable } from '@angular/core';
import { Comment } from '../../data2/models/client/comment';
import { AsyncService } from '../async.service';
import { DataAccessService } from '../data/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private api: DataAccessService, private asyncService: AsyncService) { }

  private genPlaceholderComment(): Comment {
    let placeholder = new Comment(this.api, this.asyncService)
    return placeholder
  }

  genDeletedCommentPlaceholder(deletedComment: Comment): Comment {
    let placeholder = this.genPlaceholderComment()
    // copy over the data that needs to be preserved after deletion
    placeholder.id = deletedComment.id
    placeholder.replies = deletedComment.replies
    placeholder.text = "This comment was deleted"
    placeholder.datePosted = deletedComment.datePosted

    return placeholder
  }
}
