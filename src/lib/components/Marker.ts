import * as L from 'leaflet';
import truncate from '../utils/truncate';
import IconSVG from '../../images/icon.png';
import markerIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/map-marker-alt.svg';
import clockIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/clock.svg';
import emailIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/envelope.svg';
import websiteIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/solid/globe.svg';
import instagramIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/brands/instagram.svg';
import facebookIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/brands/facebook.svg';
import twitterIcon from '../../../node_modules/@fortawesome/fontawesome-free/svgs/brands/twitter.svg';

export interface MarkerOptions {
  id: number | string;
  title: string;
  description?: string | HTMLElement;
  location: {
    address?: string;
    day?: string;
    time?: {
      start?: string;
      end?: string;
    };
    coordinates: {
      lat: number;
      lon: number;
    };
  };
  contact?: {
    email?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export function isMarkerData(
  object: unknown
): object is MarkerOptions {
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

export class Marker extends L.Marker {
  private markerData: MarkerOptions;

  constructor(markerData: MarkerOptions, markerIcon?: string) {
    const { lat, lon } = markerData.location.coordinates;

    const latlon: L.LatLngExpression = [lat, lon];

    const icon = L.icon({
      iconUrl: markerIcon ? markerIcon : IconSVG,
      iconSize: [36, 55],
      iconAnchor: [18, 54],
      popupAnchor: [0, -35],
    });

    super(latlon, { icon });

    this.markerData = markerData;

    this.markerPopup();
  }

  private markerPopup() {
    const { id, title, description, location, contact } =
      this.markerData;

    const contactItems = [
      {
        title: 'Email',
        url: contact?.email && `mailto:${contact?.email}`,
        icon: emailIcon,
      },
      {
        title: 'Website',
        url: contact?.website,
        icon: websiteIcon,
      },
      {
        title: 'Instagram',
        url: contact?.instagram,
        icon: instagramIcon,
      },
      {
        title: 'Facebook',
        url: contact?.facebook,
        icon: facebookIcon,
      },
      {
        title: 'Twitter',
        url: contact?.twitter,
        icon: twitterIcon,
      },
    ]
      .map((contactItem) => {
        return contactItem.url
          ? `
        <li class="leaflet-popup-content__contact-item">
          <a
            title="${contactItem.title}"
            href="${contactItem.url}"
            target="blank"
            rel="noreferrer noopener"
          >
            ${contactItem.icon}
            <span class="screen-reader-text">${contactItem.title}</span>
          </a>
        </li>`
          : ``;
      })
      .join('');

    const html = `
      <article id="${id}">
        <h1 class="leaflet-popup-content__title">${title}</h1>
        ${
          location?.address
            ? `
            <p class="leaflet-popup-content__address">
              ${markerIcon}
              <span class="screen-reader-text">Address:&nbsp;</span> 
              ${location?.address}
            </p>`
            : ``
        }
        ${
          location?.time?.start || location?.day
            ? `
            <p class="leaflet-popup-content__time">
              ${clockIcon}
              <span class="screen-reader-text">Time:&nbsp;</span> 
              ${location?.day ? location?.day : ``}${
                location?.day && location?.time?.start
                  ? `,&nbsp;`
                  : ``
              }
              ${
                location?.time?.start
                  ? `<time>${location?.time?.start}</time>`
                  : ``
              }
              ${
                location?.time?.start && location?.time?.end
                  ? `&nbsp;-&nbsp;<time>${location?.time?.end}</time>`
                  : ``
              }
            </p>`
            : ``
        }
        ${
          description
            ? `
            <p class="leaflet-popup-content__description">
              <span class="screen-reader-text">Description:&nbsp;</span> 
              ${truncate(description as string, 400, '...')}
            </p>`
            : ``
        }
        ${
          contact?.email ||
          contact?.website ||
          contact?.instagram ||
          contact?.facebook ||
          contact?.twitter
            ? `
            <div class="leaflet-popup-content__contact">
              <h2>Contact</h2>
              <ul class="leaflet-popup-content__contact-list">
                ${contactItems}
              </ul>
            </div>`
            : ``
        }
      </article>
    `;

    return this.bindPopup(html);
  }
}
