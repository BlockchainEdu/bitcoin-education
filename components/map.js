import { useState } from "react";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";

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
              <span role="img" aria-label="push-pin">
                📌
              </span>
            </a>
          </Marker>
          {selectLocation.id === location.id ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeButton={true}
              closeOnClick={true}
              latitude={location.center[1]}
              longitude={location.center[0]}
              className="w-full h-full transform-none"
            >
              <img className="mapgl-marker-image mx-auto" src={location.image}/>
              <h1 className="mapgl-marker-title text-2xl text-center">{location.place_name}</h1>
              <p className="mapgl-marker-story">{location.place_story}</p>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
