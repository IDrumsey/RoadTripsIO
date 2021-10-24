import { ClientDataObject } from "../client-data-object"
import { Comment } from "../comment/comment"
import { Location } from "../location/location"
import { UserDTO } from "./user-dto"

export class User implements ClientDataObject<UserDTO> {
    id: number
    username: string
    bio: string
    firstname: string
    lastname: string
    email: string
    photo: string
    locationsToVisit: Location[] = []

    toDTO(): UserDTO {
        let dto = new UserDTO()
        dto.id = this.id
        dto.username = this.username
        dto.bio = this.bio
        dto.firstname = this.firstname
        dto.lastname = this.lastname
        dto.email = this.email
        dto.photo = this.photo
        dto.locationsToVisitIds = this.locationsToVisit.map(location => location.id)

        return dto
    }

    get hasPhoto(): boolean {
        return this.photo ? true : false
    }

    get hasBio(): boolean {
        return this.bio ? true : false
    }
}
