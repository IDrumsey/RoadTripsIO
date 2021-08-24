import { Comment } from "./comment"
import { Location } from "./location"
import { Roadtrip } from "./Roadtrip/roadtrip"

export class User {
    id: number
    username: string
    firstname: string
    lastname: string
    email: string

    initFromRawData(data: User): void {
        this.id = data.id
        this.username = data.username
        this.firstname = data.firstname
        this.lastname = data.lastname
        this.email = data.email
    }

    getRoadtrips(){}
    getLocations(){}
    getComments(){}
}
