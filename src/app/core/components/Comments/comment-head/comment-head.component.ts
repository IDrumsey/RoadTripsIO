import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faFlag, faInfoCircle, faReply, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Comment } from 'src/app/core/data2/models/client/comment';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Roadtrip } from 'src/app/core/data2/models/client/roadtrip';
import { CommentService } from 'src/app/core/services/comments/comment.service';

@Component({
  selector: 'app-comment-head',
  templateUrl: './comment-head.component.html',
  styleUrls: ['./comment-head.component.css']
})
export class CommentHeadComponent implements OnInit {
  constructor(private auth: AuthenticationService, private commentService: CommentService) { }

  ngOnInit(): void {
  }

  // ----------------------------------- EVENTS -----------------------------------
  @Output() detailsClick = new EventEmitter()
  @Output() replyClick = new EventEmitter()

  // ----------------------------------- DATA -----------------------------------
  @Input() comment: Comment
  @Input() roadtrip: Roadtrip

  // ----------------------------------- STATE -----------------------------------
  replyIcon = faReply
  reportIcon = faFlag
  detailsIcon = faInfoCircle
  deleteIcon = faTrashAlt

  getWrapperStyles(): {} {
    return {
      backgroundColor: AppColors.elevation4,
      color: AppColors.onColorLight,
      padding: "10px 20px",
      fontFamily: AppFonts.Handwriting
    }
  }

  deleteBtnColor = AppColors.onContrastRed
  deleteBtnHoverColor = AppColors.onContrastDarkRed

  // ----------------------------------- STATE -----------------------------------
  reported: boolean = true
  showingDeleteConfirmationPopup = false

  // ----------------------------------- FUNCTIONALITY -----------------------------------
  onDetailsClick(): void {
    this.detailsClick.emit()
  }

  onReplyClick(): void {
    this.replyClick.emit()
  }

  isOwner(): boolean {
    if(this.comment.owner != null && this.auth.currentlyLoggedInUser){
      return this.comment.owner.id == this.auth.currentlyLoggedInUser.id
    }
    return false
  }

  onDeleteCommentBtnClick(): void {
    this.showingDeleteConfirmationPopup = true
  }

  onConfirmDelete(): void {
    // close confirmation popup
    this.showingDeleteConfirmationPopup = false

    this.comment.deleteFromAPI().then(() => {
      let parentComment: Comment | undefined

        if(!this.comment.isRoot()){
          // redudant but necessary check if parent comment null
          if(this.comment.parentCommentId){
            parentComment = this.roadtrip.getComment(this.comment.parentCommentId)
            parentComment?.removeReply(this.comment)
          }
          else{
            console.log("couldn't find parent")
          }
        }
        else{
          // root comment
          this.roadtrip.removeCommentWithoutUpload(this.comment)
        }

        // if replies, need to handle appropriately to ensure that replies of the deleted comment still persist
        if(this.comment.hasReplies()){
          // gen the placeholder
          let placeholder = this.commentService.genDeletedCommentPlaceholder(this.comment)
          // add the placeholder to api
          placeholder.addToAPI().then(uploadedPlaceholder => {
            if(this.comment.isRoot()){
              // add placeholder to roadtrip
              this.roadtrip.addCommentWithoutUpload(placeholder)
              this.roadtrip.update()
            }
            else{
              parentComment?.addReply(placeholder)
              parentComment?.update()
            }
          })
        }
        else{
          // no replies -> no extra handling -> update roadtrip or parent
          if(this.comment.isRoot()){
            this.roadtrip.update()
          }
          else{
            parentComment?.update()
          }
        }
    }, err => {
      console.log("couldn't delete comment from the api")
    })
  }

  onCancelDelete(): void {
    this.showingDeleteConfirmationPopup = false
  }
}
