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
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import FAQItem from '../components/faqItem';
import Mailchimp from 'react-mailchimp-form'

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
                <div className="w-11/12 mx-auto">
                    <div className="text-benorange-500 text-md font-inter font-semibold text-center">Blockchain Education Network</div>
                    <h1 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto mt-4">
                        We provide engaging blockchain education that is free from project bias at all levels.
                    </h1>
                    <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 my-10">
                        <div className="mx-auto lg:mx-0">
                            <StandardButton
                                text="Donate"
                            />
                        </div>
                        <div className="mx-auto lg:mx-0">
                            <StandardButton
                                color="orange"
                                text="View Our Learning Platform"
                            />
                        </div>
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
                </div>
            </section>
            <section className="bg-benorange-300 pt-14">
                <div className="w-11/12 mx-auto">

                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto mb-4">
                        Blockchain Education Network’s Impact
                    </h2>
                    <p className="text-benblack-500 text-sm text-center mx-auto leading-6 pb-14" style={{ maxWidth: "610px" }}>
                        Our vision is that anyone, regardless of where they are in the world, will be able to use Blockchain as a
                        vehicle to create wealth for themselves and their communities. Donate now and start learning!
                    </p>
                    <div className="border-t">
                        <div className="mx-auto flex flex-col lg:flex-row" style={{ maxWidth: "1000px" }}>
                            <div className="text-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l py-14 px-10">
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
                            <div className="text-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l lg:border-r py-14 px-10">
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
                            <div className="text-center w-full lg:w-1/3 lg:border-r py-14 px-10">
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
                </div>
            </section>
            <section className="py-14" style={{ background: "#fafbfc" }}>
                <div class="w-11/12 max-w-7xl m-auto flex flex-col lg:flex-row items-center" style={{ maxWidth: "1000px" }}>
                    <div className="w-full lg:w-1/2 pb-14 lg:pb-0">
                        <h2 className="font-average text-4xl lg:text-5xl text-left max-w-4xl mx-auto mb-4">
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
                <div className="w-11/12 mx-auto">
                    <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto">
                        Join BEN Learn
                    </h2>
                    <div className="text-bengrey-500 text-lg text-center leading-6 my-6 mx-auto" style={{ maxWidth: "610px" }}>
                        <div>BEN Learn is an online educational portal with video lessons and tutorials, and other resources to learn more.</div><br />
                        <div className="py-1">Are you looking to connect with other students, traders, and entrepreneurs in the space? We offer unique group chats to connect, share ideas, and even trading tips.</div><br />
                        <div>Blockchain Basics. Trading Cryptocurrency. Music NFTs, Metaverse. All Crypto. All in one Interface, etc.</div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 my-10">
                        <div className="mx-auto lg:mx-0">
                            <StandardButton
                                text="Join free as a student"
                            />
                        </div>
                        <div className="mx-auto lg:mx-0">
                            <StandardButton
                                color="orange"
                                text="Sign up to start learn"
                            />
                        </div>
                    </div>
                </div>
            </section>
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
                <div className="w-11/12 mx-auto font-inter mt-20 mx-auto" style={{maxWidth:"1000px"}}>
                    <div className="text-center font-semibold text-lg mb-10">Presenting some of our most popular courses:</div>
                    <div className="flex flex-col justify-between lg:flex-row">
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
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                    <div className="text-lg w-full lg:w-1/2">
                            The Metaverse
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Take a deep dive into understanding how the Metaverse works! Learn how to trade, sell, collect, buy, and create unique NFTs.  </li>
                                <li>Our subject-matter expert MIT graduate instructor will teach this course, which includes a specialization in Virtual Reality and Virtual land Mortgages; join now and start your journey to a new future in the Metaverse!</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                    <div className="text-lg w-full lg:w-1/2">
                            Programing in Solidity
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Learn about the curly-bracket language designed to target the Ethereum Virtual Machine (EVM). It is influenced by C++, Python and JavaScript.</li>
                                <li>Our lesson also covers the context of object oriented languages.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between lg:flex-row">
                    <div className="text-lg w-full lg:w-1/2">
                            Celo DeFi
                        </div>
                        <div className="w-full lg:w-1/2">
                            <ul className="list-disc ml-4 mb-6" style={{ color: "#41434A" }}>
                                <li>Learn how to use Celo to transform your financial future, from the basics to advanced. </li>
                                <li>In this course series, you will learn how Celo works, and how to use this unique technology that aims to break down barriers by bringing the powerful benefits of DeFi to the users of the 6 billion smartphones.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-14 pb-24 border-b" style={{background:"#FAFBFC"}}>
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
                        Our vision is that anyone, regardless of where they are in the world, will be able to use Blockchain as a vehicle to
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
                    <div className="text-bengrey-500 text-lg text-center leading-6 my-6 mx-auto" style={{ maxWidth: "610px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostroris nisi ut aliquip ex ea commodo consequat.
                    </div>
                    <div id="home-map" className="pt-14" style={{ width: sharedState.width, height: sharedState.height }}>
                        <div className="m-auto">
                            <Container className="map-container mt-6">
                                <Map locations={locations} style={{ minHeight: '600px' }} />
                            </Container>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-14 pb-24 mx-auto" style={{ background: "#FAFBFC" }}>
                <div className="mx-auto w-11/12" style={{ maxWidth: "1000px", background: "#FAFBFC" }}>
                    <h2 className="font-average text-benblack-500 text-4xl lg:text-5xl text-left max-w-4xl">
                        Frequently Asked Questions
                    </h2>
                    <div className="text-bengrey-500 text-lg text-left leading-6 my-6" style={{ maxWidth: "610px" }}>
                        The Blockchain Education Network offers a large variety of educational content and event-based opportunities. Our community is
                        at the heart of what we do and we are commited to helping new learners figure out how to get the most out of BEN.
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                        <div className="border p-8 rounded-lg bg-white">
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
                                Ben Learn
                            </div>
                            <div class="text-sm font-inter">
                                Are you new to Blockchain? Trading Cryptocurrency? Looking for a deep dive on DeFi? Become a member today and start learning!
                            </div>
                        </div>
                        <div className="border p-8 rounded-lg bg-white">
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
                                University Club
                            </div>
                            <div class="text-sm font-inter">
                                Become part of the largest network of University blockchain clubs in the world.
                            </div>
                        </div>
                        <div className="border p-8 rounded-lg bg-white">
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
                        </div>
                        <div className="border p-8 rounded-lg bg-white">
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
                        </div>
                        <div className="border p-8 rounded-lg bg-white">
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
                        </div>
                        <div className="border p-8 rounded-lg bg-white">
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
                                The Blockchain Education Network (BEN) is a 501(c)(3) non-porfit charitable organization founded in 2014.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between pt-16 mx-auto items-center lg:items-end w-11/12" style={{ maxWidth: "1000px" }}>
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
                </div>
            </section>
            <section className="py-14 mx-auto" style={{ background: "#1E3745" }}>
                <div class="flex flex-col lg:flex-row items-center justify-between w-11/12 mx-auto" style={{ maxWidth: "1000px" }}>
                    <div>
                        <h2 className="font-average text-white text-4xl lg:text-5xl text-left max-w-4xl">
                            Join our newsletter
                        </h2>
                        <div className="text-white text-lg text-left leading-6 my-6" style={{ maxWidth: "540px" }}>
                            We don’t own or operate a single data center. Instead, we take advanatage of our global network of storage
                            nodes made by people like you who are certain their extra resources.
                        </div>
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
                                    success: "Thank you for subscribing!",
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
