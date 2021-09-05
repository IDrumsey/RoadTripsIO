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

  submit(): Promise<void> {
    // if submitting anonymously -> confirm before upload because can't delete
    if(this.auth.currentlyLoggedInUser == null){
      return new Promise((resolve, reject) => {
        // show confirm anonymous popup
        this.anonymousConfirmShowing = true
        resolve()
      })
    }
    else{
      return this.uploadReply()
    }
  }

  uploadReply(): Promise<void> {
    let replyToUpload = new Comment(this.api, this.asyncService)
    replyToUpload.parentCommentId = this.parentComment?.id ? this.parentComment.id : null
    replyToUpload.text = this.text.value
    if(this.auth.currentlyLoggedInUser){
      replyToUpload.ownerId = this.auth.currentlyLoggedInUser.id
    }

    return new Promise((resolve, reject) => {
      replyToUpload.upload().then(uploadedReply => {
        if(this.auth.currentlyLoggedInUser){
          uploadedReply.owner = this.auth.currentlyLoggedInUser
        }
        
        if(this.parentComment){
          // non-root reply
          this.parentComment.addReplyOnly(uploadedReply)
          this.parentComment.update().then(() => {
            this.close.emit()
          }, err => {console.log("error adding reply to parent comment")})
        }
        else{
          // root reply
          this.roadtrip.addCommentWithUpload(uploadedReply).then(() => {
            this.close.emit()
            resolve()
          }, err => {reject(err)})
        }
      })
    })
  }

  cancelReplySubmit(): void {
    this.anonymousConfirmShowing = false
  }

  onCancelClick(): void {
    this.close.emit()
  }

  onSubmitClick(): void {
    this.submit().then(() => {
      // maybe add notification with option to undo?
    }, err => {
      alert("Error adding comment")
    })
  }

  onFocus(): void {
    this.typing.emit()
  }

  onBlur(): void {
    this.stoppedTyping.emit()
  }

  getPlaceholder(): string {
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
