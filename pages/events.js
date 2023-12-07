import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import { TeamMemberService } from '../services';
import Head from "next/head";

export default function Events() {
  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  const changeFlexProgram = () => {
    return `max-w-7xl m-auto flex flex-col items-center ${teamMembers.index % 2 ? 'lg:flex-row-reverse' : 'hidden'}`
  };

  const changeFlexDirection = [`max-w-7xl m-auto flex flex-col items-center lg:flex-row-reverse lg:gap-x-20`, `max-w-7xl m-auto flex flex-col items-center lg:flex-row`];

  useEffect(() => {
    async function fetchData() {
      let body = {
        query: `{
          boards (ids: 5642546206) {
            items (limit: 100) {
              group {
                title
              }
              name
              column_values {
                value
              }
              assets {
                public_url
              }
            }
          }
        }`};
      let result = await TeamMemberService.getMembers(body);
      if (result?.data?.data?.boards) {
        let items = result.data.data.boards[0].items;
        console.log(items);
        setTeamMembers(items);
      } else {
        setTeamMembers([]);
      }
    }
    fetchData();
  }, [setTeamMembers]);

  return (
    <div id="partners-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Programs | Blockchain Education Network</title>
      </Head>
      
      <div id="team-page" onClick={(e) => {
        if (e.target.getAttribute('flip-card-container') == "true") {
          setGlobalClick(true);
        } else {
          setGlobalClick(false);
        }
      }}>
        <div className="pt-20 lg:pt-24 md:pb-0 px-7">
          {teamMembers.length > 0 && teamMembers.map((global, index) => {
            if (global.group.title !== "Events") {
              return null;
            }

            let description = '';
            if (global.column_values[1] && global.column_values[1].value) {
              try {
                const descriptionObj = JSON.parse(global.column_values[1].value);
                if (descriptionObj && descriptionObj.text) {
                  description = descriptionObj.text;
                }
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            }

            return (
              <div key={index} className={index % 2 ? changeFlexDirection[0] : changeFlexDirection[1]}>
                <div className="w-full lg:w-6/12">
                  <h1 className="text-4xl md:text-4xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                    {global.name}
                  </h1>
                  <ul className="space-y-10 text-lg pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left">
                    {description && <li>{description}</li>}
                  </ul>
                </div>
                <div className="w-full lg:w-6/12 m-auto pt-14 pb-0 lg:pb-24">
                  {global.column_values.map((column, idx) => {
                    if (column.value) {
                      try {
                        const parsedValue = JSON.parse(column.value);
                        if (parsedValue && parsedValue.url) {
                          return (
                            <a key={idx} href={parsedValue.url} target="_blank" rel="noopener noreferrer">
                              <img className="m-auto" src={global.assets.length > 0 ? global.assets[0]?.public_url : ""} />
                            </a>
                          );
                        }
                      } catch (error) {
                        console.error("Error parsing JSON:", error);
                      }
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
