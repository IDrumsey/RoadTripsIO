import { RoadtripStop } from "./roadtrip-stop"
import { Comment } from "../comment"
import { User } from "../user"
import { RoadtripDTO } from "../DTO/roadtrip-dto"
import { DataAccessService } from "../../services/data/data-access.service"
import { AsyncService } from "../../services/async.service"

export class Roadtrip {
    constructor(private api: DataAccessService, private asyncService: AsyncService){}

    // data
    id: number
    title: string
    description: string
    datePosted: Date
    owner: User
    collaborators: User[] = []
    stops: RoadtripStop[] = []
    comments: Comment[] = []

    // ------------------------------------------ PUBLIC FUNCTIONALITY ------------------------------------------
    addStop(stop: RoadtripStop): void {
        // make api request to add data
        stop.upload().then(uploadedStop => {
            this.stops.push(uploadedStop)
            let dto = this.toDTO()
            dto.upload()
        })
    }

    async removeStop(stopToRemove: RoadtripStop): Promise<void> {
        stopToRemove.remove().then(stopRemoved => {
            console.log("removed stop : ", stopRemoved.id)
            this.spliceStop(stopRemoved)
            console.log(this.stops)
            this.api.updateRoadtrip(this.toDTO()).then(() => {
                console.log("actually done")
            })
        })
    }

    private spliceStop(stop: RoadtripStop): void {
        let stopIndex = this.getStopIndex(stop)
        if(stopIndex != -1){
            this.stops.splice(stopIndex, 1)
        }
    }

    findStop(stop: RoadtripStop): RoadtripStop | undefined {
        return this.stops.find(tempStop => tempStop === stop)
    }

    isCollaborator(user: User): boolean {
        // check collabs
        if(this.collaborators.indexOf(user) != -1) {
            return true
        }
        return false
    }

    // ------------------------------------------ PRIVATE FUNCTIONALITY ------------------------------------------

    private getStopIndex(stop: RoadtripStop): number {
        return this.stops.indexOf(stop)
    }

    private toDTO(): RoadtripDTO {
        let dto = new RoadtripDTO(this.api, this.asyncService)

        dto.id = this.id
        dto.title = this.title
        dto.description = this.description
        dto.datePosted = this.datePosted
        dto.ownerId = this.owner.id
        dto.collaboratorIds = this.collaborators.map(collab => collab.id)
        dto.stopIds = this.stops.map(stop => stop.id)
        dto.commentIds = this.comments.map(comment => comment.id)

        return dto
    }
}
