import Footer from '../components/footer';
import Header from '../components/header';
import Head from "next/head"
import PricingModule from '../components/pricingModule';

export default function Contact() {
    return (
        <div id="join-page">
            <Header />
            <Head>
                <title>Join | Blockchain Education Network</title>
            </Head>

            <section className="py-20 bg-black text-white mt-5">
                <div className="container mx-auto px-4">

                    <div className="max-w-3xl mx-auto text-center">
                        <img src="/images/ben_hat_white.png" alt="Image" className="mx-auto mb-4 w-28" />
                        <h1 className="text-4xl font-bold mb-6">Join BEN Learn</h1>
                        <p className="text-lg mb-8">Get exclusive insights, analysis, and tips delivered to your inbox every week.</p>
                        <a href="#pricingmodule" className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg uppercase tracking-wide hover:bg-gray-500" onClick={(e) => {
                            e.preventDefault();
                            const section = document.getElementById("pricingmodule");
                            const offsetTop = section.offsetTop - 120;
                            window.scrollTo({ top: offsetTop, behavior: "smooth" });
                          }}>Join Now</a>
                    </div>
                </div>
            </section>
             <section id="benefits" className="py-16">
                <div className="container mx-auto px-4">

                    <h2 className="text-3xl font-bold mb-8 text-center">Weekly Market Reports</h2>
<a href="#pricingmodule"  onClick={(e) => {
                            e.preventDefault();
                            const section = document.getElementById("pricingmodule");
                            const offsetTop = section.offsetTop - 120;
                            window.scrollTo({ top: offsetTop, behavior: "smooth" });
                          }}>
                        <img src="/images/join-desenho4_copy.avif" alt="Image" className="mx-auto mb-4" />
                    </a>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">Exclusive Insights</h3>
                            <p>Get access to exclusive insights and analysis from industry experts.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">Actionable Tips</h3>
                            <p>Receive actionable tips and strategies to enhance your skills and stay ahead.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">In-Depth Research</h3>
                            <p>Benefit from in-depth research and reports on the latest trends and opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>


            <section id="benefits" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Member Only Discord</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">Online/Offline Community</h3>
                            <p>Join online discussions and get answers to your burning market questions.</p>
                            <p>- Get event promo codes, and meet up with like-minded individuals.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">Job Matching and Investments</h3>
                            <ul>
                            <p>-Share job listings and get warm intros to in-demand positions.</p>
                            <p>-If you're working on a startup, meet co-founders and investors.'</p>
                            </ul>
                        </div>
<a href="#pricingmodule"  onClick={(e) => {
                            e.preventDefault();
                            const section = document.getElementById("pricingmodule");
                            const offsetTop = section.offsetTop - 120;
                            window.scrollTo({ top: offsetTop, behavior: "smooth" });
                          }}>
                    <img src="/images/join-gif.avif" alt="Image" className="mx-auto mb-4" />
                    </a>
                    </div>
                </div>
            </section>


            <section id="benefits" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Blockchain Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
<a href="#pricingmodule"  onClick={(e) => {
                            e.preventDefault();
                            const section = document.getElementById("pricingmodule");
                            const offsetTop = section.offsetTop - 120;
                            window.scrollTo({ top: offsetTop, behavior: "smooth" });
                          }}>
                    <img src="/images/join-gif1.avif" alt="Image" className="mx-auto mb-4" />
                    </a>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">On-demand video coursess</h3>
                        <ul>
                            <li>- Bitcoin & Basics</li>
                            <li>- Blockchain Development</li>
                            <li>- Blockchain Fundamentals</li>
                            <li>- Buying Land in the Metaverse</li>
                            <li>- Crypto Investing & Marketing Basics</li>
                            <li>- DeFi Basics</li>
                            <li>- Ethereum & Smart Contracts Basics</li>
                            <li>- Intro to The Sandbox</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div id="pricingmodule" className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Ready?</h2>
                </div>
                <PricingModule />

            </section>

    {/*
            <section className="py-16 bg-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">What Our Subscribers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="mb-4">"The premium newsletter has been a game-changer for me. The insights provided are invaluable."</p>
                        </div>
                    </div>
                </div>
            </section>
    */}

            <Footer />
        </div>
    )
}