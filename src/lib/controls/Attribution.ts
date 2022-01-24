import * as L from 'leaflet';
import buttonIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/info-circle.svg';

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

  private button() {
    const button = L.DomUtil.create(
      'button',
      `${this.controlName}__button`,
      this.container
    );

    button.innerHTML = buttonIcon;
    button.title = 'Attribution';

    L.DomEvent.on(
      button,
      'mousedown dblclick',
      L.DomEvent.stopPropagation
    )
      .on(button, 'click', L.DomEvent.stop)
      .on(button, 'click', () => console.log('button pressed'), this);
  }

  onAdd(map: L.Map): HTMLElement {
    this.map = map;
    const container = this.container;

    this.button();

    return container;
  }
}
