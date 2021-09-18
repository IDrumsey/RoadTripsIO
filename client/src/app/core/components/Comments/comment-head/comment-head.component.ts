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
    // check if reported -> change btn color
    if(this.isReported()){
      this.reportBtnColor = this.reportBtnColor_Reported
      this.reportBtnHoverColor = this.reportBtnHoverColor_Reported
    }
  }

  // ----------------------------------- EVENTS -----------------------------------
  @Output() detailsClick = new EventEmitter()
  @Output() replyClick = new EventEmitter()

  // ----------------------------------- DATA -----------------------------------
  @Input() comment: Comment
  @Input() roadtrip: Roadtrip

  // ----------------------------------- STYLES -----------------------------------
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

  reportBtnColor_NotReported = AppColors.onColorLight
  reportBtnHoverColor_NotReported = AppColors.onColor
  reportBtnColor_Reported = "#e7ed74"
  reportBtnHoverColor_Reported = "#e1eb34"
  reportBtnColor: string = this.reportBtnColor_NotReported
  reportBtnHoverColor: string = this.reportBtnHoverColor_NotReported

  // ----------------------------------- STATE -----------------------------------
  showingDeleteConfirmationPopup = false
  @Input() showingBody: boolean

  isUserLoggedIn(): boolean {
    if(this.auth.currentlyLoggedInUser){
      return true
    }
    return false
  }

  isReported(): boolean {
    if(this.auth.currentlyLoggedInUser){
      let found = this.auth.currentlyLoggedInUser?.reportedComments.find(reportedComment => reportedComment.id == this.comment.id)
      if(found != null){
        return true
      }
    }
    return false
  }

  getReportBtnHoverMsg(): string {
    if(!this.isReported()){
      return "Report comment"
    }
    else{
      return "Remove report"
    }
  }

  getDetailsBtnHoverMsg(): string {
    if(this.showingBody){
      return "Hide details"
    }
    else{
      return "Show details"
    }
  }

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

  onReportBtnClick(): void {
    if(this.isReported()){
      this.attemptUnreportComment()
    }
    else{
      this.attemptReportComment()
    }
  }

  attemptReportComment(): void {
    if(this.auth.currentlyLoggedInUser){
      this.auth.currentlyLoggedInUser.reportComment(this.comment, this.auth).then(reportedComment => {
        this.reportBtnColor = this.reportBtnColor_Reported
        this.reportBtnHoverColor = this.reportBtnHoverColor_Reported
      }, err => {
        alert("Couldn't report comment")
        console.log(err)
      })
    }
  }

  attemptUnreportComment(): void {
    if(this.auth.currentlyLoggedInUser){
      this.auth.currentlyLoggedInUser.unreportComment(this.comment, this.auth).then(unreportedComment => {
        this.reportBtnColor = this.reportBtnColor_NotReported
        this.reportBtnHoverColor = this.reportBtnHoverColor_NotReported
      }, err => {
        alert("Couldn't unreport comment")
        console.log(err)
      })
    }
  }
}
