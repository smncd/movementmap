import * as L from 'leaflet';

export class MovementMap {
  constructor() {
    const map = L.map('map', {
      center: [37.3, 4.57],
      zoom: 3,
    });

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(map);
  }
}
