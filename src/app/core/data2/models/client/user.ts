import { AsyncService } from "src/app/core/services/async.service"
import { AuthenticationService } from "src/app/core/services/authentication.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { DataModel } from "../data-model"
import { UserDTO } from "../dto/user-dto"
import { Comment } from "./comment"
import { Location } from "./location"
import { Roadtrip } from "./roadtrip"

export class User extends DataModel implements ClientDataObject<UserDTO, User>, ComplexDataObject {
    constructor(private api: DataAccessService, private asyncService: AsyncService){
        super(api, asyncService)
    }

    // ---------------------------------------- DATA ----------------------------------------

    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    photo: string
    locationsToVisit: Location[]
    reportedComments: Comment[] = []


    private _locationsToVisitIds: number[] = []
    private _reportedCommentIds: number[] = []

    // ---------------------------------------- GETTERS AND SETTERS ----------------------------------------

    set locationsToVisitIds(ids: number[]) {
        this._locationsToVisitIds = ids
    }

    set reportedCommentIds(ids: number[]) {
        this._reportedCommentIds = ids
    }

    // ---------------------------------------- FUNCTIONALITY ----------------------------------------

    toDTO(): UserDTO {
        let userDTO = new UserDTO(this.api, this.asyncService)
        userDTO.id = this.id
        userDTO.username = this.username
        userDTO.firstname = this.firstname
        userDTO.lastname = this.lastname
        userDTO.email = this.email
        userDTO.photo = this.photo
        userDTO.reportedCommentIds = this.reportedComments.map(comment => comment.id)
        
        return userDTO
    }

    loadAdditionalData(): Promise<void> {
        let loaders = [
            this.fetchLocationsToVisit(),
            this.fetchReportedComments()
        ]

        return new Promise(resolve => {
            this.asyncService.runMultiplePromises(loaders).then(() => {
                resolve()
            })
        })
    }

    fetchLocationsToVisit(): Promise<Location[]> {
        return new Promise(resolve => {
            let locations: Location[] = []

            let loaders = this._locationsToVisitIds.map(locationId => {
                return this.api.getLocationById(locationId).toPromise().then(location => {
                    locations.push(location)
                })
            })

            this.asyncService.runMultiplePromises(loaders).then(() => {
                this.locationsToVisit = locations
                resolve(locations)
            })
        })
    }

    fetchCreatedRoadtrips(): Promise<Roadtrip[]> {
        return new Promise(resolve => {
            let createdRoadtrips: Roadtrip[] = []

            this.api.getAllRoadtrips().subscribe(roadtrips => {
                createdRoadtrips = roadtrips.filter(roadtrip => roadtrip._ownerId == this.id)
                let loaders = createdRoadtrips.map(cRoadtrip => {
                    return new Promise<void>(resolve => {
                        cRoadtrip.loadAdditionalData().then(() => {
                            resolve()
                        })
                    })
                })
                this.asyncService.runMultiplePromises(loaders).then(() => {
                    resolve(createdRoadtrips)
                })
            })
        })
    }

    fetchReportedComments(): Promise<Comment[]> {
        let removedReportedComment = false
        let reportedComments: Comment[] = []

        return new Promise((resolve, reject) => {
            this.asyncService.runMultiplePromises(this._reportedCommentIds.map(id => {
                return this.api.getCommentById(id).toPromise().then(reportedComment => {
                    reportedComments.push(reportedComment)
                }, err => {
                    if(err.status == 404){
                        // comment was probably deleted so remove the report
                        removedReportedComment = true
                    }
                })
            })).then(() => {
                this.reportedComments = reportedComments
                if(removedReportedComment){
                    this.updateAPI()
                }
                resolve(reportedComments)
            })
        })
    }

    reportComment(comment: Comment, authService: AuthenticationService): Promise<Comment> {
        return new Promise((resolve, reject) => {
            if(authService.currentlyLoggedInUser == null){
                alert("Must be logged in to report a comment")
                reject("Not logged in")
            }
            else{
                // TODO : Maybe check for duplicates
                this.reportedComments.push(comment)
                this.updateAPI().then(updatedUser => {
                    resolve(comment)
                }, err => {
                    let index = this.reportedComments.findIndex(reportedComment => reportedComment.id == comment.id)
                    if(index == -1){
                        reject("Already rolled back because comment is not reported")
                    }
                    else{
                        this.reportedComments.splice(index, 1)
                    }
                    reject("Couldn't update API")
                })
            }
        })
    }

    unreportComment(comment: Comment, authService: AuthenticationService): Promise<Comment> {
        return new Promise((resolve, reject) => {
            if(authService.currentlyLoggedInUser == null){
                alert("Must be logged in to unreport a comment")
                reject("Not logged in")
            }
            else{
                let index = this.reportedComments.findIndex(reportedComment => reportedComment.id == comment.id)
                if(index == -1){
                    reject("Comment not reported")
                }
                else{
                    this.reportedComments.splice(index, 1)
                }

                this.updateAPI().then(updatedUser => {
                    resolve(comment)
                }, err => {
                    this.reportedComments.push(comment)
                    reject("Couldn't update API")
                })
            }
        })
    }

    updateAPI(): Promise<User> {
        return this.api.updateUser(this.toDTO())
    }
}
