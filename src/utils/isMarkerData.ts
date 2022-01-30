import { MarkerOptions } from '../components/Marker';

function isMarkerData(object: unknown): object is MarkerOptions {
  const hasProperties = (keys: Array<unknown>) => {
    let hasProperties = true;

    keys.forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(object, key))
        hasProperties = false;
    });

    return hasProperties;
  };

  return hasProperties(['id', 'title', 'location']);
}

export default isMarkerData;
