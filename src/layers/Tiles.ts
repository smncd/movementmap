import * as L from 'leaflet';

export class Tiles extends L.TileLayer {
  constructor(url: string, options?: L.TileLayerOptions) {
    super(url, options);
  }
}
