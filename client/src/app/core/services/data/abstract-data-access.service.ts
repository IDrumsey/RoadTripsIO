import { Injectable } from '@angular/core';
import { Comment } from '../../data2/models/client/comment';
import { Location } from '../../data2/models/client/location';
import { Roadtrip } from '../../data2/models/client/roadtrip';
import { RoadtripStop } from '../../data2/models/client/roadtrip-stop';
import { User } from '../../data2/models/client/user';
import { AsyncService } from '../async.service';
import { DataAccessService } from './data-access.service';

@Injectable({
  providedIn: 'root'
})
export class AbstractDataAccessService {

  constructor(private apiService: DataAccessService, private asyncService: AsyncService) { }

  // -------------------------------------- FUNCTIONALITY --------------------------------------

  // ----------------- USERS -----------------

  getUserById(id: number): Promise<User> {
    return new Promise(resolve => {
      // get user from api
      this.apiService.getUser(id).subscribe(user => {
        // load locations
        user.loadAdditionalData().then(() => {
          resolve(user)
        })
      })
    })
  }

  getAllUsers(): Promise<User[]> {
    return new Promise(resolve => {
      // get user from api
      this.apiService.getAllUsers().subscribe(users => {
        // load locations
        let numUsers = users.length
        let loadsFinished = 0
        users.forEach(user => {
          user.loadAdditionalData().then(() => {
            loadsFinished++
            if(loadsFinished == numUsers){
              resolve(users)
            }
          })
        })
      })
    })
  }

  // ----------------- ROADTRIPS -----------------

  getRoadtripById(id: number): Promise<Roadtrip> {
    return new Promise((resolve, reject) => {
      this.apiService.getRoadtripById(id).subscribe(roadtrip => {
        roadtrip.loadAdditionalData().then(() => {
          resolve(roadtrip)
        })
      }, err => {
        reject(err)
      })
    })
  }

  getAllRoadtrips(): Promise<Roadtrip[]> {
    return new Promise(resolve => {
      // get Roadtrip from api
      this.apiService.getAllRoadtrips().subscribe(roadtrips => {
        let initializers = roadtrips.map(stop => {
          return stop.loadAdditionalData()
        })

        this.asyncService.runMultiplePromises(initializers).then(() => {
          resolve(roadtrips)
        })
      })
    })
  }

  // ----------------- ROADTRIP STOPS -----------------

  getRoadtripStopById(id: number): Promise<RoadtripStop> {
    return new Promise(resolve => {
      this.apiService.getRoadtripStopById(id).subscribe(roadtripStop => {
        roadtripStop.loadAdditionalData().then(() => {
          resolve(roadtripStop)
        })
      })
    })
  }

  getAllRoadtripStops(): Promise<RoadtripStop[]> {
    return new Promise(resolve => {
      // get roadtripStop from api
      this.apiService.getAllRoadtripStops().subscribe(roadtripStops => {
        let initializers = roadtripStops.map(stop => {
          return stop.loadAdditionalData()
        })

        this.asyncService.runMultiplePromises(initializers).then(() => {
          resolve(roadtripStops)
        })
      })
    })
  }

  // ----------------- LOCATIONS -----------------

  getLocationById(id: number): Promise<Location> {
    return new Promise(resolve => {
      this.apiService.getLocationById(id).subscribe(location => {
        resolve(location)
      })
    })
  }

  getAllLocations(): Promise<Location[]> {
    return new Promise(resolve => {
      // get Location from api
      this.apiService.getAllLocations().subscribe(locations => {
        resolve(locations)
      })
    })
  }

  // ----------------- COMMENTS -----------------

  getCommentById(id: number): Promise<Comment> {
    return new Promise(resolve => {
      // get user from api
      this.apiService.getCommentById(id).subscribe(comment => {
        // load locations
        comment.loadAdditionalData().then(() => {
          resolve(comment)
        })
      })
    })
  }

  getAllComments(): Promise<Comment[]> {
    return new Promise(resolve => {
      // get Comment from api
      this.apiService.getAllComments().subscribe(comments => {
        // load locations
        let numComments = comments.length
        let loadsFinished = 0
        comments.forEach(Comment => {
          Comment.loadAdditionalData().then(() => {
            loadsFinished++
            if(loadsFinished == numComments){
              resolve(comments)
            }
          })
        })
      })
    })
  }
}
