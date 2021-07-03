import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import Image from 'next/image'
import TestComponent from '../../components/testComponent';
import PartnerShipBenefits from '../../components/partnershipBenefits';
import PartnersSlider from '../../components/partnersSlider';

export default function Professor() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <div className="pt-10 pb-14 md:py-14 px-7">
                <div className="max-w-7xl m-auto">
                    <div className="flex items-center flex-col md:flex-row md:space-x-10">
                        <div className="w-full w-3/8">
                            <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-xl pt-10 leading-snug">
                                Connecting professors and boosting their reach globally.
                            </h1>
                            <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-10 max-w-sm">
                                Professors are an integral part of expanding blockchain education and pushing the industry forward. By engaging directly with professors, we hope to expand education access at universities, publish academic research, and collaborate on blockchain/crypto projects.
                            </p>
                        </div>
                        <div className="w-full md:w-5/8 mx-auto">
                            <img className="m-auto" src="/images/professor-hero.png" width="600px" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10 pb-14 md:py-14 px-7">
                <div className="max-w-7xl m-auto">
                    <div className="flex items-center flex-col md:flex-row md:space-x-20">
                        <div className="w-full md:w-5/8 mx-auto">
                            <img className="m-auto" src="/images/professor-faculty-network.png" width="600px" />
                        </div>
                        <div className="w-full w-3/8">
                            <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-xl pt-10 leading-snug">
                                BEN Professor & faculty network
                            </h1>
                            <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-10 max-w-lg">
                                Establishing a network of professors and faculty members across the globe to work on different blockchain initiatives. <br /> <br />We are hosting roundtables, conducting research, facilitating corporate partnerships, and helping professors connect with each other.
                            </p>
                            <div className="m-auto flex content-center justify-center lg:justify-start">
                                <button className="border font-bold text-xl px-12 rounded-full py-4 mt-10 transition duration-500 hover:border-benorange-500 hover:text-benorange-500 text-benblack-500">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-10 pb-14 md:py-14 px-7" style={{backgroundColor:"#F5F7F7"}}>
                <div className="max-w-7xl m-auto">
                    <div className="flex items-center flex-col md:flex-row md:space-x-20">
                        <div className="w-full w-3/8">
                            <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-xl pt-10 leading-snug">
                                BEN International Academic Research Journal
                            </h1>
                            <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-10 max-w-sm">
                                We are finding the top blockchain researchers across the globe and publishing their research in the BEN Research Journal
                            </p>
                            <div className="m-auto flex content-center justify-center lg:justify-start">
                                <button className="border font-bold text-xl px-12 rounded-full py-4 mt-10 transition duration-500 hover:border-benorange-500 hover:text-benorange-500 text-benblack-500">
                                    Join Us
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-5/8 mx-auto">
                            <img className="m-auto" src="/images/academic-research-journal.png" width="600px" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
