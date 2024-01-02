import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import { TeamMemberService } from '../services';
import Head from "next/head";
import StandardButton from '../components/standardButton';

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

  const [eventDeals, setEventDeals] = useState({});

useEffect(() => {
  async function fetchEvents() {
    // Assume you have a function to get events, e.g., getEventsFromMonday
    const eventsResult = await TeamMemberService.getMembers({
      query: `{
        boards (ids: 5755322687) {
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
    });

    // Fetch event messages from the second board
    const dealsResult = await TeamMemberService.getMembers({
      query: `{
        boards (ids: 5775320038) {
          items {
            name
            column_values{
              value
            }
          }
        }
      }`
    });

    if (eventsResult?.data?.data?.boards) {
      const items = eventsResult.data.data.boards[0].items;

      const eventsByContinent = items.reduce((acc, item) => {
        const continent = item.group.title;
        acc[continent] = acc[continent] || [];
        acc[continent].push({
          name: item.name,
          date: JSON.parse(item.column_values[0].value),
          location: JSON.parse(item.column_values[1].value),
          url: JSON.parse(item.column_values[2].value),
          imageUrl: item.assets.length > 0 ? item.assets[0].public_url : ""
        });
        return acc;
      }, {});

      setEventsByContinent(eventsByContinent);
    }

    if (dealsResult?.data?.data?.boards) {
      const dealItems = dealsResult.data.data.boards[0].items;

      console.log("dealItems", dealItems);

      const dealsByEventName = dealItems.reduce((acc, item) => {
        console.log("item", item);
        let event = item.column_values[0].value;

        // Remove quotation marks from the event string
        event = event.replace(/^"|"$/g, '');

        const message = item.name;
        const link = item.column_values[1];

        if (event) {
          acc[event] = { message, link };
        }

        return acc;
      }, {});

      setEventDeals(dealsByEventName);
    }
  }

  fetchEvents();
}, []);

const renderEventCard = (event, index) => {
  const deal = eventDeals[event.name];
  if (deal !== undefined) {
    const link = JSON.parse(deal.link.value);
    console.log("deal", deal.link.value);
    console.log("deal", deal.url);
  }

  return (
    <div key={index} className="event-card-container">
      <a href={event.url} target="_blank" rel="noopener noreferrer" className="event-card flex">
        <div className="event-image-container">
          <img src={event.imageUrl} alt={event.name} className="event-image" />
        </div>
        <div className="event-details">
          <div className="event-name">{event.name}</div>
          <div className="event-date">{event.date}</div>
          <div className="event-location">{event.location}</div>
        </div>
      </a>
      {deal && (
        <StandardButton
          link={link.url}
          text={deal.message}
          target="_blank"
          styling="my-2 mx-auto flex justify-center"
        /> 
      )}
    </div>
  );
};


  const renderEventSection = (events, continent) => (
    <section key={continent}>
    <div className="w-11/12 lg:w-8/12 mx-auto py-6">
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

      <section className="container pt-10 mx-auto">

        <h1 className="text-center mx-auto text-4xl lg:text-6xl font-black">
          Events Calendar
        </h1>

        <p className="text-center mx-auto text-black text-md pt-4 max-w-xl">
          Sign up to stay up to date with upcoming crypto conferences and free ticket opportunities!
        </p>

        <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 mt-8 mb-10 m-auto" style={{ "max-width": "800px" }}>
          <div className="mx-auto lg:mx-0 w-full w-5/6 lg:w-8/12">
            <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true&utm_source=website&utm_medium=events&utm_content=events" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%" }}></iframe>
          </div>
        </div>

        {
          Object.entries(eventsByContinent).map(([continent, eventsList]) => (
            renderEventSection(eventsList, continent)
          ))
        }
      </section>

      <Footer />
    </div>
  );
}
