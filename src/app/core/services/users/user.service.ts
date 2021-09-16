import { Injectable } from '@angular/core';
import { Location } from '../../data2/models/client/location';
import { User } from '../../data2/models/client/user';
import { AbstractDataAccessService } from '../data/abstract-data-access.service';
import { DataAccessService } from '../data/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: DataAccessService) { }

  // ------------------------------------ FUNCTIONALITY ------------------------------------
  filterByUsernameContain(containsText: string, users: User[]): User[] {
    return users.filter(user => user.username.includes(containsText))
  }

  isLocationBeingReferenced(location: Location): Promise<boolean> {
    return new Promise(resolve => {
      this.api.getAllUsers().subscribe(allusers => {
        allusers.forEach(user => {
          let found = user.locationsToVisitIds.find(id => id == location.id)
          if(found){
            resolve(true)
          }
        })
        resolve(false)
      })
    })
  }
}
