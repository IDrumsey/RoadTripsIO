import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core2/data/models/user/user';

@Component({
  selector: 'app-user-select-list',
  templateUrl: './user-select-list.component.html',
  styleUrls: ['./user-select-list.component.scss']
})
export class UserSelectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // -------------------------------- DATA --------------------------------

  @Input() users: User[]

  // -------------------------------- STATE --------------------------------

  selectedUsers: User[] = []

  // -------------------------------- EVENTS --------------------------------

  @Output() userSelected = new EventEmitter<User>()
  @Output() userUnselected = new EventEmitter<User>()

  // -------------------------------- EVENT HANDLERS --------------------------------

  // -------------------------------- FUNCTIONALITY --------------------------------
  selectUser(user: User): void {
    let userSelectedAlready = this.selectedUsers.find(tempUser => tempUser == user)
    if(!userSelectedAlready){
      this.selectedUsers.push(user)
      this.userSelected.emit(user)
    }
  }

  unselectUser(user: User){
    let userIndex = this.selectedUsers.indexOf(user)
    if(userIndex != -1){
      this.selectedUsers.splice(userIndex, 1)
      this.userUnselected.emit(user)
    }
  }

  isUserSelected(user: User): boolean {
    let userFound = this.selectedUsers.find(tempUser => tempUser == user)
    return userFound ? true : false
  }
}
