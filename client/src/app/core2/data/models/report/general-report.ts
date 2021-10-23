import { ClientDataObject } from "../client-data-object"
import { User } from "../user/user"
import { GeneralReportDTO } from "./general-report-dto"

export class GeneralReport implements ClientDataObject<GeneralReportDTO> {
    id: number
    reporter: User | null
    date: Date
    msg: string | null

    toDTO(): GeneralReportDTO {
        let dto = new GeneralReportDTO()

        dto.id = this.id
        if(this.reporter){
            dto.reporterId = this.reporter.id
        }
        dto.date = this.date
        if(this.msg){
            dto.msg = this.msg
        }

        return dto
    }
}
