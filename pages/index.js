import React, { useState, useEffect } from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import Image from 'next/image'
import FeatureSlider from '../components/featureSlider';
import Modal from '../components/donateSliderButton';
import StandardButton from '../components/standardButton';
import DonateOptions from '../components/donateOptions';
import PopUpVideo from '../components/popupVideo';
import Head from "next/head"
import { getProjectsFromMonday } from '../services'
import 'mapbox-gl/dist/mapbox-gl.css'
import dynamic from "next/dynamic"
import styled from "styled-components"
import { MediaType } from "../components/map"

const impactStats = [
  {
    image: "/images/ambassadors-icon-home.png",
    number: "200+",
    name: "Ambassadors",
    imageStyling: "translate-y-10 transform",
    nameStyling: ""
  },
  {
    image: "/images/companies-icon-home.png",
    number: "250+",
    name: "Companies Founded",
    imageStyling: "translate-y-10 transform",
    nameStyling: ""
  },
  {
    image: "/images/valuations-icon-home.png",
    number: "100m",
    name: "Valuation of companies founded through ben",
    imageStyling: "translate-y-5 transform mx-auto lg:mx-0",
    nameStyling: ""
  },
  {
    image: "/images/jobs-icon-home.png",
    number: "1500+",
    name: "Jobs matched",
    imageStyling: "translate-y-5 transform",
    nameStyling: ""
  },
]

const Map = dynamic(() => import("../components/map"), {
  loading: () => "Loading...",
  ssr: false
})

export default function Home({ locations }) {
  if ( locations.length === 0 ) {
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Home | Blockchain Education Network</title>
      </Head>
      <section className="py-24 px-7">
        <h1 className="font-mont font-black text-2xl text-center max-w-4xl mx-auto">
          Our mission is to provide borderless blockchain education for students to generate wealth & financial freedom.
        </h1>
        <div className="mx-auto max-w-xl">
          <img className="mx-auto lg:ml-auto" src="/images/hero-headline-underline.png" />
        </div>
        <p className="font-mont font-medium text-md text-center max-w-3xl mx-auto mt-10" style={{ lineHeight: "26px" }}>
          Over 3.5 billion adults lack an understanding of basic financial concepts, followed by over
          1.7 Billion Adults worldwide who don't have access to a bank account.
        </p>
        <p className="font-mont font-semibold text-sm text-gray-400 text-center max-w-3xl mx-auto mb-10 mt-6" style={{ lineHeight: "26px" }}>
          Our vision is that anyone, regardless of where they are in the world, will be able to use Blockchain
          as a vehicle to create wealth for themselves and their communities. Donate now and <a className='text-benorange-500 underline' target="_blank" href="https://learn.blockchainedu.org/">start learning!</a>
        </p>
        <Modal />
      </section>
      <section className="what-is-section pt-14 lg:pt-14 px-7 -mt-4">
        <div>
          <div id="what-is" className="flex justify-center space-x-2 items">
            <div className="max-w-7xl">
              <h2 className="font-mont font-black text-4xl lg:text-5xl">
                What is
              </h2>
              <img className="-ml-2 lg:-ml-4 -mt-2 lg:-mt-4 w-36 lg:w-full" src="/images/what-ben-underline-orange.png" />
            </div>
            <img className="-mt-4 lg:-mt-8 w-24 lg:w-auto" src="/images/what-ben-home.svg" />
          </div>
          <p className="text-black text-md max-w-4xl text-center m-auto pt-10">
            The Blockchain Education Network (BEN) is the largest and longest running network
            of students, alumni, professors, teachers, professionals, and community leaders
            excited about blockchain across the world. We are mission to provide bordeless blockchain
            education, and to spur blockchain adoption by empowering student leaders to  bring blockchain
            to their companies and communities through local workshops and online courses.
          </p>
          <div className="m-auto my-10 mb-14 flex justify-center">
            <PopUpVideo
              thumbnail="/images/video-home-placeholder.jpg"
            />
          </div>
          <StandardButton
            link="/programs"
            text="Programs"
            color="orange"
            styling="px-16 flex m-auto"
          />
        </div>
      </section>
      <section className="max-w-7xl mt-10 lg:-mt-32 m-auto pt-56 lg:pt-48 impact-section px-7">
        <div className="max-w-xs mx-auto lg:mx-0">
          <h2 className="font-mont font-black text-center lg:text-left text-4xl lg:text-5xl pt-10 lg:pt-0">
            Our Impact
          </h2>
          <img className="ml-auto h-3 mr-14 lg:h-auto lg:mr-5 lg:-mt-4" src="/images/impact-underline-orange.png" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-10 lg:gap-y-0 max-w-7xl m-auto align-center">
          {impactStats.map((item) => (
            <div className="text-center m-auto lg:text-left lg:m-0">
              <img src={item.image} className={item.imageStyling} />
              <div className={`font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3 ${item.nameStyling}`}>{item.number}</div>
              <div className="uppercase font-mont text-xs tracking-widest">{item.name}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-7xl m-auto pt-24 lg:pt-10 pb-10 lg:pb-4 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2">
          <div className="max-w-sm mx-auto lg:mx-0">
            <h2 className="font-mont font-black text-center lg:text-left text-4xl lg:text-5xl">
              What we do?
            </h2>
            <img className="ml-auto mr-20 h-4 lg:h-auto lg:-mt-4 lg:mr-6" src="/images/we-do-underline-orange.png" />
          </div>
          <p className="text-black text-md pt-10 mb-14 lg:mb-0 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            We serve our students by providing an abundance of resources through BEN Learn's portal with courses
            such as Crypto Taxes, Virtual Land, DeFi and many more. We empower students to host workshops at
            their Universities, build their network while cultivating communities & creating career opportunities
          </p>
        </div>
        <img className="m-auto w-96" src="/images/what-we-do.gif" />
      </section>
      <section className="mt-24 py-14 pb-0 lg:mb-0">
        <div className="m-auto">
          <div className="flex flex-col lg:flex-row justify-center space-x-4">
            <img className="-mt-8 mx-auto lg:mx-0 w-32 lg:w-auto mb-4 lg:mb-0" src="/images/ben-text-logo-black.svg" />
            <div>
              <h2 className="font-mont font-black text-3xl lg:text-5xl text-center lg:text-left">
                Ambassadors
              </h2>
              <img className="-mt-2 h-6 lg:h-auto mx-auto lg:ml-10" src="/images/hero-headline-underline.png" />
            </div>
          </div>
          <p className="text-black font-bold text-md text-center m-auto pt-4 max-w-2xl px-7">
            BEN actively mentors and supports over 200+ blockchain clubs around the
            world. We educate students about blockchain technology and inspire them to
            ﬁnd their talent and own it!  Either as a disrupter, entrepreneur, investor, and team member.
          </p>
        </div>
      </section>
      <section id="home-map" className="mt-10 py-14 mb-14 lg:mb-0">
        <div className="m-auto">
        <Container className="mt-6">
          <Map locations={locations} />
        </Container>
        </div>
      </section>
      <Footer />
    </div>
  )
}

const Container = styled.div`
  width: 100%;
  height: 60vh;
  minHeight: 588px;
`

export async function getStaticProps({ params }) {
  let fetchedProjects = []
  while ( fetchedProjects.length === 0 ) {
    fetchedProjects = await getProjectsFromMonday() || []
  }
  return { props: { locations: fetchedProjects }, revalidate: fetchedProjects.length ? 3600 : 1 }
}
