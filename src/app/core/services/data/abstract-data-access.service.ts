import { Injectable } from '@angular/core';
import { User } from '../../data2/models/client/user';
import { AsyncService } from '../async.service';
import { DataAccess2Service } from './data-access-2.service';

@Injectable({
  providedIn: 'root'
})
export class AbstractDataAccessService {

  constructor(private apiService: DataAccess2Service, private asyncService: AsyncService) { }

  // -------------------------------------- FUNCTIONALITY --------------------------------------
  getUserById(id: number): Promise<User> {
    return new Promise(resolve => {
      // get user from api
      this.apiService.getUser(id).subscribe(user => {
        // load locations
        user.loadAdditionalData(this.apiService, this.asyncService).then(() => {
          resolve(user)
        })
      })
    })
  }
}
