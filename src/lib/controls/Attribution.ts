import * as L from 'leaflet';
import buttonIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/info-circle.svg';
import closeIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/times-circle.svg';

export class AttributionControl extends L.Control {
  private map: L.Map = null;
  private attribution: string = null;
  private controlName = 'leaflet-control-attribution';
  private container: HTMLElement = L.DomUtil.create(
    'div',
    this.controlName
  );
  private card: HTMLElement = L.DomUtil.create(
    'section',
    `${this.controlName}__card ${this.controlName}__card--hidden`,
    this.container
  );
  private content: HTMLElement = L.DomUtil.create(
    'p',
    `${this.controlName}__content`,
    this.card
  );
  private isOpen: boolean = false;

  constructor(
    attribution: string,
    options: L.ControlOptions = { position: 'bottomright' }
  ) {
    super(options);

    this.attribution = attribution;
  }

  private cardContent() {
    this.content.innerHTML = `
      <b>MovementMap</b>
       | 
      <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>
       | 
      ${this.attribution}
    `;

    return this.card;
  }

  private button() {
    const button = L.DomUtil.create(
      'button',
      `${this.controlName}__button`,
      this.container
    );

    button.innerHTML = buttonIcon;
    button.title = 'Attribution';

    const show = () => {
      L.DomUtil.removeClass(
        this.card,
        `${this.controlName}__card--hidden`
      );
      button.innerHTML = closeIcon;
      this.isOpen = true;
    };

    const hide = () => {
      L.DomUtil.addClass(
        this.card,
        `${this.controlName}__card--hidden`
      );
      button.innerHTML = buttonIcon;
      this.isOpen = false;
    };

    L.DomEvent.on(
      button,
      'mousedown dblclick',
      L.DomEvent.stopPropagation
    )
      .on(button, 'click', L.DomEvent.stop)
      .on(
        button,
        'click',
        () => (!this.isOpen ? show() : hide()),
        this
      );
  }

  onAdd(map: L.Map): HTMLElement {
    this.map = map;
    const container = this.container;

    this.cardContent();
    this.button();

    return container;
  }
}
