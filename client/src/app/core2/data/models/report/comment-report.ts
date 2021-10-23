import { ClientDataObject } from "../client-data-object";
import { CommentReportDTO } from "./comment-report-dto";
import { GeneralReport } from "./general-report";

export class CommentReport extends GeneralReport implements ClientDataObject<CommentReportDTO> {
    commentId: number

    toDTO(): CommentReportDTO {
        let dto = super.toDTO() as CommentReportDTO

        dto.commentId = this.commentId

        return dto
    }
}
