import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppColors } from 'src/app/core/data/models/app-colors';
import { AppFonts } from 'src/app/core/data/models/app-fonts';
import { User } from 'src/app/core/data/user';
import { DataAccessService } from 'src/app/core/services/data/data-access.service';
import { UserService } from 'src/app/core/services/users/user.service';

class userSelectable {
  user: User
  checked: boolean
}

@Component({
  selector: 'app-select-users-form',
  templateUrl: './select-users-form.component.html',
  styleUrls: ['./select-users-form.component.css']
})
export class SelectUsersFormComponent implements OnInit {
  constructor(private api: DataAccessService, private userService: UserService) { }

  ngOnInit(): void {
  }

  // --------------------------------- DATA ---------------------------------
  searchValue: string
  matchingUsers: User[] = []
  @Input() selectedUsers: User[] = []
  userSelectables: userSelectable[] = []

  // --------------------------------- EVENTS ---------------------------------
  @Output() userSelected = new EventEmitter<User>()
  @Output() userUnselected = new EventEmitter<User>()

  // --------------------------------- STYLES ---------------------------------
  searchbarBgColor = AppColors.elevation4

  userLabelStyles = {
    fontFamily: AppFonts.Data,
    fontSize: "25px",
    marginLeft: "10px"
  }

  deleteSelectedUserIcon = faTimes
  deleteBtnSize = "20px"
  deleteBtnColor = AppColors.onContrastRed
  deleteBtnHoverColor = AppColors.onContrastDarkRed

  // --------------------------------- FUNCTIONALITY ---------------------------------
  onSearchBarValueChange(searchTerm: string): void {
    this.searchValue = searchTerm
    if(this.searchValue != ""){
      this.searchUsersForValue().then(matchingUsers => {
        this.matchingUsers = matchingUsers
        this.userSelectables = this.genUserSelectables()
      })
    }
    else{
      // search bar value empty
      this.matchingUsers = []
      this.userSelectables = []
    }
  }

  async searchUsersForValue(): Promise<User[]> {
    return new Promise(resolve => {
      this.api.getAllUsers().then(allUsers => {
        let result = this.userService.filterByUsernameContain(this.searchValue, allUsers)
        resolve(result)
      })
    })
  }

  genUserSelectables(): userSelectable[] {
    return this.matchingUsers.map(user => {
      return {
        user: user,
        checked: this.isSelected(user)
      }
    })
  }

  onCheckBoxClick(userSelectable: userSelectable): void {
    // note - the checked prop has already been updated
    if(!userSelectable.checked){
      this.unselectUser(userSelectable.user)
    }
    else{
      this.selectUser(userSelectable.user)
    }
  }

  unselectUser(user: User): void {
    let userFound = this.selectedUsers.find(selectedUser => selectedUser.id == user.id)
    if(userFound){
      let index = this.selectedUsers.indexOf(userFound)
      if(index != -1){
        this.selectedUsers.splice(index, 1)
        this.userUnselected.emit(user)
      }
    }
  }

  selectUser(user: User): void {
    this.selectedUsers.push(user)
    // this.userSelected.emit(user)
  }

  isSelected(user: User): boolean {
    let userFound = this.selectedUsers.find(selectedUser => selectedUser.id == user.id)
    return userFound ? true : false
  }

  onDeleteBtnClick(user: User): void {
    this.unselectUser(user)
    // uncheck checkbox
    let userSelectable = this.userSelectables.find(selectable => selectable.user.id == user.id)
    if(userSelectable){
      userSelectable.checked = false
    }
  }
}
