declare module '*.png' {
  const value: any;
  export = value;
}

declare module '*.svg?raw' {
  const content: any;
  export default content;
}

declare module 'leaflet.markercluster';
