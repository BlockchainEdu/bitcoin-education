import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Header from '../components/header'
import Image from 'next/image'
import TestComponent from '../components/testComponent';
import PartnerShipBenefits from '../components/partnershipBenefits';
import PartnersSlider from '../components/partnersSlider';
import Head from "next/head"

export default function Professor() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Professors | Blockchain Education Network</title>
            </Head>
            <div className="pt-0 pb-14 md:py-14 px-7">
                <div className="max-w-7xl m-auto">
                    <div className="flex items-center flex-col lg:flex-row lg:space-x-10">
                        <div className="w-full lg:w-3/8">
                            <h1 className="text-center mx-auto lg:mx-0 lg:text-left text-4xl lg:text-6xl font-black text-black max-w-xl pt-10 leading-snug">
                                Connecting professors and boosting their reach globally.
                            </h1>
                            <p className="text-center lg:text-left mx-auto lg:mx-0 text-black text-md pt-10 max-w-sm">
                                Professors are an integral part of expanding blockchain education and pushing the industry forward. By engaging directly with professors, we hope to expand education access at universities, publish academic research, and collaborate on blockchain/crypto projects.
                            </p>
                            <a target="_blank" href="https://forms.monday.com/forms/embed/02ce7c2a2ae0643fb4b7223aad523258?r=use1">
                                <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                                    Sign Up as Professor
                                </button>
                            </a>
                        </div>
                        <div className="w-full pt-24 lg:pt-0 lg:w-5/8 mx-auto flex justify-center lg:justify-left">
                            <Image
                                src="/images/professor-hero.png"
                                width="600"
                                height="380"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10 pb-14 md:py-14 px-7">
                <div className="max-w-7xl m-auto">
                    <div className="flex items-center flex-col-reverse lg:flex-row md:space-x-20">
                        <div className="flex w-full lg:w-5/8 mx-auto pt-14 lg:pt-0 justify-center lg:justify-start">
                            <Image
                                src="/images/professor-faculty-network.png"
                                width="600"
                                height="555"
                            />
                        </div>
                        <div className="w-full lg:w-3/8">
                            <h1 className="text-center lg:text-left text-4xl md:text-6xl mx-auto lg:mx-0 font-black text-black max-w-xl pt-10 leading-snug">
                                BEN Professor & faculty network
                            </h1>
                            <p className="text-center lg:text-left mx-auto lg:mx-0 text-black text-md pt-10 max-w-lg">
                                Establishing a network of professors and faculty members across the globe to work on different blockchain initiatives. <br /> <br />We are hosting roundtables, conducting research, facilitating corporate partnerships, and helping professors connect with each other.
                            </p>
                            <div className="m-auto flex content-center justify-center lg:justify-start">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
