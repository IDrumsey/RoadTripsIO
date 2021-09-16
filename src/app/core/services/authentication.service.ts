import { Injectable } from '@angular/core';
import { User } from '../data2/models/client/user';
import { DataAccessService } from './data/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private api: DataAccessService) { }

  // ------------------------------------ DATA ------------------------------------
  currentlyLoggedInUser: User | null

  // ------------------------------------ FUNCTIONALITY ------------------------------------
  signOut(): void {
    this.currentlyLoggedInUser = null
  }

  async attemptSignIn(): Promise<User> {
    console.log("checking creds")
    return new Promise((resolve, reject) => {
      this.api.getUser(1).subscribe(userFound => {
        // TODO
        if(userFound){
          // load additional info
          userFound.loadAdditionalData().then(() => {
            this.signUserIn(userFound)
            resolve(userFound)
          }, err => {
            reject(err)
          })
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
