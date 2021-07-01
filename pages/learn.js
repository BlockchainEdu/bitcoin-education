import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Header from '../components/header'
import Image from 'next/image'

export default function Learn() {
    return (
        <div id="learn-page">
            <HeaderWithLogoDark />
            <section className="max-w-7xl m-auto">
                <h1 className="font-black text-4xl md:text-5xl text-black text-center md:text-left">
                    What is BEN Learn?
                </h1>
                <div className="flex pt-14 gap-x-20 font-mont">
                    <div style={{ maxWidth: "360px" }}>
                        Are you new to Blockchain? Trading Cryptocurrency? Developing Solidity? Looking for a deep dive on DeFi? We have the platform for everyone and anyone trying to learn more about a topic in the Blockchain industry.
                    </div>
                    <div style={{ maxWidth: "360px" }}>
                        Created by knowledgeable Blockchain professors, experienced Blockchain professionals, and some of the best educators in the space, you can trust our content is top notch.
                    </div>
                    <div style={{ maxWidth: "360px" }}>
                        You can earn Blockchain-based certificates (also works for LinkedIn), get rewarded with Cryptocurrencies for learning, or even get a job in the space with companies hiring our graduates.
                    </div>
                </div>
            </section>
            <section className="flex max-w-7xl m-auto justify-between items-center py-10">
                <div className="border w-2/5 text-center" style={{ padding: "3rem 7rem" }}>
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
                <div className="w-3/5">
                    <div className="flex justify-end">
                        <Image
                            src="/images/learn-hero-illustration.png"
                            width="650"
                            height="581"
                            quality="100"
                        />
                    </div>
                </div>
            </section>
            <section className="max-w-7xl m-auto py-24 pb-14 px-7">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="w-3/6">
                        <img className="mx-auto md:mx-0" src="/images/learn-teachers-illustration.png" />
                    </div>
                    <div className="w-3/6">
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            Share what you know with the world
                        </div>
                        <h2 className="font-black text-center md:text-left text-4xl md:text-5xl text-black pb-10">
                            The 10:10 Plan
                        </h2>
                        <div className="flex items-center gap-x-0 md:gap-x-10 justify-center">
                            <div className="border-r-none md:border-r md:border-4 md:border-benorange-500  h-24">

                            </div>
                            <div>
                                <p className="font-mont text-center md:text-left mx-auto md:mx-0 text-xl md:text-2xl font-bold max-w-sm">
                                    We invite anyone interested in creating a course on BEN Learn to fill out the form below and we will get back to you as soon as we can with whether we can support your course.
                                </p>
                            </div>
                        </div>
                        <div className="m-auto flex content-center justify-center md:justify-start">
                            <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                                Learn more
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
