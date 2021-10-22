import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { Comment } from 'src/app/core2/data/models/comment/comment';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';
import { CommentV2Service, SortingOptions } from 'src/app/core2/services/comment-v2.service';
import { PageService } from 'src/app/core2/services/page.service';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.scss']
})
export class CommentThreadComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private ref: ElementRef, private api: DataAccessService, private pageService: PageService, private commentService: CommentV2Service) {
    this.element = ref
  }

  ngOnInit(): void {
    if(this.sortingOptions){
      this.sort()
    }
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

  ngOnChanges(changes: SimpleChanges): void {
    // https://dev.to/nickraphael/ngonchanges-best-practice-always-use-simplechanges-always-1feg
    if(changes.sortingOptions && changes.sortingOptions.currentValue){
      this.sort()
    }
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

  @Input() sortingOptions: SortingOptions

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

  showReplies(): Promise<void> {
    this.showingReplies = true
    return new Promise((resolve) => {
      let threadsShowing: CommentThreadComponent[] = []

      let threadAdditionWatcher = this.replyCardShown.subscribe(threadAdded => {
        threadsShowing.push(threadAdded)
        if(threadsShowing.length == this.rootComment.replies.length){
          // all the replies are now showing on the screen
          threadAdditionWatcher.unsubscribe()
          resolve()
        }
      })
    })
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
    this.commentService.expandThreadNLevels(this, numLvls)
  }

  findReplyThread(replyId: number): CommentThreadComponent | undefined {
    return this.replyThreads.find(thread => thread.rootComment.id == replyId)
  }

  sort(): void {
    this.rootComment.replies = this.commentService.sort(this.rootComment.replies, this.sortingOptions.param, this.sortingOptions.direction)
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
      marginLeft: "auto",
      gap: this.gap
    }
  }
}
