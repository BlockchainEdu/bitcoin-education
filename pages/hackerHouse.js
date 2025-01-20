import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head";
import ImageSlider from "../components/imageSlider";

export default function IbizaHackerHouse() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Ibiza Hacker House | Build the Future</title>
      </Head>

      {/* Hero Section */}
      <section
        className="relative bg-benorange-500 h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: "url('/images/hackerhouse/house.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Section Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase font-light text-white tracking-widest">
            IBIZA HACKER HOUSE
          </p>

          <h1 className="text-4xl lg:text-5xl font-black text-white leading-snug">
            Where Visionaries Build the Future in Ibiza
          </h1>
          <p className="text-white text-lg mt-4">
            An Exclusive Mastermind Retreat for Web3’s Top Founders
          </p>
          <div className="mt-6">
            <button className="bg-benorange-500 text-white font-bold py-3 px-6 rounded-full hover:bg-benorange-400 transition">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-14 px-7">
        <div className="max-w-7xl m-auto text-center">
          <h2 className="text-4xl font-black text-benblack-500">Why Ibiza?</h2>
          <p className="text-benblack-500 text-lg mt-6">
            This island has always been a meeting place for creativity and
            forward-thinking ideas. From the Winklevoss twins first learning
            about Bitcoin to the early concepts for EOS and Polkadot taking
            shape here, Ibiza has a quiet history of fostering innovation. It’s
            a space to think differently, surrounded by natural beauty and
            inspiration.
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="#apply"
              className="px-6 py-3 bg-benorange-500 text-white rounded-full"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-benorange-300 py-14 px-7">
        <div className="max-w-7xl m-auto flex flex-col lg:flex-row items-center lg:items-start">
          <div className="w-full lg:w-6/12 ml-10 mr-10">
            <h2 className="text-3xl font-black text-benblack-500 text-center lg:text-left">
              Your Stay at the Ibiza Hacker House
            </h2>
            <p className="text-bengrey-400 text-center lg:text-left text-lg mt-6 mb-6">
              Tucked in the heart of Sant Antoni de Portmany, this Mediterranean
              villa offers the perfect environment to reflect, collaborate, and
              co-create. The villa’s design and amenities are crafted to support
              both deep focus and relaxation.
            </p>
            <ul className="text-bengrey-400 font-mont font-medium text-md mt-10 space-y-4 max-w-4xl lg:max-w-none m-auto lg:m-0">
              <li>• 14 Bedrooms, including a Penthouse and 8 Suites</li>
              <li>• Outdoor Pool and Sauna</li>
              <li>• Boho-styled decor inspired by Ibiza’s vibrant culture</li>
              <li>
                • Proximity to Cala Salada beach and local agriculture valleys
              </li>
              <li>• On-site chef and housekeeping upon request</li>
            </ul>
            <div className="flex justify-center lg:justify-start mt-6">
              <a
                href="#apply"
                className="px-6 py-3 bg-white text-benorange-500 rounded-full"
              >
                Apply Now
              </a>
            </div>
          </div>

          <div className="w-full lg:w-6/12 mt-20 lg:mt-20 ml-10 mr-10">
            <ImageSlider />
          </div>
        </div>
      </section>
      {/* Purpose Section */}
      <section className="bg-white py-14 px-7">
        <div className="max-w-7xl m-auto text-center">
          <h2 className="text-4xl font-black text-benblack-500">
            Build. Collaborate. Accelerate.
          </h2>
          <p className="text-benblack-500 text-lg mt-8">
            The Ibiza Hacker House brings together founders from Dropout
            Capital’s portfolio to share ideas, refine strategies, and build
            impactful projects. It’s not just a retreat—it’s a chance to be part
            of something bigger.
          </p>
          <div className="mt-10 space-y-8 max-w-4xl m-auto">
            {/* Check icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-benorange-500 text-white flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-benblack-500 mt-4">
                Accelerate your project’s growth.
              </h3>
              <p className="text-benblack-300 mt-2">
                Push your ideas forward with clarity, speed, and impactful
                strategies.
              </p>
            </div>

            {/* Community icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-benorange-500 text-white flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-benblack-500 mt-4">
                Collaborate with a like-minded community of builders.
              </h3>
              <p className="text-benblack-300 mt-2">
                Connect, share, and create with innovators who share your
                vision.
              </p>
            </div>

            {/* Idea icon */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-benorange-500 text-white flex items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-benblack-500 mt-4">
                Envision new possibilities and co-create meaningful solutions.
              </h3>
              <p className="text-benblack-300 mt-2">
                Explore innovative ideas and turn them into actionable outcomes.
              </p>
            </div>
          </div>

          <p className="text-benblack-500 text-lg mt-12 italic pl-5">
            Here, inspiration flows naturally — from conversations with peers to
            the serene surroundings of the villa.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-benorange-500 py-14 px-7">
        <div className="max-w-7xl m-auto">
          <h2 className="text-4xl font-black text-white text-center">
            What Past Founders Are Saying
          </h2>
          <div className="mt-6 space-y-8">
            <blockquote className="text-white text-lg italic text-center">
              “The Ibiza Hacker House gave us the space and connections to move
              from concept to execution in record time.” <br />
              <span className="font-bold">— Founder, XYZ Protocol</span>
            </blockquote>
            <blockquote className="text-white text-lg italic text-center">
              “The mix of collaboration and focus made this experience
              unforgettable. The community we built continues to push our
              project forward.” <br />
              <span className="font-bold">— Founder, ABC Network</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="bg-white py-14 px-7">
        <div className="max-w-7xl m-auto text-center">
          <h2 className="text-4xl font-black text-benblack-500">
            Ready to Be Part of Something Big?
          </h2>
          <p className="text-benblack-500 text-lg mt-6">
            This isn’t just an event—it’s a moment to connect with peers, refine
            your vision, and build the future of digital assets.
          </p>
          <div className="flex justify-center mt-6">
            <a
              href="#"
              className="px-6 py-3 bg-benorange-500 text-white rounded-full"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
