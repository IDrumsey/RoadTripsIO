import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CalendarService } from 'src/app/core/services/utilities/calendar.service';
import { ImageReport } from 'src/app/core2/data/models/report/image-report';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';

@Component({
  selector: 'app-image-v2',
  templateUrl: './image-v2.component.html',
  styleUrls: ['./image-v2.component.scss']
})
export class ImageV2Component implements OnInit {

  constructor(private auth: AuthenticationService, private api: DataAccessService, private calendar: CalendarService, public ref: ElementRef) { }

  ngOnInit(): void {
    if(this.reportable && this.auth.currentlyLoggedInUser){
      this.getSubmittedReport().then(report => {
        this.submittedReport = report
      })
    }

    this.auth.userSignedIn.subscribe(userThatSignedIn => {
      if(this.reportable){
        this.getSubmittedReport().then(report => {
          this.submittedReport = report
        })
      }
    })
  }

  // -------------------------------------- DATA --------------------------------------

  @Input() filePath: string
  submittedReport: ImageReport | null

  // -------------------------------------- STATE --------------------------------------

  @Input() reportable = false
  get reported(): boolean {
    return this.submittedReport ? true : false
  }

  get hasImage(): boolean {
    return this.filePath ? true : false
  }

  get reportBtnTooltip(): string {
    let summary: string
    if(this.submittedReport){
      summary = `Reported on ${this.calendar.getDateStandard(this.submittedReport.date)} at ${this.calendar.getTime(this.submittedReport.date)}`
      if(this.submittedReport.msg){
        summary += `\nReason:\n${this.submittedReport.msg}`
      }
    }
    else{
      summary = ""
    }
    return summary
  }

  // -------------------------------------- EVENTS --------------------------------------

  @Output() sentReport = new EventEmitter<ImageReport>()
  @Output() retractedReport = new EventEmitter<ImageReport>()

  // -------------------------------------- EVENT HANDLERS --------------------------------------

  onReportBtnClick(): void {
    if(this.reported){
      this.retractReport()
    }
    else{
      this.report()
    }
  }

  // -------------------------------------- FUNCTIONALITY --------------------------------------

  report(): void {
    let reportToSend = new ImageReport()
    reportToSend.date = new Date()
    reportToSend.reporter = this.auth.currentlyLoggedInUser
    reportToSend.imageURL = this.filePath
    
    this.api.addImageReport(reportToSend).then(newReport => {
      this.submittedReport = newReport
      this.sentReport.emit(newReport)
    })
  }

  retractReport(): void {
    if(this.submittedReport){
      this.api.deleteImageReport(this.submittedReport).then(() => {
        if(this.submittedReport){
          this.retractedReport.emit(this.submittedReport)
        }
        this.submittedReport = null
      })
    }
  }

  getSubmittedReport(): Promise<ImageReport | null> {
    return new Promise((resolve, reject) => {
      if(this.auth.currentlyLoggedInUser){
        this.api.getUserImageReports(this.auth.currentlyLoggedInUser).then(userReports => {
          let imageReport = userReports.find(userReport => userReport.imageURL == this.filePath)
          if(imageReport){
            resolve(imageReport)
          }
          else{
            resolve(null)
          }
        })
      }
      else {
        reject("Couldn't get image report")
      }
    })
  }

  // -------------------------------------- STYLE --------------------------------------

  @Input() width: string = "auto"
  @Input() height: string = "auto"

  reportIcon = faFlag
  reportBtnFocusColor = "#f2ee74"

  get imgStyles(): {} {
    return {
      width: this.width,
      height: this.height
    }
  }
}
