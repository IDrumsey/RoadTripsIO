import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, Input } from '@angular/core';
import { faMapMarkedAlt, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Location } from 'src/app/core/data2/models/client/location';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { StringService } from 'src/app/core/services/utilities/string.service';
import { RoadtripLocationCardEditFormComponent } from '../../roadtrip-locations/roadtrip-location-card-edit-form/roadtrip-location-card-edit-form.component';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.css']
})
export class LocationCardComponent implements OnInit, AfterViewInit {
  constructor(private stringService: StringService) { }

  ngOnInit(): void {
    this.location.coordinates.genFormattedString()
  }

  // data
  @Input() location: Location
  address: string = "The Statue Of Liberty, New York, NY"
  title: string = "The Statue of Liberty"
  latitude: number = 40.69046988391412
  longitude: number = -74.04461563777768

  @ViewChildren("editForm") editFormChildren: QueryList<RoadtripLocationCardEditFormComponent> = new QueryList();
  editForm: RoadtripLocationCardEditFormComponent

  // state
  showingEditForm = false;
  @Input() isOwner: boolean = false

  // events


  // styles
  mapWithMarkerIcon = faMapMarkedAlt
  pencilIcon = faPencilAlt
  trashIcon = faTrashAlt

  deleteBtnColor = AppColors.onContrastRed
  deleteBtnHoverColor = AppColors.onContrastDarkRed

  wrapperStyles = {
    color: AppColors.onColorLight,
    borderRadius: "4px"
  }

  headStyles = {
    padding: "15px 20px",
    backgroundColor: AppColors.elevation3
  }

  titleStyles = {
    fontFamily: AppFonts.Data,
    fontSize: "20px"
  }

  addressStyles = {
    fontFamily: AppFonts.Data,
    fontSize: "12px"
  }

  editFormStyles = {
    backgroundColor: AppColors.elevation2
  }

  ngAfterViewInit(): void {
    this.editFormChildren.changes.subscribe((editForms: QueryList<RoadtripLocationCardEditFormComponent>) => {
      let forms = editForms.toArray()
      if(forms.length > 0){
        this.editForm = forms[0]
        this.listenForEditConfirm()
      }
    })
  }

  onEditBtnClick(): void {
    this.showEditForm()
  }

  showEditForm(): void {
    this.showingEditForm = true;
  }
  
  hideEditForm(): void {
    this.editForm.confirmObservable.unsubscribe()
    this.showingEditForm = false;
  }

  listenForEditConfirm(): void {
    this.editForm.confirmObservable.subscribe(data => {
      this.makeChanges(data)
    })
  }

  onEditCancel(): void {
    this.hideEditForm()
  }

  makeChanges(newData: any): void {
    console.log("making changes : ", newData)
  }

  openAddressInMaps(): void {
    if(this.location.address){
      window.open(this.stringService.getGoogleMapsURLByAddress(this.location.address))
    }
    else{
      window.open(this.stringService.getGoogleMapsURLbyCoordinates(this.location.coordinates.latitude, this.location.coordinates.longitude))
    }
  }
}
