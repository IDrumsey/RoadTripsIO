import { Component, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';
import { RequestErrors } from '../../data/models/request-errors';
import { User } from '../../data/user';
import { DataAccessService } from '../../services/data/data-access.service';

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

  sectionTitleFontSize = "35px"
  sectionTitleFont = AppFonts.Handwriting
  sectionTitleColor = AppColors.onColor

  getSectionTitleStyles(): {} {
    return {
      fontSize: this.sectionTitleFontSize,
      fontFamily: this.sectionTitleFont,
      color: this.sectionTitleColor
    }
  }

  commentSectionIcon = faCommentAlt

  getCommentSectionIconStyles(): {} {
    return {
      color: AppColors.onColor,
      fontSize: "25px"
    }
  }

  // state
  isOwner: boolean = true;

  constructor(private api: DataAccessService) {
    try{
      this.api.getUserById(4)
    }
    catch(e){
      if(e == RequestErrors.NotFound){
        console.log("User not found")
      }
    }
  }

  ngOnInit(): void {
  }

  addRoadtripLocation(location: any): void {
    console.log("adding location to page : ", location)
  }
}
