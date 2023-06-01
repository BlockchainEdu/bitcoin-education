import Footer from '../components/footer';
import Header from '../components/header';
import Head from "next/head";
import PricingModule from '../components/pricingModule';

export default function Join() {
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
            <p className="text-lg mb-8">Get exclusive courses, a premium community, and guided mentorship.</p>
            <a href="#pricingmodule" className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg uppercase tracking-wide hover:bg-gray-500" onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("pricingmodule");
              const offsetTop = section.offsetTop - 120;
              window.scrollTo({ top: offsetTop, behavior: "smooth" });
            }}>Join Now</a>
          </div>
        </div>
      </section>

      <section id="mission" className="py-16">
        <div className="container mx-auto px-4 lg:w-1/2 mb-4">
          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/universities2.avif" alt="Universities" className="mx-auto" />
          </a>
        </div>
        <div className="container mx-auto px-4 lg:w-7/12">
          <img src="/images/frase2_copy.avif" alt="mission" className="mx-auto mb-4" />
          <div className="text-2xl">We are on a mission to provide borderless blockchain education and to spur blockchain adoption by empowering members to learn about blockchain, ask questions, and ultimately get a job or start a company in the space.</div>
        </div>
      </section>

      <section id="student-images" className="py-8">
        <div className="container mx-auto px-4 lg:w-1/2">

          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/foto2_copy.avif" alt="Image" className="mx-auto my-8" />
          </a>

          <div className="text-2xl">
            Since the launch of Bitcoin in 2009, a new asset class emerged, leading to an increase in demand for blockchain education, from coding to business applications.
          </div>

          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/foto3_copy.avif" alt="Image" className="mx-auto my-8" />
          </a>

          <div className="text-2xl">
            Students, graduates, and dropouts of all ages, countries and different regions of the world have joined BEN to further their knowledge and network.
          </div>

          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/foto4_copy.avif" alt="Image" className="mx-auto my-8" />
          </a>

          <div className="text-2xl">
            With hundreds of educational resources available, we are here to help you to find your talent in Web3 and own it!
          </div>

        </div>
      </section>

      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4">
            <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/frase3_copy.avif" alt="Image" className="mx-auto mb-4" />
          </a>

          <h2 className="text-3xl font-bold my-8 text-center">Weekly Market Reports</h2>
          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/join-desenho4_copy.avif" alt="Image" className="mx-auto mb-4" />
          </a>
          <div className="container mx-auto px-4 lg:w-7/12">
            <ul className="text-2xl list-none orange-bullets">
              <li>Access to <b>exclusive insights</b> and <b>analysis</b> from industry experts.</li>
              <li>Actionable tips and strategies to <b>enhance your skills</b> and stay ahead.</li>
              <li><b>In-depth research</b> and reports on the <b>latest trends</b> and opportunities.</li>
            </ul>
          </div>
        </div>
      </section>



      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Member Only Discord</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-12 gap-8 lg:w-12/12">

            <div className="bg-white rounded-lg p-6">
            <ul className="text-2xl list-none orange-bullets">
              <li>Join <b>online discussions</b> and <b>get answers</b> to your top questions.</li>
              <li>Get <b>event promo codes</b>, and meet up with like-minded individuals.</li>
              <li>Browse <b>job listings</b> and get warm intros to in-demand positions.</li>
              <li>Meet <b>co-founders</b> and <b>investors</b> for your startup.</li>
            </ul>
          </div>

            <div className="bg-white rounded-lg">
          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/join-gif.avif" alt="Image" className="mx-auto lg:w-2/3" />
          </a>
          </div>

          </div>
        </div>
      </section>


      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Blockchain Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6">
              <a href="#pricingmodule" onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("pricingmodule");
                const offsetTop = section.offsetTop - 120;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
              }}>
                <img src="/images/join-gif1.avif" alt="Image" className="mx-auto mb-4" />
              </a>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">On-demand video coursess</h3>
              <ul className="text-2xl list-none orange-bullets">
                <li>Bitcoin & Basics</li>
                <li>Blockchain Development</li>
                <li>Blockchain Fundamentals</li>
                <li>Buying Land in the Metaverse</li>
                <li>Crypto Investing & Marketing Basics</li>
                <li>DeFi Basics</li>
                <li>Ethereum & Smart Contracts Basics</li>
                <li>Intro to The Sandbox</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="free trial" className="py-16">
        <div className="container mx-auto px-4 lg:w-1/2 mb-4">
          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
          <img src="/images/frase5_copy.avif" alt="Free Trial" className="mx-auto" />
          <div className="text-2xl mt-4 text-center">
            Yes, we offer a 7 day free trial!
          </div>
        </a>
      </div>
    </section>

{/*
  <section id="video-testimonials" className="py-4">
    <div className="container mx-auto px-4 lg:w-1/2 mb-4">
      <img src="/images/frase6_copy.avif" />
      <div className="video-wrapper my-8">
        <iframe
          width="560"
          height="315"
          src="https://youtube.com/embed/vIvjTFelurc"
          title="YouTube Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="video-wrapper my-8 mx-auto">
        <iframe
          width="560"
          height="315"
          src="https://youtube.com/embed/oAbP3leivjk"
          title="YouTube Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
</section>
*/}
    <section id="start-a-new" className="py-0">
      <div className="container mx-auto px-4 lg:w-1/2 mb-4">
        <div className="text-4xl font-bold">Start a <span className="text-orange">new career</span> and create <span className="text-orange">wealth</span> & <span className="text-orange">financial freedom!</span></div>
        <img src="/images/galera.avif"/>
      </div>
    </section>

      <section id="featured-in" className="py-16">
        <div className="container mx-auto px-4 lg:w-1/2 mb-4">
          <img src="/images/frase7_copy.avif" alt="As Featured In" className="mx-auto" />
          <a href="#pricingmodule" onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("pricingmodule");
            const offsetTop = section.offsetTop - 120;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
          }}>
            <img src="/images/logoos.avif" alt="Press Logos" className="mx-auto" />
          </a>
        </div>
      </section>

      <section className="pb-16">
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
  );
}
