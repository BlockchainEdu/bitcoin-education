import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function Map({ locations }) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // The latitude and longitude of the center of London
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10
  });

  const MAPBOX_KEY = `pk.eyJ1IjoiYmxvY2tjaGFpbmVkdXUiLCJhIjoiY2t3dHR5OXk5MDg2djJ3cnZjYWc1cnlzMSJ9.N1EMWTOcmpjLHAKgmVusZg`

  const [selectLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
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
              closeOnClick={true}
              latitude={location.center[1]}
              longitude={location.center[0]}
            >
              {location.place_name}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}
