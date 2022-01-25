import * as L from 'leaflet';
import {
  Marker,
  MarkerOptions,
  isMarkerData,
} from '../components/Marker';

export class Markers {
  url: string;
  markerData: Array<MarkerOptions>;

  constructor(url: string, clustering: boolean) {
    this.url = url;
  }

  private async fetchData(url: string) {
    const res = await fetch(url);
    const data = await res.json();

    if (!isMarkerData(data[0])) {
      console.error('Invalid data provided');
      return;
    }

    this.markerData = data;
  }

  async addTo(map: L.Map | L.LayerGroup) {
    await this.fetchData(this.url);

    this.markerData &&
      this.markerData.map((marker: MarkerOptions) => {
        return new Marker(marker).addTo(map);
      });
  }
}
