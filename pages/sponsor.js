import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"
import Image from 'next/image'

export default function Sponsor() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Sponsor | Blockchain Education Network</title>
      </Head>

      <section className="pt-10 lg:py-10 lg:pb-0 px-0">

        <div className="w-11/12 lg:w-7/12 mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10" style={{ maxWidth: "1200px"}}>


            <h2 className="text-3xl font-bold text-center">Advertise with us</h2>
            <p>BEN Beats is one of the fastest growing crypto newsletters in the world. We spend hundreds of hours sourcing the best crypto news, events, jobs, and tools and distill it down into a <a href="beats.blockchainedu.org">4 minute newsletter every week</a></p>
            <a href="https://bit.ly/ben-beats-deck" target="_blank"><div>See full deck                                <span>
                                    <Image
                                        width="24px"
                                        height="24px"
                                        src="/images/home-arrow.svg"
                                    />
                                </span></div></a>
                    <div className="flex justify-center">

                      <a href="https://calendly.com/blockchainedu/main/" className="px-4 py-2 bg-benorange-500 text-white rounded-md">
                        Book Main Ad
                      </a>
                      </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <p><b>📣 Reach</b>: 7.4k+ subscribers, 50k+ social media followers.</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p><b>🖱️ Open rate</b>: 31.1%</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p><b>👀 Average Impressions</b>: 6,993+ per post across newsletter and socials</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p><b>🌎 Location</b>: Our readers are mainly based in the US & Canada</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p><b>👥 Audience</b>: Our readers are mainly recent graduates in the blockchain space and are a mix of developers, builders and traders. Many are current students and looking to work full-time in the crypto space</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <p><b>🚀 Growth</b>: 300+ newsletter subscribers in the past month and 1k+ Twitter followers</p>
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">Main Ad</h3>
                    <div className="mb-1">Placement near the top of the email. 400 characters. 1 spot available per issue. $500 per spot</div>
                    <div className="mb-1">Included a dedicated social media post across Twitter, Instagram, Facebook, LinkedIn, TikTok, and YouTube</div>
                    <div><b>Bundle</b>: Get a 15% discount for purchasing 4 spots.</div>
                    <div className="flex justify-center mt-4 mb-4">
                      <a href="https://calendly.com/blockchainedu/main/" className="px-4 py-2 bg-benorange-500 text-white rounded-md">
                        Book Main Ad
                      </a>
                    </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4 text-center">Example</h3>
                        <a href="https://calendly.com/blockchainedu/main/"><img src="images/web3-daily-ad.png" alt="Web3 Daily Ad"></img></a>
                </div>
             </div>

            <div className="mb-10"><i>All ads are subject to approval. The best fit for our audience are products related to blockchain, tech, and productivity. Irrelevant ads will not be approved.</i></div>
        </div>

      </section>
      <Footer />
        </div>
    )
}