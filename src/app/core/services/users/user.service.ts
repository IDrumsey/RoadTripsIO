import { Injectable } from '@angular/core';
import { User } from '../../data2/models/client/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  // ------------------------------------ FUNCTIONALITY ------------------------------------
  filterByUsernameContain(containsText: string, users: User[]): User[] {
    return users.filter(user => user.username.includes(containsText))
  }
}
