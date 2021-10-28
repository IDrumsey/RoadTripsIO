import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { faEllipsisV, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { NotificationManagerComponent } from 'src/app/core2/components/notifications/notification-manager/notification-manager.component';
import { User } from 'src/app/core2/data/models/user/user';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';
import { ExpandDirections } from '../../components/models/Toolbars/expand-directions';
import { Comment } from '../../data2/models/client/comment';
import { AbstractDataAccessService } from '../../services/data/abstract-data-access.service';

@Component({
  selector: 'app-tester-page',
  templateUrl: './tester-page.component.html',
  styleUrls: ['./tester-page.component.scss']
})
export class TesterPageComponent implements OnInit, AfterViewInit {

  constructor(private api: DataAccessService) {}

  ngOnInit(): void {
    this.api.getAllUsers().then(users => {
      this.users = users
      this.dataLoaded = true
    })
  }

  dataLoaded = false

  ngAfterViewInit(): void {

  }

  test(): void {
    console.log("asdf")
  }

  users: User[]

  icon = faEllipsisV

  loaded = false

  comment: Comment
}
