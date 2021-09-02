import { AsyncService } from "src/app/core/services/async.service"
import { DataAccessService } from "src/app/core/services/data/data-access.service"
import { DtoDataObject } from "../../dto-data-object"
import { User } from "../client/user"
import { DataModel } from "../data-model"

export class UserDTO extends DataModel implements DtoDataObject<UserDTO, User> {
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
    locationsToVisitIds: number[] = []

    // ---------------------------------------- FUNCTIONALITY ----------------------------------------
    initFromData(data: UserDTO): void {
        this.id = data.id
        this.username = data.username
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.locationsToVisitIds = data.locationsToVisitIds
        this.photo = data.photo
    }
    
    toClient(): User {
        let clientUser = new User(this.api, this.asyncService)
        clientUser.id = this.id
        clientUser.username = this.username
        clientUser.firstname = this.firstname
        clientUser.lastname = this.lastname
        clientUser.email = this.email
        clientUser.locationsToVisitIds = this.locationsToVisitIds
        clientUser.photo = this.photo

        return clientUser
    }
}
