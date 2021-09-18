import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { Comment } from 'src/app/core/data2/models/client/comment';
import { Roadtrip } from 'src/app/core/data2/models/client/roadtrip';
import { AsyncService } from 'src/app/core/services/async.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DataAccessService } from 'src/app/core/services/data/data-access.service';

@Component({
  selector: 'app-reply[parentComment][roadtrip]',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  constructor(private api: DataAccessService, private asyncService: AsyncService, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  // events
  @Output() close = new EventEmitter()
  @Output() typing = new EventEmitter()
  @Output() stoppedTyping = new EventEmitter()
  @Output() uploaded = new EventEmitter<Comment>()

  // data
  text = new FormControl(null, Validators.required)
  @Input() parentComment: Comment | null
  @Input() roadtrip: Roadtrip

  // ------------------------------ STATE ------------------------------
  anonymousConfirmShowing = false

  // styles
  @Input() width: string = "95%"
  discardBtnColor = AppColors.onContrastDarkRed
  discardBtnHoverColor = AppColors.onContrastRed
  submitBtnColor = AppColors.onContrastDarkGreen
  submitBtnHoverColor = AppColors.onContrastGreen
  btnFontSize = "15px"

  getReplyStyles(): {} {
    return {
      width: this.width
    }
  }

  cancelAnonymousSubmitConfirmation(): void {
    this.anonymousConfirmShowing = false
  }

  onCancelClick(): void {
    this.close.emit()
  }

  onSubmitClick(): void {
    if(this.auth.currentlyLoggedInUser == null){
        // show confirm anonymous popup
        this.anonymousConfirmShowing = true
    }
    else{
      this.submitReply()
    }
  }

  submitReply(): void {
    this.uploadReply().then(uploadedReply => {
      // comment uploaded to api
      if(this.parentComment){
        // non-root reply
        this.parentComment.addReply(uploadedReply)
        this.parentComment.update().then(() => {
        }, err => {console.log("error adding reply to parent comment")})
      }
      this.close.emit()
      this.uploaded.emit(uploadedReply)
    }, err => {alert("Error adding comment")})
  }

  uploadReply(): Promise<Comment> {
    let replyToUpload = new Comment(this.api, this.asyncService)
    replyToUpload.parentCommentId = this.parentComment?.id ? this.parentComment.id : null
    replyToUpload.text = this.text.value
    if(this.auth.currentlyLoggedInUser){
      replyToUpload.ownerId = this.auth.currentlyLoggedInUser.id
    }

    return new Promise((resolve, reject) => {
      replyToUpload.addToAPI().then(uploadedReply => {
        if(this.auth.currentlyLoggedInUser){
          uploadedReply.owner = this.auth.currentlyLoggedInUser
        }
        resolve(uploadedReply)
      }, err => reject(err))
    })
  }

  onFocus(): void {
    this.typing.emit()
  }

  onBlur(): void {
    this.stoppedTyping.emit()
  }

  getPlaceholderText(): string {
    if(this.parentComment?.parentCommentId == null){
      return `Commenting on ${this.roadtrip.owner.username}'s roadtrip`
    }
    else{
      if(this.parentComment.owner){
        return `Responding to ${this.parentComment.owner.username}`
      }
      else{
        return `Responding to anonymous`
      }
    }
  }
}
