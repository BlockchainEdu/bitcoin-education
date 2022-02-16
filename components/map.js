import { useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import Vimeo from '@u-wave/react-vimeo';

export const MediaType = {
  none: 'none',
  image: 'image',
  video: 'video',
}

const navigationControlStyle = {
  top: 36,
  right: 0,
  padding: '10px',
};

export default function Map({ locations }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    // The latitude and longitude of the center of London
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });

  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapStyle="/mapboxstyle.json"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navigationControlStyle} />
      {locations.map((location) => (
        <div key={location.id} className={'mapboxgl-marker-overlay ' + ( location === selectedLocation ? 'selected': '' )}>
          <Marker latitude={location.center[1]} longitude={location.center[0]}>
            <a
              onClick={() => {
                setSelectedLocation(location);
              }}
            >
              <img className="w-8 h-8 bg-benorange-500 p-2 rounded-full" role="img" src="/images/pin-indicator.svg" />
            </a>
          </Marker>
          {selectedLocation.id === location.id && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeButton={true}
              closeOnClick={true}
              latitude={location.center[1]}
              longitude={location.center[0]}
              className="transform-none pin-popup border-none shadow-2xl rounded-md relative"
            >
              <div className="absolute lg:relative top-0 max-w-7xl mx-auto p-4">
                <Link href={`/projects/${location.id}`}>
                  <a>
                    {location.media_type === MediaType.image && <img className="mapboxgl-marker-image mx-auto w-full" src={location.image} />}
                    {location.media_type === MediaType.video && <Vimeo video={location.video} className="mapboxgl-marker-video" autoplay />}
                    <h1 className="mapboxgl-marker-title text-2xl font-mont font-bold text-center mt-4">{location.place_name}</h1>
                    <div className="h-40 overflow-hidden">
                      <p className="mapboxgl-marker-story text-sm mt-4 font-mont overflow-hidden" dangerouslySetInnerHTML={{ __html: location.place_story }}></p>
                    </div>
                  </a>
                </Link>
              </div>
            </Popup>
          )}
        </div>
      ))}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </ReactMapGL>
  );
}
