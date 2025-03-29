﻿import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Image from "next/image";
import Head from "next/head";
import dynamic from "next/dynamic";
import Script from "next/script";
import { getProjectsFromMonday } from "../services";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import { useAppContext } from "../context/state";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import FeatureSlider from "../components/featureSlider";
import Modal from "../components/donateSliderButton";
import StandardButton from "../components/standardButton";
import DonateOptions from "../components/donateOptions";
import PopUpVideo from "../components/popupVideo";
import { MediaType } from "../components/map";
import FAQItem from "../components/faqItem";
import Popup from "../components/popup";
import BlogGrid from "../components/blogGrid";
import { TeamMemberService } from "../services";
import PartnersSlider from "../components/partnersSlider";

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
  const companies = [
    {
      name: "Augur",
      link: "https://augur.net/",
      url: "/images/fintech/augur.webp",
    },
    {
      name: "Bitso",
      link: "https://bitso.com/mx",
      url: "/images/fintech/bitso.webp",
    },
    {
      name: "Blockbeam",
      link: "https://www.blockbeam.io/",
      url: "/images/fintech/blockbeam.webp",
    },
    {
      name: "Bolt",
      link: "https://www.bolt.com/",
      url: "/images/fintech/bolt.webp",
    },
    {
      name: "BTC Inc",
      link: "https://b.tc/",
      url: "/images/fintech/btc-inc.webp",
    },
    {
      name: "Chainside",
      link: "https://www.chainside.net/en/home/",
      url: "/images/fintech/chainside.webp",
    },
    {
      name: "GDA Capital",
      link: "https://gda.capital/",
      url: "/images/fintech/gda-capital.webp",
    },
    {
      name: "Glass Markets",
      link: "https://glassmarkets.io/",
      url: "/images/fintech/glass-markets.webp",
    },
    {
      name: "IntoTheVerse",
      link: "https://intotheverse.xyz/",
      url: "/images/fintech/into-the-verse.webp",
    },
    {
      name: "Iota",
      link: "https://www.iota.org/",
      url: "/images/fintech/iota.webp",
    },
    {
      name: "Neon",
      link: "https://neonevm.org/",
      url: "/images/fintech/neon.webp",
    },
    {
      name: "Noble",
      link: "https://nobleassets.xyz/",
      url: "/images/fintech/noble.webp",
    },
    {
      name: "Notional",
      link: "https://notional.finance/",
      url: "/images/fintech/notional.webp",
    },
    {
      name: "Numoen",
      link: "https://www.numoen.com/",
      url: "/images/fintech/numoen.webp",
    },
    {
      name: "Optimism",
      link: "https://www.optimism.io/",
      url: "/images/fintech/optimism.webp",
    },
    {
      name: "Roll",
      link: "https://tryroll.com/",
      url: "/images/fintech/roll.webp",
    },
    {
      name: "Tenderize",
      link: "https://www.tenderize.me/",
      url: "/images/fintech/tenderize.webp",
    },
    {
      name: "Wanchain",
      link: "https://www.wanchain.org/",
      url: "/images/fintech/wanchain.webp",
    },
    {
      name: "Llama Network",
      link: "https://www.llamanetwork.ai/",
      url: "/images/fintech/llama.jpeg",
    },
  ];
  const [partners, setPartners] = useState([]);
  const [categories, setCategorise] = useState([]);
  useEffect(async () => {
    let body = {
      query: `{
          boards (ids: 1449692436) {
            items_page (limit: 40) {
              items {
                group {
                    id
                    title
                }
                id
                name
                column_values {
                    id
                    
                    value
                }
                assets {
                    public_url
                }
              }
            }
          }
      }`,
    };
    let result = await TeamMemberService.getMembers(body);
    if (result?.data?.data?.boards) {
      let categories_temp = [];
      let temp = result.data.data.boards[0].items_page.items.map((item) => {
        !categories_temp.includes(item.group.title) &&
          categories_temp.push(item.group.title);
        return {
          id: item.id,
          name: item.name,
          category: item.group.title,
          url: item.assets[0]?.public_url ? item.assets[0]?.public_url : null,
        };
      });
      setPartners(temp);
      setCategorise(categories_temp);
    }
  }, []);

  const { sharedState, setSharedState } = useAppContext();
  const [globalClick, setGlobalClick] = useState(false);

  // Define the gtag_report_conversion function
  const gtag_report_conversion = (url) => {
    var callback = function () {
      if (typeof url !== "undefined") {
        window.location = url;
      }
    };
    gtag("event", "conversion", {
      send_to: "AW-11202135402/VQLfCM_u8LUYEOqKzN0p",
      event_callback: callback,
    });
    return false;
  };

  if (locations.length === 0) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  if (typeof window !== "undefined") {
    // Check if the UTM parameters are present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");

    // Retrieve the stored UTM parameters from session storage
    const storedUtmSource = sessionStorage.getItem("utm_source");
    const storedUtmMedium = sessionStorage.getItem("utm_medium");
    const storedUtmCampaign = sessionStorage.getItem("utm_campaign");

    // Check if the UTM parameters are present in the URL and not already stored
    if (utmSource && !storedUtmSource) {
      sessionStorage.setItem("utm_source", utmSource);
    }
    if (utmMedium && !storedUtmMedium) {
      sessionStorage.setItem("utm_medium", utmMedium);
    }
    if (utmCampaign && !storedUtmCampaign) {
      sessionStorage.setItem("utm_campaign", utmCampaign);
    }
  }
  // Add the following useEffect hook at the bottom of the component
  useEffect(() => {
    // Get the query parameter "scroll" from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const scrollParam = urlParams.get("scroll");

    // If "scroll" is present and is equal to "ready", scroll to the "Ready?" section with an offset
    if (scrollParam === "ready") {
      scrollToSection("ready", -500); // Adjust the offset value as needed
    }
  }, []);

  // Scroll to section function with an offset
  const scrollToSection = (sectionId, offset = -200) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const topPos = section.getBoundingClientRect().top;
      window.scrollBy({ top: topPos + offset, behavior: "smooth" });
    }
  };

  return (
    <div id="home">
      <Header />

      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7187550270272911"
          crossOrigin="anonymous"
        ></script>

        {/* Event snippet for Begin checkout conversion page
            In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-11202135402/VQLfCM_u8LUYEOqKzN0p',
                  'event_callback': callback
              });
              return false;
            }
          `,
          }}
        ></script>

        <title>Home | Blockchain Education Network</title>
      </Head>

      {/*
      <div className="text-white px-6 py-4 flex justify-center items-center" style={{ background: "orange" }}>
        <a href="https://bit.ly/ben-bitcoin2023" target="_blank"><div className="text-white text-lg font-bold text-center hover:text-black" style={{ transition: "color 0.2s" }}>Students! Apply for Free Bitcoin 2023 Tickets (May 18 - 24)🚀</div></a>
      </div>
      */}

      <section className="container pt-10 lg:pb-0 px-7 mx-auto">
        <div
          className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4"
          style={{ maxWidth: "1000px" }}
        >
          <div className="col-span-1 lg:pt-6 lg:order-last ml-2">
            <h1 className="font-average text-5xl xl:text-6xl text-center max-w-4xl mx-auto mt-0 mb-2">
            Learn. Innovate. Lead the Future of Web3
              <span style={{ fontSize: "31px" }}> </span>
              <span className="font-bold"></span>
            </h1>

            <div
              className="text-bengrey-500 text-xl text-center mx-auto leading-6"
              style={{ maxWidth: "610px" }}
            >
              Empowering blockchain education since 2014. Learn, connect, and grow with a global network 📚.
            </div>

            <div className="flex flex-col items-center justify-center mt-6 mb-7">
              <StandardButton
                link="https://twitter.com/ChainStoriesPod"
                text="Start Learning"
                color="orange"
                styling="display-on-scroll mx-4"
                target="_blank"
              />
            </div>

            <div className="col-span-1 mt-2 text-center">
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-8 gap-0">
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2">
                    <img
                      src="/images/people/jelena-djuric.jpeg"
                      alt="User Image 1"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2 -z-1">
                    <img
                      src="/images/people/matt-batsinelas.jpeg"
                      alt="User Image 2"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2 -z-2">
                    <img
                      src="/images/people/michael-gord.jpeg"
                      alt="User Image 3"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2 -z-3">
                    <img
                      src="/images/people/joey-krug.jpeg"
                      alt="User Image 4"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2 -z-4">
                    <img
                      src="/images/people/jinglan-wang.jpeg"
                      alt="User Image 5"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2 -z-5">
                    <img
                      src="/images/jeremygardner.webp"
                      alt="User Image 6"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -ml-2 -z-6">
                    <img
                      src="images/people/ryan-breslow.jpeg"
                      alt="User Image 7"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-benorange-500 w-12 h-12 border-benorange border-2 -ml-2 -z-7">
                    <img
                      src="/images/stories/drew-cousin.jpeg"
                      alt="User Image 8"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-3 text-bengrey-500 text-center text-md">
                8,000+ members over 10 years!
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center col-span-1 pb-12 rounded-lg">
            <img
              style={{ borderRadius: "10px" }}
              src="/images/benevents.png"
            ></img>
          </div>
        </div>
      </section>

      {/*
      <section className="bg-benorange-300 py-24 pb-24 mx-auto">
        <div className="bg-benorange-300 mx-auto w-11/12" style={{ maxWidth: "1000px" }}>
        The BEN Model
        Awareness -> Events -> Build
        </div>
      </section>

      <section className="bg-black py-24 pb-24 mx-auto">
        <div className="bg-benorange-300 mx-auto w-11/12" style={{ maxWidth: "1000px" }}>
        Ready for the BEN Airdrop? Sign up now
        </div>
      </section>

            <section className="bg-white-300 py-24 pb-24 mx-auto">
        <div className="bg-benorange-300 mx-auto w-11/12" style={{ maxWidth: "1000px" }}>
        Check out our events calendar of upcoming <a href="/events">events</a>
        </div>
      </section>

*/}

      <section id="benefits" className="py-10 mb-10">
        <div className=" mx-auto w-11/12" style={{ maxWidth: "1000px" }}>
          <h2
            className="mx-auto text-2xl lg:text-4xl font-bold text-center max-w-4xl"
            style={{ color: "#FF872A" }}
            
          >
            Introducing BEN
          </h2>
          <p className="mt-5 mx-auto text-2xl lg:text-2xl text-justify max-w-3xl">
          What began as a handful of students connecting <span style={{color:"#FF872A"}}>Bitcoin clubs</span> quickly ignited a global movement. 
          In <span style={{color:"#FF872A"}}>2014</span>, Jeremy Gardner, Daniel Bloch, and Maxym Tkacz founded the College Cryptocurrency Network (CCN) at 
          the University of Michigan with a simple mission—empower students with knowledge. Within months, it expanded to 160+ 
          chapters in 35+ countries, uniting minds eager to shape the future of digital assets.
          </p>

          <p className="mt-5 mx-auto text-2xl lg:text-2xl text-justify max-w-3xl">
          As the space evolved, so did the mission, rebranding as the <span style={{color:"#FF872A"}}>Blockchain Education Network</span> (BEN) 
          to provide unbiased education that cut through the noise and empowered students to build, innovate, and lead.
          </p>
          <p className="mt-5 mx-auto text-2xl lg:text-2xl text-justify max-w-3xl">
          From campus meetups to billion-dollar startups, its alumni have founded 
          IOTA, Optimism, Bitso, Augur, Injective, GDA Capital, and more, proving that 
          knowledge sparks action. Today, <span style={{color:"#FF872A"}}>BEN</span> thrives as an unbiased non-profit educational network, 
          providing trusted, accessible education in digital assets. Beyond entrepreneurs, BEN equips governments, 
          policymakers, and global leaders with the knowledge to shape the geopolitical future, ensuring informed 
          decisions drive the industry forward.
          </p>
          <div className="text-center mt-20 my-4">
            {/* Your StandardButton or any other content goes here */}
            <StandardButton
              link="https://twitter.com/ChainStoriesPod"
              text="Start Learning"
              color="orange"
              styling="display-on-scroll mx-4"
              target="_blank"
            />
          </div>
        </div>
      </section>

      <section>
        <div className=" m-auto">
          <PartnersSlider title="" data={companies} />
        </div>
      </section>

      <section className=" bg-white mt-10 mt-20">
        <div className=" m-auto">
          <PartnersSlider
            title="Notable Alumni"
            data={partners.filter((item) => item.category === "Alumni")}
          />
        </div>
      </section>

      <section id="benefits" className="py-10 mb-10">
        <div className=" mx-auto w-11/12" style={{ maxWidth: "1000px" }}>
          <h2
            className="mx-auto text-2xl lg:text-4xl font-bold text-center max-w-4xl mb-10"
            style={{ color: "#FF872A" }}
          >
            ChainStories Podcast
          </h2>
          <iframe
            id="player_iframe"
            src="https://www.buzzsprout.com/1829321?artist=&client_source=large_player&iframe=true&limit=5&referrer=https%3A%2F%2Fwww.buzzsprout.com%2F1829321%2Fpodcast%2Fembed"
            loading="lazy"
            width="100%"
            height="375"
            frameborder="0"
            scrolling="no"
            title="Dropout Capital"
          ></iframe>
        </div>
      </section>

      <section className="bg-benorange-300 py-24 pb-10 mx-auto">
        <div
          className="bg-benorange-300 mx-auto w-11/12"
          style={{ maxWidth: "1000px" }}
        >
          <h2 className="mx-auto text-benblack-500 text-4xl lg:text-5xl text-center max-w-4xl">
            Testimonials
          </h2>

          <div
            className="mx-auto text-lg text-center leading-6 my-6"
            style={{ maxWidth: "610px" }}
          >
          The Blockchain Education Network provides insightful educational content to empower the next generation of digital asset leaders through trusted, unbiased knowledge.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 bg-benorange-300">
            <div
              onClick={() => scrollToSection("ready")}
              className="cursor-pointer"
            >
              <div className="border p-4 rounded-lg bg-white">
                {/*
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
                                Newsletter
                            </div>
*/}
                <div class="text-md font-inter">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-benorange-500 w-12 h-12 border-benorange border-2">
                      <img
                        src="/images/stories//sonny-monroe.jpg"
                        alt="User Image 6"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-2" style={{ fontWeight: "600" }}>
                      Sonny Monroe
                    </div>
                  </div>

                  <em>
                    "BEN is like a swiss army knife with crypto news, education,
                    meetups, and even some tools."
                  </em>
                </div>
              </div>
            </div>

            <div
              onClick={() => scrollToSection("ready")}
              className="cursor-pointer"
            >
              <div className="border p-4 rounded-lg bg-white">
                {/*
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
                                COMMUNITY
                            </div>
*/}

                <div class="text-md font-inter">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-benorange-500 w-12 h-12 border-benorange border-2">
                      <img
                        src="images/Sarahroff.png"
                        alt="User Image 6"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-2" style={{ fontWeight: "600" }}>
                      Sarah Roff
                    </div>
                  </div>
                  <em>
                    "BEN gives the best blockchain education so that we can
                    become the next generation of innovators!"
                  </em>
                </div>
              </div>
            </div>
            {/*
                        <a target="_blank" href="https://docs.google.com/presentation/d/1stVgjgui--ok7uG8t6QFvpGkv9rk2NuCRXIHctkbGN0/edit?usp=sharing" className="border p-8 rounded-lg bg-white">
*/}
            {/*
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
*/}
            {/*
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
            <div
              onClick={() => scrollToSection("ready")}
              className="cursor-pointer"
            >
              <div className="border p-4 rounded-lg bg-white">
                {/*
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
                                Advertise With Us
                            </div>
*/}
                <div className="text-md font-inter">
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-benorange-500 w-12 h-12 border-benorange border-2">
                      <img
                        src="/images/stories/dr-marko-suvajdzic-square.jpg"
                        alt="User Image 6"
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-2" style={{ fontWeight: "600" }}>
                      Dr. Marko Suvajdzic
                    </div>
                  </div>
                  <em>
                    "In my work to promote blockchain technology, BEN has been
                    an invaluable resource."
                  </em>
                </div>
              </div>
            </div>
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

      {/*
      <section className="pt-0">
        <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto mb-4">
          Recent Posts
        </h2>
        <div className="mx-auto flex justify-center pb-12">
          <BlogGrid />
        </div>
      </section>
      */}

      {/*

      <section className="py-20 bg-black text-white mt-5" style={{backgroundImage: 'url("/images/more-dark-2.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-full overflow-hidden mx-auto w-28 h-28 mb-6">
              <img src="/images/ben-logo-white-border.jpg" alt="Image" className="mx-auto w-full h-full" />
            </div>
            <h1 className="text-4xl font-bold mb-14 text-white shadow-lg">Ready?</h1>
{/*            <StandardButton
              link="https://learn.blockchainedu.org/sign_up?plan_id=486348"
              text="Invest Now"
              color="orange"
              target="blank"
              styling="text-center py-3 rounded-lg text-black"
              onClick={() => gtag_report_conversion('https://learn.blockchainedu.org/sign_up?plan_id=486348')}
            /> */}
      {/*      <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 mt-8 mb-10 m-auto" style={{ "maxWidth": "800px" }}>
            <div className="mx-auto lg:mx-0 w-full lg:w-4/5">
              <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%" }}></iframe>
            </div>
  </div>
          </div> 

        </div>
      </section>

      */}

      <section id="ready" className="bg-benorange-300 mx-auto p-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="flex flex-col lg:flex-row justify-center lg:space-y-0 lg:space-x-4 mt-2 mb-10 m-auto"
              style={{ "max-width": "800px" }}
            >
              <StandardButton
                link="https://twitter.com/ChainStoriesPod"
                text="Start Learning"
                color="orange"
                styling="display-on-scroll mx-4"
                target="_blank"
              />
            </div>
          </div>
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
