import { AsyncService } from "../services/async.service";
import { DataAccess2Service } from "../services/data/data-access-2.service";

export interface ComplexDataObject {
    loadAdditionalData(api: DataAccess2Service, asyncService: AsyncService): Promise<void>
}
