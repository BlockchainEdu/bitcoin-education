import React, { useState, useEffect } from 'react';
import DonateButton from "../components/donateSliderButton";
import Footer from "../components/footer";
import Header from "../components/header";
import Map from '../components/map'
import Image from 'next/image'
import FeatureSlider from '../components/featureSlider';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="pt-10 md:pt-40 mt-10 px-7 relative z-20 flex justify-between items-center m-auto" style={{ maxWidth: "110rem" }}>
        <div className="w-3/12 hidden lg:block">
          <Image
            src="/images/home-illustration-left.png"
            width={416}
            height={500}
          />
        </div>
        <div className="w-full lg:w-6/12 m-auto">
          <div className="flex md:hidden justify-center">
            <Image
              src="/images/home-illustration-right.png"
              width={400}
              height={410}
            />
          </div>
          <img className="hidden md:block m-auto" src="/images/ben-home-logo.svg" />
          <h1 className="text-center pt-20 text-4xl md:text-6xl font-black max-w-xl md:max-w-3xl m-auto pt-10 text-benblack-500" style={{ lineHeight: "72px" }}>Providing borderless blockchain education</h1>
          <div className="flex flex-col sm:flex-row relative items-center justify-center space-y-14 sm:space-y-0 gap-x-4 mt-14">
            <DonateButton />
            <div>
              <a href="/get-involved">
                <button className="border font-bold text-xl px-10 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">Get Involved</button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-3/12 hidden lg:block">
          <Image
            src="/images/home-illustration-right.png"
            width={487}
            height={500}
          />
        </div>
      </div>
      <div className="max-w-7xl m-auto py-24 pt-36 lg:pt-56 px-7">
        <div className="grid grid-cols-5 gap-x-3 max-w-xs mx-auto md:mx-0">
          <a target="_blank" href="https://facebook.com/blockchainedu"><img src="/images/facebook-light.svg" /></a>
          <a target="_blank" href="https://twitter.com/blockchainedu"><img src="/images/twitter-light.svg" /></a>
          <a target="_blank" href="https://instagram.com/blockchainedu"><img src="/images/instagram-light.svg" /></a>
          <a target="_blank" href="https://medium.com/blockchainedu"><img src="/images/medium-light.svg" /></a>
          <a target="_blank" href="https://t.me/blockchainedu"><img src="/images/telegram-light.svg" /></a>
        </div>
        <div className="mt-14 md:-mt-8">
          <a href="/#what-is-ben"><img className="m-auto" src="/images/scroll.svg" /></a>
        </div>
      </div>
      <section id="what-is-ben" className="bg-benorange-500 py-20 px-7">
        <h2 className="font-black text-4xl md:text-5xl text-black text-center">
          What is BEN?
        </h2>
        <p className="text-black text-md what-is-ben text-center m-auto pt-10">
          The Blockchain Education Network (BEN)  is the largest and longest running network  of students, alumni, professors, teachers,  professionals, and community leaders  excited about blockchain across the world.  We are on a journey to spur blockchain  adoption by empowering our leaders to  bring blockchain to their companies and  communities.
        </p>
      </section>
      <section className="-mt-20 flex justify-end max-w-7xl m-auto">
        <Image
          src="/images/home-break-illustration.png"
          width={269}
          height={215}
        />
      </section>
      <section className="max-w-7xl -mt-14 md:-mt-40 m-auto py-24 px-7">
        <h2 className="font-black text-4xl md:text-5xl text-black text-center md:text-left">
          Our impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-20 gap-x-20 gap-y-20 lg:gap-y-0 max-w-7xl m-auto align-center">
          <div className="text-center m-auto lg:text-left lg:m-0">
            <img src="/images/ambassadors.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">200+</div>
            <div className="uppercase font-mont text-sm">Ambassadors</div>
          </div>
          <div className="text-center m-auto lg:text-left lg:m-0">
            <img src="/images/companies-founded.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">250</div>
            <div className="uppercase font-mont text-sm">Companies Founded</div>
          </div>
          <div className="text-center m-auto lg:text-left lg:m-0">
            <img className="m-auto lg:m-0" src="/images/valuation.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">$11B</div>
            <div className="uppercase font-mont text-sm max w-60">Valuation of Companies Founded Through BEN</div>
          </div>
          <div className="text-center m-auto lg:text-left lg:m-0">
            <img src="/images/jobs-matched.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">1500+</div>
            <div className="uppercase font-mont text-sm">Jobs Matches</div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl m-auto py-24 pb-14 px-7">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
              Our Vision
            </div>
            <h2 className="font-black text-center md:text-left text-4xl md:text-5xl text-black pb-10">
              The 10:10 Plan
            </h2>
            <div className="flex items-center gap-x-0 md:gap-x-10 justify-center">
              <div className="border-r-none md:border-r md:border-4 md:border-benorange-500  h-24">

              </div>
              <div>
                <p className="font-mont text-center md:text-left mx-auto md:mx-0 text-xl md:text-2xl font-bold max-w-sm">
                  Over the next 10 years we plan to educate over 10M people in Blockchain Technology
                </p>
              </div>
            </div>
            <div className="m-auto flex content-center justify-center md:justify-start">
              <a href="/about">
                <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                  Learn more
                </button>
              </a>
            </div>
          </div>
          <div>
            <img className="mx-auto md:mx-0" src="/images/10-10-plan.png" />
          </div>
        </div>
      </section>
      <section className="py-24 bg-bengrey-500 px-7">
        <div className="max-w-7xl m-auto">
          <h2 className="text-center md:text-left font-black text-4xl md:text-5xl text-black pb-10">
            BEN Ambassadors
          </h2>
          <p className="text-center md:text-left font-mont max-w-2xl text-bengrey-400">
            BEN actively mentors and supports over 200+ blockchain clubs around the world. We educate students about blockchain technology and inspire them to ﬁnd their talent and own it!  Either as a disrupter, entrepreneur,  investor, and team member.
          </p>
        </div>
        <div className="flex flex-col md:flex-row max-w-7xl m-auto items-center justify-between pt-20">
          <div className="w-full md:w-1/5 text-center md:text-left">
            <div>
              <img className="m-auto md:m-0" src="/images/clubs-icon.svg" />
              <div className="font-mont text-xs uppercase pt-3">
                Clubs
              </div>
            </div>
            <div className="py-10">
              <img className="m-auto md:m-0" src="/images/blockchain-center-icon.svg" />
              <div className="font-mont text-xs uppercase pt-3">
                Blockchain Center
              </div>
            </div>
            <div>
              <img className="m-auto md:m-0" src="/images/professors-icon.svg" />
              <div className="font-mont text-xs uppercase pt-3">
                Professors
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/5 pt-20 md:pt-0">
            <img className="m-auto" src="/images/static-map.svg" />
          </div>
        </div>
      </section>
      <section className="flex flex-col md:flex-row max-w-7xl m-auto items-center justify-between py-24 px-7">
        <div className="text-center md:text-left">
          <h2 className="font-black text-4xl md:text-5xl text-black pb-10">
            What do we do?
          </h2>
          <p className="font-mont max-w-lg">
            We serve our students by providing an abundance of resources. With our global chapters we host events, educate, create a community, build careers and mentor.
          </p>
        </div>
        <div>
          <img className="pt-20 md:pt-0" src="/images/what-do-we-do.png" />
        </div>
      </section>
      <FeatureSlider />
      <Footer />
    </div>
  )
}
