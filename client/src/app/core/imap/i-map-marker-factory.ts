import { IMapMarkerColor } from "src/app/core/models/imap/i-map-marker-color";

export class IMapMarkerFactory {
    generateMarker(position: google.maps.LatLng, color: IMapMarkerColor): google.maps.Marker {
        return new google.maps.Marker({
            position: position,
            icon: color
        })
    }
}
