import { ClientDataObject } from "../client-data-object"
import { Location } from "../location/location"
import { StopDTO } from "./stop-dto"

export class Stop implements ClientDataObject<StopDTO> {
    id: number
    location: Location
    description: string

    toDTO(): StopDTO {
        let dto = new StopDTO()
        dto.id = this.id
        dto.locationId = this.location.id
        dto.description = this.description

        return dto
    }
}
