import { AsyncService } from "../../services/async.service"
import { DataAccessService } from "../../services/data/data-access.service"
import { RequestErrors } from "../models/request-errors"
import { Roadtrip } from "../Roadtrip/roadtrip"

export class RoadtripDTO {
    constructor(private api: DataAccessService, private asyncService: AsyncService){}

    // --------------------------- DATA ---------------------------
    id: number
    title: string
    description: string
    datePosted: Date
    ownerId: number
    collaboratorIds: number[] = []
    stopIds: number[] = []
    commentIds: number[] = []

    errors: RequestErrors[] = []

    // --------------------------- FUNCTIONALITY ---------------------------
    initFromRawData(data: RoadtripDTO): void {
        this.id = data.id
        this.title = data.title
        this.description = data.description
        this.datePosted = data.datePosted
        this.ownerId = data.ownerId
        this.collaboratorIds = data.collaboratorIds
        this.stopIds = data.stopIds
        this.commentIds = data.commentIds
    }

    async toRoadtrip(): Promise<Roadtrip> {
        return new Promise((resolve) => {
            let roadtrip = new Roadtrip(this.api, this.asyncService)
            // map data already loaded
            roadtrip.id = this.id
            roadtrip.title = this.title
            roadtrip.description = this.description
            roadtrip.datePosted = this.datePosted
            
            this.asyncService.runMultiplePromises([
                // get owner's data
                this.api.getUserById(this.ownerId).then(user => {
                    roadtrip.owner = user
                }).catch(err => {
                    console.log(err)
                }),

                // get collaborators' data
                ... this.collaboratorIds.map(collabId => {
                    return new Promise(resolve => {
                        this.api.getUserById(collabId).then(user => {
                            roadtrip.collaborators.push(user)
                            resolve(null)
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }),

                // need the extra promise because without it, the parent promise resolves before the nested promises do
                // get stop data
                ... this.stopIds.map(stopId => {
                    return new Promise(resolve => {
                        this.api.getStopById(stopId).then(stopDTO => {
                            // nested promise
                            stopDTO.toRoadtripStop().then(stop => {
                                roadtrip.stops.push(stop)
                                resolve(null)
                            })
                        }).catch(err => {
                            console.log(err)
                        })
                    })
                }),

                // get comment data
                ... this.commentIds.map(commentId => {
                    return new Promise(resolve => {
                        this.api.getCommentById(commentId).then(commentDTO => {
                            commentDTO.toComment().then(comment => {
                                roadtrip.comments.push(comment)
                                resolve(null)
                            })
                        })
                    })
                })
            ]).then(() => {
                resolve(roadtrip)
            })
        })
    }

    upload(): Promise<RoadtripDTO> {
        return new Promise(resolve => {
            this.api.updateRoadtrip(this).then(dto => {
                let updatedDTO = new RoadtripDTO(this.api, this.asyncService)
                updatedDTO.initFromRawData(dto)
                resolve(updatedDTO)
            })
        })
    }

    getUploadFormat(): {} {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            datePosted: this.datePosted,
            ownerId: this.ownerId,
            collaboratorIds: this.collaboratorIds,
            stopIds: this.stopIds,
            commentIds: this.commentIds
        }
    }
}
