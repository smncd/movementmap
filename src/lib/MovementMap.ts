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

  constructor(
    element: string | HTMLElement,
    options?: MovementMapOptions
  ) {
    if (options) {
      Object.entries(options).forEach(([key, value]: any) => {
        this.options[key] = value;
      });
    }

    const map = L.map(element, this.options);

    new Tiles(
      this.options.tiles.url,
      this.options.tiles.options
    ).addTo(map);
  }
}
