import { RoadtripStop } from "./roadtrip-stop"
import { Comment } from "../comment"
import { User } from "../user"

export class Roadtrip {
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
        this.stops.push(stop)
    }

    removeStop(stop: RoadtripStop): void {
        let stopIndex = this.getStopIndex(stop)
        if(stopIndex != -1){
            this.stops.splice(stopIndex, 1)
        }
    }

    findStop(stop: RoadtripStop): RoadtripStop | undefined {
        return this.stops.find(tempStop => tempStop === stop)
    }

    // ------------------------------------------ PRIVATE FUNCTIONALITY ------------------------------------------

    private getStopIndex(stop: RoadtripStop): number {
        return this.stops.indexOf(stop)
    }
}
