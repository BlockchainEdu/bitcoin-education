import React, { useState } from 'react';
import Footer from "../components/footer";
import Header from "../components/header";
import Image from 'next/image';
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from 'next/script';
import { getProjectsFromMonday } from '../services';
import 'mapbox-gl/dist/mapbox-gl.css';
import styled from "styled-components";
import Mailchimp from 'react-mailchimp-form';
import { useAppContext } from '../context/state';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import FeatureSlider from '../components/featureSlider';
import Modal from '../components/donateSliderButton';
import StandardButton from '../components/standardButton';
import DonateOptions from '../components/donateOptions';
import PopUpVideo from '../components/popupVideo';
import { MediaType } from "../components/map"
import FAQItem from '../components/faqItem';
import MailchimpWithRedirect from "../components/mailchimpWithRedirect";
import Popup from '../components/popup';
import BlogGrid from '../components/blogGrid';

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

    const [globalClick, setGlobalClick] = useState(false);

    if (locations.length === 0) {
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    return (

        <div id="home">
            <Header />
            <Head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7187550270272911"
                    crossorigin="anonymous"></script>
                <script type="text/javascript" async src="https://embeds.beehiiv.com/attribution.js"></script>
                <title>Home | Blockchain Education Network</title>
            </Head>

            <div className="text-white px-6 py-4 flex justify-center items-center" style={{ background: "orange" }}>
  <a href="https://bit.ly/ben-bitcoin2023" target="_blank"><div className="text-white text-lg font-bold text-center hover:text-black" style={{ transition: "color 0.2s" }}>Students! Apply for Free Bitcoin 2023 Tickets (May 18 - 24)🚀</div></a>
</div>


            <section className="pt-10 lg:py-4 lg:pb-0 px-7">
                <div className="w-11/12 mx-auto">

                {/*
                    <div className="text-benorange-500 text-md font-inter font-semibold text-center">Blockchain Education Network</div>
*/}
                    <h1 className="font-average text-6xl lg:text-7xl text-center max-w-4xl mx-auto mt-4">
                        Learn to earn!
                    </h1>
                    <div className="text-bengrey-500 text-lg text-center mx-auto leading-6" style={{ maxWidth: "610px" }}>
                        Join our community of 50k+ for crypto market news, promo codes, and your free 24-page "Ultimate Guide to the Wild World of Crypto" by signing up below 👇
                    </div>

                    <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 my-10 m-auto" style={{ "max-width": "800px" }}>
                        <div className="mx-auto lg:mx-0 md:w-full lg:w-1/2">
                            <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%" }}></iframe>
                        </div>
                        {/*
                            <div className="mx-auto lg:mx-0">
                                <StandardButton
                                    link="/donate"
                                    text="Donate"
                                />
                            </div>
*/}
                        {/*}
                            <div className="mx-auto lg:mx-0">
                                <StandardButton
                                    link="https://learn.blockchainedu.org/"
                                    color="orange"
                                    text="Sign Up"
                                />
                            </div>
*/}
{/*
                        <div className="mx-auto lg:mx-0 md:w-full lg:w-1/2">
                            <Mailchimp
                                action='https://blockchainedu.us4.list-manage.com/subscribe/post?u=8f05e1771877392fa3d41df41&amp;id=a53b080887'
                                fields={[
                                    {
                                        name: 'EMAIL',
                                        placeholder: 'Email',
                                        type: 'email',
                                        required: true
                                    }
                                ]}
                                messages={
                                    {
                                        sending: "Sending...",
                                        success: "Thanks for subscribing! Please check your email to confirm.",
                                        error: "An unexpected internal error has occurred.",
                                        empty: "Please put your email address.",
                                        duplicate: "Too many subscribe attempts for this email address",
                                        button: "Sign Up"
                                    }
                                }
                                className="subscribe-form text-center flex items-start w-full"
                            />
                        </div>
*/}
                    </div>

                    <div className="mx-auto flex justify-center pb-12">
                        <Image
                            width="640px"
                            height="474px"
                            src="/images/home-image-2.png"
                            quality={100}
                        />
                    </div>

                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto mb-4">
                        Recent Posts
                    </h2>

                    <div className="mx-auto flex justify-center pb-12">
                    <BlogGrid />
                    </div>

{/*
                    <div className="mx-auto flex justify-center">
                        <Image
                            width="1000px"
                            height="370px"
                            src="/images/home-hero.jpg"
                            quality={100}
                        />
                    </div>
*/}
                </div>
            </section >
            <section className="bg-benorange-300 pt-14">
                <div className="w-11/12 mx-auto">

                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto mb-4">
                        Our Reach
                    </h2>
{/*
                    <p className="text-benblack-500 text-sm text-center mx-auto leading-6 " style={{ maxWidth: "610px" }}>
                        We believe that anyone, regardless of where they are in the world, can use blockchain as a vehicle to create wealth for themselves and their communities.
                    </p>
 */}
                    <div className="border-t">
                        <div className="mx-auto flex flex-col lg:flex-row" style={{ maxWidth: "1000px" }}>
                            <div className="text-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l py-14 px-10">
                                <Image
                                    width="100px"
                                    height="100px"
                                    src="/images/ambassadors-home.svg"
                                />
                                <div className="font-average text-6xl">
                                    50k+
                                </div>
                                <div className="font-inter font-semibold text-xl">
                                    Audience Reach
                                </div>
                            </div>
                            <div className="text-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l lg:border-r py-14 px-10">
                                <Image
                                    width="100px"
                                    height="100px"
                                    src="/images/companies-home.svg"
                                />
                                <div className="font-average text-6xl">
                                    4k+
                                </div>
                                <div className="font-inter font-semibold text-xl">
                                    Student Reach
                                </div>
                            </div>
                            <div className="text-center w-full lg:w-1/3 lg:border-r py-14 px-10">
                                <Image
                                    width="100px"
                                    height="100px"
                                    src="/images/jobs-home.svg"
                                />
                                <div className="font-average text-6xl">
                                    316+
                                </div>
                                <div className="font-inter font-semibold text-xl">
                                    University Reach
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {/*
            <section className="py-14" style={{ background: "#fafbfc" }}>
                <div class="w-11/12 max-w-7xl m-auto flex flex-col lg:flex-row items-center" style={{ maxWidth: "1000px" }}>
                    <div className="w-full lg:w-1/2 pb-14 lg:pb-0">
                        <h2 className="font-average text-4xl lg:text-5xl text-left max-w-4xl mx-auto mb-4">
                            Learn efficiently with a solid Web3 foundation
                        </h2>
                        <p className="text-benblack-500 text-sm text-left leading-6 mb-6" style={{ maxWidth: "610px" }}>
                            We serve our students by providing an abundance of resources through BEN Learn's portal with courses such as Crypto Taxes, Intro to Virtual Land,
                            DeFi and many more. We empower students to host workshops at their universities, and build their network while cultivating communities
                            and creating career opportunities.
                        </p>
                        <StandardButton
                            link="https://learn.blockchainedu.org/"
                            color="orange"
                            text="Start Learning"
                        />
                    </div>
                    <PopUpVideo
                        thumbnail="/images/web3-video.png"
                    />
                </div>
            </section>
*/}
            {/*
            <section className="py-14 mx-auto" style={{ background: "#1E3745" }}>
                <div class="flex flex-col lg:flex-row items-center justify-between w-11/12 mx-auto" style={{ maxWidth: "1000px" }}>
                    <div>
                        <h2 className="font-average text-white text-4xl lg:text-5xl text-left max-w-4xl mb-6">
                            Join our newsletter
                        </h2>
                        <Mailchimp
                            action='https://blockchainedu.us4.list-manage.com/subscribe/post?u=8f05e1771877392fa3d41df41&amp;id=a53b080887'
                            fields={[
                                {
                                    name: 'EMAIL',
                                    placeholder: 'Email',
                                    type: 'email',
                                    required: true
                                }
                            ]}
                            messages={
                                {
                                    sending: "Sending...",
                                    success: "Thanks for subscribing! Please check your email to confirm.",
                                    error: "An unexpected internal error has occurred.",
                                    empty: "You must write an e-mail.",
                                    duplicate: "Too many subscribe attempts for this email address",
                                    button: "Subscribe"
                                }
                            }
                            className="subscribe-form text-center flex items-start w-full"
                        />
                    </div>
                    <Image
                        width="450px"
                        height="423px"
                        src="/images/newsletter-home.jpg"
                        quality={100}
                    />
                </div>
            </section>
*/}
            {/*
            <section className="py-14 pb-24 border-b">
                <div className="w-11/12 mx-auto">
                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto">
                        Join BEN Learn
                    </h2>
                    <div className="text-bengrey-500 text-lg text-center leading-6 my-6 mx-auto" style={{ maxWidth: "610px" }}>
                        <div>BEN Learn is an online educational portal with video lessons and tutorials, and other resources to learn more.</div><br />
                        <div className="py-1">Are you looking to connect with other students, traders, and entrepreneurs in the space? We offer unique group chats to connect, share ideas, and even trading tips.</div><br />
                        <div>Blockchain Basics. Trading Cryptocurrency. Music NFTs, Metaverse. All Crypto. All in one interface.</div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 my-10">
                        <div className="mx-auto lg:mx-0">
                            <StandardButton
                                link="https://learn.blockchainedu.org/"
                                color="orange"
                                text="Sign up to start learning"
                            />
                        </div>
                    </div>
                </div>
            </section>
*/}
            {/*
            <section className="w-11/12 mx-auto border-b pb-14">
                <div className="-mt-20 mx-auto justify-center flex">
                    <Image
                        width="1000px"
                        height="630px"
                        src="/images/join-home.png"
                        quality={100}
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 font-semibold mx-auto" style={{ maxWidth: "1000px" }}>
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
                <div className="w-11/12 mx-auto font-inter mt-20 mx-auto" style={{ maxWidth: "1000px" }}>
                    <div className="text-center font-semibold text-lg mb-10">Presenting some of our most popular courses:</div>
*/}
            {/* <div className="flex flex-col justify-between lg:flex-row">
                        <div className="text-lg w-full lg:w-1/2">
                            Bitcoin & Ethereum Basics
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Supports over 200+ blockchain clubs around the world</li>
                                <li>Educate students about blockchain technology</li>
                                <li>Foster disruption, investment, and entrepreneurship</li>
                            </ul>
                        </div>
                    </div> */}
            {/*
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div className="text-lg w-full lg:w-1/2">
                            Solidity Fundamentals
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>A hands-on course for mastering fundamental concepts of the Solidity programming language.</li>
                                <li>Learn the basics, as well as how to build smart contracts and dApps from scratch.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div className="text-lg w-full lg:w-1/2">
                           Intro to the Metaverse
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Take a deep dive into understanding how the Metaverse works! Learn how to trade, sell, collect, buy, and create unique NFTs.</li>
                                <li>Includes a specialization in virtual reality and virtual land; join now and start your journey to a new future in the Metaverse!</li>
                            </ul>
                        </div>
                    </div>
*/}
            {/* <div className="flex flex-col justify-between lg:flex-row">
                        <div className="text-lg w-full lg:w-1/2">
                            Programming in Solidity
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Learn about the curly-bracket language designed to target the Ethereum Virtual Machine (EVM). It is influenced by C++, Python and JavaScript.</li>
                                <li>Our lesson also covers the context of object oriented languages.</li>
                            </ul>
                        </div>
                    </div> */}
            {/* <div className="flex flex-col justify-between lg:flex-row">
                        <div className="text-lg w-full lg:w-1/2">
                            Celo DeFi
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Learn how to use Celo to transform your financial future, from the basics to advanced. </li>
                                <li>In this course series, you will learn how Celo works, and how to use this unique technology that aims to break down barriers by bringing the powerful benefits of DeFi to the users of the 6 billion smartphones.</li>
                            </ul>
                        </div>
                    </div> */}
            {/*
                </div>
            </section>
*/}
            {/*
            <section className="py-14 pb-24 border-b" style={{ background: "#FAFBFC" }}>
                <div className="w-11/12 mx-auto">
                    <div className="flex mx-auto justify-center">
                        <Image
                            width="382px"
                            height="392px"
                            src="/images/donate-home.jpg"
                            quality={100}
                        />
                    </div>
                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto" style={{ maxWidth: "700px" }}>
                        Turn your fiat or crypto into education for the next generation.
                    </h2>
                    <div className="text-bengrey-500 text-lg text-center leading-6 my-6 mx-auto" style={{ maxWidth: "610px" }}>
                        Our vision is that anyone, regardless of where they are in the world, will be able to use blockchain as a vehicle to
                        create wealth for themselves and their communities. Donate now and start learning!
                    </div>
                    <Modal />
                </div>
            </section>
            <section className="pt-14">
                <div className="mx-auto">
                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto" style={{ maxWidth: "800px" }}>
                        By donating you are supporting blockchain education all around the world.
                    </h2>
                    <div id="home-map" className="pt-14" style={{ width: sharedState.width, height: sharedState.height }}>
                        <div className="m-auto">
                            <Container className="map-container mt-6">
                                <Map locations={locations} style={{ minHeight: '600px' }} />
                            </Container>
                        </div>
                    </div>
                </div>
            </section>
*/}
            <section className="py-24 pb-24 mx-auto" style={{ background: "#FAFBFC" }}>
                <div className="mx-auto w-11/12" style={{ maxWidth: "1000px", background: "#FAFBFC" }}>
                    <h2 className="font-average text-benblack-500 text-4xl lg:text-5xl text-left max-w-4xl">
                        Frequently Asked Questions
                    </h2>
                    <div className="text-bengrey-500 text-lg text-left leading-6 my-6" style={{ maxWidth: "610px" }}>
                        The Blockchain Education Network offers a constant inflow of crypto news, events, free lights, educational content and opportunities. Our community is
                        at the heart of what we do and we are commited to helping everyone figure out how to get the most out of the crypto space.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                        <a target="_blank" href="https://beats.blockchainedu.org/" className="border p-8 rounded-lg bg-white">
                            <div className="flex justify-between">
                                <div>
                                    <Image
                                        width="65px"
                                        height="65px"
                                        src="/images/ben-learn.svg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </div>
                            </div>
                            <div class="font-inter text-xl uppercase font-semibold mt-4 mb-2">
                                BEN Beats
                            </div>
                            <div class="text-sm font-inter">
                                Are you new to Blockchain? Trading Cryptocurrency? Looking for a deep dive on DeFi? Subscribe now and start learning!
                            </div>
                        </a>
                        <a target="_blank" href="https://beats.blockchainedu.org/" className="border p-8 rounded-lg bg-white">
                            <div className="flex justify-between">
                                <div>
                                    <Image
                                        width="65px"
                                        height="65px"
                                        src="/images/university-club.svg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </div>
                            </div>
                            <div class="font-inter text-xl uppercase font-semibold mt-4 mb-2">
                                University Students
                            </div>
                            <div class="text-sm font-inter">
                                Sign up and get access to opportunities, free flights and scholarships to blockchain conferennces.
                            </div>
                        </a>
{/*
                        <a target="_blank" href="https://docs.google.com/presentation/d/1stVgjgui--ok7uG8t6QFvpGkv9rk2NuCRXIHctkbGN0/edit?usp=sharing" className="border p-8 rounded-lg bg-white">
                            <div className="flex justify-between">
                                <div>
                                    <Image
                                        width="65px"
                                        height="65px"
                                        src="/images/ben-financials.svg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </div>
                            </div>
                            <div class="font-inter text-xl uppercase font-semibold mt-4 mb-2">
                                Ben Financials
                            </div>
                            <div class="text-sm font-inter">
                                Check out or latest financial reports and donate to support more Web 3.0 education
                            </div>
                        </a>
*/}
                        {/* <a target="_blank" href="" className="border p-8 rounded-lg bg-white">
                            <div className="flex justify-between">
                                <div>
                                    <Image
                                        width="65px"
                                        height="65px"
                                        src="/images/ben-alumni.svg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </div>
                            </div>
                            <div class="font-inter text-xl uppercase font-semibold mt-4 mb-2">
                                Ben Alumni
                            </div>
                            <div class="text-sm font-inter">
                                Become part of (or re-join) the largest and longest running blockchain student network in the world to connect with your fellow alumni and share your experience!
                            </div>
                        </a> */}
                        {/* <a target="_blank" href="" className="border p-8 rounded-lg bg-white">
                            <div className="flex justify-between">
                                <div>
                                    <Image
                                        width="65px"
                                        height="65px"
                                        src="/images/blockchain-partners.svg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </div>
                            </div>
                            <div class="font-inter text-xl uppercase font-semibold mt-4 mb-2">
                                Blockchain Partners
                            </div>
                            <div class="text-sm font-inter">
                                BEN partners with committed protocols, startups, corporations and associations that have proven commitment to accelerating the adoption of blockchain technology and are actively seeking to further educate the next generation of blockchain leaders.
                            </div>
                        </a> */}
                        <a target="_blank" href="/about" className="border p-8 rounded-lg bg-white">
                            <div className="flex justify-between">
                                <div>
                                    <Image
                                        width="65px"
                                        height="65px"
                                        src="/images/about-us.svg"
                                    />
                                </div>
                                <div>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </div>
                            </div>
                            <div class="font-inter text-xl uppercase font-semibold mt-4 mb-2">
                                About Us
                            </div>
                            <div class="text-sm font-inter">
                                The Blockchain Education Network (BEN) is a global organization founded in 2014.
                            </div>
                        </a>
                    </div>
                </div>
                {/* <div className="flex flex-col lg:flex-row justify-between pt-16 mx-auto items-center lg:items-end w-11/12" style={{ maxWidth: "1000px" }}>
                    <div className="ml-0 w-full rounded-2xl p-2" style={{ maxWidth: "600px" }}>
                        <FAQItem
                            question="How many courses are included in BEN Learn?"
                            answer="We offer various courses, from Bitcoin Basics to coding in Solidity, and even on crypto Taxes! We are on a mission to continuously expand on our course offering, with at least one new course published on bi-monthly basis."
                        />
                        <FAQItem
                            question="How does the Blockchain Education Network help students?"
                            answer="We offer various courses, from Bitcoin Basics to coding in Solidity, and even on crypto Taxes! We are on a mission to continuously expand on our course offering, with at least one new course published on bi-monthly basis."
                        />
                        <FAQItem
                            question="How often are courses updated?"
                            answer="We offer various courses, from Bitcoin Basics to coding in Solidity, and even on crypto Taxes! We are on a mission to continuously expand on our course offering, with at least one new course published on bi-monthly basis."
                        />
                        <FAQItem
                            question="I am an industry expert or professor, how can I create a course on BEN Learn?"
                            answer="We offer various courses, from Bitcoin Basics to coding in Solidity, and even on crypto Taxes! We are on a mission to continuously expand on our course offering, with at least one new course published on bi-monthly basis."
                        />
                        <FAQItem
                            question="Do you guys offer refunds or course cancellations? "
                            answer="We offer various courses, from Bitcoin Basics to coding in Solidity, and even on crypto Taxes! We are on a mission to continuously expand on our course offering, with at least one new course published on bi-monthly basis."
                        />
                    </div>
                    <Image
                        width="275px"
                        height="267px"
                        src="/images/faq-home-image.jpg"
                        quality={100}
                    />
                </div> */}
            </section>
            <Footer />
        </div >
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