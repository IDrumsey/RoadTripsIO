import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsyncService {
  constructor() { }

  runMultiplePromises(promises: Promise<any>[]): Promise<void> {
    return new Promise((resolve) => {
      let numDone = 0
      promises.forEach(call => {
        call.finally(() => {
          numDone++
          if(numDone == promises.length){
            resolve()
          }
        })
      })
    })
  }
}
