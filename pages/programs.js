import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';

export default function Programs() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <div className="pt-20 lg:pt-24 md:pb-0 px-7">
                <div className="max-w-7xl m-auto flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-6/12">
                        <div className="font-mont text-center lg:text-left text-xs uppercase">
                            Crypto Fund
                        </div>
                        <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                            The BEN Intercollegiate Crypto Fund
                        </h1>
                        <p className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                            The BEN Intercollegiate Crypto Fund is an initiative that aims to offer our student-members the opportunity to showcase their fundamental & technical prowess without the need for them to put up the capital risk. On April 22nd, our Crypto Fund Analysts launched the BEN Moon Fund ($BENMO) via TokenSets  which exposes token holders to multiple industries seen within the DeFi economy.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="border font-bold text-xl px-12 rounded-full py-4 mt-10 transition duration-500 hover:border-benorange-500 hover:text-benorange-500 text-benblack-500">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-6/12 m-auto pt-14 pb-0 lg:pb-24">
                        <img className="m-auto" src="/images/programs-hero.png" />
                    </div>
                </div>
            </div>
            <section className="max-w-7xl m-auto pt-14 pb-14 lg:pb-36 pt-36 lg:pt-40 px-7">
                <div className="flex flex-col-reverse lg:flex-row justify-between lg:space-x-20 items-center">
                    <div className="w-full lg:w-3/6 pb-20 pt-14 lg:pt-0 lg:pb-0">
                        <img className="mx-auto lg:mx-0" src="/images/programs-amplify.png" />
                    </div>
                    <div className="w-full lg:w-3/6">
                        <div className="font-mont text-center lg:text-left text-xs uppercase pb-7">
                            Ben Delegates
                        </div>
                        <h2 className="font-black text-center lg:text-left text-4xl lg:text-5xl max-w-lg m-auto lg:m-0 text-black">
                            Amplify the voice of our member chapters
                        </h2>
                        <div className="font-mont py-10 pb-0 text-center lg:text-left">
                            The BEN Meta-Delegates want to amplify the voice of our member chapters without the hassle of acquiring voting power to do so. Via BEN’s Meta-Delegate, our members actively participate in internal discussions on expired, as well as ongoing, governance proposals along with deliberations regarding protocol improvements. As of now, BEN has established meta-delegate committees for: Uniswap, Compound, and Decentraland.
                        </div>
                        <div className="m-auto flex content-center justify-center lg:justify-start">
                            <button className="border font-bold text-xl px-12 rounded-full py-4 mt-10 transition duration-500 hover:border-benorange-500 hover:text-benorange-500 text-benblack-500">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{backgroundColor:"#F5F7F7"}} className="py-24">
                <div className="flex flex-col space-y-20 lg:space-y-0 lg:flex-row font-mont max-w-7xl m-auto justify-between">
                    <div className="">
                        <img className="m-auto" src="/images/faculty-network.svg"/>
                        <div className="font-bold text-2xl pt-10 pb-6 text-center lg:text-left">Faculty Network</div>
                        <p className="max-w-xs text-center lg:text-left m-auto lg:m-0">BEN’s expansive faculty network is multi-faceted and disciplined within the complex cryptosphere.</p>
                    </div>
                    <div className="">
                        <img className="m-auto" src="/images/committees.svg"/>
                        <div className="font-bold text-2xl pt-10 pb-6 text-center lg:text-left">Committees</div>
                        <p className="max-w-sm text-center lg:text-left m-auto lg:m-0">Our committees are formed, organized, and fully-controlled by our student-members. We believe and support the vision(s) our members have regarding crypto & blockchain adoption and the best way to see the proliferation of their ideas is through communal efforts.</p>
                    </div>
                    <div className="">
                        <img className="m-auto" src="/images/career-center.svg"/>
                        <div className="font-bold text-2xl pt-10 pb-6 text-center lg:text-left">Career Center</div>
                        <p className="max-w-xs text-center lg:text-left m-auto lg:m-0">BEN’s Career Center was created with the intention to give our members the guidance needed to step into the work-force with confidence and direction. Through this, we equip our members with: resume building workshops, internship and job opportunities, and occupation pursuit sessions.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
