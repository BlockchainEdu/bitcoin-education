import React, { useState } from 'react';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Head from "next/head";

export default function Events() {

  const [eventsNorthAmerica, setEventsNorthAmerica] = useState([
    { name: 'Onchain Oasis', date: 'Jan 22 - 24', location: '🇧🇸 Massau, Bahamas', url: "https://www.oasisonchain.xyz/" },
  ]);

  const [eventsSouthAmerica, setEventsSouthAmerica] = useState([
    { name: 'Blockchain NetZero', date: 'Q2', location: '🇨🇴 Medellin, Colombia', url: "https://blockchainnetzero.com/" },
  ]);

  const [eventsEurope, setEventsEurope] = useState([
    { name: 'World Crypto Forum', date: 'Jan 15 - 19', location: '🇨🇭 Davos, Switzerland', url: "https://www.wcf2030.org/" },
    { name: 'Web3 Hub Davos', date: 'Jan 15 - 18', location: '🇨🇭 Davos, Switzerland' , url: "https://web3hubdavos.com/"},
    { name: 'World Innovation Economics Summit', date: 'Jan 16 - 18', location: '🇨🇭 Davos, Switzerland', url: "https://www.worldinnovationeconomics.org/" },
  ]);

  const [eventsAfrica, setEventsAfrica] = useState([
  ]);

  const [eventsAsia, setEventsAsia] = useState([
    { name: 'CNX NFT Day', date: 'Jan 25 - 28', location: '🇹🇭 Chiang Mai, Thailand', url: "https://blockmountaincnx.com/" },
  ]);
  
  const [eventsOceania, setEventsOceania] = useState([
  ]);

  const [eventsOnline, setEventsOnline] = useState([
  ]);



  const handleEventClick = (event) => {
    // Handle the click event, e.g., navigate to event details or open a modal
    console.log(`Navigating to ${event.name}`);
  };

  const renderEventCard = (event, index) => (
    <a href={event.url} target="_blank" rel="noopener noreferrer" key={index} className="event-card" onClick={() => handleEventClick(event.url)}>
      <div className="event-card-content grid grid-cols-3 gap-4 p-4">
        <div className="event-date">{event.date}</div>
        <div className="event-name">{event.name}</div>
        <div className="event-location">{event.location}</div>
      </div>
    </a>
  );

   const renderEventSection = (events, continent) => (
    <section key={continent} className="bg-white">
      <div className="w-11/12 md:w-8/12 mx-auto py-6 pb-6">
        <h2 className="text-2xl font-semibold my-4">{continent}</h2>
        <div className="events-grid">
          {events.map(renderEventCard)}
        </div>
      </div>
    </section>
  );

  return (
    <div id="events-page" className="page-layout">
      <HeaderWithLogoDark />
      <Head>
        <title>Events | Blockchain Education Network</title>
      </Head>

      <h1 className="font-average text-5xl xl:text-6xl text-center max-w-4xl mx-auto mt-5 mb-2">
      Events Calendar
      </h1>

      {renderEventSection(eventsNorthAmerica, 'North America')}
      {renderEventSection(eventsSouthAmerica, 'South America')}
      {renderEventSection(eventsEurope, 'Europe')}
      {renderEventSection(eventsAfrica, 'Africa')}
      {renderEventSection(eventsAsia, 'Asia')}
      {renderEventSection(eventsOceania, 'Oceania')}
      {renderEventSection(eventsOnline, 'Online')}

      <Footer />
    </div>
  );
}
