import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncService } from 'src/app/core/services/async.service';
import { ClientDataObject } from '../models/client-data-object';
import { Comment } from '../models/comment/comment';
import { CommentDTO } from '../models/comment/comment-dto';
import { DataTransferObject } from '../models/data-transfer-object';
import { Location } from '../models/location/location';
import { LocationDto } from '../models/location/location-dto';
import { Roadtrip } from '../models/roadtrip/roadtrip';
import { RoadtripDTO } from '../models/roadtrip/roadtrip-dto';
import { Stop } from '../models/stop/stop';
import { StopDTO } from '../models/stop/stop-dto';
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

  getUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/users/${id}`

      this.api.get<UserDTO>(url, this.requestOptions).subscribe(data => {
        let dto = new UserDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillUser(client).then(user => resolve(user))
      }, err => reject(err))
    })
  }

  getLocation(id: number): Promise<Location> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/locations/${id}`

      this.api.get<LocationDto>(url, this.requestOptions).subscribe(data => {
        let dto = new LocationDto()
        dto.init(data)

        let client = dto.toClient()
        resolve(client)
      }, err => reject(err))
    })
  }

  getComment(id: number): Promise<Comment> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/comments/${id}`

      this.api.get<CommentDTO>(url, this.requestOptions).subscribe(data => {
        let dto = new CommentDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillComment(client).then(comment => resolve(comment))
      }, err => reject(err))
    })
  }

  getStop(id: number): Promise<Stop> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/stops/${id}`

      this.api.get<StopDTO>(url, this.requestOptions).subscribe(data => {
        let dto = new StopDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillStop(client).then(stop => resolve(stop), err => reject(err))
      }, err => reject(err))
    })
  }

  getRoadtrip(id: number): Promise<Roadtrip> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/roadtrips/${id}`

      this.api.get<RoadtripDTO>(url, this.requestOptions).subscribe(data => {
        let dto = new RoadtripDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillRoadtrip(client).then(roadtrip => resolve(roadtrip), err => reject(err))
      }, err => reject(err))
    })
  }

  deleteLocation(location: Location): Promise<void> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/locations/${location.id}`

      this.api.delete(url, this.requestOptions).subscribe(() => {
        resolve()
      }, err => reject(err))
    })
  }

  deleteStop(stop: Stop): Promise<void> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/stops/${stop.id}`

      this.asyncService.runMultiplePromises([
        this.deleteLocation(stop.location),
        this.api.delete(url, this.requestOptions).toPromise()
      ]).then(() => {
        resolve()
      }, err => reject(err))
    })
  }

  updateRoadtrip(roadtrip: Roadtrip): Promise<Roadtrip> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/roadtrips/${roadtrip.id}`

      let uploadDTO = roadtrip.toDTO()
      this.api.put<RoadtripDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let downloadDTO = new RoadtripDTO()
        downloadDTO.init(data)

        let client = downloadDTO.toClient()
        this.fulfillRoadtrip(client).then(roadtrip => resolve(roadtrip), err => reject(err))
      })
    })
  }

  addLocation(location: Location): Promise<Location> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/locations/`

      this.api.post<LocationDto>(url, location, this.requestOptions).subscribe(data => {
        let dto = new LocationDto()
        dto.init(data)

        let client = dto.toClient()
        resolve(client)
      }, err => reject(err))
    })
  }

  addStop(stop: Stop): Promise<Stop> {
    console.log("adding stop : ", stop)
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/stops/`

      let uploadDTO = stop.toDTO()

      this.api.post<StopDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let dto = new StopDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillStop(client).then(newStop => resolve(newStop), err => reject(err))
      }, err => reject(err))
    })
  }

  // --------------------------------------- NESTED DATA LOADERS ---------------------------------------
  
  private fulfillUser(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get locations to visit
      requests.push(...user.locationsToVisitIds.map(id => this.getLocation(id).then(locationToVisit => user.locationsToVisit.push(locationToVisit), err => reject(err))))

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(user)
      })
    })
  }

  private fulfillComment(comment: Comment): Promise<Comment> {
    return new Promise<Comment>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get replies
      requests.push(...comment.replyIds.map(replyId => this.getComment(replyId).then(reply => comment.replies.push(reply), err => reject(err))))

      // get owner
      if(comment.ownerId){
        requests.push(this.getUser(comment.ownerId).then(owner => comment.owner = owner, err => reject(err)))
      }

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(comment)
      })
    })
  }

  fulfillStop(stop: Stop): Promise<Stop> {
    return new Promise<Stop>((resolve, reject) => {
      let requests: Promise<any>[] = []

      console.log(stop)
      // get location
      if(stop.location){
        requests.push(this.getLocation(stop.location.id).then(location => stop.location = location, err => reject(err)))
      }
      else{
        requests.push(this.getLocation(stop.locationId).then(location => stop.location = location, err => reject(err)))
      }

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(stop)
      })
    })
  }

  fulfillRoadtrip(roadtrip: Roadtrip): Promise<Roadtrip> {
    return new Promise<Roadtrip>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get owner
      requests.push(this.getUser(roadtrip.ownerId).then(owner => roadtrip.owner = owner, err => reject(err)))

      // get collaborators
      requests.push(...roadtrip.collaboratorIds.map(collaboratorId => this.getUser(collaboratorId).then(collaborator => roadtrip.collaborators.push(collaborator), err => reject(err))))

      // get stops
      requests.push(...roadtrip.stopIds.map(stopId => this.getStop(stopId).then(stop => roadtrip.stops.push(stop), err => reject(err))))

      // get comments
      requests.push(...roadtrip.commentIds.map(commentId => this.getComment(commentId).then(comment => roadtrip.comments.push(comment), err => reject(err))))

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(roadtrip)
      })
    })
  }
  
}
