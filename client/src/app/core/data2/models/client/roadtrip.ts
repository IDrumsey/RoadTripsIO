import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { DataModel } from "../data-model"
import { RoadtripDTO } from "../dto/roadtrip-dto"
import { Comment } from "./comment"
import { RoadtripStop } from "./roadtrip-stop"
import { User } from "./user"

export class Roadtrip extends DataModel implements ClientDataObject<RoadtripDTO, Roadtrip>, ComplexDataObject {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
        super(api, asyncService)
    }

    // ---------------------------------------- DATA ----------------------------------------
    id: number
    title: string
    description: string
    datePosted: Date
    owner: User
    collaborators: User[] = []
    stops: RoadtripStop[] = []
    comments: Comment[] = []

    // ---------------------------------------- PRIVATE DATA ----------------------------------------
    _ownerId: number
    private _collaboratorIds: number[]
    private _stopIds: number[]
    private _commentIds: number[]

    // ---------------------------------------- GETTERS AND SETTERS ----------------------------------------
    set ownerId(id: number) {
        this._ownerId = id
    }

    set collaboratorIds(ids: number[]) {
        this._collaboratorIds = ids
    }

    set stopIds(ids: number[]) {
        this._stopIds = ids
    }

    set commentIds(ids: number[]) {
        this._commentIds = ids
    }

    // ---------------------------------------- FUNCTIONALITY ----------------------------------------
    toDTO(): RoadtripDTO {
        let dto = new RoadtripDTO(this.api, this.asyncService)
        dto.id = this.id
        dto.title = this.title
        dto.description = this.description
        dto.datePosted = this.datePosted
        dto.ownerId = this._ownerId
        dto.collaboratorIds = this.collaborators.map(collaborator => collaborator.id)
        dto.stopIds = this.stops.map(stop => stop.id)
        dto.commentIds = this.comments.map(comment => comment.id)

        return dto
    }

    loadAdditionalData(): Promise<void> {
        let loaders = [
            this.fetchOwner(),
            this.fetchCollaborators(),
            this.fetchStops(),
            this.fetchComments()
        ]

        return new Promise(resolve => {
            this.asyncService.runMultiplePromises(loaders).then(() => {
                resolve()
            })
        })
    }

    private fetchOwner(): Promise<User> {
        return new Promise(resolve => {
            this.api.getUser(this._ownerId).subscribe(owner => {
                this.owner = owner
                this.owner.loadAdditionalData().then(() => {
                    resolve(this.owner)
                })
            })
        })
    }

    private fetchCollaborators(): Promise<User[]> {
        return new Promise(resolve => {
            let collaborators: User[] = []

            let loaders = this._collaboratorIds.map(collaboratorId => {
                return new Promise<void>(resolve => {
                    this.api.getUser(collaboratorId).subscribe(collaborator => {
                        collaborators.push(collaborator)
                        collaborator.loadAdditionalData().then(() => {
                            resolve()
                        })
                    })
                })
            })

            this.asyncService.runMultiplePromises(loaders).then(() => {
                this.collaborators = collaborators
                resolve(collaborators)
            })
        })
    }

    private fetchStops(): Promise<RoadtripStop[]> {
        return new Promise(resolve => {
            let stops: RoadtripStop[] = []

            let loaders = this._stopIds.map(stopId => {
                return new Promise<void>(resolve => {
                    this.api.getRoadtripStopById(stopId).subscribe(stop => {
                        stops.push(stop)
                        stop.loadAdditionalData().then(() => {
                            resolve()
                        })
                    })
                })
            })

            this.asyncService.runMultiplePromises(loaders).then(() => {
                this.stops = stops
                resolve(stops)
            })
        })
    }

    private fetchComments(): Promise<Comment[]> {
        return new Promise(resolve => {
            let comments: Comment[] = []

            let loaders = this._commentIds.map(commentId => {
                return new Promise<void>(resolve => {
                    this.api.getCommentById(commentId).toPromise().then(comment => {
                        comments.push(comment)
                        comment.loadAdditionalData().then(() => {
                            resolve()
                        })
                    })
                })
            })

            this.asyncService.runMultiplePromises(loaders).then(() => {
                this.comments = comments
                resolve(comments)
            })
        })
    }

    private findStop(stop: RoadtripStop): RoadtripStop | undefined {
        return this.stops.find(tempStop => tempStop.id == stop.id)
    }

    addStopOnly(stop: RoadtripStop): void {
        // TODO : might want to check for duplicates
        this.stops.push(stop)
    }

    addStop(stop: RoadtripStop): void {
        // upload location to get id
        stop.location.upload(this.api).then(newLocation => {
            stop.locationId = newLocation.id
            stop.upload().then(newStop => {
                // already have the location so you don't need to fetch it
                newStop.location = newLocation
                this.stops.push(newStop)
                // update roadtrip stop references to include new stop id in database
                this.update().then(updatedRoadtrip => {
                    console.log("roadtrip updated")
                }, err => {
                    console.log("error occured : ", err)
                })
            }, (err => {
                console.log("error occured : ", err)
            }))
        }, err => {
            console.log("error occured : ", err)
        })
    }

    removeStop(stop: RoadtripStop): boolean {
        let startLength = this.stops.length
        let stopToRemove = this.findStop(stop)
        if(stopToRemove){
            let index = this.stops.indexOf(stopToRemove)
            if(index != -1){
                this.stops.splice(index, 1)
            }
        }
        if(startLength == this.stops.length + 1){
            return true
        }
        else{
            return false
        }
    }

    addCommentWithoutUpload(comment: Comment): boolean {
        let startLength = this.comments.length
        this.comments.push(comment)
        if(startLength == this.comments.length - 1){
            return true
        }
        return false
    }

    addCommentWithUpload(commentToUpload: Comment): Promise<void> {
        return new Promise((resolve, reject) => {
            commentToUpload.addToAPI().then(newComment => {
                // add to array
                newComment.loadAdditionalData().then(() => {
                    this.comments.push(newComment)
                    // update roadtrip comment ids in database
                    this.update().then(updatedRoadtrip => {
                        resolve()
                    }, err => {
                        // rollback
                        this.comments.splice(this.comments.indexOf(newComment))
                        reject(err)
                    })
                }, err => {
                    // rollback -> delete comment
                    newComment.deleteFromAPI().then(() => {
                        resolve()
                    }, err => {
                        // can't delete the comment so contact admin?
                        // TODO - not sure what to do about this situation
                    })
                })
              }, err => {
                console.log("error uploading comment")
                reject(err)
              })
        })
    }

    removeCommentWithoutUpload(comment: Comment): void {
        let index = this.comments.findIndex(tempComment => tempComment.id == comment.id)
        if(index != -1){
            this.comments.splice(index, 1)
        }
    }

    update(): Promise<Roadtrip> {
        return this.toDTO().update()
    }

    getComment(id: number): Comment | undefined {
        // recursively(ish) finds the comment even if it's nested since the roadtrip doesn't store all the comments directly
        let currLevelComments = this.comments
        let nextLevelComments: Comment[]

        do{
            for(let comment of currLevelComments){
                if(comment.id == id){
                    return comment
                }
            }
            nextLevelComments = []
            currLevelComments.forEach(comment => {
                nextLevelComments.push(...comment.replies)
            })
            currLevelComments = nextLevelComments
        }while(currLevelComments.length > 0)
        // not found
        return undefined
    }
}
