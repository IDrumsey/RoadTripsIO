import { AsyncService } from "../services/async.service"
import { DataAccessService } from "../services/data/data-access.service"
import { Comment } from "./comment"
import { RoadtripDTO } from "./DTO/roadtrip-dto"
import { Location } from "./location"
import { Roadtrip } from "./Roadtrip/roadtrip"

export class User {
    constructor(private api: DataAccessService, private asyncService: AsyncService){}
    
    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    photo: string
    locationsToVisitIds: number[]

    initFromRawData(data: User): void {
        this.id = data.id
        this.username = data.username
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.photo = data.photo
        this.locationsToVisitIds = data.locationsToVisitIds
    }

    async getCreatedRoadtrips(): Promise<Roadtrip[]> {
        return new Promise(resolve => {
            console.log("getting user's created roadtrips")
            // get all roadtrips
            this.api.getAllRoadtrips().then(dtos => {
                // filter
                let createdRoadtripsDTOS = dtos.filter(dto => dto.ownerId == this.id)

                let createdRoadtrips: Roadtrip[] = []
                this.asyncService.runMultiplePromises(createdRoadtripsDTOS.map(dto => {
                    return dto.toRoadtrip().then(roadtrip => {
                        createdRoadtrips.push(roadtrip)
                    })
                })).then(() => {
                    resolve(createdRoadtrips)
                })
            })
        })
    }

    async getCollabRoadtrips(): Promise<Roadtrip[]> {
        return new Promise(resolve => {
            console.log("getting user's collab roadtrips")
            // get all roadtrips
            this.api.getAllRoadtrips().then(dtos => {
                // filter
                let collabRoadtripsDTOS = dtos.filter(dto => dto.collaboratorIds.includes(this.id))
                console.log("filtered : ", collabRoadtripsDTOS)

                let collabRoadtrips: Roadtrip[] = []
                this.asyncService.runMultiplePromises(collabRoadtripsDTOS.map(dto => {
                    return dto.toRoadtrip().then(roadtrip => {
                        collabRoadtrips.push(roadtrip)
                    })
                })).then(() => {
                    console.log("done")
                    resolve(collabRoadtrips)
                })
            })
        })
    }
    getLocationsToVisit(): Promise<Location[]> {
        return new Promise(resolve => {
            let locationsToVisit: Location[] = []
            this.asyncService.runMultiplePromises(this.locationsToVisitIds.map(locationId => {
                return this.api.getLocationById(locationId).then(dto => {
                    locationsToVisit.push(dto.toLocation())
                })
            })).then(() => {
                resolve(locationsToVisit)
            })
        })
    }
    getLocations(){}
    getComments(){}
}
