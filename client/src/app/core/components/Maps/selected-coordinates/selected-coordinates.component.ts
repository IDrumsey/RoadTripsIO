import { Component, OnInit } from '@angular/core';
import { AppColors } from 'src/app/core/data/models/app-colors';

@Component({
  selector: 'app-selected-coordinates',
  templateUrl: './selected-coordinates.component.html',
  styleUrls: ['./selected-coordinates.component.css']
})
export class SelectedCoordinatesComponent implements OnInit {
  // styles
  wrapperStyles = {
    backgroundColor: AppColors.elevation4,
    padding: "25px"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
