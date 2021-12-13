import { useState } from "react";
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

  const [selectLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapStyle="/mapboxstyle.json"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navigationControlStyle} />
      {locations.map((location) => (
        <div key={location.id}>
          <Marker latitude={location.center[1]} longitude={location.center[0]}>
            <a
              onClick={() => {
                setSelectedLocation(location);
              }}
            >
              <img className="w-8 h-8 bg-benorange-500 p-2 rounded-full" role="img" src="/images/pin-indicator.svg" />
            </a>
          </Marker>
          {selectLocation.id === location.id && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeButton={false}
              closeOnClick={true}
              latitude={location.center[1]}
              longitude={location.center[0]}
              className="transform-none pin-popup border-none shadow-2xl mt-10 rounded-md"
            >
              <div className="max-w-7xl mx-auto p-4">
                {location.media_type === MediaType.image && <img className="mapboxgl-marker-image mx-auto w-full" src={location.image} />}
                {location.media_type === MediaType.video && <Vimeo video={location.video} className="mapboxgl-marker-video" autoplay />}
                <h1 className="mapboxgl-marker-title text-2xl font-mont font-bold text-center mt-4">{location.place_name}</h1>
                <div className="h-40 overflow-hidden">
                  <p className="mapboxgl-marker-story text-sm mt-4 font-mont overflow-hidden">{location.place_story}</p>
                </div>
              </div>
            </Popup>
          )}
        </div>
      ))}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </ReactMapGL>
  );
}
