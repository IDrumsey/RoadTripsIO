import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageGalleryComponent } from 'src/app/core/components/Images/image-gallery/image-gallery.component';
import { ImageComponent } from 'src/app/core/components/Images/image/image.component';
import { FileService } from 'src/app/core2/services/file.service';

@Component({
  selector: 'app-image-selector-form',
  templateUrl: './image-selector-form.component.html',
  styleUrls: ['./image-selector-form.component.scss']
})
export class ImageSelectorFormComponent implements OnInit {

  constructor(private factoryFactory: ComponentFactoryResolver, private fileService: FileService) { }

  ngOnInit(): void {
  }

  // ------------------------------------- DATA -------------------------------------
  form = new FormGroup({
    images: new FormControl()
  })

  @ViewChild('previewGallery', {read: ViewContainerRef}) previewGallery: ViewContainerRef

  componentFactory = this.factoryFactory.resolveComponentFactory(ImageComponent)

  // ------------------------------------- FUNCTIONALITY -------------------------------------
  onFileChanges(event: Event): void {
    const element = event.target as HTMLInputElement
    const files = element.files

    console.log(files)

    // add preview images
    if(files){
      this.previewGallery.clear()
      for(let i = 0; i < files.length; i++){
        let file = files.item(i)
        if(file){
          this.addImageToPreviewGallery(file)
        }
      }
    }
  }

  addImageToPreviewGallery(file: File): void {
    // https://netbasal.com/dynamically-creating-components-with-angular-a7346f4a982d
    // BUG : The filepath is set after the component is injected resulting in an undefined path error
    let newImageComponent = this.previewGallery.createComponent(this.componentFactory)
    this.fileService.getFileURL(file).then(path => {
      console.log(path)
      newImageComponent.instance.filePath = path
    })
  }

}
