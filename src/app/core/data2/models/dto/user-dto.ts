import { DtoDataObject } from "../../dto-data-object"
import { User } from "../client/user"

export class UserDTO implements DtoDataObject<UserDTO, User> {
    // ---------------------------------------- DATA ----------------------------------------

    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    locationsToVisitIds: number[] = []

    // ---------------------------------------- FUNCTIONALITY ----------------------------------------
    initFromData(data: UserDTO): void {
        this.id = data.id
        this.username = data.username
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.locationsToVisitIds = data.locationsToVisitIds
    }
    
    toClient(): User {
        let clientUser = new User()
        clientUser.id = this.id
        clientUser.username = this.username
        clientUser.firstname = this.firstname
        clientUser.lastname = this.lastname
        clientUser.email = this.email
        clientUser.locationsToVisitIds = this.locationsToVisitIds

        return clientUser
    }
}
