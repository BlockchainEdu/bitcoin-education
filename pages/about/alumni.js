import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import Image from 'next/image'
import TestComponent from '../../components/testComponent';
import PartnerShipBenefits from '../../components/partnershipBenefits';
import PartnersSlider from '../../components/partnersSlider';

export default function Alumni() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <div className="pt-14 lg:pt-10 md:pb-0 px-7">
                <div className="max-w-7xl m-auto flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-6/12 mt-0 lg:-mt-20">
                        <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                            Do you want to be part of the B.E.N. alumni network?
                        </h1>
                        <p className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                            Become part of (or re-join) the largest and longest running blockchain student network in the world to connect with your fellow alumni and share your experience! These could be alumni from 4 year universities or Alumni of University clubs that are a part of the BEN Network.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                                Join as an Alumni
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 m-auto pt-6 lg:pt-14 pb-24">
                        <img className="m-auto" src="/images/alumni-hero.png" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
