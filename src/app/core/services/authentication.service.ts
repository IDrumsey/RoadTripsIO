import { Injectable } from '@angular/core';
import { User } from '../data/user';
import { DataAccessService } from './data/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private api: DataAccessService) { }

  // ------------------------------------ DATA ------------------------------------
  currentlyLoggedInUserId: number | null = 1

  // ------------------------------------ FUNCTIONALITY ------------------------------------
  signOut(): void {
    console.log("signing out user : ", this.currentlyLoggedInUserId)
    this.currentlyLoggedInUserId = null
  }

  async attemptSignIn(): Promise<boolean> {
    console.log("checking creds")

    let userFound = await this.api.getUserById(1)
    
    if(true){
      this.signUserIn(userFound)
      return true
    }
  }

  // ------------------------------------ PRIVATE FUNCTIONALITY ------------------------------------
  private signUserIn(user: User): void {
    console.log("user : ", user.id, " signed in")
    this.currentlyLoggedInUserId = user.id
  }
}
