import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import { TeamMemberService } from '../services';
import Head from "next/head";

export default function Events() {
  const [eventsByContinent, setEventsByContinent] = useState({
    NorthAmerica: [],
    SouthAmerica: [],
    Europe: [],
    Africa: [],
    Asia: [],
    Oceania: [],
    Online: [],
  });

  useEffect(() => {
    async function fetchEvents() {
      const boardId = '5755322687';
      const body = {
        query: `{
          boards (ids: ${boardId}) {
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
        }`
      };

      let result = await TeamMemberService.getMembers(body);

      if (result?.data?.data?.boards) {
        const items = result.data.data.boards[0].items;

        console.log(items);

        const eventsByContinent = items.reduce((acc, item) => {
          const continent = item.group.title;
          acc[continent] = acc[continent] || [];
          acc[continent].push({
            name: item.name,
            date: JSON.parse(item.column_values[0].value),
            location: JSON.parse(item.column_values[1].value),
            url: JSON.parse(item.column_values[2].value)
          });
          return acc;
        }, {});

        setEventsByContinent(eventsByContinent);
      }
    }

    fetchEvents();
  }, []);

  const renderEventCard = (event, index) => (
    <a href={event.url} target="_blank" rel="noopener noreferrer" key={index} className="event-card">
      <div className="event-card-content grid grid-cols-3 gap-4 p-4">
        <div className="event-date">{event.date}</div>
        <div className="event-name">{event.name}</div>
        <div className="event-location">{event.location}</div>
      </div>
    </a>
  );

  const renderEventSection = (events, continent) => (
    <section key={continent}>
    <div className="w-11/12 md:w-7/12 mx-auto py-6">
      <h2 className="text-2xl font-semibold my-4">{continent}</h2>
      <div className="events-grid">
        {events.map(renderEventCard)}
      </div>
    </div>
    </section>
  );

  return (
    <div id="events-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Events | Blockchain Education Network</title>
      </Head>

      <h1 className="text-xl text-center">
        Events Calendar
      </h1>

      {
        Object.entries(eventsByContinent).map(([continent, eventsList]) => (
          renderEventSection(eventsList, continent)
        ))
      }

      <Footer />
    </div>
  );
}
