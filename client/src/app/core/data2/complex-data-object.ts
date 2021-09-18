import { AsyncService } from "../services/async.service";
import { DataAccessService } from "../services/data/data-access.service";

export interface ComplexDataObject {
    loadAdditionalData(api: DataAccessService, asyncService: AsyncService): Promise<void>
}
