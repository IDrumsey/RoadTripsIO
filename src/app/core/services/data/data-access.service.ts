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
    return this.ApiResponseHandler<UserDTO, User>(this.api.get<UserDTO>(url, this.requestOptions), (data => {
      let dto = new UserDTO(this, this.asyncService)
      return this.resolveDTO<UserDTO, User>(dto, data)
    }))
  }

  getAllUsers(): Observable<User[]> {
    let url = `${this.apiURL}/users`
    return this.ApiResponseHandler<UserDTO[], User[]>(this.api.get<UserDTO[]>(url, this.requestOptions), (data => {
      return data.map(userData => {
        let dto = new UserDTO(this, this.asyncService)
        return this.resolveDTO<UserDTO, User>(dto, userData)
      })
    }))
  }

  // ------------ ROADTRIPS ------------

  getRoadtripById(id: number): Observable<Roadtrip> {
    let url = `${this.apiURL}/roadtrips/${id}`
    return this.ApiResponseHandler<RoadtripDTO, Roadtrip>(this.api.get<RoadtripDTO>(url, this.requestOptions), (data => {
      let dto = new RoadtripDTO(this, this.asyncService)
      return this.resolveDTO<RoadtripDTO, Roadtrip>(dto, data)
    }))
  }

  getAllRoadtrips(): Observable<Roadtrip[]> {
    let url = `${this.apiURL}/roadtrips/`
    return this.ApiResponseHandler<RoadtripDTO[], Roadtrip[]>(this.api.get<RoadtripDTO[]>(url, this.requestOptions), (roadtripDataObjs => {
      return roadtripDataObjs.map(dataObj => {
        let dto = new RoadtripDTO(this, this.asyncService)
        return this.resolveDTO<RoadtripDTO, Roadtrip>(dto, dataObj)
      })
    }))
  }

  addRoadtrip(roadtripDTO: RoadtripDTO): Promise<Roadtrip> {
    let url = `${this.apiURL}/roadtrips/`
    return new Promise((resolve, reject) => {
      // upload data
      let dataToUpload = roadtripDTO.getUploadFormat()
      this.ApiResponseHandler(this.api.post<RoadtripDTO>(url, dataToUpload, this.requestOptions), (data => {
        let dto = new RoadtripDTO(this, this.asyncService)
        let client = this.resolveDTO<RoadtripDTO, Roadtrip>(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  updateRoadtrip(roadtripDTO: RoadtripDTO): Promise<Roadtrip> {
    let url = `${this.apiURL}/roadtrips/${roadtripDTO.id}`
    let dataToUpload = roadtripDTO.getUploadFormat()
    return new Promise((resolve, reject) => {
      this.ApiResponseHandler(this.api.put(url, dataToUpload, this.requestOptions), (data => {
        let dto = new RoadtripDTO(this, this.asyncService)
        let client = this.resolveDTO(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  // ------------ ROADTRIP STOPS ------------

  getRoadtripStopById(id: number): Observable<RoadtripStop> {
    let url = `${this.apiURL}/stops/${id}`
    return this.ApiResponseHandler<RoadtripStopDTO, RoadtripStop>(this.api.get<RoadtripStopDTO>(url, this.requestOptions), (data => {
      let dto = new RoadtripStopDTO(this, this.asyncService)
      return this.resolveDTO<RoadtripStopDTO, RoadtripStop>(dto, data)
    }))
  }

  getAllRoadtripStops(): Observable<RoadtripStop[]> {
    let url = `${this.apiURL}/stops/`
    return this.ApiResponseHandler<RoadtripStopDTO[], RoadtripStop[]>(this.api.get<RoadtripStopDTO[]>(url, this.requestOptions), (roadtripStopDataObjs => {
      return roadtripStopDataObjs.map(dataObj => {
        let dto = new RoadtripStopDTO(this, this.asyncService)
        return this.resolveDTO<RoadtripStopDTO, RoadtripStop>(dto, dataObj)
      })
    }))
  }

  addRoadtripStop(stopDTO: RoadtripStopDTO): Promise<RoadtripStop> {
    let url = `${this.apiURL}/stops/`
    return new Promise((resolve, reject) => {
      // upload data
      let dataToUpload = stopDTO.getUploadFormat()
      this.ApiResponseHandler(this.api.post<RoadtripStopDTO>(url, dataToUpload, this.requestOptions), (data => {
        let dto = new RoadtripStopDTO(this, this.asyncService)
        let client = this.resolveDTO<RoadtripStopDTO, RoadtripStop>(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  updateRoadtripStop(roadtripStopDTO: RoadtripStopDTO): Promise<RoadtripStop> {
    let url = `${this.apiURL}/stops/${roadtripStopDTO.id}`
    let dataToUpload = roadtripStopDTO.getUploadFormat()
    return new Promise((resolve, reject) => {
      this.ApiResponseHandler(this.api.put(url, dataToUpload, this.requestOptions), (data => {
        let dto = new RoadtripStopDTO(this, this.asyncService)
        let client = this.resolveDTO(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  // ------------ LOCATIONS ------------

  getLocationById(id: number): Observable<Location> {
    let url = `${this.apiURL}/locations/${id}`
    return this.ApiResponseHandler<LocationDTO, Location>(this.api.get<LocationDTO>(url, this.requestOptions), (data => {
      let dto = new LocationDTO()
      return this.resolveDTO<LocationDTO, Location>(dto, data)
    }))
  }

  getAllLocations(): Observable<Location[]> {
    let url = `${this.apiURL}/locations/`
    return this.ApiResponseHandler<LocationDTO[], Location[]>(this.api.get<LocationDTO[]>(url, this.requestOptions), (locationDataObjs => {
      return locationDataObjs.map(dataObj => {
        let dto = new LocationDTO()
        return this.resolveDTO<LocationDTO, Location>(dto, dataObj)
      })
    }))
  }

  addLocation(location: LocationDTO): Promise<Location> {
    let url = `${this.apiURL}/locations/`
    return new Promise<Location>((resolve, reject) => {
      // upload data
      return this.ApiResponseHandler(this.api.post<LocationDTO>(url, location, this.requestOptions), (data => {
        let dto = new LocationDTO()
        let client = this.resolveDTO<LocationDTO, Location>(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  updateLocation(locationDTO: LocationDTO): Promise<Location> {
    let url = `${this.apiURL}/locations/${locationDTO.id}`
    return new Promise((resolve, reject) => {
      this.ApiResponseHandler(this.api.put(url, locationDTO, this.requestOptions), (data => {
        let dto = new LocationDTO()
        let client = this.resolveDTO(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  // ------------ COMMENTS ------------

  getCommentById(id: number): Observable<Comment> {
    let url = `${this.apiURL}/comments/${id}`
    return this.ApiResponseHandler<CommentDTO, Comment>(this.api.get<CommentDTO>(url, this.requestOptions), (data => {
      let dto = new CommentDTO(this, this.asyncService)
      return this.resolveDTO<CommentDTO, Comment>(dto, data)
    }))
  }

  getAllComments(): Observable<Comment[]> {
    let url = `${this.apiURL}/comments/`
    return this.ApiResponseHandler<CommentDTO[], Comment[]>(this.api.get<CommentDTO[]>(url, this.requestOptions), (commentDataObjs => {
      return commentDataObjs.map(dataObj => {
        let dto = new CommentDTO(this, this.asyncService)
        return this.resolveDTO<CommentDTO, Comment>(dto, dataObj)
      })
    }))
  }

  addComment(commentDTO: CommentDTO): Promise<Comment> {
    let url = `${this.apiURL}/comments/`
    return new Promise<Comment>((resolve, reject) => {
      // upload data
      let dataToUpload = commentDTO.getUploadFormat()
      return this.ApiResponseHandler(this.api.post<CommentDTO>(url, dataToUpload, this.requestOptions), (data => {
        let dto = new CommentDTO(this, this.asyncService)
        let client = this.resolveDTO<CommentDTO, Comment>(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  updateComment(commentDTO: CommentDTO): Promise<Comment> {
    let url = `${this.apiURL}/comments/${commentDTO.id}`
    let dataToUpload = commentDTO.getUploadFormat()
    return new Promise((resolve, reject) => {
      this.ApiResponseHandler(this.api.put(url, dataToUpload, this.requestOptions), (data => {
        let dto = new CommentDTO(this, this.asyncService)
        let client = this.resolveDTO(dto, data)
        resolve(client)
      })).subscribe(() => {}, (err) => {reject(err)})
    })
  }

  // --------------------------------------- HELPER FUNCTIONALITY ---------------------------------------
  
  private ApiResponseHandler<DtoResponseType, ClientResponseType>(observable: Observable<DtoResponseType>, toClientHandler: (data: DtoResponseType)=>ClientResponseType): Observable<ClientResponseType>{
    return observable.pipe(map(data => {
      return toClientHandler(data)
    }))
  }

  private resolveDTO<DTO, Client>(dto: DtoDataObject<DTO, Client>, data: DTO): Client {
    dto.initFromData(data)
    return dto.toClient()
  }
}
