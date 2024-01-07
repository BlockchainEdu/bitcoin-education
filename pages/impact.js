import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import { TeamMemberService } from '../services';
import Head from "next/head";

export default function Impact() {
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
        <title>Impact | Blockchain Education Network</title>
      </Head>
      
      <section className="container pt-10 mx-auto">
  <h1 className="text-center mx-auto text-4xl font-black m-4">Podcasts</h1>

  <div className="text-center mx-auto text-black text-2xl pl-4 pb-6 pr-4 max-w-xl">We've published <strong className="text-3xl">43</strong> podcast episodes with <strong className="text-3xl">4,225</strong> downloads 🎙️🎧🔥</div>

  <div className="flex flex-col md:flex-row justify-between items-center w-12/12 mx-auto">

    <div className="left w-full md:w-1/3 p-4 md:ml-20">
      <img
        src="/images/podcast-image.jpg"
        alt="Podcast Image"
        className="w-1/3 mx-auto md:w-2/3 md:h-2/3 object-cover"
      />
    </div>

    <div className="right w-full md:w-2/3 p-4">
      <ul className="text-left text-xl">
        <div className=""><p><strong>Top Episodes</strong></p></div>
        <li><p>- <a target="_blank" className="text-blue-600 underline" href="https://www.buzzsprout.com/1829321/episodes/10581607">Monetizing Your Consciousness with Personal.ai</a></p></li>
        <li><p>- <a target="_blank" className="text-blue-600 underline" href="https://www.buzzsprout.com/1829321/episodes/8975558">How I Became a Blockchain Developer While in College</a></p></li>
        <li><p>- <a target="_blank" className="text-blue-600 underline" href="https://www.buzzsprout.com/1829321/episodes/9270469">How Polygon Will Help Bring Mass Adoption to Ethereum</a></p></li>
        <li><p>- <a target="_blank" className="text-blue-600 underline" href="https://www.buzzsprout.com/1829321/episodes/9877782">Enterprise Utility with Chainlink</a></p></li>
        <li><p>- <a target="_blank" className="text-blue-600 underline" href="https://www.buzzsprout.com/1829321/episodes/10454513">The Music NFT Revolution with BLOND:ISH and Drasen</a></p></li>
      </ul>
    </div>

  </div>

    <h1 className="text-center mx-auto text-4xl pt-10 font-black m-4">Events</h1>

      <div id="team-page" onClick={(e) => {
        if (e.target.getAttribute('flip-card-container') == "true") {
          setGlobalClick(true);
        } else {
          setGlobalClick(false);
        }
      }}>
        <div className="md:pb-0 px-7">
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
 <div>
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
</div>
  
            );
          })}
        </div>
      </div>
      </section>
      <Footer />
    </div>
  );
}
