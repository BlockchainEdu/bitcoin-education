import Footer from '../components/footer';
import HeaderWithLogo from '../components/headerWithLogo';
import InteractiveMap from '../components/interactiveMap';

import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("../components/map"), {
  loading: () => "Loading...",
  ssr: false
});

const url = `https://api.mapbox.com/geocoding/v5/
mapbox.places/greggs.json?access_token=${process.env.MAPBOX_KEY}
&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;

export default function MapPage() {
  const [locations, setLocations] = useState([]);
  return (
    <div id="map-page">
      <HeaderWithLogo />
      <section>
        <Container>
          <Map locations={locations} />
        </Container>
      </section>
      <Footer />
    </div>
  )

  useEffect(() => {
    const fetchLocations = async () => {
      await fetch(url)
        .then((response) => response.text())
        .then((res) => JSON.parse(res))
        .then((json) => {
          setLocations(json.features);
        })
        .catch((err) => console.log({ err }));
    };
    fetchLocations();
  }, []);
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
