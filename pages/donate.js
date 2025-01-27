import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import CryptoDonateItem from "../components/cryptoDonateItem";
import DonateOptions from "../components/donateOptions";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import IndividualProgram from "../components/individualProgram";
import PopUpVideo from "../components/popupVideo";
import Modal from "../components/donateSliderButton";
import StandardButton from "../components/standardButton";
import { TeamMemberService } from "../services";
import StoryCard from "../components/storyCard";
import Stories from "../content/stories";
import VideoSlider from "../components/videoSlider";

const cryptoInfo = [
  {
    name: "Bitcoin",
    tickerName: "BTC",
    address: "bc1qhcq8d4c2tkn4txsa9856p80cvjk3dradzjrhyg",
    image: "/images/bitcoin-icon.svg",
  },
  {
    name: "Ethereum",
    tickerName: "ETH",
    address: "0x66Aa8Bee5366b6b48811AE0Dac9Fe5e1EEfE1621",
    image: "/images/ethereum-icon.svg",
  },
  {
    name: "Litecoin",
    tickerName: "LTC",
    address: "ltc1q05ghs4g0zt6t6ynca7zjdt4czk0qshqyujwuag",
    image: "/images/litecoin-icon.svg",
  },
  {
    name: "Casper",
    tickerName: "CSPR",
    address:
      "02029e87128d90547b239924e30e8c1c8cf75ede552e445906fafd6c7dcbe3141cda",
    image: "/images/casper-icon.png",
  },
  {
    name: "Tether",
    tickerName: "USDT",
    address: "Coming Soon",
    image: "/images/tether-icon.svg",
  },
  {
    name: "Solana",
    tickerName: "SOL",
    address: "Coming Soon",
    image: "/images/solana-icon.svg",
  },
  {
    name: "Filecoin",
    tickerName: "FIL",
    address: "Coming Soon",
    image: "/images/filecoin-icon.svg",
  },
  {
    name: "IoTa",
    tickerName: "MIOTA",
    address: "Coming Soon",
    image: "/images/iota-icon.svg",
  },
  {
    name: "Augur",
    tickerName: "REP",
    address: "Coming Soon",
    image: "/images/augur-icon.svg",
  },
  {
    name: "Ontology",
    tickerName: "ONT",
    address: "Coming Soon",
    image: "/images/ontology-icon.svg",
  },
  {
    name: "XRP",
    tickerName: "XRP",
    address: "Coming Soon",
    image: "/images/xrp-icon.svg",
  },
  {
    name: "Dogecoin",
    tickerName: "DOGE",
    address: "DHSyGMxAoGBxhdHU8bSR5wSD5qGWfrHCJt",
    image: "/images/dogecoin-icon.svg",
  },
  {
    name: "Shiba",
    tickerName: "SHIB",
    address: "Coming Soon",
    image: "/images/shiba-icon.svg",
  },
];

export default function Donate() {
  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      let body = {
        query: `{
          boards (ids: 1980354702) {
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
      if (result?.data?.data?.boards) {
        setTeamMembers(result.data.data.boards[0].items);
      } else {
        setTeamMembers([]);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div id="partners-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Donate | Blockchain Education Network</title>
      </Head>
      <section className="bg-benorange-500 pt-10 lg:py-24 px-7">
        <div className="flex flex-col lg:flex-row max-w-7xl m-auto py-0 lg:py-24">
          <div className="w-full lg:w-4/12">
            <h1 className="text-4xl mx-auto lg:mx-0 md:text-5xl text-center lg:text-left font-black text-white max-w-sm pt-2 leading-snug">
              Why should you donate?
            </h1>
            <div className="pt-2">
              <VideoSlider />
            </div>
          </div>
          <div className="w-full lg:w-8/12">
            <div className="mx-auto mt-10 lg:mt-0">
              <Modal />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl m-auto py-14 pb-8 px-7">
        <h2 className="text-4xl md:text-5xl text-center font-black text-black pt-10 leading-snug">
          We are disrupting blockchain education with the world most innovative
          currencies
        </h2>
        <p className="text-black text-md pt-10 m-auto lg:m-0 text-center font-medium">
          When you donate crypto directly to BEN, we immediately convert your
          coins into fiat.
          <br />
          Your gift will fund blockchain education through workshops around the
          world.
        </p>
        <p className="text-black text-xs pt-4 m-auto lg:m-0 text-center font-medium">
          Please note that all donations made in crypto are nonrefundable.
        </p>
      </section>
      <div className="flex flex-col lg:flex-row justify-center space-x-3 pb-8">
        <StandardButton
          link="/contact"
          color="orange"
          text="Get a Tax Receipt"
          styling="px-10 flex mx-auto lg:mx-0"
        />
        <StandardButton
          link="/deductions"
          text="Tax Deductions Explained"
          styling="mt-6 lg:mt-0 px-6 flex mx-auto lg:mx-0"
        />
      </div>
      <div id="crypto" className="px-7 py-20 pb-7">
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e,i,n,o,c,d,s){t.tgbWidgetOptions = { id: o, domain: n }, (d = e.createElement(i)).src = [n, "widget/script.js"].join(""), d.async = 1, (s = e.getElementById(c)).parentNode.insertBefore(d, s)}(window,document,"script","https://tgbwidget.com/","1189132154","tgb-widget-script");
            `,
          }}
        />
        <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-7xl items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <PopUpVideo thumbnail="/images/video-home-placeholder.jpg" />
          </div>
          <div
            className="w-full lg:w-1/2 mx-auto flex justify-center"
            style={{ maxWidth: "550px" }}
          >
            <script className="justify-center mx-auto" id="tgb-widget-script">
              {" "}
            </script>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-y-2 m-auto justify-between p-6 py-7" style={{ border: "1px solid #E5E5E5", maxWidth: "880px" }}>
                    {teamMembers.length > 0 && teamMembers.map((global, index) => {
                        return global.group.title == "Crypto" &&
                            <div key={index}>
                                <CryptoDonateItem
                                    name={global.name}
                                    tickerName={JSON.parse(global.column_values[0].value)}
                                    address={JSON.parse(global.column_values[3].value)}
                                    image={global.assets.length > 0 ? global.assets[0]?.public_url : ""}
                                    qrCode={global.assets.length > 0 ? global.assets[1]?.public_url : ""}
                                />
                            </div>
                    }
                    )}
                </div> */}
      </div>
      <section className="bg-benorange-300 pt-14">
        <div className="w-11/12 mx-auto">
          <h2 className="font-average text-4xl lg:text-5xl text-center max-w-4xl mx-auto mb-4">
            Our Impact
          </h2>
          <p
            className="text-benblack-500 text-sm text-center mx-auto leading-6 "
            style={{ maxWidth: "610px" }}
          >
            We believe that anyone, regardless of where they are in the world,
            can use blockchain as a vehicle to create wealth for themselves and
            their communities.
          </p>
          <p
            className="text-benblack-500 text-sm text-center mx-auto leading-6 pb-14"
            style={{ maxWidth: "610px" }}
          >
            Subscribe now and start learning!
          </p>
          <div className="border-t">
            <div
              className="mx-auto flex flex-col lg:flex-row"
              style={{ maxWidth: "1000px" }}
            >
              <div className="text-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l py-14 px-10">
                <Image
                  width="100px"
                  height="100px"
                  src="/images/ambassadors-home.svg"
                />
                <div className="font-average text-6xl">6,000+</div>
                <div className="font-inter font-semibold text-xl">Students</div>
              </div>
              <div className="text-center w-full lg:w-1/3 border-b lg:border-b-0 lg:border-l lg:border-r py-14 px-10">
                <Image
                  width="100px"
                  height="100px"
                  src="/images/companies-home.svg"
                />
                <div className="font-average text-6xl">25+</div>
                <div className="font-inter font-semibold text-xl">
                  Companies Founded
                </div>
              </div>
              <div className="text-center w-full lg:w-1/3 lg:border-r py-14 px-10">
                <Image
                  width="100px"
                  height="100px"
                  src="/images/jobs-home.svg"
                />
                <div className="font-average text-6xl">200+</div>
                <div className="font-inter font-semibold text-xl">
                  Universities
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 max-w-6xl m-auto gap-y-10 sm:gap-y-4">
            {Stories.length > 0 &&
              Stories.map((member, index) => (
                <StoryCard
                  key={index}
                  image={member.image}
                  name={member.name}
                  title={member.title}
                  bio={member.bio}
                  globalClick={globalClick}
                  setGlobalClick={setGlobalClick}
                />
              ))}
               </div>
      </section>

      <section>
        <div className="flex flex-col-reverse lg:flex-row max-w-7xl m-auto items-center justify-between mb-14 lg:mb-0 mt-20 lg:mt-0">
          <div className="w-full lg:w-6/12 m-auto pt-14 pb-0 lg:pb-24">
            <img className="m-auto" src="/images/tax-benefits.png" />
          </div>
          <div className="w-1/2">
            <div className="font-mont text-center lg:text-left text-xs uppercase">
              Donating Crypto
            </div>
            <h1 className="text-4xl md:text-5xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
              Tax Benefits of donating crypto
            </h1>
            <ul className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
              If you donate crypto directly to the 501(c)(3) nonprofits, not
              only you don’t have to pay tax on the capital gains, you can also
              get a full amount of deductions for what crypto is worth on the
              date of donation. Find more information on our guide here:
            </ul>
            <div className="mt-10 flex gap-x-10 flex-col lg:flex-row mx-auto">
              <a className="mx-auto lg:mx-0" href="/deductions">
                <StandardButton link="" text="Tax Benefits" styling="px-10" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50">
        <div className="max-w-7xl m-auto py-24">
          <h3 className="text-4xl md:text-5xl text-center lg:text-left font-black text-black max-w-5xl pb-14 leading-snug pl-7">
            Frequently Asked Questions
          </h3>
          <div className="px-7 flex flex-col lg:flex-row justify-between">
            <div className="max-w-full lg:max-w-lg m-auto lg:mx-0">
              <h4 className="text-xl md:text-2xl font-bold font-mont text-center lg:text-left">
                Q: Are there any limitations on the deductions of donations on
                the individual tax returns?
              </h4>
              <p className="font-mont text-sm pt-4">
                A: You can't deduct contributions of your time or services, or
                any part of a contribution from which you benefit. You can only
                deduct up to 30% of your Adjusted Gross Income on the tax
                return.
              </p>
            </div>
            <div className="pt-14 lg:pt-0 max-w-full lg:max-w-lg m-auto lg:mx-0">
              <h4 className="text-xl md:text-2xl font-bold font-mont text-center lg:text-left">
                Q: Can a US corporation donate to 503(c)(3) and get a tax
                deduction?
              </h4>
              <p className="font-mont text-sm pt-4">
                A: Yes, US corporations can contribute to the nonprofits and get
                deductions on their business tax return as well. A corporation’s
                charitable contribution deduction generally may not exceed 10
                percent of its taxable income. The limit is increased to 25
                percent for qualified contributions made in cash for
                calendar-year 2020.
              </p>
            </div>
          </div>
          <div className="px-7 pt-14 lg:pt-24">
            <h4 className="text-xl md:text-2xl font-bold font-mont text-center lg:text-left">
              Q: How would individuals outside the U.S potentially benefit from
              tax benefits or any incentives.
            </h4>
            <p className="font-mont text-sm pt-4">
              A: For example for Canadian citizens that would like to donate. If
              the foreign person is required to file a US tax return, he/she can
              deduct the donations on the tax return as well. If there is a tax
              treaty between the US and the foreign country, the treaty may
              allow you to deduct the donations on your foreign tax return. For
              example, the income tax treaty between the Canada and U.S. allows
              Candian citizens/ residents to claim a donation tax credit for
              donations made to eligible U.S. charities on the Canadian tax
              return.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          <a
            target="_blank"
            href="https://docs.google.com/presentation/d/1stVgjgui--ok7uG8t6QFvpGkv9rk2NuCRXIHctkbGN0/edit?usp=sharing"
            className="border p-8 rounded-lg bg-white"
          >
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
            <div className="font-inter text-xl uppercase font-semibold mt-4 mb-2">
              Ben Financials
            </div>
            <div className="text-sm font-inter">
              Check out or latest financial reports and donate to support more
              Web 3.0 education
            </div>
          </a>

          <a
            target="_blank"
            href="https://drive.google.com/file/d/1DeVoRAEAOzxJQ1jSlykklOakaLs8o_fb/view?usp=sharing"
            className="border p-8 rounded-lg bg-white"
          >
            <div className="flex justify-between">
              <div>
                <Image width="65px" height="65px" src="/images/about-us.svg" />
              </div>
              <div>
                <Image
                  width="24px"
                  height="24px"
                  src="/images/home-arrow.svg"
                />
              </div>
            </div>
            <div className="font-inter text-xl uppercase font-semibold mt-4 mb-2">
              501c3 Status
            </div>
            <div className="text-sm font-inter">
              Blockchain Education Network is qualified non-profit with
              designation as a 501 (c)(3) public charity, EIN: 46-5280397
            </div>
          </a>

          <a
            target="_blank"
            href="https://drive.google.com/file/d/1FmpY4Lmy5kX1U26q2b13NtQBf4mni5Es/view"
            className="border p-8 rounded-lg bg-white"
          >
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
            <div className="font-inter text-xl uppercase font-semibold mt-4 mb-2">
              1101 Status
            </div>
            <div className="text-sm font-inter">
              Blockchain Education Network is a qualified Puerto Rico
              1101.01(a)(2)(A)(iv) public charity, as an Educational
              Organization.
            </div>
          </a>
        </div>
      </section>
      <section>
        <div className="flex flex-col-reverse lg:flex-row max-w-7xl m-auto items-center justify-between py-24 px-7">
          <div className="w-full lg:w-1/2">
            <div className="font-mont text-center lg:text-left text-xs uppercase">
              We are just getting started
            </div>
            <h1 className="text-4xl md:text-5xl text-center lg:text-left font-black text-black max-w-full lg:max-w-md pt-10 leading-snug">
              We’re on a mission
            </h1>
            <p className="text-black text-md pt-6 max-w-full lg:max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
              We’re on a mission to educate over 10M people in the next 10 years
              in blockchain technology, so we can ensure future generations will
              have access To date, 2 billion adults remain unbanked around the
              world living without access to bank accounts. Since 2014 BEN is
              aiming to solve this problem, by investing directly in students
              education, from flying students to conferences around the world,
              to job matching, community lead events, hackathons, startup
              competitions, and unique networking opportunities. Over the last 7
              years we have we are just getting started.
            </p>
          </div>
          <div className="w-full lg:w-6/12 m-auto pb-14 lg:pb-0 flex justify-center">
            <PopUpVideo thumbnail="/images/home-programs-video.png" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
