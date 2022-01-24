import * as L from 'leaflet';

export class AttributionControl extends L.Control {
  constructor(
    attribution: string,
    options: L.ControlOptions = { position: 'bottomright' }
  ) {
    super(options);
  }
}
