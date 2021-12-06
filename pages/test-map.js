import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => "Loading...",
  ssr: false
});

const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

const MAPBOX_KEY = `pk.eyJ1IjoiYmxvY2tjaGFpbmVkdXUiLCJhIjoiY2t3dHR5OXk5MDg2djJ3cnZjYWc1cnlzMSJ9.N1EMWTOcmpjLHAKgmVusZg`

const url = `https://api.mapbox.com/geocoding/v5/
mapbox.places/greggs.json?access_token=${MAPBOX_KEY}
&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;

export default function IndexPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      await fetch(geojson)
        .then((response) => response.text())
        .then((res) => JSON.parse(res))
        .then((json) => {
          setLocations(json.features);
        })
        .catch((err) => console.log({ err }));
    };
    fetchLocations();
  }, []);

  return (
    <>
      <div className="w-screen h-screen">
        <Map locations={locations} />
      </div>
    </>
  );
}
