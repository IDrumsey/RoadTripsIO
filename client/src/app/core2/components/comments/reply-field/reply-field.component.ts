import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Comment } from 'src/app/core2/data/models/comment/comment';

@Component({
  selector: 'app-reply-field',
  templateUrl: './reply-field.component.html',
  styleUrls: ['./reply-field.component.scss']
})
export class ReplyFieldComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  // --------------------------------------- DATA ---------------------------------------
  form = new FormGroup({
    message: new FormControl('', Validators.required)
  })

  // --------------------------------------- STATE ---------------------------------------

  get messageValid(): boolean {
    let valid = true

    let messageField = this.form.controls["message"]

    if(messageField.invalid && messageField.dirty){
      valid = false
    }

    return valid
  }

  // --------------------------------------- EVENTS ---------------------------------------
  @Output() cancel = new EventEmitter()
  @Output() send = new EventEmitter<Comment>()

  // --------------------------------------- EVENT HANDLERS ---------------------------------------
  onCancelBtnClick(): void {
    this.cancel.emit()
  }

  onSendBtnClick(): void {
    // create comment to send
    let reply = new Comment()
    reply.datePosted = new Date()
    if(this.auth.currentlyLoggedInUser){
      reply.owner = this.auth.currentlyLoggedInUser
    }
    reply.text = this.form.controls["message"].value

    this.send.emit(reply)
  }

  // --------------------------------------- FUNCTIONALTY ---------------------------------------

  // --------------------------------------- STYLES ---------------------------------------
  get inputStyles(): {} {
    return {
      fontFamily: AppFonts.Data,
      fontSize: "15px"
    }
  }
}
