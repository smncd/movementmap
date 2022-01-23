import * as L from 'leaflet';
import IconSVG from '../../images/icon.png';

export interface MarkerOptions {
  id: number | string;
  title: string;
  description?: string | HTMLElement;
  location: {
    address?: string;
    day?: string;
    time?: {
      start?: string;
      end?: string;
    };
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  contact?: {
    email?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export function isMarkerData(
  object: unknown
): object is MarkerOptions {
  const hasProperties = (keys: Array<unknown>) => {
    let hasProperties = true;
    keys.forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(object, key))
        hasProperties = false;
    });
    return hasProperties;
  };
  return hasProperties(['id', 'title', 'location']);
}

export class Marker extends L.Marker {
  constructor(markerData: MarkerOptions, markerIcon?: string) {
    const { lat, lon } = markerData.location.coordinates;

    const latlon: L.LatLngExpression = [lat, lon];

    const icon = L.icon({
      iconUrl: markerIcon ? markerIcon : IconSVG,
      iconSize: [36, 55],
      iconAnchor: [18, 54],
      popupAnchor: [0, -35],
    });

    super(latlon, { icon });

    this.bindPopup(`<h1>${markerData.title}</h1>`);
  }
}
