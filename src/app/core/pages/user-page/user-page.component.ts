import { Component, OnInit } from '@angular/core';
import { faAddressCard, faCameraRetro, faMapPin, faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from '../../data/models/app-colors';
import { AppFonts } from '../../data/models/app-fonts';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  // data
  user: any
  imagePaths: string[] = [
    "assets/images/pexels-andrea-piacquadio-722014.jpg",
    "assets/images/pexels-andrea-piacquadio-722014.jpg",
    "assets/images/pexels-andrea-piacquadio-722014.jpg",
    "assets/images/pexels-andrea-piacquadio-722014.jpg",
    "assets/images/pexels-andrea-piacquadio-722014.jpg"
  ]

  // state
  isOwner: boolean = true

  // styles
  textColor = AppColors.onColorLight
  addBtnIcon = faPlus
  personalInfoIcon = faAddressCard
  mapPinIcon = faMapPin
  cameraIcon = faCameraRetro

  iconSize = "30px"

  usernameStyles = {
    fontFamily: AppFonts.Handwriting,
    fontSize: "50px",
    textAlign: "center"
  }

  sectionTitleStyles = {
    fontFamily: AppFonts.Handwriting
  }

  sectionTopIconStyles = {
    fontSize: this.iconSize,
    margin: "25px"
  }

  constructor() { }

  ngOnInit(): void {
  }

  getWrapperStyles(): {} {
    return {
      color: this.textColor
    }
  }
}
