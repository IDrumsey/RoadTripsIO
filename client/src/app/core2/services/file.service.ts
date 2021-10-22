import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  // ------------------------------------ FUNCTIONALITY ------------------------------------

  getFileContents(file: File): Promise<string> {
    // https://newbedev.com/angular-read-a-file-and-parse-its-content
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()

      fileReader.onload = (e => {
        fileReader.result ? resolve(fileReader.result.toString()) : reject("No result")
      })

      fileReader.readAsText(file)
    })
  }

  getFileURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()

      fileReader.onload = (e => {
        fileReader.result ? resolve(fileReader.result.toString()) : reject("No result")
      })

      fileReader.readAsDataURL(file)
    })
  }
}
