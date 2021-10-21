import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Comment } from 'src/app/core2/data/models/comment/comment';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';
import { PageService } from 'src/app/core2/services/page.service';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.scss']
})
export class CommentThreadComponent implements OnInit, AfterViewInit {

  constructor(private ref: ElementRef, private api: DataAccessService, private pageService: PageService) {
    this.element = ref
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.replyThreadComponents.changes.subscribe(components => {
      let oldThreads = new Set(this.replyThreads)
      this.replyThreads = components.toArray()
      let newThreads = new Set(this.replyThreads)
      let difference = new Set([...newThreads].filter(thread => !oldThreads.has(thread)))
      difference.forEach(threadComponent => {
        this.replyCardShown.next(threadComponent)
      })
    })
  }

  // ------------------------------------ DATA ------------------------------------

  element: ElementRef

  @Input() rootComment: Comment
  @ViewChildren(CommentThreadComponent) replyThreadComponents = new QueryList<CommentThreadComponent>()
  replyThreads: CommentThreadComponent[] = []

  // ------------------------------------ STATE ------------------------------------

  showingThreadOptions = false
  showingReplies = false
  showingReplyField = false

  get toggleRepliesBtnText(): string {
    return this.showingReplies ? "Hide replies" : "Show replies"
  }

  get hasReplies(): boolean {
    return this.rootComment.replies.length > 0
  }

  // ------------------------------------ EVENTS ------------------------------------
  @Output() profileImageClicked = new EventEmitter<Comment>()
  replyCardShown = new Subject<CommentThreadComponent>()

  // ------------------------------------ SIGNALERS ------------------------------------
  signal_profileImageClicked(comment: Comment): void {
    this.profileImageClicked.emit(comment)
  }

  // ------------------------------------ EVENT HANDLERS ------------------------------------

  onProfileImageClick(comment: Comment): void {
    this.signal_profileImageClicked(comment)
  }

  onRootCommentMouseEnter(): void {
    this.showOptions()
  }

  onRootCommentMouseExit(): void {
    this.hideOptions()
  }

  onToggleRepliesBtnClick(): void {
    this.showingReplies ? this.hideReplies() : this.showNLevels(3)
  }

  onReplyBtnClick(): void {
    this.showingReplyField ? this.hideReplyField() : this.showReplyField()
  }

  onReplyCancel(): void {
    this.hideReplyField()
  }

  onReplySend(reply: Comment): void {
    // add reply to db
    this.api.addComment(reply).then(newReply => {
      this.rootComment.addReply(newReply)
      this.api.updateComment(this.rootComment).then(updatedRootComment => {
        this.rootComment = updatedRootComment
        this.hideReplyField()
        // wait for the reply threads to show on screen then scroll to new comment
        let threadAdditionWatcher = this.replyCardShown.subscribe(threadComponent => {
          if(threadComponent.rootComment.id == newReply.id){
            let newReplyThread = this.findReplyThread(newReply.id)
            if(newReplyThread){
              this.pageService.scrollToElement(newReplyThread.element.nativeElement)
            }
            threadAdditionWatcher.unsubscribe()
          }
        })
        this.showReplies()
      })
    }, err => {
      alert("Something went wrong, please try again later")
    })
  }

  // ------------------------------------ FUNCTIONALITY ------------------------------------

  showOptions(): void {
    this.showingThreadOptions = true
  }

  hideOptions(): void {
    this.showingThreadOptions = false
  }

  showReplies(): void {
    this.showingReplies = true
  }

  hideReplies(): void {
    this.showingReplies = false
  }

  showReplyField(): void {
    this.showingReplyField = true
  }

  hideReplyField(): void {
    this.showingReplyField = false
  }

  showNLevels(numLvls: number){
    let rootThreads = [this]

    for(let level = 0; level < numLvls; level++){
      let newRootThreads = []
      rootThreads.forEach(thread => {
        thread.showReplies()
        newRootThreads.push(thread.replyThreads)
      })
    }
  }

  findReplyThread(replyId: number): CommentThreadComponent | undefined {
    return this.replyThreads.find(thread => thread.rootComment.id == replyId)
  }

  // ------------------------------------ STYLES ------------------------------------

  @Input() gap: string = "10px"
  @Input() offset: number = 5

  replyIcon = faReply

  get threadStyles(): {} {
    return {
      gap: this.gap
    }
  }

  get replyStyles(): {} {
    return {
      width: `${100-this.offset}%`,
      marginLeft: "auto"
    }
  }
}
