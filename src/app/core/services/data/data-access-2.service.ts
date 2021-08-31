import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { User } from '../../data2/models/client/user';
import { UserDTO } from '../../data2/models/dto/user-dto';
import { DtoDataObject } from '../../data2/dto-data-object';
import { Location } from '../../data2/models/client/location';
import { LocationDTO } from '../../data2/models/dto/location-dto';

@Injectable({
  providedIn: 'root'
})
export class DataAccess2Service {
  constructor(private api: HttpClient) { }

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

  // ------------ USERS ------------

  getUser(id: number): Observable<User> {
    let url = `${this.apiURL}/users/${id}`
    return this.GETResponseHandler<UserDTO, User>(this.api.get<UserDTO>(url, this.requestOptions), (data => {
      let dto = new UserDTO()
      return this.resolveDTO<UserDTO, User>(dto, data)
    }))
  }

  getAllUsers(): Observable<User[]> {
    let url = `${this.apiURL}/users`
    return this.GETResponseHandler<UserDTO[], User[]>(this.api.get<UserDTO[]>(url, this.requestOptions), (data => {
      return data.map(userData => {
        let dto = new UserDTO()
        return this.resolveDTO<UserDTO, User>(dto, userData)
      })
    }))
  }

  // ------------ LOCATIONS ------------

  getLocationById(id: number): Observable<Location> {
    let url = `${this.apiURL}/locations/${id}`
    return this.GETResponseHandler<LocationDTO, Location>(this.api.get<LocationDTO>(url, this.requestOptions), (data => {
      let dto = new LocationDTO()
      return this.resolveDTO<LocationDTO, Location>(dto, data)
    }))
  }

  getAllLocations(): Observable<Location[]> {
    let url = `${this.apiURL}/locations/`
    return this.GETResponseHandler<LocationDTO[], Location[]>(this.api.get<LocationDTO[]>(url, this.requestOptions), (locationDataObjs => {
      return locationDataObjs.map(dataObj => {
        let dto = new LocationDTO()
        return this.resolveDTO<LocationDTO, Location>(dto, dataObj)
      })
    }))
  }

  // --------------------------------------- HELPER FUNCTIONALITY ---------------------------------------
  
  private GETResponseHandler<DtoResponseType, ClientResponseType>(observable: Observable<DtoResponseType>, toClientHandler: (data: DtoResponseType)=>ClientResponseType): Observable<ClientResponseType>{
    return observable.pipe(map(data => {
      return toClientHandler(data)
    }))
  }

  private resolveDTO<DTO, Client>(dto: DtoDataObject<DTO, Client>, data: DTO): Client {
    dto.initFromData(data)
    return dto.toClient()
  }
}
