# MovementMap

#### Version: 0.1.0

A interactive map based on [Leaflet](https://leafletjs.com), built for the climate movement.

## Requirements

Any data displayed on the map needs to follow this format:

```JSON
[
  {
    "id": number|string,
    "slug": string,
    "title": string,
    "description"?: string,
    "location": {
      "address"?: string,
      "day"?: string,
      "time"?: {
        "start"?: string,
        "end"?: string
      },
      "coordinates": {
        "lat": number|string,
        "lon": number|string
      }
    },
    "contact"?: {
      "email"?:string,
      "website"?: string,
      "instagram"?: string,
      "facebook"?: string,
      "twitter"?: string
    }
  }
]
```

_A '?' after the key name means the key is optional, and does not need to be included_

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

| key     | types                                          | purpose                                                                              |
| ------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| element | string \| HTMLElement                          | The id of the element in which the map will be rendered.                             |
| url     | string                                         | The URL of your data API. Look under [requirements](#requirements) to see structure. |
| options | [MovementMapOptions](./src/lib/MovementMap.ts) | Options to customize map.                                                            |

## Development

### Requirements

1. Nodejs 14 or higher.

### Setup

Clone the repo to your local machine and run `npm ci` to install the required dependencies.  
To start development, run `npm run dev`, to spin up Webpack and Prettier.  
A preview map will be available on `http://localhost:9000`.

## License

_MovementMap_ is licensed under the [BSD 3-Clause License](./LICENSE)
