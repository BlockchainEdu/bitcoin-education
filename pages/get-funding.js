import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Header from '../components/header'
import Image from 'next/image'
import TestComponent from '../components/testComponent';
import PartnerShipBenefits from '../components/partnershipBenefits';
import PartnersSlider from '../components/partnersSlider';
import Head from "next/head"
import StandardButton from "../components/standardButton";
export default function GetFunding() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Get Funding | Blockchain Education Network</title>
            </Head>
            <div className="pt-0 pt-0 md:pb-0 px-0">
                <section 
                    className="w-full min-h-[600px] bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: "url('/images/get-funding/01.webp')" }}
                >
                    <img src='/images/get-funding/02.webp'></img>
                </section>
                <section id="benefits" className="py-10 mb-10">
                    <div className=" mx-auto w-11/12" style={{ maxWidth: "1000px" }}>
                        <h2
                            className="mx-auto text-2xl lg:text-4xl font-bold text-center max-w-4xl"
                            style={{ color: "#FF872A" }}
                        >
                            BEN Ventures invests into the ideas of talented, bright, and innovative students and recent graduates from top universities.
                        </h2>
                        <p className="mt-5 mx-auto text-2xl lg:text-2xl text-justify max-w-3xl">
                        Our deal flow across fintech, blockchain, AI, and metaverse comes from our network we have been curating over the past 10 years.
                        </p>

                        <div className="text-center mt-10 my-4">
                            {/* Your StandardButton or any other content goes here */}
                            <StandardButton
                                link="https://docsend.com/view/x6f5vn82s258h8wc"
                                text="View Deck"
                                color="orange"
                                styling="display-on-scroll mx-4"
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <div className="pt-0 pb-14 md:py-14 px-7">
                        <h1
                        className="mx-auto text-6xl lg:text-6xl font-bold text-center max-w-4xl"
                        style={{ color: "#FF872A" }}
                        >
                        About
                        </h1>
                        <div className="max-w-7xl m-auto">
                            <div className="flex items-center flex-col md:flex-row">
                                <div className="w-full md:w-1/2">
                                    <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-3xl pt-10 leading-snug">
                                        Our Vision
                                    </h1>
                                    <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl text-xl md:text-2xl">
                                        BEN Ventures invests into the ideas of talented, bright, and innovative students and recent graduates from top universities.
                                    </p> 
                                    <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl text-xl md:text-2xl">
                                        Our deal flow across fintech, blockchain, AI, and metaverse comes from our network we have been curating over the past 10 years.
                                    </p>
                                </div>
                                <div className="w-full md:w-1/2 mx-auto">
                                    <img className="" src="/images/get-funding/03.webp" />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-7xl m-auto">
                            <div className="flex items-center flex-col md:flex-row md:space-x-10">
                                <div className="w-full md:w-1/2 mx-auto">
                                    <img className="" src="/images/get-funding/04.webp" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-3xl pt-10 leading-snug">
                                    Our History
                                    </h1>
                                    <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    BEN was established in 2014 by University of Michigan, MIT, and Stanford students with the goal to educate about blockchain.
                                    </p> 
                                    <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    Ever since, our alumni have founded some of the most valuable companies in the space: Augur, GDA Capital, SDM, Optimism, Iota, Injective, Roll, and many more.
                                    </p>
                                    <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    BEN has created over a billion dollars in value from its network, and our aim is to create and capture even more value for in the decade to come...
                                    </p> 
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='px-7'>
                    <h1
                    className="mx-auto text-6xl lg:text-6xl font-bold text-center max-w-4xl mt-10"
                    style={{ color: "#FF872A" }}
                    >
                        Investment Thesis
                    </h1>
                    <div className="w-8/12 m-auto">
                        <div className="flex items-center flex-col mr-right ">
                            <div className="w-full  flex flex-col md:flex-row">
                                <img className="mr-10 mb-5" src="/images/get-funding/05.webp" />
                                <ul className='m-auto list-disc pl-0 mb-10'>
                                    <li>Scalable to <strong>impact 10 million people.</strong></li>
                                    <li><strong>Driven</strong> by academic research.</li>
                                    <li><strong>New frontiers </strong>(Fintech, Crypto, GameFi, Metaverse, NFTs).</li>
                                    <li>Uses <strong>Blockchain/DLT</strong>only where necessary.</li>
                                    <li>Has a <strong>unique competitive</strong> advantage.</li>
                                    <li>Precise <strong>go-to-market</strong> strategy.</li>
                                </ul>
                            </div>
                            <div className="w-full flex flex-col md:flex-row">
                                <img className="mr-10 mb-5" src="/images/get-funding/06.webp" />
                                <ul className='m-auto pl-0 list-disc mb-10'>
                                    <li>Purpose-driven <strong>founders</strong> with a minimum time commitment of <strong>5 years</strong>.</li>
                                    <li><strong>Founder-Market Fit</strong></li>
                                    <li>Hyper <strong>focused</strong> team </li>
                                    <li><strong>Young Dreamers</strong></li>
                                    <li><strong>Diversity Inclusion </strong>- Women/Minorities</li>
                                    <li>Strong <strong>Academic</strong> Background</li>
                                    <li>Showcase unique <strong>leadership</strong> values</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl m-auto mt-20">
                        <div className="flex items-center flex-col md:flex-row md:space-x-10">
                            <div className="w-full md:w-1/2">
                                <h1 className="text-center text-4xl font-black text-black">
                                Market Outlook
                                </h1>
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                Gartner forecasts estimate that the value generated by blockchain will grow at a very fast pace by the of this decade, from <span style={{ color: "#FF872A" }}>$176B in 2025 to $3.1T by 2030</span>.
                                </p> 
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                Additionally, estimated  that Blockchain will support the tracking of over <span style={{ color: "#FF872A" }}>$2T in goods and services annually </span>. Blockchain is set to be transforming business.
                                </p>
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                According to Sequoia Capital, the 2020s is poised to be the Crypto decade; with the highest statistical probability of outgrowing other Fintech industries. 
                                </p> 
                            </div>
                            <div className="w-full md:w-1/2 mx-auto">
                                <img className="" src="/images/get-funding/07.webp"/>
                            </div>
                        </div>
                    </div>
                </section>

{/*
                <section className='px-10'>
                    <h1
                    className="mx-auto text-6xl lg:text-6xl font-bold text-center max-w-4xl mt-20"
                    style={{ color: "#FF872A" }}
                    >
                        Fund Structure
                    </h1>
                    <div className="max-w-7xl m-auto mt-20">
                        <div className="flex items-center flex-col md:flex-row md:space-x-10">
                            <div className="w-full md:w-1/2">
                                <h1 className="text-center text-4xl font-black text-black mb-10">
                                Pre-seed/Seed Stage
                                </h1>
                                <ul className='m-auto pl-0 list-disc'>
                                    <li>10 Year Fund, Size: $1M or more</li>
                                    <li><strong>Pre-Seed</strong>:</li>
                                    <ul className='ml-5 list-disc'>
                                        <li>$10k-$50k Startup Checks, Valuation &lt;$500K </li>
                                        <li>Pro-rata agreements for seed investments</li>
                                    </ul>
                                    <li>Full deployment by <strong>Year 2-3</strong></li>
                                    <li><strong>2/20 model</strong></li>
                                    <li>Handled through <strong>AngelList</strong></li>
                                    <li><strong>Equity preferred</strong>. Tokens offered through SAFT Agreement must have a defined utility.</li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2 mx-auto">
                                <img className="" src="/images/get-funding/08.webp"/>
                            </div>
                        </div>
                    </div>
                </section>
*/}

                <section className='mx-10'>
                    <h1
                    className="mx-auto text-6xl lg:text-6xl font-bold text-center max-w-4xl mt-20"
                    style={{ color: "#FF872A" }}
                    >
                        Our Thesis
                    </h1>
                    <div className="max-w-7xl m-auto mt-20">
                        <div className="flex items-center flex-col md:flex-row md:space-x-10">
                            <div className="w-full md:w-1/2">
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl ">
                                    <span style={{ color: "#FF872A" }}>BEN Ventures</span> invests into the ideas of <strong>talented, bright, and innovative</strong> students and recent graduates from top universities.
                                </p> 
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    Our deal flow across <strong>fintech, blockchain, AI, and metaverse</strong> comes from our network we have been <strong>curating over the past 10 years</strong>.
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 mx-auto">
                                <img className="" src="/images/get-funding/09.webp"/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mx-10'>
                    <h1
                    className="mx-auto text-6xl lg:text-6xl font-bold text-center max-w-4xl mt-20"
                    style={{ color: "#FF872A" }}
                    >
                        Team
                    </h1>
                    <div className="max-w-7xl m-auto mt-20">
                        <div className="flex items-center flex-col md:flex-row md:space-x-10">
                            <div className="w-full md:w-1/2 m-auto">
                                <img className="mx-auto rounded-xl" src="/images/get-funding/10.webp"/>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className='mx-auto text-5xl font-bold text-center md:text-left' style={{ color: "#FF872A" }}>Jeremy Gardner</h2>
                                <p className='text-4xl text-center md:text-left'>Venture Partner</p>
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    Jeremy Gardner founded BEN in 2014 while at the <strong>University of Michigan</strong>. 
                                </p> 
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    He has co-founded <strong>Augur, SAAVHA, Disrupt</strong>, and more. He has invested in over 100 startups as an angel and VC.
                                </p>
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                    Jeremy is currently the Managing Partner at <strong>Ausum Ventures</strong> and <strong>Mystic Ventures</strong>.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center flex-col md:flex-row md:space-x-10 mt-10">
                            <div className="w-full md:w-1/2 m-auto">
                                <img className="mx-auto rounded-xl" src="/images/get-funding/11.webp"/>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className='mx-auto text-5xl font-bold text-center md:text-left' style={{ color: "#FF872A" }}>Erick Pinos</h2>
                                <p className='text-4xl text-center md:text-left'>Managing Partner</p>
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                Erick Pinos is the President of the BEN. He is a metaverse investor specializing in <strong>virtual land</strong>.
                                </p> 
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                Erick has a BS in Management from <strong>MIT</strong>, where he was the President of the <strong>MIT Bitcoin Club</strong>, as well as a researcher at the <strong>MIT Digital Currency Initiative</strong>.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center flex-col md:flex-row md:space-x-10 mt-10">
                            <div className="w-full md:w-1/2 m-auto">
                                <img className="mx-auto rounded-xl" src="/images/get-funding/12.webp"/>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className='mx-auto text-5xl font-bold text-center md:text-left' style={{ color: "#FF872A" }}>Antonio Gomes</h2>
                                <p className='text-4xl text-center md:text-left'>Managing Partner</p>
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                Antonio is the Director of Operations at BEN, past president of <strong>Gator Blockchain Club</strong>, and a 2020 graduate of B.A at the <strong>Warrington College of Business</strong>. 
                                </p> 
                                <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-2 max-w-xl text-xl md:text-2xl">
                                Antonio worked for over a year at <strong>Oracle Inc</strong> headquarters with a proven talent for aligning business strategy, then interning at multiple <strong>VC firms</strong> and a <strong>Crypto OTC brokerage</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mx-10'>
                    <h1
                    className="mx-auto text-6xl lg:text-6xl font-bold text-center max-w-4xl mt-20"
                    style={{ color: "#FF872A" }}
                    >
                        Contact
                    </h1>
                    <div className="max-w-7xl m-auto mt-10">
                        <div className="flex items-center flex-col md:space-x-10">
                            <p className="text-center md:m-0 text-black text-md pt-2 max-w-xl text-2xl lg:text-2xl">
                                If you have any questions or concerns, please feel free to reach out to us at contact@benventures.vc
                            </p> 
                            <div className="text-center mt-10 my-4">
                                {/* Your StandardButton or any other content goes here */}
                                <StandardButton
                                    link="https://docsend.com/view/x6f5vn82s258h8wc"
                                    text="View Deck"
                                    color="orange"
                                    styling="display-on-scroll mx-4"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    )
}