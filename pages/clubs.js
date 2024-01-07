import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import ClubsDropdown from "../components/clubsDropdown";
import { TeamMemberService } from '../services';
import Head from "next/head"

const Partners = () => {
  const [allClubs, setAllClubs] = useState([])
  const [clubs, setClubs] = useState([])
  const [locations, setLocations] = useState([])
  const Benefits = [
    {
      name: "membership",
      description: "Mentorship from other clubs and career counselors",
    },
    {
      name: "access",
      description:
        "Access to our database of speakers, alumni, and educational content",
    },
    {
      name: "experience",
      description: "Job opportunities from top Crypto and Blockchain startups",
    },
  ];

  useEffect(async () => {
    let body = {
      query: `{
        boards (ids: 1452150315) {
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
      }`,
    };
    let result = await TeamMemberService.getMembers(body);
    console.log(result);
    if (result?.data?.data?.boards) {
      let temp_locations = []
      let temp = result.data.data.boards[0].items.map(item => {
        !temp_locations.includes(item.group.title) && temp_locations.push(item.group.title)
        return {
          id: item.id,
          name: item.name,
          location: item.group.title,
          url: item.assets[0]?.public_url ? item.assets[0]?.public_url : null
        }
      })
      setAllClubs(temp)
      setClubs(temp);
      setLocations(temp_locations);
    }
  }, []);

  const onSelected = (param) => {
    let temp = allClubs;
    if (param !== 'All')
      temp = allClubs.filter(item => item.location === param)
    setClubs(temp)
  }

  return (
    <div id="partners-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Clubs | Blockchain Education Network</title>
      </Head>
      <div className="pt-0 lg:pt-40 pb-0 px-7">
        <div className="max-w-7xl m-auto flex flex-col lg:flex-row">
          <div className="w-full ">
            <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
              Are you part of a University Club?
            </h1>
            <p
              className="text-black text-md pt-10 max-w-2xl m-auto lg:m-0 text-center lg:text-left font-medium"
              style={{ maxWidth: "610px" }}
            >
              Become part of the largest network of University blockchain clubs in the world.
              Get access to our course material, massive database of world class speakers, educational
              content, job opportunities, and much much more.
            </p>
            <div className="m-auto flex content-center justify-center lg:justify-start">
              <a href="https://beats.blockchainedu.org/" target="_blank">
                <button className="mb-20 lg:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-16 rounded-full py-4 mt-10">
                  Sign Up
                </button>
              </a>
            </div>
          </div>
          <div className="w-full lg:w-10/12 m-auto">
            <img className="m-auto" src="/images/clubs-hero.png" />
          </div>
        </div>
      </div>
      <section className="max-w-7xl m-auto pb-20 md:pb-24 pt-14">
        <div className="px-7">
          <h2 className="text-black text-3xl md:text-4xl text-center lg:text-left m-auto lg:m-0 font-bold max-w-md pb-20">
            What BEN offers clubs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 lg:gap-y-0 gap-x-14 font-mont">
            {Benefits.map((Benefits, index) => (
              <div key={index}>
                <div
                  className="text-xs uppercase pb-4 text-center lg:text-left"
                  style={{ color: "#acacac" }}
                >
                  {Benefits.name}
                </div>
                <div
                  style={{ maxWidth: "320px" }}
                  className="text-center lg:text-left m-auto lg:m-0"
                >
                  {Benefits.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 pt-10 lg:pt-20 pb-36 lg:pb-20">
        <div className="max-w-7xl m-auto px-7">
          <h2 className="font-black text-center text-4xl md:text-5xl text-black pb-0 lg:pb-8">
            Clubs
          </h2>
          <ClubsDropdown onSelected={onSelected} locations={locations} />
          <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 space-y-3 gap-x-10">
            {clubs.map(club => (
              <div className="font-mont m-auto">
                <div className="flex items-center" style={{ height: "130px" }}>
                  <img className="m-auto" src={club.url} style={{ maxWidth: "200px" }} />
                </div>
                <p className="font-bold text-lg pt-10 text-center">{club.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Partners;
