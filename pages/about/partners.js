import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import Image from 'next/image'
import TestComponent from '../../components/testComponent';
import PartnerShipBenefits from '../../components/partnershipBenefits';
import PartnersSlider from '../../components/partnersSlider';

export default function Partners() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <div className="pt-3 md:py-40 pb-20 px-7">
                <div className="max-w-7xl m-auto flex flex-col lg:flex-row">
                    <div className="w-full lg:w-8/12">
                        <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                            Proven commitment to global blockchain education
                        </h1>
                        <p className="text-black text-md pt-10 max-w-xl m-auto lg:m-0 text-center lg:text-left font-medium">
                            BEN partners with committed protocols, startups, corporations and associations that have proven commitment to accelerating the adoption of blockchain technology and are actively seeking to further educate the next generation of blockchain leaders.
                        </p>
                    </div>
                    <div className="w-full lg:w-6/12 m-auto pt-14 pb-24">
                        <img className="m-auto" src="/images/partners-hero.png" />
                    </div>
                </div>
            </div>
            <section className="max-w-7xl m-auto -mt-40 pb-20 md:pb-24">
                <div className="px-7">
                <p className="text-black text-md pt-10 max-w-md pb-6">
                    Depending on your preferred level of involvement, BEN partnership benefits include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-3 gap-x-10">
                    <PartnerShipBenefits
                        benefit="Participate in BEN talent survey and recruiting process"
                    />
                    <PartnerShipBenefits
                        benefit="Sponsorship discounts & priority"
                    />
                    <PartnerShipBenefits
                        benefit="Propose and contribute to projects"
                    />
                    <PartnerShipBenefits
                        benefit="Talent pipeline from top global universities"
                    />
                    <PartnerShipBenefits
                        benefit="Incorporate educational material in our university-accredited blockchain courses, events and meetups"
                    />
                    <PartnerShipBenefits
                        benefit="Participate in BEN Research"
                    />
                    <PartnerShipBenefits
                        benefit="Participate and suggest working groups"
                        style="lg:-mt-5"
                    />
                    <PartnerShipBenefits
                        benefit="Free or subsidized tickets to paid events"
                        style="lg:-mt-0"
                    />
                    <PartnerShipBenefits
                        benefit="Assist sourcing speakers and sponsors for events"
                        style="lg:-mt-10"
                    />
                </div>
                </div>
            </section>
            <div className="py-40 pt-20 pb-20 px-7" style={{backgroundColor:"#F5F7F7"}}> 
                <div className="max-w-7xl m-auto flex flex-col md:flex-row">
                    <div className="w-full md:w-8/12 m-auto">
                        <img className="m-auto" src="/images/should-you-illustration.png" />
                    </div>
                    <div className="w-full md:w-6/12">
                        <h1 className="ml-0 md:ml-20 text-4xl md:text-5xl font-black text-black max-w-6xl pt-10 leading-snug text-center lg:text-left">
                            Should your company partner with BEN?
                        </h1>
                        <div className="flex font-mont pt-20 md:pt-36">
                            <img src="/images/community-partners-icon.png" />
                            <p style={{ maxWidth: "360px" }}><b>Community Partners:</b> Non-profit organizations and associations interested in sharing educational content to their community.</p>
                        </div>
                        <div className="flex font-mont py-5">
                            <img src="/images/content-partners-icon.png" />
                            <p style={{ maxWidth: "360px" }}><b>Content Partners:</b> Any entity interested in contributing to the educational content for online and accredited courses.</p>
                        </div>
                        <div className="flex font-mont">
                            <img src="/images/event-partners-icon.png" />
                            <p style={{ maxWidth: "360px" }}><b>Event Partners:</b> Any entity interested in co-hosting one or many events with students, clubs, and organizations.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20">
                <h2 className="text-center font-mont text-4xl md:text-5xl font-black pb-24">Industry Partners</h2>
            <PartnersSlider />
            <PartnersSlider />
            </div>
            <section className="px-7">
                <div className="flex flex-col-reverse lg:flex-row max-w-7xl m-auto justify-between items-center py-10">
                    <div className="border w-full lg:w-2/5 text-center px-10 md:px-28 py-12">
                        <div className="font-bold uppercase text-lg pb-7">
                            What is there to learn
                        </div>
                        <div className="font-black" style={{ fontSize: "24px" }}>
                            Available courses
                        </div>
                        <div className="pt-5">
                            <div className="pb-3">Blockchain Fundamentals</div>
                            <div className="pb-3">DeFi Fundamentals</div>
                            <div className="pb-3">Crypto Trading</div>
                            <div className="pb-3">Solidity Development</div>
                            <div className="pb-3">How to set up Metamask</div>
                            <div className="pb-3">How to start a Blockchain club</div>
                        </div>
                        <button className="mt-5 border font-bold text-xl px-8 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">Sign up to learn</button>
                    </div>
                    <div className="w-full md:w-3/5">
                        <div className="pt-4 pb-20 md:p-0 flex justify-end">
                            <Image
                                src="/images/learn-hero-illustration.png"
                                width="650"
                                height="581"
                                quality="100"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl m-auto pt-14 pb-4 md:py-24 pb-14 px-7">
                <div className="flex flex-col md:flex-row justify-between md:space-x-20 items-center">
                    <div className="w-full md:w-3/6 pb-20 md:pb-0">
                        <img className="mx-auto md:mx-0" src="/images/learn-teachers-illustration.png" />
                    </div>
                    <div className="w-full md:w-3/6">
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            Share what you know with the world
                        </div>
                        <h2 className="font-black text-center md:text-left text-4xl md:text-5xl text-black">
                            Teachers
                        </h2>
                        <div className="font-mont py-6 text-center md:text-left">
                            Whether you’re a professor at an accredited University, an Alumni of a BEN University, or even an experienced professional in the industry with a unique topic. BEN Learn relies mainly on volunteers helping to create content, especially in the early stages of our platform, so your help would be greatly appreciated. Share what you know with the world today, as we make it super simple to create and upload a course!
                        </div>
                        <div className="flex items-center gap-x-0 md:gap-x-10">
                            <div className="border-r-none md:border-r md:border-4 md:border-benorange-500  h-36">

                            </div>
                            <div>
                                <p className="font-mont text-center md:text-left mx-auto md:mx-0 text-xl md:text-2xl font-bold">
                                    We invite anyone interested in creating a course on BEN Learn to fill out the form below and we will get back to you as soon as we can with whether we can support your course.
                                </p>
                            </div>
                        </div>
                        <div className="m-auto flex content-center justify-center md:justify-start">
                            <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                                Sign up as a Teacher
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl m-auto pt-0 md:py-24 pb-36 px-7">
                <div className="flex flex-col-reverse md:flex-row justify-between">
                    <div className="w-full md:w-1/2">
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            Our Vision
                        </div>
                        <h2 className="font-black text-center md:text-left text-4xl md:text-5xl text-black pb-8">
                            The 10:10 Plan
                        </h2>
                        <div className="font-mont max-w-full md:max-w-md text-center md:text-left">
                            Largely with the help of the BEN Learn Platform, we intend to educate over 10 million people in the next 10 years. We believe in providing borderless access to Blockchain Education. Your support of the BEN Learn Platform can help us get closer to that goal!
                        </div>
                        <div className="m-auto flex content-center items-center justify-center md:justify-start pt-10">
                            <div className="flex">
                                <div className="-mr-4">
                                    <img src="/images/accounts-created-icon.svg" />
                                </div>
                                <div>
                                    <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3 mt-2">2,00+</div>
                                    <div className="uppercase font-mont text-sm">BEN Learn accounts created</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mt-14">
                        <img className="mx-auto md:mx-0" src="/images/10-10-plan.png" />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
