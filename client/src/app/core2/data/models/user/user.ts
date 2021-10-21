import { ClientDataObject } from "../client-data-object"
import { Comment } from "../comment/comment"
import { Location } from "../location/location"
import { UserDTO } from "./user-dto"

export class User implements ClientDataObject<UserDTO> {
    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    photo: string
    locationsToVisit: Location[] = []

    toDTO(): UserDTO {
        let dto = new UserDTO()
        dto.id = this.id
        dto.username = this.username
        dto.firstname = this.firstname
        dto.lastname = this.lastname
        dto.email = this.email
        dto.photo = this.photo
        dto.locationsToVisitIds = this.locationsToVisit.map(location => location.id)

        return dto
    }
}
