import { DataTransferObject } from "../data-transfer-object";
import { CommentReport } from "./comment-report";
import { GeneralReportDTO } from "./general-report-dto";

export class CommentReportDTO extends GeneralReportDTO implements DataTransferObject<CommentReportDTO, CommentReport> {

    commentId: number

    init(data: CommentReportDTO): void {
        super.init(data)

        this.commentId = data.commentId
    }

    toClient(): CommentReport {
        let client = super.toClient() as CommentReport

        client.commentId = this.commentId

        return client
    }
}
