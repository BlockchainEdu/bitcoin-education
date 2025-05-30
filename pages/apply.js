﻿import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"
import Image from 'next/image'

export default function Sponsor() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Apply | Blockchain Education Network</title>
      </Head>



      <div style={{ maxWidth: '800px', margin: '100px auto 0 auto', textAlign: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="text-2xl md:text-4xl font-bold mb-8">
            Network | <span style={{ color: 'orange' }}>Learn</span> | Build |{' '}
            <span style={{ color: 'orange' }}>HODL</span> | Succeed
          </h1>
        </div>
        <img src="images/BEN Network sales.avif" alt="Description of Image" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>

      <section className="pt-10 lg:py-10 lg:pb-0 px-0">

        <div className="w-11/12 lg:w-7/12 mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10" style={{ maxWidth: "1200px" }}>



          <p>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <strong style={{ fontSize: '24px', display: 'block', marginBottom: '16px', textAlign: 'center' }}>
                🔑 What's Included in my membership?


              </strong>
              <strong style={{ fontSize: '24px', display: 'block', marginBottom: '36px', marginTop: '80px', textAlign: 'center' }}>
                📅  Access to Conferences
              </strong>
              <p style={{ lineHeight: '1.5', textAlign: 'center', marginBottom: '10px' }}>
                <strong><a href="https://ethglobal.co/" style={{ color: 'black', textDecoration: 'none' }}>✅ ETHGlobal</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Connecting Ethereum enthusiasts worldwide.</span><br /><br />

                <strong><a href="https://ethglobal.com/pragma" style={{ color: 'black', textDecoration: 'none' }}>✅ Pragma</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Exploring the future of blockchain technology.</span><br /><br />

                <strong><a href="https://mainnet.events/" style={{ color: 'black', textDecoration: 'none' }}>✅ Messari Mainnet</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Unveiling insights and innovations in the crypto world.</span><br /><br />

                <strong><a href="https://www.bitcoin2024.com/" style={{ color: 'black', textDecoration: 'none' }}>✅ Bitcoin 2024</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Shaping the future of Bitcoin and cryptocurrency.</span><br /><br />

                <strong><a href="https://www.ethmiami.com/" style={{ color: 'black', textDecoration: 'none' }}>✅ ETH Miami</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Celebrating Ethereum's impact on the tech world.</span><br /><br />

                <strong><a href="https://2022.tabconf.com/" style={{ color: 'black', textDecoration: 'none' }}>✅ The Atlanta Bitcoin Conference</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Exploring Bitcoin's potential and applications.</span><br /><br />

                <strong><a href="https://solana.com/breakpoint" style={{ color: 'black', textDecoration: 'none' }}>✅ Solana Breakpoint</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Discovering Solana's breakthroughs in blockchain.</span><br /><br />

                <strong><a href="https://www.parisblockchainweek.com/" style={{ color: 'black', textDecoration: 'none' }}>✅ Paris Blockchain Week</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Showcasing the Parisian blockchain ecosystem.</span><br /><br />

                <strong><a href="https://cosmoverse.org/" style={{ color: 'black', textDecoration: 'none' }}>✅ Cosmosverse 2023</a></strong><br />
                <span style={{ marginBottom: '10px' }}>Exploring the cosmos of decentralized networks.</span><br /><br />

                <strong><a href="https://websummit.com/" style={{ color: 'black', textDecoration: 'none' }}>✅ WebSummit</a></strong><br />
                <span style={{ marginBottom: '10px' }}>The global technology conference of the year.</span><br /><br />

                <div style={{ textAlign: 'center', marginTop: '80px', marginBottom: '80px' }}>

                  <a href="https://form.jotform.com/232825336471053" class="rounded-lg py-4 px-6 font-semibold font-inter transition duration-500 bg-benorange-500 hover:bg-benblack-500 text-white hidden-on-scroll text-center py-3 rounded-lg">Apply Now</a>


                </div>

              </p>


            </div>








            <div style={{ marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              <strong style={{ fontSize: '24px', display: 'block', marginTop: '26', marginBottom: '26px', textAlign: 'center' }}>🤝 Networking</strong>
              <p style={{ fontSize: '18px', lineHeight: '1.5', textAlign: 'left' }}>
                ✅ Access to a global community of blockchain enthusiasts<br />
                ✅ Online discussions about AI, NFTs, day trading, and more...<br />
                ✅ Opportunities to share your project<br />
                ✅ Get feedback, mentorship, investors, and co-founders<br />
              </p>
            </div>

            <div style={{ marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              <strong style={{ fontSize: '24px', display: 'block', marginBottom: '16px', textAlign: 'center' }}> 📚 Resources</strong>
              <p style={{ fontSize: '18px', lineHeight: '1.5', textAlign: 'left' }}>
                ✅ Guides,and resources<br />
                ✅ Airdrop alerts and job listings<br />
              </p>
            </div>

            <div style={{ fontSize: '18px', marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
              div>

              <strong style={{ fontSize: '24px', display: 'block', marginBottom: '16px', textAlign: 'center' }}> 📈 Market Analysis</strong>
              <p style={{ lineHeight: '1.5', textAlign: 'left' }}>
                ✅ Exclusive insights from industry experts<br />
                ✅ Deep dive analysis on specific projects<br />
                <br />
              </p>
              <h2 style={{ marginTop: '40px', marginBottom: '30px', fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>
                💼 Your Network is Your Net Worth
              </h2>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/5V9Jb6SXDEc?autoplay=1&mute=0"
                style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              ></iframe>





              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}>
                <strong>Attending conferences is a game-changer.</strong> Aspiring entrepreneurs and investors gain invaluable insights.
              </p>

              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong>Events serve as knowledge nexuses,</strong> highlighting trends and best practices in angel investing.
              </p>

              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong>Networking opportunities abound</strong> connecting attendees with industry leaders and potential partners.
              </p>

              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong>For startups, these gatherings are goldmines</strong> leading to potential funders and strategic collaborations.
              </p>




              <strong style={{ fontSize: '24px', display: 'block', marginTop: '30px', marginBottom: '19px', textAlign: 'center' }}> 🗣️ What our members say?</strong>

              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/tbchiByUSm0?autoplay=1&mute=0"
                style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              ></iframe>

              <div style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong>Ramiro</strong>, a visionary from Argentina, was introduced to the transformative power of Bitcoin during a time of economic uncertainty in his homeland.
              </div>

              <div style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Driven by a passion for change and a belief in the potential of decentralized technologies, he ventured into the world of cryptocurrency, seeking innovative solutions to traditional financial challenges.
              </div>

              <div style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                It was during this exploration that he encountered the <strong>Blockchain Education Network (BEN)</strong>. This association with BEN became a turning point in his journey. Through BEN, Ramiro was exposed to a global community of blockchain enthusiasts, educators, and innovators.
              </div>

              <div style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                The network and resources provided by BEN empowered him, broadening his horizons and offering opportunities to collaborate on groundbreaking projects.
              </div>

              <div style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Today, Ramiro attributes a significant part of his success in the crypto realm to the foundation and connections he built through BEN.
              </div>


              <iframe
                width="560"
                height="315"
                src="https://youtube.com/embed/6hfJ2fRQTYc?autoplay=1&mute=0"
                style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video">
              </iframe>



              <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong>Alex Kim</strong>, once a young individual, discovered Bitcoin and blockchain's potential in high school.
              </p>


              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                At Bentley University, he delved deeper into these technologies, becoming known as "Crypto Kim".
              </p>

              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                During his time at Bentley, he encountered the <strong>Blockchain Education Network (BEN)</strong>. This association was a pivotal moment, connecting him to an international community.
              </p>

              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Through <strong>BEN</strong>, Alex fortified his network and embraced the importance of borderless education, amplifying his impact in the blockchain realm.
              </p>



            </div>

            <div style={{ fontSize: '18px', marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
              div>


              <iframe
                width="560"
                height="315"
                src="https://youtube.com/embed/4jTahwUdupE?autoplay=1&mute=0"
                style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video">
              </iframe>

              <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong style={{ color: 'black' }}>"Initially intrigued by the vast potential of blockchain, my involvement with  BEN solidified my belief in the power of education within the crypto space."</strong>
              </p>



              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                "Through BEN I not only deepened my knowledge but also connected with influential figures in the industry, opening doors to internships and potential job roles."
              </p>

              <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <strong style={{ color: 'black' }}> "The organization's commitment to fostering a knowledgeable community resonated deeply with me, emphasizing the importance of education in driving mass adoption of blockchain.

                </strong>
              </p>

              <iframe
                width="560"
                height="315"
                src="https://youtube.com/embed/dvBxuupurK0?autoplay=1&mute=0"
                style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video">
              </iframe>


              <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Zardo, an entrepreneurship student from UCL, attended the DeFi Live conference courtesy of <strong>BEN</strong>. This experience not only <strong>enriched his understanding</strong> of the DeFi and NFT landscapes but also <strong>expanded his professional network</strong>. He emphasizes the pivotal role of events like these in <strong>nurturing the blockchain domain</strong>, showcasing BEN's <strong>commitment to bridging education with real-world opportunities</strong>.
              </p>







              <p style={{ lineHeight: '1.5', textAlign: 'left' }}>



                <iframe
                  width="560"
                  height="315"
                  src="https://youtube.com/embed/L1-yHKLctzM?mute=0"
                  style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video">
                </iframe>

                <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  "At the end of the day, <strong>BEN is all about networking</strong>."
                </p>

                <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  "If it wasn't for joining BEN with George and Ben Young, I wouldn't be where I am. Because of BEN, I met key figures like Ashen, Antonio, and Eric."
                </p>

                <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  "Now, I feel like I have a <strong>family in the blockchain space</strong>, a crucial support system in a challenging domain."
                </p>

                <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  "I'm confident that I can reach out to these connections whenever I face an issue, knowing they'll assist. <strong>It truly feels like a family</strong>, making the blockchain journey much more navigable and enriching."
                </p>

                <iframe
                  width="560"
                  height="315"
                  src="  https://youtube.com/embed/Q4SeEx_Hqkc?mute=0"
                  style={{ border: 'none', width: '100%', maxWidth: '100%' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video">
                </iframe>

                <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <strong>Timing is pivotal in venture capital.</strong> Early investments can lead to exponential returns.
                </p>

                <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <strong>Our Director Antonio knows this firsthand.</strong> He was among the first to explore Sam Altman's Worldcoin in Lisbon at an ETH Global event.
                </p>

                <p style={{ marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  <strong>Such early access is invaluable.</strong> It offers LPs the potential returns they seek, positioning the fund at the forefront of venture capital innovation.
                </p>


                <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Ever since, our alumni have founded some of the most valuable companies in the space:
                </p>



                <p style={{ marginTop: '20px', marginBottom: '20px', fontSize: '18px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', fontWeight: 'bold' }}>
                  BEN has created over a billion dollars in value from its network. Our aim is to create and capture even more value in the decade to come.
                </p>

                <h3 style={{ marginTop: '20px', marginBottom: '20px', fontSize: '20px', textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
                  🌱 Projects Our Alumni Has Founded
                </h3>





                <div

                  style={{ maxWidth: '600px', margin: '0 auto' }}>
                  <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <strong>
                      <a
                        href="https://www.optimism.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'none', textDecoration: 'underline' }}
                      >
                        Optimism
                      </a>
                    </strong> is an Ethereum-based decentralized infrastructure platform
                    allowing for instant transactions and scalable smart contracts.
                    (Market Cap: ~1.1Bil)
                  </p>

                  <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <strong>
                      <a
                        href="https://www.injectiveprotocol.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'none', textDecoration: 'underline' }}
                      >
                        Injective Protocol (INJ)
                      </a>
                    </strong> is a decentralized exchange (DEX) protocol offering features
                    like cross-chain margin trading, derivatives, Forex (FX), synthetics, and
                    futures trading. (Market Cap: ~650Mil)
                  </p>

                  <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <strong>
                      <a
                        href="https://bolt.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'none', textDecoration: 'underline' }}
                      >
                        Bolt
                      </a>
                    </strong> develops a checkout experience platform assisting retailers in
                    converting and retaining more shoppers. Bolt raised $355 million at an $11 billion valuation from investors including BlackRock.
                  </p>

                  <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <strong>
                      <a
                        href="https://www.tryroll.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'none', textDecoration: 'underline' }}
                      >
                        Roll
                      </a>
                    </strong> is a social token infrastructure for the creator economy,
                    enabling users to earn, redeem, send, and trade social tokens across the
                    internet.
                  </p>

                  <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <strong>
                      <a
                        href="https://www.iota.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'none', textDecoration: 'underline' }}
                      >
                        IOTA
                      </a>
                    </strong> is a unique distributed ledger, using Tangle instead of
                    blockchain, where nodes confirm transactions. (Market Cap: ~3B)
                  </p>

                  <p style={{ marginBottom: '20px', fontSize: '18px' }}>
                    <strong>
                      <a
                        href="https://www.augur.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'none', textDecoration: 'underline' }}
                      >
                        Augur
                      </a>
                    </strong> is a decentralized prediction market on the Ethereum blockchain,
                    enabling users to stake digital assets on real-world event outcomes. (Market Cap: ~472Mil)
                  </p>
                </div>












                <p style={{ marginTop: '40px', marginBottom: '20px', fontSize: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                  Don't miss your chance to be part of an exclusive network driving the next big wave in innovation
                </p>


                <div style={{ textAlign: 'center', marginTop: '80px', marginBottom: '100px' }}>

                  <a href="https://form.jotform.com/232825336471053" class="rounded-lg py-4 px-6 font-semibold font-inter transition duration-500 bg-benorange-500 hover:bg-benblack-500 text-white hidden-on-scroll text-center py-3 rounded-lg">Apply Now</a>


                </div>

{/*
                <p class="font-inter text-center text-lg mb-4">
                  Interested in investing with us?
                </p>


                <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '100px' }}>
                  <a href="https://angellist.com/i/uwiDb-u" class="rounded-lg py-4 px-6 font-semibold font-inter transition duration-500 bg-black hover:bg-black hover:text-white text-white text-center py-3 rounded-lg">
                    Invest Now
                  </a>
                </div>
*/}



                <img src="/images/featuredin.png" alt="Description of Image" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '86px auto' }} />

              </p>


            </div>







          </p>



        </div>

      </section >

      <Footer />

    </div >
  )
}
