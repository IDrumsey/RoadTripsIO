import { DataTransferObject } from "../data-transfer-object"
import { GeneralReport } from "./general-report"

export class GeneralReportDTO implements DataTransferObject<GeneralReportDTO, GeneralReport> {
    id: number
    reporterId: number | null
    date: Date
    msg: string | null

    init(data: GeneralReportDTO): void {
        this.id = data.id
        this.reporterId = data.reporterId
        this.date = new Date(data.date)
        this.msg = data.msg
    }

    toClient(): GeneralReport {
        let client = new GeneralReport()

        client.id = this.id
        client.date = this.date
        client.msg = this.msg

        return client
    }
}
