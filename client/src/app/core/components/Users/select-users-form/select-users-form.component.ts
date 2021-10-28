import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { UserSelectListComponent } from 'src/app/core2/components/users/user-select-list/user-select-list.component';
import { User } from 'src/app/core2/data/models/user/user';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';

class userSelectable {
  user: User
  checked: boolean
}

@Component({
  selector: 'app-select-users-form',
  templateUrl: './select-users-form.component.html',
  styleUrls: ['./select-users-form.component.scss']
})
export class SelectUsersFormComponent implements OnInit {
  constructor(private api: DataAccessService) { }

  ngOnInit(): void {
  }

  // --------------------------------- DATA ---------------------------------
  @ViewChild('selectUsersList') selectUsersList: UserSelectListComponent

  matchingUsers: User[] = []

  _usernameField: string

  get usernameField(): string {
    return this._usernameField
  }

  set usernameField(value: string) {
    this._usernameField = value
    this.onUsernameFieldChange()
  }

  // --------------------------------- EVENTS ---------------------------------

  // --------------------------------- EVENT HANDLERS ---------------------------------

  onUsernameFieldChange(): void {
    this.updateMatchingUsers()
  }

  onUserSelected(user: User): void {

  }

  onUserUnselected(user: User): void {
    
  }

  // --------------------------------- STYLES ---------------------------------

  deleteSelectedUserIcon = faTimes
  deleteBtnSize = "20px"
  deleteBtnColor = AppColors.onContrastRed
  deleteBtnHoverColor = AppColors.onContrastDarkRed

  // --------------------------------- FUNCTIONALITY ---------------------------------

  updateMatchingUsers(): void {
    this.findMatchingUsers().then(users => {
      this.matchingUsers = users
    })
  }

  findMatchingUsers(): Promise<User[]> {
    return new Promise(resolve => {
      if(this._usernameField == ""){
        resolve([])
      }
      this.api.getAllUsers().then(allUsers => {
        let result = allUsers.filter(user => user.username.includes(this._usernameField))
        resolve(result)
      })
    })
  }

  isSelected(user: User): boolean {
    let userFound = this.selectUsersList.selectedUsers.find(selectedUser => selectedUser.id == user.id)
    return userFound ? true : false
  }

  onDeleteBtnClick(user: User): void {
    this.selectUsersList.unselectUser(user)
  }
}
