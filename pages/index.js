import React, { useState, useEffect } from 'react';
import DonateButton from "../components/donateButton";
import Footer from "../components/footer";
import Header from "../components/header";
import Map from '../components/map'
import Image from 'next/image'
import FeatureSlider from '../components/featureSlider';
import StandardButton from '../components/standardButton';
import DonateOptions from '../components/donateOptions';
import PopUpVideo from '../components/popupVideo';

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

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <section className="max-w-7xl m-auto pt-0 lg:py-24">
        <img className="m-auto hidden lg:flex" src="/images/ben-home-logo.svg" />
        <div className="flex flex-col-reverse lg:flex-row mt-0 lg:mt-14 items-center mx-auto justify-center">
          <div className="pt-20 lg:pt-0 w-full lg:w-4/12 mx-auto lg:mx-0">
            <div>
              <img className="m-auto" src="/images/ben-home-hero.png" />
              <div className="flex justify-center mt-5">
                <DonateButton />
              </div>
            </div>
          </div>
        </div>
      </section>
      <a href="#what-is"><img className="hidden lg:flex m-auto -mt-10 lg:-mt-14" src="/images/scroll.svg" /></a>
      <section className="what-is-section max-w-7xl m-auto pt-72 lg:pt-32 px-7">
        <div id="what-is" className="flex justify-center space-x-2 items">
          <div>
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
            <img className="ml-auto mr-20 h-4 lg:-mt-4 lg:mr-6" src="/images/we-do-underline-orange.png" />
          </div>
          <p className="text-black text-md pt-10 mb-14 lg:mb-0 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
            We serve our students by providing an abundance of resources.
            With our global chapters we host events, educate, create a
            community, build careers and mentor.
          </p>
        </div>
        <img className="m-auto" src="/images/we-do-image-home.png" />
      </section>
      <section className="max-w-7xl m-auto py-24 px-7">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div>
            <div className="font-mont text-center lg:text-left text-xs uppercase pb-7">
              Our Vision
            </div>
            <div className="max-w-sm pb-4">
              <h2 className="font-mont font-black text-5xl">
                The 10:10 Plan
              </h2>
              <img className="ml-auto -mt-2 mr-6" src="/images/10-plan-underline-orange.png" />
            </div>
            <div className="flex items-center gap-x-0 lg:gap-x-10 justify-center">
              <div className="border-r-none lg:border-r lg:border-4 lg:border-benorange-500  h-24">

              </div>
              <div>
                <p className="font-mont text-center lg:text-left mx-auto lg:mx-0 text-xl lg:text-2xl font-bold max-w-sm">
                  Over the next 10 years we plan to educate over 10M people in Blockchain Technology
                </p>
              </div>
            </div>
            <div className="m-auto flex content-center justify-center lg:justify-start">
              <StandardButton
                link="/about"
                color="orange"
                text="Learn more"
                styling="px-12 mt-10"
              />
            </div>
          </div>
          <div>
            <img className="mt-14 lg:mt-0 mx-auto md:mx-0" src="/images/10-plan-home.png" />
          </div>
        </div>
      </section>
      <section className="bg-benorange-500 py-14 mb-14 lg:mb-0">
        <div className="max-w-7xl m-auto">
          <div className="flex flex-col lg:flex-row justify-center space-x-4">
            <img className="-mt-8 mx-auto lg:mx-0 w-32 lg:w-auto mb-4 lg:mb-0" src="/images/ben-text-logo-black.svg" />
            <div>
              <h2 className="font-mont font-black text-3xl lg:text-5xl text-center lg:text-left">
                Ambassadors
              </h2>
              <img className="-mt-2 h-6 lg:h-auto mx-auto lg:mx-0" src="/images/ambassadors-underline-orange.png" />
            </div>
          </div>
          <p className="text-black font-bold text-md text-center m-auto pt-4 max-w-2xl px-7">
            BEN actively mentors and supports over 200+ blockchain clubs around the
            world. We educate students about blockchain technology and inspire them to
            ﬁnd their talent and own it!  Either as a disrupter, entrepreneur, investor, and team member.
          </p>
        </div>
        <img className="m-auto mt-14" src="/images/ben-map.png" />
      </section>
      <Footer />
    </div>
  )
}
