import { IMapUIComponent } from "../../../../core/components/Maps/i-map-ui/i-map-ui.component";
import { IMapMarkerFactory } from "../../../factories/i-map-marker-factory";
import { Button } from "../../../interfaces/button";
import { IMapTool } from "../../../interfaces/i-map-tool";
import { IMapMarkerColor } from "../../../../core/models/imap/i-map-marker-color";

export class AddMarkerTool implements IMapTool {
    constructor(mapUI: IMapUIComponent, button: Button){
        this.mapUI = mapUI
        this.button = button
    }

    mapUI: IMapUIComponent
    button: Button
    markerFactory = new IMapMarkerFactory()

    onSelect(): void {
        this.mapUI.changeCursor('crosshair')
        this.button.select()
    }

    onUnselect(): void {
        this.mapUI.changeCursor('grab')
        this.button.unselect()
    }

    doJob(position: google.maps.LatLng): google.maps.Marker {
        let markerToAdd = this.markerFactory.generateMarker(position, IMapMarkerColor.Red)
        return this.mapUI.addMarker(markerToAdd)
    }
}
