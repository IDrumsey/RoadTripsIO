import { DataTransferObject } from "../data-transfer-object"
import { User } from "./user"

export class UserDTO implements DataTransferObject<UserDTO, User> {
    id: number
    username: string
    bio: string
    firstname: string
    lastname: string
    email: string
    locationsToVisitIds: number[]
    photo: string
    reportedCommentIds: number[] = []

    init(data: UserDTO): void {
        this.id = data.id
        this.username = data.username
        this.bio = data.bio
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
        this.photo = data.photo
        // this method avoids the [] being replaced with undefined
        if(data.reportedCommentIds){
            this.reportedCommentIds = data.reportedCommentIds
        }
        if(data.locationsToVisitIds){
            this.locationsToVisitIds = data.locationsToVisitIds
        }
    }

    toClient(): User {
        let client = new User()
        client.id = this.id
        client.username = this.username
        client.bio = this.bio
        client.firstname = this.firstname
        client.lastname = this.lastname
        client.email = this.email
        client.photo = this.photo

        return client
    }
}
