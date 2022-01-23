import { MovementMap } from './lib/MovementMap';
import './styles/main.scss';

declare global {
  interface Window {
    MovementMap?: any;
  }
}

window.MovementMap = MovementMap;
