import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import Image from 'next/image'
import TestComponent from '../../components/testComponent';
import PartnerShipBenefits from '../../components/partnershipBenefits';
import PartnersSlider from '../../components/partnersSlider';
import PartnersSliderAlt from '../../components/partnersSliderAlt'
import ClubsDropdown from '../../components/clubsDropdown';


export default function Partners() {

    const Benefits = [
        {
            name: "membership",
            description: "Mentorship from other clubs and career counselors"
        },
        {
            name: "access",
            description: "Access to our database of speakers, alumni, and educational content"
        },
        {
            name: "travel",
            description: "Flights and Airbnbs for members to go to Blockchain conferences",
        },
        {
            name: "experience",
            description: "Job opportunities from top Crypto and Blockchain startups"
        }
    ]

    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <div className="pt-12 lg:pt-40 pb-0 px-7">
                <div className="max-w-7xl m-auto flex flex-col lg:flex-row">
                    <div className="w-full ">
                        <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                            Are you part of a University Club?
                        </h1>
                        <p className="text-black text-md pt-10 max-w-2xl m-auto lg:m-0 text-center lg:text-left font-medium" style={{ maxWidth: "610px" }}>
                            Become part of the largest network of University blockchain clubs in the world. Get mentorship from other clubs and leaders in the space to grow and scale your club membership base. Get access to our massive database of world class speakers, educational content, job opportunities, and much much more.
                        </p>
                        <div className="m-auto flex content-center justify-center lg:justify-start">
                            <button className="mb-20 lg:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-16 rounded-full py-4 mt-10">
                                Sign Up 
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-10/12 m-auto">
                        <img className="m-auto" src="/images/clubs-hero.png" />
                    </div>
                </div>
            </div>
            <section className="max-w-7xl m-auto pb-20 md:pb-24 pt-14">
                <div className="px-7">
                    <h2 className="text-black text-3xl md:text-4xl text-center lg:text-left m-auto lg:m-0 font-bold max-w-md pb-20">
                        What BEN offers clubs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 lg:gap-y-0 gap-x-14 font-mont">
                        {Benefits.map((Benefits) =>
                            <div>
                                <div className="text-xs uppercase pb-4 text-center lg:text-left" style={{ color: "#acacac" }}>
                                    {Benefits.name}
                                </div>
                                <div style={{ maxWidth: "262px" }} className="text-center lg:text-left m-auto lg:m-0">
                                    {Benefits.description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className="pt-20 pb-40">
                <div className="max-w-7xl m-auto px-7">
                    <h2 className="font-black text-center text-4xl md:text-5xl text-black pb-8">
                        Clubs
                    </h2>
                    <ClubsDropdown />
                    <div className="pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-14 space-y-3 gap-x-10">
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                        <div className="font-mont m-auto">
                            <img src="/images/muba.png" />
                            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
