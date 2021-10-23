import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileService } from 'src/app/core2/services/file.service';

@Component({
  selector: 'app-image-selector-form',
  templateUrl: './image-selector-form.component.html',
  styleUrls: ['./image-selector-form.component.scss']
})
export class ImageSelectorFormComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
  }

  // ------------------------------------- DATA -------------------------------------
  form = new FormGroup({
    selectedImages: new FormControl()
  })

  images: string[] = []

  // ------------------------------------- STATE -------------------------------------

  get hasImages(): boolean {
    return this.images.length > 0
  }

  // ------------------------------------- FUNCTIONALITY -------------------------------------
  onFileChanges(event: Event): void {
    const element = event.target as HTMLInputElement
    const files = element.files

    // add preview images
    if(files){
      for(let i = 0; i < files.length; i++){
        let file = files.item(i)
        if(file){
          this.fileService.getFileURL(file).then(path => {
            this.addImage(path)
          })
        }
      }
    }
  }

  addImage(path: string): void {
    let imageFound = this.findImage(path)
    if(!imageFound){
      this.images.push(path)
    }
    else{
      throw new Error("Image already selected")
    }
  }

  findImage(path: string): string | undefined {
    return this.images.find(image => image == path)
  }

  removeImage(path: string): void {
    let imageIndex = this.images.indexOf(path)
    if(imageIndex != -1){
      this.images.splice(imageIndex, 1)
    }
    else{
      throw new Error("Couldn't find image to remove")
    }
  }

  clearImages(): void {
    this.images = []
  }
}
