import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { faImages, faLandmark, faMapPin, faPencilAlt, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { LocationTypes } from 'src/app/core/data/models/location-types';

@Component({
  selector: 'app-roadtrip-location-card-details',
  templateUrl: './roadtrip-location-card-details.component.html',
  styleUrls: ['./roadtrip-location-card-details.component.css']
})
export class RoadtripLocationCardDetailsComponent implements OnInit {
  // data
  title = "Statue of Liberty"
  description = "The statue of Liberty was so much bigger than we thought it would be."
  type = LocationTypes.Landmark

  // styles
  typeIcon: IconDefinition
  addToTripIcon = faPlus
  addToVisitIcon = faMapPin
  editBtn = faPencilAlt
  addImagesIcon = faImages

  // state
  @Input() isOwner: boolean
  showingAddImagesForm: boolean = false;

  // events
  @Output() edit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    switch(this.type){
      case LocationTypes.Landmark: {
        this.typeIcon = faLandmark
      }
    }
  }

  getWrapperStyles(): {} {
    return {
      backgroundColor: AppColors.elevation2,
      color: AppColors.onColorLight,
      fontFamily: AppFonts.Data
    }
  }

  getTypeIconStyles(): {} {
    return {
      color: AppColors.onContrastBlue,
      fontSize: "20px"
    }
  }

  editStop(): void {
    this.edit.emit();
  }

  addImages(): void {
    console.log("adding images")
    this.showImageForm()
  }

  showImageForm(): void {
    this.showingAddImagesForm = true;
  }

  hideImageForm(): void {
    this.showingAddImagesForm = false;
  }
}
