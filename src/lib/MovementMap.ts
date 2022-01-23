import * as L from 'leaflet';
import { Tiles } from './layers/Tiles';

export interface MovementMapOptions extends L.MapOptions {
  controls?: {
    zoom?: boolean;
    attribution?: boolean;
  };
  tiles?: {
    url: string;
    options: L.TileLayerOptions;
  };
}

export class MovementMap {
  private options: any = {
    center: [37.3, 4.57],
    zoom: 3,
    minZoom: 1,
    zoomControl: false,
    attributionControl: false,
    controls: {
      zoom: true,
      attribution: true,
    },
    tiles: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    },
  };
    const map = L.map('map', {
      center: [37.3, 4.57],
      zoom: 3,
    });

    new Tiles('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }
}
