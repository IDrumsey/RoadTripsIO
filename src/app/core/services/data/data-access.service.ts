import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../../data/user';
import { RequestErrors } from '../../data/models/request-errors';
import { Observable } from 'rxjs';
import { Roadtrip } from '../../data/Roadtrip/roadtrip';
import { RoadtripStop } from '../../data/Roadtrip/roadtrip-stop';
import { RoadtripDTO } from '../../data/DTO/roadtrip-dto';
import { Location } from '../../data/location';
import { LocationDTO } from '../../data/DTO/location-dto';
import { AsyncService } from '../async.service';
import { RoadtripStopDTO } from '../../data/DTO/roadtrip-stop-dto';
import { CommentDTO } from '../../data/DTO/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private apiURL = "http://localhost:3000"

  private requestOptions = {
    headers: {
      responseType: "application/json"
    },
    withCredentials: true
  }

  constructor(private api: HttpClient, private asyncService: AsyncService) { }

  // ---------------------------------- REQUESTS ----------------------------------

  // --------- USERS ---------

  private requestAllUsers(): Observable<User[]> {
    let url = this.genEndpointURL('/users')
    return this.api.get<User[]>(url)
  }

  private requestSingleUser(id: number): Observable<User> {
    let url = this.genEndpointURL(`/users/${id}`)
    return this.api.get<User>(url)
  }

  private addSingleUser(user: User): Observable<User> {
    let url = this.genEndpointURL(`/users`)
    return this.api.post<User>(url, user, this.requestOptions)
  }

  private removeSingleUser(id: number): Observable<User> {
    let url = this.genEndpointURL(`/users/${id}`)
    return this.api.delete<User>(url)
  }

  // --------- ROADTRIPS ---------
  private requestAllRoadtrips(): Observable<RoadtripDTO[]> {
    let url = this.genEndpointURL('/roadtrips')
    return this.api.get<RoadtripDTO[]>(url)
  }

  private requestSingleRoadtrip(id: number): Observable<RoadtripDTO> {
    let url = this.genEndpointURL(`/roadtrips/${id}`)
    return this.api.get<RoadtripDTO>(url)
  }

  private addSingleRoadtrip(roadtrip: RoadtripDTO): Observable<RoadtripDTO> {
    let url = this.genEndpointURL(`/roadtrips`)
    return this.api.post<RoadtripDTO>(url, roadtrip.getUploadFormat(), this.requestOptions)
  }

  private updateSingleRoadtrip(roadtrip: RoadtripDTO): Observable<RoadtripDTO> {
    let url = this.genEndpointURL(`/roadtrips/${roadtrip.id}`)
    return this.api.put<RoadtripDTO>(url, roadtrip.getUploadFormat(), this.requestOptions)
  }

  private removeSingleRoadtrip(id: number): Observable<RoadtripDTO> {
    let url = this.genEndpointURL(`/roadtrips/${id}`)
    return this.api.delete<RoadtripDTO>(url)
  }

  // --------- STOPS ---------
  private requestAllStops(): Observable<RoadtripStopDTO[]> {
    let url = this.genEndpointURL('/stops')
    return this.api.get<RoadtripStopDTO[]>(url)
  }

  private requestSingleStop(id: number): Observable<RoadtripStopDTO> {
    let url = this.genEndpointURL(`/stops/${id}`)
    return this.api.get<RoadtripStopDTO>(url)
  }

  private addSingleStop(stop: RoadtripStopDTO): Observable<RoadtripStopDTO> {
    let url = this.genEndpointURL(`/stops`)
    return this.api.post<RoadtripStopDTO>(url, stop.getUploadFormat(), this.requestOptions)
  }

  private removeSingleStop(id: number): Observable<RoadtripStopDTO> {
    let url = this.genEndpointURL(`/stops/${id}`)
    return this.api.delete<RoadtripStopDTO>(url)
  }

  // --------- LOCATIONS ---------
  private requestAllLocations(): Observable<LocationDTO[]> {
    let url = this.genEndpointURL('/locations')
    return this.api.get<LocationDTO[]>(url)
  }

  private requestSingleLocation(id: number): Observable<LocationDTO> {
    let url = this.genEndpointURL(`/locations/${id}`)
    return this.api.get<LocationDTO>(url)
  }

  private addSingleLocation(location: LocationDTO): Observable<LocationDTO> {
    let url = this.genEndpointURL(`/locations`)
    return this.api.post<LocationDTO>(url, location.getUploadFormat(), this.requestOptions)
  }

  private removeSingleLocation(id: number): Observable<LocationDTO> {
    let url = this.genEndpointURL(`/locations/${id}`)
    return this.api.delete<LocationDTO>(url)
  }

  // --------- COMMENTS ---------
  private requestAllComments(): Observable<CommentDTO[]> {
    let url = this.genEndpointURL('/comments')
    return this.api.get<CommentDTO[]>(url)
  }

  private requestSingleComment(id: number): Observable<CommentDTO> {
    let url = this.genEndpointURL(`/comments/${id}`)
    return this.api.get<CommentDTO>(url)
  }

  private addSingleComment(comment: CommentDTO): Observable<CommentDTO> {
    let url = this.genEndpointURL(`/comments`)
    return this.api.post<CommentDTO>(url, comment, this.requestOptions)
  }

  private removeSingleComment(id: number): Observable<CommentDTO> {
    let url = this.genEndpointURL(`/comments/${id}`)
    return this.api.delete<CommentDTO>(url)
  }

  // ---------------------------------- PUBLIC INTERFACE ----------------------------------

  // --------- USERS ---------
  getAllUsers(): Promise<User[]> {
    let producer = this.requestAllUsers()
    return this.genPromise(producer)
  }

  getUserById(id: number): Promise<User> {
    let producer = this.requestSingleUser(id)
    let user = new User(this, this.asyncService)
    
    return new Promise(resolve => {
      this.genPromise(producer).then(data => {
        user.initFromRawData(data)
      }).then(() => {resolve(user)})
    })
  }

  addUser(user: User): Promise<User> {
    let producer = this.addSingleUser(user)
    return this.genPromise(producer)
  }

  removeUser(user: User): Promise<User> {
    let producer = this.removeSingleUser(user.id)
    return this.genPromise(producer)
  }

  // --------- ROADTRIPS ---------
  getAllRoadtrips(): Promise<RoadtripDTO[]> {
    let producer = this.requestAllRoadtrips()

    return new Promise(resolve => {
      this.genPromise(producer).then(rawDTOS => {
        let actualDTOS: RoadtripDTO[] = []
        rawDTOS.forEach(rawDTO => {
          let newDTO = new RoadtripDTO(this, this.asyncService)
          newDTO.initFromRawData(rawDTO)
          actualDTOS.push(newDTO)
        })
        resolve(actualDTOS)
      })
    })
  }

  getRoadtripById(id: number): Promise<RoadtripDTO> {
    let producer = this.requestSingleRoadtrip(id)
    let roadtripDTO = new RoadtripDTO(this, this.asyncService)
    
    return new Promise(resolve => {
      this.genPromise(producer).then(data => {
        roadtripDTO.initFromRawData(data)
        resolve(roadtripDTO)
      }).catch(err => roadtripDTO.errors.push(err))
    })
  }

  addRoadtrip(Roadtrip: RoadtripDTO): Promise<RoadtripDTO> {
    let producer = this.addSingleRoadtrip(Roadtrip)
    return this.genPromise(producer)
  }

  updateRoadtrip(roadtrip: RoadtripDTO): Promise<RoadtripDTO> {
    let producer = this.updateSingleRoadtrip(roadtrip)
    return this.genPromise(producer)
  }

  removeRoadtrip(Roadtrip: Roadtrip): Promise<RoadtripDTO> {
    let producer = this.removeSingleRoadtrip(Roadtrip.id)
    return this.genPromise(producer)
  }

  // --------- STOPS ---------
  getAllStops(): Promise<RoadtripStopDTO[]> {
    let producer = this.requestAllStops()
    return this.genPromise(producer)
  }

  getStopById(id: number): Promise<RoadtripStopDTO> {
    let producer = this.requestSingleStop(id)
    let stop = new RoadtripStopDTO(this, this.asyncService)

    return new Promise(resolve => {
      this.genPromise(producer).then(data => {
        stop.initFromRawData(data)
      }).then(() => {resolve(stop)})
    })
  }

  addStop(stop: RoadtripStopDTO): Promise<RoadtripStopDTO> {
    let producer = this.addSingleStop(stop)
    return this.genPromise(producer)
  }

  removeStop(stop: RoadtripStopDTO): Promise<RoadtripStopDTO> {
    let producer = this.removeSingleStop(stop.id)
    return this.genPromise(producer)
  }

  // --------- LOCATIONS ---------
  getAllLocations(): Promise<LocationDTO[]> {
    let producer = this.requestAllLocations()
    return this.genPromise(producer)
  }

  getLocationById(id: number): Promise<LocationDTO> {
    let producer = this.requestSingleLocation(id)
    let locationDTO = new LocationDTO(this)

    return new Promise(resolve => {
      this.genPromise(producer).then(data => {
        locationDTO.initFromRawData(data)
      }).then(() => {resolve(locationDTO)})
    })
  }

  addLocation(location: LocationDTO): Promise<LocationDTO> {
    let producer = this.addSingleLocation(location)
    return this.genPromise(producer)
  }

  removeLocation(location: LocationDTO): Promise<LocationDTO> {
    let producer = this.removeSingleLocation(location.id)
    return this.genPromise(producer)
  }

  // --------- COMMENTS ---------
  getAllComments(): Promise<CommentDTO[]> {
    let producer = this.requestAllComments()
    return this.genPromise(producer)
  }

  getCommentById(id: number): Promise<CommentDTO> {
    let producer = this.requestSingleComment(id)
    let commentDTO = new CommentDTO(this, this.asyncService)

    return new Promise(resolve => {
      this.genPromise(producer).then(data => {
        commentDTO.initFromRawData(data)
      }).then(() => {resolve(commentDTO)})
    })
  }

  addComment(comment: CommentDTO): Promise<CommentDTO> {
    let producer = this.addSingleComment(comment)
    return this.genPromise(producer)
  }

  removeComment(comment: CommentDTO): Promise<CommentDTO> {
    let producer = this.removeSingleComment(comment.id)
    return this.genPromise(producer)
  }

  // ---------------------------------- HELPER METHODS ----------------------------------

  private genEndpointURL(endpoint: string): string {
    return `${this.apiURL}${endpoint}`
  }

  private httpErrorGenerator(responseError: HttpErrorResponse): RequestErrors {
    switch(responseError.status){
      case 404: {
        return RequestErrors.NotFound
      }
      default: {
        return RequestErrors.Unknown
      }
    }
  }

  private genPromise<responseType>(producer: Observable<responseType>): Promise<responseType> {
    return new Promise((resolve, reject) => {
      producer.subscribe(response => {
        resolve(response)
      }, err => {
        console.log(err)
        let simpleError = this.httpErrorGenerator(err)
        reject(simpleError)
      })
    })
  }
}
