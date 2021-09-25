import { Component, OnInit } from '@angular/core';
import { faEllipsisV, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stop-card',
  templateUrl: './stop-card.component.html',
  styleUrls: ['./stop-card.component.css']
})
export class StopCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // -------------------------------- DATA --------------------------------
  expandHeadToolsIcon = faEllipsisV
  detailsIcon = faInfo
  toolButtonSize = "25px"
}
