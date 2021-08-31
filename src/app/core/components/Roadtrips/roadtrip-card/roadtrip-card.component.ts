import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faRoute, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { Roadtrip } from 'src/app/core/data2/models/client/roadtrip';

@Component({
  selector: 'app-roadtrip-card',
  templateUrl: './roadtrip-card.component.html',
  styleUrls: ['./roadtrip-card.component.css']
})
export class RoadtripCardComponent implements OnInit {
  // data
  @Input() roadtrip: Roadtrip
  title: string = "Roadtrip down the East Coast!"

  // isOwner
  @Input() isOwner: boolean = false;

  // styles
  routeIcon = faRoute
  trashIcon = faTrashAlt

  cardStyles = {
    backgroundColor: AppColors.elevation2,
    color: AppColors.onColorLight,
    padding: "10px 20px",
    borderRadius: "4px"
  }

  titleStyles = {
    fontSize: "20px",
    fontFamily: AppFonts.Data
  }

  deleteBtnColor = AppColors.onContrastRed
  deleteBtnHoverColor = AppColors.onContrastDarkRed

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeToDetailsPage(): void {
    this.router.navigate(['roadtrips', this.roadtrip.id])
  }
}
