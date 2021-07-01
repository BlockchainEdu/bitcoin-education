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
                    <button className="mt-3 border font-bold text-xl px-8 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">Sign up to learn</button>
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
            <Footer />
        </div>
    )
}
