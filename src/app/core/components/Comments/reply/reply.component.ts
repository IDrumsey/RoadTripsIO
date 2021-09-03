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

  submit(): Promise<boolean> {
    console.log("submit")
    let replyToUpload = new Comment(this.api, this.asyncService)
    replyToUpload.parentCommentId = this.parentComment?.id ? this.parentComment.id : null
    replyToUpload.text = this.text.value
    if(this.auth.currentlyLoggedInUserId){
      replyToUpload.ownerId = this.auth.currentlyLoggedInUserId
    }

    return new Promise((resolve, reject) => {
      if(this.parentComment){
        // non-root reply
        this.parentComment.addReply(replyToUpload).then(uploadedReply => {
          this.close.emit()
          this.roadtrip.addCommentWithoutUpload(uploadedReply)
          resolve(true)
        }, err => {reject(false)})
      }
      else{
        // root reply
        this.roadtrip.addCommentWithUpload(replyToUpload).then(status => {
          this.close.emit()
          resolve(true)
        }, err => {reject(false)})
      }
    })
  }

  onCancelClick(): void {
    this.close.emit()
  }

  onSubmitClick(): void {
    this.submit().then(success => {
      if(success){
        console.log("added comment")
      }
      else{
        alert("Error adding comment")
      }
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
