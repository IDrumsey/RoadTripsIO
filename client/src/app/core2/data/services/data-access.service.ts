import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncService } from 'src/app/core/services/async.service';
import { Location } from '../models/location/location';
import { LocationDto } from '../models/location/location-dto';
import { User } from '../models/user/user';
import { UserDTO } from '../models/user/user-dto';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  constructor(private api: HttpClient, private asyncService: AsyncService) { }

  // --------------------------------------- DATA ---------------------------------------

  private apiURL = "http://localhost:3000"

  private requestOptions = {
    headers: {
      responseType: "application/json"
    },
    withCredentials: true,
    reportProgress: true
  }

  // --------------------------------------- FUNCTIONALITY ---------------------------------------

  // ----------------------------- USERS -----------------------------

  getUser(id: number): Promise<User> {
    let url = `${this.apiURL}/users/${id}`

    return new Promise((resolve, reject) => {
      let request = this.api.get<UserDTO>(url, this.requestOptions).toPromise()

      request.then(data => {
        let dto = new UserDTO()
        dto.init(data)
        
        let client = dto.toClient()
        // fetch non-primary nested data
        client = this.fulfillUser(dto, client)
        resolve(client)
      }, err => reject(err))
    })
  }

  // ----------------------------- LOCATIONS -----------------------------
  getLocation(id: number): Promise<Location> {
    let url = `${this.apiURL}/locations/${id}`

    return new Promise((resolve, reject) => {
      let request = this.api.get<LocationDto>(url, this.requestOptions).toPromise()

      request.then(data => {
        let dto = new LocationDto()
        dto.init(data)
        
        let client = dto.toClient()
        resolve(client)
      }, err => reject(err))
    })
  }

  // --------------------------------------- NESTED DATA LOADERS ---------------------------------------

  private fulfillUser(dto: UserDTO, user: User): User {
    // fulfill locations to visit
    this.asyncService.runMultiplePromises(dto.locationsToVisitIds.map(id => this.getLocation(id).then(location => {
      user.locationsToVisit.push(location)
    })))

    // fulfill reported comments

    return user
  }
}
