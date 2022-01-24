/* @preserve
 * MovementMap 0.1.0
 *
 * A interactive map for the climate movement based on Leaflet (https://leafletjs.com)
 */

import { MovementMap } from './lib/MovementMap';
import './styles/main.scss';

declare global {
  interface Window {
    MovementMap?: any;
  }
}

window.MovementMap = MovementMap;