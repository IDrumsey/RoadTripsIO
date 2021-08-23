import { Component, OnInit } from '@angular/core';
import { faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { CalendarService } from 'src/app/core/services/utilities/calendar.service';

@Component({
  selector: 'app-comment-body',
  templateUrl: './comment-body.component.html',
  styleUrls: ['./comment-body.component.css']
})
export class CommentBodyComponent implements OnInit {
  // data
  datePosted: Date = new Date()

  // styles
  dateIcon = faCalendarDay
  timeIcon = faClock

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
  }

  getDatePosted(): string {
    return this.calendarService.getDateStandard(this.datePosted)
  }

  getTimePosted(): string {
    return this.calendarService.getTime(this.datePosted)
  }

  getWrapperStyles(): {} {
    return {
      backgroundColor: AppColors.elevation3,
      color: AppColors.onColorLight,
      padding: "5px 20px"
    }
  }

  getTextStyles(): {} {
    return {
      fontFamily: AppFonts.Data,
      fontSize: "15px"
    }
  }

  getIconStyles(): {} {
    return {
      fontSize: "20px"
    }
  }
}
