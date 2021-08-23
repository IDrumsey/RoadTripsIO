import { Injectable } from '@angular/core';
import { StringService } from './string.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private stringService: StringService) { }

  getTime(date: Date){
    let hour = this.getHourStandard(date.getHours())
    let ending = this.isPm(date.getHours()) ? "PM" : "AM"

    return `${hour}:${date.getMinutes()} ${ending}`
  }

  isPm(hour: number) {
    return hour >= 12
  }

  getHourStandard(hour: number): number {
    if(this.isPm(hour)){
      return hour - 12
    }
    else{
      return hour
    }
  }

  getDateStandard(date: Date): string {
    return `${this.stringService.numToDoubleFormat(date.getMonth())}/${this.stringService.numToDoubleFormat(date.getDate())}/${this.stringService.numToDoubleFormat(date.getFullYear())}`
  }
}
