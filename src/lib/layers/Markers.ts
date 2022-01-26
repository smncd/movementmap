import * as L from 'leaflet';
import {
  Marker,
  MarkerOptions,
  isMarkerData,
} from '../components/Marker';
import { MarkerClusterGroup } from 'leaflet.markercluster';

export class Markers {
  url: string;
  markerData: Array<MarkerOptions>;
  clustering: boolean = true;

  constructor(url: string, clustering: boolean) {
    this.url = url;
    this.clustering = clustering;
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

    const cluster = new MarkerClusterGroup();

    this.markerData &&
      this.markerData.map((markerData: MarkerOptions) => {
        const marker = new Marker(markerData);

        return this.clustering
          ? cluster.addLayer(marker)
          : marker.addTo(map);
      });

    this.clustering && map.addLayer(cluster);
  }
}
