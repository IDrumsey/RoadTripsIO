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
      console.log("comment deleted from api")
      let parentComment: Comment | undefined

        if(!this.comment.isRoot()){
          console.log("not root comment")
          // redudant but necessary check if parent comment null
          if(this.comment.parentCommentId){
            parentComment = this.roadtrip.getComment(this.comment.parentCommentId)
            console.log("removing comment from parent replies")
            parentComment?.removeReply(this.comment)
          }
          else{
            console.log("couldn't find parent")
          }
        }
        else{
          // root comment
          console.log("removing comment from roadtrip")
          this.roadtrip.removeCommentWithoutUpload(this.comment)
        }

        // if replies, need to handle appropriately to ensure that replies of the deleted comment still persist
        if(this.comment.hasReplies()){
          // gen the placeholder
          console.log("generating placeholder")
          let placeholder = this.commentService.genDeletedCommentPlaceholder(this.comment)
          // add the placeholder to api
          console.log("uploading placeholder")
          placeholder.upload().then(uploadedPlaceholder => {
            console.log("placeholder uploaded")
            if(this.comment.isRoot()){
              // add placeholder to roadtrip
              console.log("adding placeholder to roadtrip")
              this.roadtrip.addCommentWithoutUpload(placeholder)
              console.log("updating roadtrip")
              this.roadtrip.update()
            }
            else{
              console.log("adding placeholder to parent comment")
              parentComment?.addReplyOnly(placeholder)
              console.log("updating parent comment")
              parentComment?.update()
            }
          })
        }
        else{
          // no replies -> no extra handling -> update roadtrip or parent
          if(this.comment.isRoot()){
            console.log("updating roadtrip")
            this.roadtrip.update()
          }
          else{
            console.log("updating parent comment")
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
