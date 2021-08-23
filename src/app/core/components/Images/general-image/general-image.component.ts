import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-general-image',
  templateUrl: './general-image.component.html',
  styleUrls: ['./general-image.component.css']
})
export class GeneralImageComponent implements OnInit {
    @Input() width: string = "100%"
  @Input() height: string = "auto"
  @Input() maxWidth: string = "100%"

  constructor() { }

  ngOnInit(): void {
  }

}
