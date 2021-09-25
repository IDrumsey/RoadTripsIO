import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { faEllipsisV, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { NotificationManagerComponent } from 'src/app/core2/components/notifications/notification-manager/notification-manager.component';
import { ExpandDirections } from '../../components/models/Toolbars/expand-directions';

@Component({
  selector: 'app-tester-page',
  templateUrl: './tester-page.component.html',
  styleUrls: ['./tester-page.component.css']
})
export class TesterPageComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  icon = faEllipsisV
  icon2 = faUser
  icon3 = faInfo

  toolbarExpandDirection = ExpandDirections.Left
}
