import { ClientDataObject } from "../client-data-object";
import { GeneralReport } from "./general-report";
import { ImageReportDTO } from "./image-report-dto";

export class ImageReport extends GeneralReport implements ClientDataObject<ImageReportDTO> {
    imageURL: string

    toDTO(): ImageReportDTO {
        let dto = super.toDTO() as ImageReportDTO

        dto.imageURL = this.imageURL

        return dto
    }
}
