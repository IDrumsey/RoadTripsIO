import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/core2/data/models/user/user';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  constructor(private api: DataAccessService) { }

  ngOnInit(): void {
  }

  // -------------------------------- DATA --------------------------------

  matchingUsers: User[]

  private _usernameField: string

  get usernameField(): string {
    return this._usernameField
  }

  set usernameField(value: string) {
    this._usernameField = value
    this.onUsernameFieldChange()
  }

  // -------------------------------- STATE --------------------------------

  // -------------------------------- EVENTS --------------------------------

  @Output() userCardClicked = new EventEmitter<User>()

  // -------------------------------- EVENT HANDLERS --------------------------------

  onUsernameFieldChange(): void {
    this.updateMatchingUsers()
  }

  onUserCardClick(user: User): void {
    this.userCardClicked.emit(user)
  }

  // -------------------------------- FUNCTIONALITY --------------------------------

  updateMatchingUsers(): void {
    this.findMatchingUsers().then(users => {
      this.matchingUsers = users
    })
  }

  findMatchingUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.api.getAllUsers().then(allUsers => {
        let filteredUsers: User[]
        
        // run filters
        filteredUsers = this.filterByUsername(allUsers)

        resolve(filteredUsers)
      }, err => reject(err))
    })
  }

  private filterByUsername(users: User[]): User[] {
    if(this._usernameField == ""){
      return []
    }
    else{
      return users.filter(user => user.username.includes(this._usernameField))
    }
  }

  // -------------------------------- STYLES --------------------------------

  userIcon = faUser
}
