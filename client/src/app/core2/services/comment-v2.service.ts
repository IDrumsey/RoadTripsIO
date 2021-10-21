import { Injectable } from '@angular/core';
import { Comment } from '../data/models/comment/comment';

export enum CommentParams {
  Alphabetical,
  Date,
  NumReplies
}

export enum SortingDirections {
  Ascending,
  Descending
}

@Injectable({
  providedIn: 'root'
})
export class CommentV2Service {

  constructor() { }

  // ---------------------------------------- FUNCTIONALITY ----------------------------------------

  private compareDateASC(a: Comment, b: Comment): number {
    return a.datePosted < b.datePosted ? -1 : 1
  }

  private compareDateDSC(a: Comment, b: Comment): number {
    return a.datePosted < b.datePosted ? 1 : -1
  }

  sort(comments: Comment[], param: CommentParams, direction = SortingDirections.Ascending): Comment[] {
    switch(param){
      case CommentParams.Date: {
        let sortFn = direction == SortingDirections.Ascending ? this.compareDateASC : this.compareDateDSC
        return comments.sort((a, b) => sortFn(a, b))
      }
    }
    return comments
  }
}
