import React, { useState } from 'react';
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
import { useAppContext } from '../context/state';

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
        number: "3B",
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
    const { sharedState, setSharedState } = useAppContext();
    if (locations.length === 0) {
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    return (
        <div id="home">
            <Header />
            <Head>
                <title>Home | Blockchain Education Network</title>
            </Head>
            <section className="pt-10 lg:py-24 lg:pb-0 px-7">
                <div className="text-benorange-500 text-md font-inter font-semibold text-center">Blockchain Education Network</div>
                <h1 className="font-average text-5xl text-center max-w-4xl mx-auto">
                    We provide engaging blockchain education that is free from project bias at all levels.
                </h1>
                <div className="flex justify-center space-x-4 my-10">
                    <StandardButton
                        text="Donate"
                    />
                    <StandardButton
                        color="orange"
                        text="View Our Learning Platform"
                    />
                </div>
                <p className="text-bengrey-500 text-sm text-center mx-auto leading-6" style={{ maxWidth: "610px" }}>
                    Over 3.5 billion adults lack an understanding of basic financial concepts, followed by over 1.7 Billion Adults
                    worldwide who don't have access to a bank account. We have built a community learning model that educates and
                    created financial independence.
                </p>
                <div className="mx-auto flex justify-center">
                    <Image
                        width="1000px"
                        height="370px"
                        src="/images/home-hero.jpg"
                        quality={100}
                    />
                </div>
            </section>
            <section className="bg-benorange-300 pt-14">
                <h2 className="font-average text-5xl text-center max-w-4xl mx-auto mb-4">
                    Blockchain Education Network’s Impact
                </h2>
                <p className="text-benblack-500 text-sm text-center mx-auto leading-6 pb-14" style={{ maxWidth: "610px" }}>
                    Our vision is that anyone, regardless of where they are in the world, will be able to use Blockchain as a
                    vehicle to create wealth for themselves and their communities. Donate now and start learning!
                </p>
                <div className="border-t">
                    <div className="mx-auto flex" style={{ maxWidth: "1000px" }}>
                        <div className="text-center w-1/3 border-l py-14 px-10">
                            <Image
                                width="100px"
                                height="100px"
                                src="/images/ambassadors-home.svg"
                            />
                            <div className="font-average text-6xl">
                                200+
                            </div>
                            <div className="font-inter font-semibold text-xl">
                                Ambassadors
                            </div>
                            <div className="font-inter text-sm mx-auto mt-3" style={{ maxWidth: "240px" }}>
                                Ambassadors are an important part of building rewarding community experiences.
                                Lorem ipsum dolor sit amet, consecteg elit, sed do eiusmod tempor.
                            </div>
                        </div>
                        <div className="text-center w-1/3 border-l border-r py-14 px-10">
                            <Image
                                width="100px"
                                height="100px"
                                src="/images/companies-home.svg"
                            />
                            <div className="font-average text-6xl">
                                250+
                            </div>
                            <div className="font-inter font-semibold text-xl">
                                Companies Founded
                            </div>
                            <div className="font-inter text-sm mx-auto mt-3" style={{ maxWidth: "230px" }}>
                                Over the past eight years, our Alumni has founded and worked at some of the largest companies in
                                the space, such as Augur, Iota, Coinbase, Kraken, GDA Capital, and many others...
                            </div>
                        </div>
                        <div className="text-center w-1/3 border-r py-14 px-10">
                            <Image
                                width="100px"
                                height="100px"
                                src="/images/jobs-home.svg"
                            />
                            <div className="font-average text-6xl">
                                2,000+
                            </div>
                            <div className="font-inter font-semibold text-xl">
                                Jobs Matched
                            </div>
                            <div className="font-inter text-sm mx-auto mt-3" style={{ maxWidth: "240px" }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-14" style={{background: "#fafbfc" }}>
                <div class="max-w-7xl m-auto pt-24 lg:pt-10 pb-10 lg:pb-4 flex flex-col lg:flex-row items-center" style={{ maxWidth: "1000px"}}>
                    <div className="w-full lg:w-1/2">
                        <h2 className="font-average text-5xl text-left max-w-4xl mx-auto mb-4">
                            Learn efficiently with a solid web3 foundation
                        </h2>
                        <p className="text-benblack-500 text-sm text-left leading-6 mb-6" style={{ maxWidth: "610px" }}>
                            We serve our students by providing an abundance of resources through BEN Learn's portal with courses such as Crypto Taxes, Virtual Land,
                            DeFi and many more. We empower students to host workshops at their Universities, build their network while cultivating communities
                            & creating career opportunities
                        </p>
                        <div className="font-inter font-semibold text-lg mb-2">BEN Ambassadors</div>
                        <ul className="list-disc ml-4 mb-6">
                            <li>Supports over 200+ blockchain clubs around the world</li>
                            <li>Educate students about blockchain technology</li>
                            <li>Foster disruption, investment, and entrepreneurship</li>
                        </ul>
                        <StandardButton
                            color="orange"
                            text="Start Learning"
                        />
                    </div>
                    <PopUpVideo
                        thumbnail="/images/web3-video.png"
                    />
                </div>
            </section>
            <section className="py-14 pb-24 border-b">
                <h2 className="font-average text-5xl text-center max-w-4xl mx-auto">
                    Join BEN Learn
                </h2>
                <div className="text-bengrey-500 text-lg text-center leading-6 my-6 mx-auto" style={{ maxWidth: "610px" }}>
                    <div>BEN Learn is an online educational portal with video lessons and tutorials, and other resources to learn more.</div><br />
                    <div className="py-1">Are you looking to connect with other students, traders, and entrepreneurs in the space? We offer unique group chats to connect, share ideas, and even trading tips.</div><br />
                    <div>Blockchain Basics. Trading Cryptocurrency. Music NFTs, Metaverse. All Crypto. All in one Interface, etc.</div>
                </div>
                <div className="flex justify-center space-x-4 my-10">
                    <StandardButton
                        text="Join free as a student"
                    />
                    <StandardButton
                        color="orange"
                        text="Sign up to start learn"
                    />
                </div>
            </section>
            <section>
                <div className="-mt-20 mx-auto justify-center flex">
                    <Image
                        width="1000px"
                        height="630px"
                        src="/images/join-home.png"
                        quality={100}
                    />
                </div>
                <div className="grid grid-cols-3 gap-y-10 font-semibold mx-auto" style={{ maxWidth: "1000px" }}>
                    <div class="flex items-center space-x-3">
                        <div>
                            <Image
                                width="50px"
                                height="50px"
                                src="/images/learn-bitcoin.svg"
                            />
                        </div>
                        <div className="font-inter text-xl">
                            Learn about Bitcoin
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div>
                            <Image
                                width="50px"
                                height="50px"
                                src="/images/learn-ethereum.svg"
                            />
                        </div>
                        <div className="font-inter text-xl">
                            Learn about Ethereum
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div>
                            <Image
                                width="50px"
                                height="50px"
                                src="/images/learn-stable.svg"
                            />
                        </div>
                        <div className="font-inter text-xl">
                            Learn about Stablecoins
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div>
                            <Image
                                width="50px"
                                height="50px"
                                src="/images/learn-stable-2.svg"
                            />
                        </div>
                        <div className="font-inter text-xl">
                            Learn about Stablecoins
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div>
                            <Image
                                width="50px"
                                height="50px"
                                src="/images/learn-solidity.svg"
                            />
                        </div>
                        <div className="font-inter text-xl">
                            Programming in Solidity
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div>
                            <Image
                                width="50px"
                                height="50px"
                                src="/images/learn-metaverse.svg"
                            />
                        </div>
                        <div className="font-inter text-xl">
                            The Metaverse
                        </div>
                    </div>
                </div>
            </section>
            <p className="font-mont font-medium text-md text-center max-w-3xl mx-auto mt-10" style={{ lineHeight: "26px" }}>
                Over 3.5 billion adults lack an understanding of basic financial concepts, followed by over
                1.7 Billion Adults worldwide who don't have access to a bank account.
            </p>
            <p className="font-mont font-semibold text-sm text-gray-400 text-center max-w-3xl mx-auto mb-10 mt-6" style={{ lineHeight: "26px" }}>
                Our vision is that anyone, regardless of where they are in the world, will be able to use Blockchain
                as a vehicle to create wealth for themselves and their communities. Donate now and <a className='text-benorange-500 underline' target="_blank" href="https://learn.blockchainedu.org/sign_up">start learning!</a>
            </p>
            <Modal />
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
            <section id="home-map" className="pt-7 py-14 mb-14 lg:mb-0" style={{ width: sharedState.width, height: sharedState.height }}>
                <div className="m-auto">
                    <Container className="map-container mt-6">
                        <Map locations={locations} style={{ minHeight: '600px' }} />
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
    while (fetchedProjects.length === 0) {
        fetchedProjects = await getProjectsFromMonday() || []
    }
    return { props: { locations: fetchedProjects }, revalidate: fetchedProjects.length ? 3600 : 1 }
}
