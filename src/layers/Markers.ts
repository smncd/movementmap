import * as L from 'leaflet';
import { Marker, MarkerOptions } from '../components/Marker';
import isMarkerData from '../utils/isMarkerData';
import { MarkerClusterGroup } from 'leaflet.markercluster';

export class Markers {
  url: string;
  markerData: Array<MarkerOptions>;
  clustering: boolean = true;
  customIcon: string;

  constructor(url: string, clustering: boolean, customIcon: string) {
    this.url = url;
    this.clustering = clustering;
    this.customIcon = customIcon;
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

    const cluster = new MarkerClusterGroup({
      polygonOptions: {
        fillColor: '#3887be',
        color: '#3887be',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.5,
      },
    });

    this.markerData &&
      this.markerData.map((markerData: MarkerOptions) => {
        const marker = new Marker(markerData, this.customIcon);

        return this.clustering
          ? cluster.addLayer(marker)
          : marker.addTo(map);
      });

    this.clustering && map.addLayer(cluster);
  }
}
