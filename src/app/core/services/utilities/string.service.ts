import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {

  constructor() { }

  numToDoubleFormat(num: number){
    if(num < 10){
      return `0${num}`
    }
    return num
  }

  getGoogleMapsURLByAddress(address: string){
    let base = "https://www.google.com/maps/search/?api=1&query="

    let url = base;
    
    for(let i = 0; i < address.length; i++){
      let currChar = address[i]

      switch(currChar){
        case ' ': {
          url += '+'
          break
        }
        case ',': {
          url += "%2C"
          break
        }
        default: {
          url += currChar
        }
      }
    }

    return url
  }

  getGoogleMapsURLbyCoordinates(lat: number, long: number){
    let base = "https://www.google.com/maps/search/?api=1&query="

    let url = `${base}${lat}%2C${long}`

    return url
  }
}
