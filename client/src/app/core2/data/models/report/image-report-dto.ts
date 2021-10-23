import { DataTransferObject } from "../data-transfer-object";
import { GeneralReportDTO } from "./general-report-dto";
import { ImageReport } from "./image-report";

export class ImageReportDTO extends GeneralReportDTO implements DataTransferObject<ImageReportDTO, ImageReport> {

    imageURL: string

    init(data: ImageReportDTO): void {
        super.init(data)

        this.imageURL = data.imageURL
    }

    toClient(): ImageReport {
        let client = super.toClient() as ImageReport

        client.imageURL = this.imageURL

        return client
    }
}
