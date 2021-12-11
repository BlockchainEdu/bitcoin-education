import { useEffect, useState } from "react";
import { TeamMemberService } from '../services';
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
                        file_extension
                        public_url
                    }
                }
            }
        }`
      };
      const result = await TeamMemberService.getMembers(body);
      if (result?.data?.data?.boards) {
        const fetchedLocations = result.data.data.boards[0].items.map(item => {
          console.log(item);
          return {
            id: item.id,
            center: [parseFloat(item.column_values[2].value.replace("\"", "")), parseFloat(item.column_values[1].value.replace("\"", ""))],
            place_name: item.column_values[0].value,
            place_story: JSON.parse(item.column_values[3].value).text,
            media_type: MediaType.image,
            image: item.assets[0].public_url,
            video: "655642994",
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
  width: 100%;
  height: 50vh;
`;
