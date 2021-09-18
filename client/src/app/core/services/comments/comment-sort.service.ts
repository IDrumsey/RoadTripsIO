import { Injectable } from '@angular/core';
import { Comment } from '../../data2/models/client/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentSortService {
  constructor() { }

  sortByDatePosted(comments: Comment[]): Comment[] {
    return comments.sort((a, b) => this.compareByDate(a, b))
  }

  private compareByDate(comment1: Comment, comment2: Comment): number {
    if(comment1.datePosted < comment2.datePosted){
      return -1
    }
    else{
      return 1
    }
  }
}
