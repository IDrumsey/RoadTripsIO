import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { faEllipsisV, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { NotificationManagerComponent } from 'src/app/core2/components/notifications/notification-manager/notification-manager.component';
import { ExpandDirections } from '../../components/models/Toolbars/expand-directions';
import { Comment } from '../../data2/models/client/comment';
import { AbstractDataAccessService } from '../../services/data/abstract-data-access.service';

@Component({
  selector: 'app-tester-page',
  templateUrl: './tester-page.component.html',
  styleUrls: ['./tester-page.component.scss']
})
export class TesterPageComponent implements OnInit, AfterViewInit {

  constructor(private data: AbstractDataAccessService) { }

  images = [
    'assets/images/pexels-guilherme-rossi-1755680.jpg',
    'assets/images/pexels-guilherme-rossi-1755680.jpg',
    'assets/images/pexels-guilherme-rossi-1755680.jpg',
    'assets/images/pexels-guilherme-rossi-1755680.jpg'
  ]

  ngOnInit(): void {
    this.loadComment()
  }

  ngAfterViewInit(): void {

  }

  icon = faEllipsisV

  loaded = false

  comment: Comment

  loadComment(): void {
    this.data.getAllComments().then(comments => {
      this.comment = comments[2]
      this.loaded = true
    })
  }
}
