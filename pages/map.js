import { getProjectsFromMonday } from '../services';
import Footer from '../components/footer';
import HeaderWithLogo from '../components/headerWithLogo';
import 'mapbox-gl/dist/mapbox-gl.css';
import dynamic from "next/dynamic";
import styled from "styled-components";
import { MediaType } from "../components/map";

const mapStyle = {
  minHeight: 588
};

const Map = dynamic(() => import("../components/map"), {
  loading: () => "Loading...",
  ssr: false
});

export default function MapPage({locations}) {
  return (
    <div id="map-page">
      <HeaderWithLogo />
      <section style={mapStyle}>
        <Container>
          <Map locations={locations} style={mapStyle} />
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

export async function getStaticProps({ params }) {
  const fetchedProjects = await getProjectsFromMonday() || [];
  return { props: { locations: fetchedProjects }, revalidate: 60 };
}
