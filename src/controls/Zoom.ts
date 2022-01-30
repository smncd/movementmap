import * as L from 'leaflet';
import zoomInIcon from '@fortawesome/fontawesome-free/svgs/solid/plus.svg';
import zoomOutIcon from '@fortawesome/fontawesome-free/svgs/solid/minus.svg';
import resetZoomIcon from '@fortawesome/fontawesome-free/svgs/solid/globe-americas.svg';
import __ from '../languages';

export interface ZoomControlsProps {
  center: L.LatLngExpression;
  zoom: number;
  options?: L.ControlOptions;
}

export class ZoomControls extends L.Control {
  private center: L.LatLngExpression;
  private zoom: number;

  constructor({
    center,
    zoom,
    options = { position: 'topleft' },
  }: ZoomControlsProps) {
    super(options);

    this.center = center;
    this.zoom = zoom;
  }

  private map: L.Map = null;

  private zoomIn() {
    this.map.zoomIn(1);
  }

  private zoomOut() {
    this.map.zoomOut(1);
  }

  private resetZoom() {
    this.map.setView(this.center);
    this.map.setZoom(this.zoom);
  }

  private createButton(
    html: string,
    title: string,
    className: string,
    container: HTMLElement,
    onClick: any
  ) {
    const button = L.DomUtil.create('button', className, container);
    button.innerHTML = html;
    button.title = title;

    L.DomEvent.on(
      button,
      'mousedown dblclick',
      L.DomEvent.stopPropagation
    )
      .on(button, 'click', L.DomEvent.stop)
      .on(button, 'click', onClick, this);

    return button;
  }

  onAdd(map: L.Map): HTMLElement {
    this.map = map;

    const controlName = 'leaflet-control-zoom';
    const container = L.DomUtil.create(
      'div',
      'leaflet-control-zoom leaflet-bar'
    );

    this.createButton(
      zoomInIcon as string,
      __('zoom', 'in'),
      `${controlName}__button ${controlName}__button--in`,
      container,
      this.zoomIn
    );

    this.createButton(
      resetZoomIcon,
      __('zoom', 'reset'),
      `${controlName}__button ${controlName}__button--reset`,
      container,
      this.resetZoom
    );

    this.createButton(
      zoomOutIcon,
      __('zoom', 'out'),
      `${controlName}__button ${controlName}__button--out`,
      container,
      this.zoomOut
    );

    return container;
  }

  onRemove(map: L.Map) {
    // Nothing to do here
  }
}
