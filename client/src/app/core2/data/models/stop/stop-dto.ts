import { DataTransferObject } from "../data-transfer-object"
import { Stop } from "./stop"

export class StopDTO implements DataTransferObject<StopDTO, Stop> {
    id: number
    locationId: number
    description: string

    init(data: StopDTO): void {
        this.id = data.id
        this.locationId = data.locationId
        this.description = data.description
    }

    toClient(): Stop {
        let client = new Stop()
        client.id = this.id
        client.description = this.description

        return client
    }
}
