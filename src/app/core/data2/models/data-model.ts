import { AsyncService } from "../../services/async.service";
import { DataAccess2Service } from "../../services/data/data-access-2.service";

export abstract class DataModel {
    constructor(api: DataAccess2Service,asyncService: AsyncService){}
}
