import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Header from '../components/header'
import NationalTeamCard from '../components/nationalTeamCard'
import TeamMembers from '../content/team'
import { TeamMemberService } from '../services';
import IndustyIconContainer from '../components/industryIconContainer'
import Slider from "react-slick";


import React, { useState, useEffect } from 'react';

export default function About() {

  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);


  useEffect(async () => {
    // Get Members list
    let body = {
      query: `{
            boards (ids: 1383021348) {
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
        }`}
    let result = await TeamMemberService.getMembers(body);
    if (result?.data?.data?.boards) {
      console.log(result.data.data.boards[0].items);
      setTeamMembers(result.data.data.boards[0].items);
    } else {
      setTeamMembers([]);
    }

  }, [setTeamMembers]);

  const settings = {
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 10,
    autoplay: true,
    speed: 40000,
    autoplaySpeed: 0,
    cssEase: "linear"
  };

  return (
    <div id="team-page" onClick={(e) => {
      if (e.target.getAttribute('flip-card-container') == "true") {
        //find object   
        setGlobalClick(true);
      } else {
        //remove object
        setGlobalClick(false);
      }
    }}>
      <div>
        <div className="grid grid-cols-5 m-auto max-w-7xl">
          <Slider {...settings}>

            {teamMembers.length > 0 && teamMembers.map(global => {
              return global.group.title == 'BEN Team' &&
                <IndustyIconContainer
                  image={global.assets.length > 0 ? global.assets[0]?.public_url : ""}
                  name={global.name}

                  globalClick={globalClick}
                  setGlobalClick={setGlobalClick}
                />
            }
            )}
          </Slider>

          {/* {TeamMembers.global.map(global =>
                        <NationalTeamCard 
                        image={global.image}
                        name={global.name}
                        title={global.title}
                        globalClick = {globalClick}
                        setGlobalClick = {setGlobalClick}
                        />
                    )} */}
        </div>
      </div>
    </div>
  )
}
