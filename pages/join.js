import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Head from "next/head"
import PricingModule from '../components/pricingModule';

export default function Contact() {
    return (
        <div id="join-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Join | Blockchain Education Network</title>
            </Head>

            <section className="py-20 bg-blue-500 text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">Join BEN Learn</h1>
                        <p className="text-lg mb-8">Get exclusive insights, analysis, and tips delivered to your inbox every week.</p>
<a href="#pricingmodule" className="bg-white text-blue-500 font-bold py-3 px-8 rounded-full shadow-lg uppercase tracking-wide hover:bg-blue-400" onClick={(e) => {
  e.preventDefault();
  const section = document.getElementById("pricingmodule");
  const offsetTop = section.offsetTop;
  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}}>Join Now</a>
                        </div>
                </div>
            </section>
             <section id="benefits" className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-center">Weekly Market Reports</h2>
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
                            <h3 className="text-xl font-bold mb-4">Online Discussions</h3>
                            <p>Get answeres to your burning market questions.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">Events & Promo Codes</h3>
                            <p>#events channel to get promo codes, and meet up with like-minded individuals.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-xl font-bold mb-4">Job Matching and Intros</h3>
                            <p>Share job listings and get warm intros to in-demand positions.</p>
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