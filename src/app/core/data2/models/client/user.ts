import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { DataModel } from "../data-model"
import { UserDTO } from "../dto/user-dto"
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


    private _locationsToVisitIds: number[] = []

    // ---------------------------------------- GETTERS AND SETTERS ----------------------------------------

    set locationsToVisitIds(ids: number[]) {
        this._locationsToVisitIds = ids
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
        
        return userDTO
    }

    loadAdditionalData(): Promise<void> {
        let loaders = [
            this.fetchLocationsToVisit()
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
                console.log(roadtrips)
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
}
