import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Modal from "../components/donateSliderButton";
import StandardButton from "../components/standardButton";
import PopUpVideo from "../components/popupVideo";
import Head from "next/head";
import { getProjectsFromMonday } from "../services";
import "mapbox-gl/dist/mapbox-gl.css";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { useAppContext } from "../context/state";

const impactStats = [
  {
    image: "/images/ambassadors-icon-home.png",
    number: "200+",
    name: "Ambassadors",
    imageStyling: "translate-y-10 transform",
    nameStyling: "",
  },
  {
    image: "/images/companies-icon-home.png",
    number: "250+",
    name: "Companies Founded",
    imageStyling: "translate-y-10 transform",
    nameStyling: "",
  },
  {
    image: "/images/valuations-icon-home.png",
    number: "3B",
    name: "Valuation of companies founded through ben",
    imageStyling: "translate-y-5 transform mx-auto lg:mx-0",
    nameStyling: "",
  },
  {
    image: "/images/jobs-icon-home.png",
    number: "1500+",
    name: "Jobs matched",
    imageStyling: "translate-y-5 transform",
    nameStyling: "",
  },
];

const Map = dynamic(() => import("../components/map"), {
  loading: () => "Loading...",
  ssr: false,
});

export default function Home({ locations }) {
  const { sharedState, setSharedState } = useAppContext();
  if (locations.length === 0) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <div id="home">
      <Header />
      <Head>
        <title>Home | Blockchain Education Network</title>
      </Head>
      <section className="pt-10 lg:py-24 px-7">
        <h6 className="font-inter text-benorange-500 font-semibold text-lg text-center">
          Blockchain Education Network
        </h6>
        <h1 className="font-average font-normal text-4.5xl text-center max-w-4xl mx-auto">
          We provide engaging blockchain education that is free from project
          bias at all levels.
        </h1>
        <div className="flex mt-10">
          <div className="mx-auto flex font-inter">
            <div className="bg-white hover:bg-slate-200 transition duration-500 font-bold text-base px-8 rounded-lg py-4 border border-zinc-900 cursor-pointer">
              Donate
            </div>
            <div className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 font-bold text-base text-white px-8 rounded-lg py-4 border border-zinc-900 cursor-pointer ml-4">
              View Our Learning Platform
            </div>
          </div>
        </div>
        <p className="font-inter font-normal text-gray-400 text-sm text-center max-w-3xl mx-auto mt-10">
          Over 3.5 billion adults lack an understanding of basic financial
          concepts, followed by over 1.7 Billion Adults worldwide who don't have
          access to a bank account. We have built a community learning model
          that educates and created financial independence.
        </p>
      </section>
      <img
        className="w-full max-h-96 object-contain"
        src="/images/Art.png"
      ></img>
      <section className="pt-60px bg-benorange-700">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-average font-normal text-4.5xl text-center">
            Blockchain Education Network’s Impact
          </h1>
          <p className="text-center text-lg font-inter text-benblack-600 mt-5 max-w-3xl mx-auto">
            Our vision is that anyone, regardless of where they are in the
            world, will be able to use Blockchain as a vehicle to create wealth
            for themselves and their communities. Donate now and start learning!
          </p>
        </div>
        <div className="border-y mt-60px border-bengrey-600">
          <div className="max-w-4xl mx-auto flex"></div>
        </div>
      </section>

      <section className="max-w-7xl m-auto pt-24 lg:pt-10 pb-10 lg:pb-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <div className="max-w-sm mx-auto lg:mx-0">
            <h2 className="font-mont font-black text-center lg:text-left text-4xl lg:text-5xl">
              What we do?
            </h2>
            <img
              className="ml-auto mr-20 h-4 lg:h-auto lg:-mt-4 lg:mr-6"
              src="/images/we-do-underline-orange.png"
            />
          </div>
          <p className="text-black text-md pt-10 mb-14 lg:mb-0 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            We serve our students by providing an abundance of resources through
            BEN Learn's portal with courses such as Crypto Taxes, Virtual Land,
            DeFi and many more. We empower students to host workshops at their
            Universities, build their network while cultivating communities &
            creating career opportunities
          </p>
        </div>
        <img className="m-auto w-96" src="/images/what-we-do.gif" />
      </section>
      <section className="mt-24 py-14 pb-0 lg:mb-0">
        <div className="m-auto">
          <div className="flex flex-col lg:flex-row justify-center space-x-4">
            <img
              className="-mt-8 mx-auto lg:mx-0 w-32 lg:w-auto mb-4 lg:mb-0"
              src="/images/ben-text-logo-black.svg"
            />
            <div>
              <h2 className="font-mont font-black text-3xl lg:text-5xl text-center lg:text-left">
                Ambassadors
              </h2>
              <img
                className="-mt-2 h-6 lg:h-auto mx-auto lg:ml-10"
                src="/images/hero-headline-underline.png"
              />
            </div>
          </div>
          <p className="text-black font-bold text-md text-center m-auto pt-4 max-w-2xl px-7">
            BEN actively mentors and supports over 200+ blockchain clubs around
            the world. We educate students about blockchain technology and
            inspire them to ﬁnd their talent and own it! Either as a disrupter,
            entrepreneur, investor, and team member.
          </p>
        </div>
      </section>
      <section
        id="home-map"
        className="pt-7 py-14 mb-14 lg:mb-0"
        style={{ width: sharedState.width, height: sharedState.height }}
      >
        <div className="m-auto">
          <Container className="map-container mt-6">
            <Map locations={locations} style={{ minHeight: "600px" }} />
          </Container>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60vh;
  minheight: 588px;
`;

export async function getStaticProps({ params }) {
  let fetchedProjects = [];
  while (fetchedProjects.length === 0) {
    fetchedProjects = (await getProjectsFromMonday()) || [];
  }
  return {
    props: { locations: fetchedProjects },
    revalidate: fetchedProjects.length ? 3600 : 1,
  };
}
