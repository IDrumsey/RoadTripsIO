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
import { GeneralReport } from '../models/report/general-report';
import { GeneralReportDTO } from '../models/report/general-report-dto';
import { ImageReport } from '../models/report/image-report';
import { ImageReportDTO } from '../models/report/image-report-dto';
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

  // --------------------------- GET ---------------------------
  getUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/users/${id}`

      this.api.get<UserDTO>(url, this.requestOptions).subscribe(data => {
        let dto = new UserDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillUser(dto, client).then(user => resolve(user))
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
        this.fulfillComment(dto, client).then(comment => resolve(comment))
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
        this.fulfillStop(dto, client).then(stop => resolve(stop), err => reject(err))
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
        this.fulfillRoadtrip(dto, client).then(roadtrip => resolve(roadtrip), err => reject(err))
      }, err => reject(err))
    })
  }

  getImageReport(id: number): Promise<ImageReport> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/image-reports/${id}`

      this.api.get<ImageReportDTO>(url, this.requestOptions).subscribe(data => {
        let dto = new ImageReportDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillImageReport(dto, client).then(newImageReport => resolve(newImageReport), err => reject(err))
      }, err => reject(err))
    })
  }

  getUserImageReports(user: User): Promise<ImageReport[]> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/image-reports/`

      let reports: ImageReport[] = []

      this.api.get<ImageReportDTO[]>(url, this.requestOptions).subscribe(data => {
        let requests: Promise<any>[]

        data = data.filter(reportDTO => reportDTO.reporterId == user.id)

        requests = data.map(reportData => {
          let dto = new ImageReportDTO()
          dto.init(reportData)

          let client = dto.toClient()
          return this.fulfillImageReport(dto, client).then(newImageReport => reports.push(newImageReport), err => reject(err))
        })

        this.asyncService.runMultiplePromises(requests).then(() => {
          resolve(reports)
        }, err => reject(err))
      }, err => reject(err))
    })
  }

  // --------------------------- DELETE ---------------------------

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

  deleteImageReport(imageReport: ImageReport): Promise<void> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/image-reports/${imageReport.id}`

      this.api.delete(url, this.requestOptions).subscribe(() => {
        resolve()
      }, err => reject(err))
    })
  }

  // --------------------------- PUT ---------------------------

  updateRoadtrip(roadtrip: Roadtrip): Promise<Roadtrip> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/roadtrips/${roadtrip.id}`

      let uploadDTO = roadtrip.toDTO()
      this.api.put<RoadtripDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let downloadDTO = new RoadtripDTO()
        downloadDTO.init(data)

        let client = downloadDTO.toClient()
        this.fulfillRoadtrip(downloadDTO, client).then(updatedRoadtrip => resolve(updatedRoadtrip), err => reject(err))
      })
    })
  }

  updateComment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/comments/${comment.id}`

      let uploadDTO = comment.toDTO()
      this.api.put<CommentDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let downloadDTO = new CommentDTO()
        downloadDTO.init(data)

        let client = downloadDTO.toClient()
        this.fulfillComment(downloadDTO, client).then(updatedComment => resolve(updatedComment), err => reject(err))
      })
    })
  }

  // --------------------------- POST ---------------------------

  addLocation(location: Location): Promise<Location> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/locations/`

      let uploadDTO = location.toDTO()

      this.api.post<LocationDto>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let dto = new LocationDto()
        dto.init(data)

        let client = dto.toClient()
        resolve(client)
      }, err => reject(err))
    })
  }

  addStop(stop: Stop): Promise<Stop> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/stops/`

      let uploadDTO = stop.toDTO()

      this.api.post<StopDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let dto = new StopDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillStop(dto, client).then(newStop => resolve(newStop), err => reject(err))
      }, err => reject(err))
    })
  }

  addComment(comment: Comment): Promise<Comment> {
    return new Promise((resolve, reject) => {
      let url = `${this.apiURL}/comments/`

      let uploadDTO = comment.toDTO()

      this.api.post<CommentDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let dto = new CommentDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillComment(dto, client).then(newComment => resolve(newComment), err => reject(err))
      }, err => reject(err))
    })
  }

  addImageReport(report: ImageReport): Promise<ImageReport> {
    return new Promise((resolve, reject) => {
      // temp url because json server can't do nested routes I think
      let url = `${this.apiURL}/image-reports/`

      let uploadDTO = report.toDTO()

      this.api.post<ImageReportDTO>(url, uploadDTO, this.requestOptions).subscribe(data => {
        let dto = new ImageReportDTO()
        dto.init(data)

        let client = dto.toClient()
        this.fulfillImageReport(dto, client).then(newImageReport => resolve(newImageReport), err => reject(err))
      }, err => reject(err))
    })
  }

  // --------------------------------------- NESTED DATA LOADERS ---------------------------------------
  
  private fulfillUser(dto: UserDTO, client: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get locations to visit
      requests.push(...dto.locationsToVisitIds.map(id => this.getLocation(id).then(locationToVisit => client.locationsToVisit.push(locationToVisit), err => reject(err))))

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(client)
      })
    })
  }

  private fulfillComment(dto: CommentDTO, client: Comment): Promise<Comment> {
    return new Promise<Comment>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get replies
      requests.push(...dto.replyIds.map(replyId => this.getComment(replyId).then(reply => client.replies.push(reply), err => reject(err))))

      // get owner
      if(dto.ownerId){
        requests.push(this.getUser(dto.ownerId).then(owner => client.owner = owner, err => reject(err)))
      }

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(client)
      })
    })
  }

  fulfillStop(dto: StopDTO, client: Stop): Promise<Stop> {
    return new Promise<Stop>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get location
      requests.push(this.getLocation(dto.locationId).then(location => client.location = location, err => reject(err)))

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(client)
      })
    })
  }

  fulfillRoadtrip(dto: RoadtripDTO, client: Roadtrip): Promise<Roadtrip> {
    return new Promise<Roadtrip>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get owner
      requests.push(this.getUser(dto.ownerId).then(owner => client.owner = owner, err => reject(err)))

      // get collaborators
      requests.push(...dto.collaboratorIds.map(collaboratorId => this.getUser(collaboratorId).then(collaborator => client.collaborators.push(collaborator), err => reject(err))))

      // get stops
      requests.push(...dto.stopIds.map(stopId => this.getStop(stopId).then(stop => client.stops.push(stop), err => reject(err))))

      // get comments
      requests.push(...dto.commentIds.map(commentId => this.getComment(commentId).then(comment => client.comments.push(comment), err => reject(err))))

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(client)
      })
    })
  }

  fulfillImageReport(dto: ImageReportDTO, client: ImageReport): Promise<ImageReport> {
    return new Promise<ImageReport>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get the generic report data
      requests.push(this.fulfillReport(dto, client))

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(client)
      })
    })
  }

  fulfillReport(dto: GeneralReportDTO, client: GeneralReport): Promise<GeneralReport> {
    return new Promise<GeneralReport>((resolve, reject) => {
      let requests: Promise<any>[] = []

      // get owner
      if(dto.reporterId){
        requests.push(this.getUser(dto.reporterId).then(reporter => {
          client.reporter = reporter
        }))
      }

      // run requests
      this.asyncService.runMultiplePromises(requests).then(() => {
        resolve(client)
      })
    })
  }
}
