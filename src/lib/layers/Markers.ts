import * as L from 'leaflet';
import { Marker } from '../components/Marker';

export class Markers {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  addTo(map: L.Map | L.LayerGroup) {
    fetch(this.url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.map((marker: any) => {
          return new Marker(marker).addTo(map);
        });
      });
  }
}
