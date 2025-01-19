import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head";
import Image from 'next/image';

export default function IbizaHackerHouse() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Ibiza Hacker House | Build the Future</title>
      </Head>

      <section className="pt-10 lg:py-10 lg:pb-0 px-0">

        <div className="w-11/12 lg:w-7/12 mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10" style={{ maxWidth: "1200px" }}>

          {/* Hero Section */}
          <h2 className="text-3xl font-bold text-center">Where Visionaries Build the Future in Ibiza</h2>
          <p className="text-center">An Exclusive Mastermind Retreat for Web3’s Top Founders</p>
          <div className="flex justify-center">
            <a href="#apply" className="px-4 py-2 bg-benorange-500 text-white rounded-md">Apply Now</a>
          </div>

          {/* About Section */}
          <h2 className="text-2xl font-bold">Why Ibiza?</h2>
          <p>This island has always been a meeting place for creativity and forward-thinking ideas. From the Winklevoss twins first learning about Bitcoin to the early concepts for EOS and Polkadot taking shape here, Ibiza has a quiet history of fostering innovation. It’s a space to think differently, surrounded by natural beauty and inspiration.</p>
          <div className="flex justify-center">
            <a href="#apply" className="px-4 py-2 bg-benorange-500 text-white rounded-md">Apply Now</a>
          </div>

          {/* Experience Section */}
          <h2 className="text-2xl font-bold">Your Stay at the Ibiza Hacker House</h2>
          <p>Tucked in the heart of Sant Antoni de Portmany, this Mediterranean villa offers the perfect environment to reflect, collaborate, and co-create. The villa’s design and amenities are crafted to support both deep focus and relaxation.</p>
          <ul className="list-disc pl-5">
            <li>14 Bedrooms, including a Penthouse and 8 Suites</li>
            <li>Outdoor Pool and Sauna</li>
            <li>Boho-styled decor inspired by Ibiza’s vibrant culture</li>
            <li>Proximity to Cala Salada beach and local agriculture valleys</li>
            <li>On-site chef and housekeeping upon request</li>
          </ul>
          <div className="flex justify-center">
            <a href="#apply" className="px-4 py-2 bg-benorange-500 text-white rounded-md">Apply Now</a>
          </div>

          {/* Purpose Section */}
          <h2 className="text-2xl font-bold">Build. Collaborate. Accelerate.</h2>
          <p>The Ibiza Hacker House brings together founders from Dropout Capital’s portfolio to share ideas, refine strategies, and build impactful projects. It’s not just a retreat—it’s a chance to be part of something bigger.</p>
          <ul className="list-disc pl-5">
            <li>Accelerate your project’s growth.</li>
            <li>Collaborate with a like-minded community of builders.</li>
            <li>Envision new possibilities and co-create meaningful solutions.</li>
          </ul>
          
          {/* Testimonials Section */}
          <h2 className="text-2xl font-bold">What Past Founders Are Saying</h2>
          <blockquote>“The Ibiza Hacker House gave us the space and connections to move from concept to execution in record time.” — Founder, XYZ Protocol</blockquote>
          <blockquote>“The mix of collaboration and focus made this experience unforgettable. The community we built continues to push our project forward.” — Founder, ABC Network</blockquote>
          <div className="flex justify-center">
            <a href="#apply" className="px-4 py-2 bg-benorange-500 text-white rounded-md">Apply Now</a>
          </div>

          {/* Apply Section */}
          <h2 id="apply" className="text-2xl font-bold">Ready to Be Part of Something Big?</h2>
          <p>This isn’t just an event—it’s a moment to connect with peers, refine your vision, and build the future of digital assets. Join us at the Ibiza Hacker House to be part of this journey.</p>
          <div className="flex justify-center">
            <a href="#" className="px-4 py-2 bg-benorange-500 text-white rounded-md">Apply Now</a>
          </div>

        </div>

      </section>
      <Footer />
    </div>
  );
}
