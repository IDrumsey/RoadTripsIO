import { IMapUIComponent } from "src/app/core/components/Maps/i-map-ui/i-map-ui.component";
import { Button } from "src/app/core2/interfaces/button";
import { ButtonTool } from "src/app/core2/interfaces/button-tool";

export class ZoomOnMarkerTool implements ButtonTool {
    constructor(mapUI: IMapUIComponent, button: Button){
        this.mapUI = mapUI
        this.button = button
    }

    private mapUI: IMapUIComponent
    private button: Button

    onSelect(): void {
        this.button.select()
    }

    onUnselect(): void {
        this.button.unselect()
    }

    zoomInOnMarker(marker: google.maps.Marker): void {
        this.mapUI.zoomInOnMarker(marker)
    }
}
