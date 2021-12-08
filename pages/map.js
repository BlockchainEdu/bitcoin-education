import { TeamMemberService } from '../services';
import Footer from '../components/footer';
import HeaderWithLogo from '../components/headerWithLogo';
import 'mapbox-gl/dist/mapbox-gl.css';

import dynamic from "next/dynamic";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("../components/map"), {
  loading: () => "Loading...",
  ssr: false
});

export default function MapPage() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const body = {
        query: `{
            boards (ids: 1983862095) {
                items {
                    group {
                        id
                        title
                    }
                    id
                    name
                    column_values {
                        id
                        title
                        value
                    }
                    assets {
                        public_url
                    }
                }
            }
        }`
      };
      const result = await TeamMemberService.getMembers(body);
      if (result?.data?.data?.boards) {
        const fetchedLocations = result.data.data.boards[0].items.map(item => {
          return {
            id: item.id,
            center: [parseFloat(item.column_values[2].value.replace("\"", "")), parseFloat(item.column_values[1].value.replace("\"", ""))],
            place_name: item.column_values[0].value,
          };
        });
        console.log(fetchedLocations);
        setLocations(fetchedLocations);
      } else {
        setLocations([]);
      }
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
  width: 100vw;
  height: 100vh;
`;
