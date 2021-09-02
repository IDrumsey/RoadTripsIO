import { AsyncService } from "../../services/async.service";
import { DataAccessService } from "../../services/data/data-access.service";

export abstract class DataModel {
    constructor(api: DataAccessService,asyncService: AsyncService){}
}
