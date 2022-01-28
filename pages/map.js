import { useEffect, useState } from "react";
import { getProjectsFromMonday } from '../services';
import Footer from '../components/footer';
import HeaderWithLogo from '../components/headerWithLogo';
import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from "next/dynamic";
import styled from "styled-components";
import { MediaType } from "../components/map";

const Map = dynamic(() => import("../components/map"), {
  loading: () => "Loading...",
  ssr: false
});

export default function MapPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = await getProjectsFromMonday();
      setLocations(fetchedLocations);
    };
    fetchLocations();
  }, []);

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
}

const Container = styled.div`
  width: 100%;
  height: 60vh;
`;
