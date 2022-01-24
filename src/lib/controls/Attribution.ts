import * as L from 'leaflet';

export class AttributionControl extends L.Control {
  private map: L.Map = null;
  private attribution: string = null;
  private controlName = 'leaflet-control-attribution';
  private container: HTMLElement = L.DomUtil.create(
    'div',
    `${this.controlName} leaflet-bar`
  );

  constructor(
    attribution: string,
    options: L.ControlOptions = { position: 'bottomright' }
  ) {
    super(options);

    this.attribution = attribution;
  }

  onAdd(map: L.Map): HTMLElement {
    this.map = map;
    const container = this.container;

    return container;
  }
}
