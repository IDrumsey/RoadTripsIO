import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/core2/data/models/user/user';
import { DataAccessService } from 'src/app/core2/data/services/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private api: DataAccessService) { }

  // ------------------------------------ DATA ------------------------------------
  currentlyLoggedInUser: User | null

  // ------------------------------------ EVENTS ------------------------------------

  userSignedIn = new Subject<User>()
  userSignedOut = new Subject<User>()

  // ------------------------------------ SINGALERS ------------------------------------

  private signal_userSignedIn(user: User): void {
    this.userSignedIn.next(user)
  }

  private signal_userSignedOut(user: User): void {
    this.userSignedOut.next(user)
  }

  // ------------------------------------ FUNCTIONALITY ------------------------------------
  signOut(): void {
    if(this.currentlyLoggedInUser){
      this.signal_userSignedOut(this.currentlyLoggedInUser)
      this.currentlyLoggedInUser = null
    }
  }

  async attemptSignIn(): Promise<User> {
    console.log("checking creds")
    return new Promise((resolve, reject) => {
      this.api.getUser(1).then(userFound => {
        // TODO
        if(userFound){
          // load additional info
          this.currentlyLoggedInUser = userFound
          this.signal_userSignedIn(userFound) // avoids extra conditional
          resolve(userFound)
        }
        else{
          reject("No user found")
        }
      })
    })
  }

  isCurrentlyLoggedInUser(user: User): boolean {
    if(this.currentlyLoggedInUser && this.currentlyLoggedInUser.id == user.id){
      return true
    }
    return false
  }

  // ------------------------------------ PRIVATE FUNCTIONALITY ------------------------------------
  private signUserIn(user: User): void {
    this.currentlyLoggedInUser = user
  }
}
