import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { User } from '../../data2/models/client/user';
import { UserDTO } from '../../data2/models/dto/user-dto';
import { DtoDataObject } from '../../data2/dto-data-object';
import { Location } from '../../data2/models/client/location';
import { LocationDTO } from '../../data2/models/dto/location-dto';
import { CommentDTO } from '../../data2/models/dto/comment-dto';
import { Comment } from '../../data2/models/client/comment';
import { RoadtripStopDTO } from '../../data2/models/dto/roadtrip-stop-dto';
import { RoadtripStop } from '../../data2/models/client/roadtrip-stop';
import { Roadtrip } from '../../data2/models/client/roadtrip';
import { RoadtripDTO } from '../../data2/models/dto/roadtrip-dto';
import { AsyncService } from '../async.service';

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

  // ------------ USERS ------------

  getUser(id: number): Observable<User> {
    let url = `${this.apiURL}/users/${id}`
    return this.GETResponseHandler<UserDTO, User>(this.api.get<UserDTO>(url, this.requestOptions), (data => {
      let dto = new UserDTO(this, this.asyncService)
      return this.resolveDTO<UserDTO, User>(dto, data)
    }))
  }

  getAllUsers(): Observable<User[]> {
    let url = `${this.apiURL}/users`
    return this.GETResponseHandler<UserDTO[], User[]>(this.api.get<UserDTO[]>(url, this.requestOptions), (data => {
      return data.map(userData => {
        let dto = new UserDTO(this, this.asyncService)
        return this.resolveDTO<UserDTO, User>(dto, userData)
      })
    }))
  }

  // ------------ ROADTRIPS ------------

  getRoadtripById(id: number): Observable<Roadtrip> {
    let url = `${this.apiURL}/roadtrips/${id}`
    return this.GETResponseHandler<RoadtripDTO, Roadtrip>(this.api.get<RoadtripDTO>(url, this.requestOptions), (data => {
      let dto = new RoadtripDTO(this, this.asyncService)
      return this.resolveDTO<RoadtripDTO, Roadtrip>(dto, data)
    }))
  }

  getAllRoadtrips(): Observable<Roadtrip[]> {
    let url = `${this.apiURL}/roadtrips/`
    return this.GETResponseHandler<RoadtripDTO[], Roadtrip[]>(this.api.get<RoadtripDTO[]>(url, this.requestOptions), (roadtripDataObjs => {
      return roadtripDataObjs.map(dataObj => {
        let dto = new RoadtripDTO(this, this.asyncService)
        return this.resolveDTO<RoadtripDTO, Roadtrip>(dto, dataObj)
      })
    }))
  }

  // ------------ ROADTRIP STOPS ------------

  getRoadtripStopById(id: number): Observable<RoadtripStop> {
    let url = `${this.apiURL}/stops/${id}`
    return this.GETResponseHandler<RoadtripStopDTO, RoadtripStop>(this.api.get<RoadtripStopDTO>(url, this.requestOptions), (data => {
      let dto = new RoadtripStopDTO(this, this.asyncService)
      return this.resolveDTO<RoadtripStopDTO, RoadtripStop>(dto, data)
    }))
  }

  getAllRoadtripStops(): Observable<RoadtripStop[]> {
    let url = `${this.apiURL}/stops/`
    return this.GETResponseHandler<RoadtripStopDTO[], RoadtripStop[]>(this.api.get<RoadtripStopDTO[]>(url, this.requestOptions), (roadtripStopDataObjs => {
      return roadtripStopDataObjs.map(dataObj => {
        let dto = new RoadtripStopDTO(this, this.asyncService)
        return this.resolveDTO<RoadtripStopDTO, RoadtripStop>(dto, dataObj)
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

  // ------------ COMMENTS ------------

  getCommentById(id: number): Observable<Comment> {
    let url = `${this.apiURL}/comments/${id}`
    return this.GETResponseHandler<CommentDTO, Comment>(this.api.get<CommentDTO>(url, this.requestOptions), (data => {
      let dto = new CommentDTO(this, this.asyncService)
      return this.resolveDTO<CommentDTO, Comment>(dto, data)
    }))
  }

  getAllComments(): Observable<Comment[]> {
    let url = `${this.apiURL}/comments/`
    return this.GETResponseHandler<CommentDTO[], Comment[]>(this.api.get<CommentDTO[]>(url, this.requestOptions), (commentDataObjs => {
      return commentDataObjs.map(dataObj => {
        let dto = new CommentDTO(this, this.asyncService)
        return this.resolveDTO<CommentDTO, Comment>(dto, dataObj)
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
