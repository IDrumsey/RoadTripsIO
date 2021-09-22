import { IMapUIComponent } from "../../components/Maps/i-map-ui/i-map-ui.component"
import { Button } from "../../../core2/interfaces/button"
import { IMapTool } from "../../../core2/interfaces/i-map-tool"

export class DeleteMarkerTool implements IMapTool {
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

    deleteMarker(marker: google.maps.Marker): boolean {
        return this.mapUI.removeMarker(marker)
    }

    deleteMarkers(markers: google.maps.Marker[]): google.maps.Marker[] {
        let markersDeleted: google.maps.Marker[] = []

        markers.forEach(markerToDelete => {
            if(this.deleteMarker(markerToDelete)){
                markersDeleted.push(markerToDelete)
            }
        })

        return markersDeleted
    }
}