import { Component, OnInit } from '@angular/core';
import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';

@Component({
  selector: 'app-roadtrip',
  templateUrl: './roadtrip.component.html',
  styleUrls: ['./roadtrip.component.css']
})
export class RoadtripComponent implements OnInit {
  // data
  title = "Some Cool Roadtrip!"
  owner = {
    id: 1,
    username: "someUser1"
  }
  description = "This is the description of the roadtrip. It was a good roadtrip and I would recommend it."

  // styles
  titleFontFamily = AppFonts.Handwriting
  titleColor = '#fff'
  titleFontSize = "50px"

  getTitleStyles(): {} {
    return {
      color: this.titleColor,
      fontFamily: this.titleFontFamily,
      fontSize: this.titleFontSize
    }
  }

  getOwnerLinkStyles(): {} {
    return {
      color: AppColors.onColor,
      fontFamily: AppFonts.Data
    }
  }

  descriptionFontFamily = AppFonts.Data
  descriptionColor = '#fff'
  descriptionFontSize = "20px"
  
  getDescriptionStyles(): {} {
    return {
      color: this.descriptionColor,
      fontFamily: this.descriptionFontFamily,
      fontSize: this.descriptionFontSize
    }
  }

  // state
  isOwner: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
