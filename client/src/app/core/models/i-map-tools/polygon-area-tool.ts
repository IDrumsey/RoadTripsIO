import { IMapUIComponent } from "../../components/Maps/i-map-ui/i-map-ui.component"
import { Button } from "../../interfaces/button"
import { IMapTool } from "../../interfaces/i-map-tool"

export class PolygonAreaTool implements IMapTool {
    constructor(mapUI: IMapUIComponent, button: Button){
        this.mapUI = mapUI
        this.button = button
        this.polygon = this.generatePolygon()

        this.mapUI.addPolygon(this.polygon)
    }

    private mapUI: IMapUIComponent
    private button: Button
    private coordinates: google.maps.LatLng[] = []
    private polygon: google.maps.Polygon

    onSelect(): void {
        this.button.select()
        this.mapUI.changeCursor("crosshair")
    }

    onUnselect(): void {
        this.button.unselect()
        this.mapUI.changeCursor("grab")
    }

    addPoint(coordinate: google.maps.LatLng): void {
        this.coordinates.push(coordinate)
        this.polygon.setPaths(this.coordinates)
    }

    private generatePolygon(): google.maps.Polygon {
        return new google.maps.Polygon({
            paths: this.coordinates
        })
    }
}
