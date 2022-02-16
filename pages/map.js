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

export default function MapPage({locations}) {
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

export async function getStaticProps({ params }) {
  const fetchedProjects = await getProjectsFromMonday() || [];
  return { props: { locations: fetchedProjects } };
}
