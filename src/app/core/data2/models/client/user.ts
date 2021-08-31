import { AsyncService } from "src/app/core/services/async.service"
import { DataAccess2Service } from "src/app/core/services/data/data-access-2.service"
import { ClientDataObject } from "../../client-data-object"
import { ComplexDataObject } from "../../complex-data-object"
import { UserDTO } from "../dto/user-dto"
import { Location } from "./location"

export class User implements ClientDataObject<UserDTO, User>, ComplexDataObject {
    // ---------------------------------------- DATA ----------------------------------------

    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    locationsToVisit: Location[]


    private _locationsToVisitIds: number[] = []

    // ---------------------------------------- GETTERS AND SETTERS ----------------------------------------

    set locationsToVisitIds(ids: number[]) {
        this._locationsToVisitIds = ids
    }

    // ---------------------------------------- FUNCTIONALITY ----------------------------------------

    toDTO(): UserDTO {
        let userDTO = new UserDTO()
        userDTO.id = this.id
        userDTO.username = this.username
        userDTO.firstname = this.firstname
        userDTO.lastname = this.lastname
        userDTO.email = this.email
        
        return userDTO
    }

    loadAdditionalData(api: DataAccess2Service, asyncService: AsyncService): Promise<void> {
        let loaders = [this.initLocationsToVisit(api)]

        return new Promise(resolve => {
            asyncService.runMultiplePromises(loaders).then(() => {
                resolve()
            })
        })
    }

    initLocationsToVisit(api: DataAccess2Service): Promise<void> {
        return new Promise(resolve => {
            let locations: Location[] = []
            let locationRequestsComplete = 0

            this._locationsToVisitIds.forEach(locationId => {
                api.getLocationById(locationId).subscribe(location => {
                    locations.push(location)
                    locationRequestsComplete++
                    if(locationRequestsComplete == this._locationsToVisitIds.length){
                        this.locationsToVisit = locations
                        resolve()
                    }
                })
            })
        })
    }
}
