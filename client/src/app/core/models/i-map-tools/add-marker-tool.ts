import { IMapUIComponent } from "../../components/Maps/i-map-ui/i-map-ui.component";
import { IMapTool } from "../../interfaces/i-map-tool";

export class AddMarkerTool implements IMapTool {
    constructor(mapUI: IMapUIComponent){
        this.mapUI = mapUI
    }

    mapUI: IMapUIComponent

    doWork(): void {
        // generate marker
        this.mapUI
    }
}
