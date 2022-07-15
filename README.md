# MovementMap

#### Version: 0.6.0

#### [Changelog](./CHANGELOG.md)

A interactive map based on [Leaflet](https://leafletjs.com), built for the climate movement.

## Installation

In order to use MovementMap, download the files in the [dist](./dist) folder, and include `movementmap.css` and `movementmap.js` in your site's `<head>` and `<body>`, as shown below.

```HTML
<head>
  <link rel="stylesheet" href="path/to/movementmap.css"  /> <----
</head>
<body>
  ...content
  <script src="/path/to/movementmap.js"></script> <----
</body>
```

Next, you need to initiate a map, as shown below. Make sure the script in which you're calling the MovementMap class is included after `movementmap.js`, and after the element you render your map to, in this case `<div id="map"></div>`.

```HTML
<head>
  <link rel="stylesheet" href="path/to/movementmap.css"  />
</head>
<body>
  <div id="map"></div> <----
  <script src="/path/to/movementmap.js"></script>
  <script> <----
    new MovementMap('map', 'https://example.com/path/to/your/mapdata.json')
  </script>
</body>
```

The MovementMap class needs several parameters to function:

| key                      | types   | optional | purpose                                                                                                                  |
| ------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| element                  | string  | no       | The id of the element in which the map will be rendered.                                                                 |
| url                      | string  | no       | The URL of your data API. Look under [requirements](#requirements) to see structure.                                     |
| options                  | object  | yes      | Options to customize map. Extends the default leaflet options, only ones that apply to MovementMap will be covered here. |
| options.center           | array   | yes      | Default geographical position. ([[lat, lon]](https://leafletjs.com/reference.html#latlng))                               |
| options.zoom             | number  | yes      | Default zoom level.                                                                                                      |
| options.zoomControl      | boolean | yes      | Enable or disable zoom control. Note that this is not the default Leaflet zoomcontrol, rather a custom one.              |
| options.gestureHandling  | boolean | yes      | Enable the [gesture handling plugin](https://github.com/elmarquis/Leaflet.GestureHandling/)                              |
| options.markerClustering | boolean | yes      | Enable [marker clustering](https://github.com/Leaflet/Leaflet.markercluster/) when zoomed out                            |
| options.markerIcon       | string  | yes      | Link a custom marker icon (png/svg image). The image file must be 86x125px.                                              |
| options.tiles            | object  | yes      | Customize map tiles                                                                                                      |
| options.tiles.url        | string  | yes      | Tiles url                                                                                                                |
| options.tiles.options    | object  | yes      | The default [Leaflet TileLayer](https://leafletjs.com/reference.html#tilelayer)                                          |

## Requirements

Any data displayed on the map needs to follow this format:

```JSON
[
  {
    "id": "number|string",
    "slug": "string",
    "title": "string",
    "description": "(optional) string",
    "location": {
      "address": "(optional) string",
      "day": "(optional) string",
      "time": {
        "start": "(optional) string",
        "end": "(optional) string"
      },
      "coordinates": {
        "lat": "number|string",
        "lon": "number|string"
      }
    },
    "contact": {
      "email": "string",
      "website": "(optional) string",
      "instagram": "(optional) string",
      "facebook": "(optional) string",
      "twitter": "(optional) string"
    }
  }
]
```

## Languages

MovementMap relies your document's `lang` attribute to display strings in different languages.  
If not available, it will fall back to english.

### Currently supported languages are:

- English
- Swedish

## Development

### Requirements

1. Nodejs 14 or higher.

### Setup

Clone the repo to your local machine and run `npm ci` to install the required dependencies.  
To start development, run `npm run dev`, to spin up Webpack and Prettier.  
A preview map will be available on `http://localhost:9000`.

## License

_MovementMap_ is licensed under the [BSD 3-Clause License](./LICENSE)
