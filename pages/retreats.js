import Footer from "../components/footer";
import Header from "../components/header";
import Head from "next/head";
import ImageSlider from "../components/imageSlider";

export default function Retreats() {
  const locations = [
    {
      name: "Ibiza",
      tagline: "Where Visionaries Build the Future in Ibiza",
      heroImage: "/images/hackerhouses/ibiza/house.avif",
      description:
        "This island has always been a meeting place for creativity and forward-thinking ideas. From the Winklevoss twins first learning about Bitcoin to the early concepts for EOS and Polkadot taking shape here, Ibiza has a quiet history of fostering innovation.",
      stayDescription:
        "Tucked in the heart of Sant Antoni de Portmany, this Mediterranean villa offers the perfect environment to reflect, collaborate, and co-create.",
      features: [
        "14 Bedrooms, including a Penthouse and 8 Suites",
        "Outdoor Pool and Sauna",
        "Boho-styled decor inspired by Ibiza's vibrant culture",
        "Proximity to Cala Salada beach and local agriculture valleys",
        "On-site chef and housekeeping upon request",
      ],
      applyLink: "https://t.me/cryptoniooo",
    },
    {
      name: "Ericeira",
      tagline: "Where Visionaries Build the Future in Ericeira",
      heroImage: "/images/hackerhouses/ericeira/main.jpeg",
      description:
        "Ericeira has always been a meeting place for creativity and forward-thinking ideas. Known as a world-class surf destination, this coastal town has become a hub for digital nomads and tech builders.",
      stayDescription:
        "Tucked along the coast of Ericeira, this seaside retreat offers the perfect environment to reflect, collaborate, and co-create.",
      features: [
        "14 Bedrooms, including a Penthouse and 8 Suites",
        "Outdoor Pool and Sauna",
        "Boho-styled decor inspired by Ericeira's vibrant culture",
        "Proximity to world-class surf breaks and local village charm",
        "On-site chef and housekeeping upon request",
      ],
      applyLink: "https://t.me/cryptoniooo",
    },
  ];

  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Retreats — Builder Residencies in Ibiza & Ericeira | BEN</title>
        <meta
          name="description"
          content="Join BEN's builder retreats in Ibiza and Ericeira. Exclusive hacker houses for Web3 founders to collaborate, build, and accelerate projects."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/retreats" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/retreats" />
        <meta property="og:title" content="Retreats — Builder Residencies in Ibiza & Ericeira | BEN" />
        <meta property="og:description" content="Exclusive hacker houses for Web3 founders. Collaborate, build, and accelerate in the Mediterranean." />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
      </Head>

      {/* Hero */}
      <section
        className="relative bg-black flex items-center justify-center text-center"
        style={{
          backgroundImage: `url('${locations[0].heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "85vh",
        }}
      >
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.55 }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="text-sm uppercase font-light text-white tracking-widest">
            BEN BUILDER RETREATS
          </p>
          <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mt-4">
            Where founders go
            <br />
            <span className="text-benorange-500">to build what's next.</span>
          </h1>
          <p className="text-white text-lg mt-4" style={{ opacity: 0.8 }}>
            Exclusive residencies for Web3 founders in Ibiza and Ericeira.
          </p>
          <div className="mt-8">
            <a
              href="https://t.me/cryptoniooo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-benorange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-benorange-400 transition inline-block"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="bg-white py-16 px-7">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-benblack-500 mb-6">
            Build. Collaborate. Accelerate.
          </h2>
          <p className="text-benblack-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Our hacker houses bring together founders to share ideas, refine
            strategies, and build impactful projects. It's not just a retreat
            — it's a launchpad.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: "M5 13l4 4L19 7",
                title: "Accelerate",
                desc: "Push your ideas forward with clarity, speed, and impactful strategies.",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
                title: "Connect",
                desc: "Meet builders who share your vision and are shipping real products.",
              },
              {
                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                title: "Create",
                desc: "Explore new possibilities and turn them into actionable outcomes.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-benorange-500 text-white flex items-center justify-center rounded-full mx-auto mb-4">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-benblack-500 mb-2">{item.title}</h3>
                <p className="text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location cards */}
      {locations.map((loc, idx) => (
        <div key={loc.name}>
          {/* Location hero */}
          <section
            className="relative flex items-center justify-center text-center"
            style={{
              backgroundImage: `url('${loc.heroImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "50vh",
            }}
          >
            <div className="absolute inset-0 bg-black" style={{ opacity: 0.5 }} />
            <div className="relative z-10 px-6">
              <h2 className="text-4xl lg:text-5xl font-black text-white">{loc.name}</h2>
              <p className="text-white text-lg mt-2" style={{ opacity: 0.85 }}>
                {loc.tagline}
              </p>
            </div>
          </section>

          {/* About + photos */}
          <section className={idx % 2 === 0 ? "bg-white py-14 px-7" : "py-14 px-7"} style={idx % 2 !== 0 ? { backgroundColor: "#FFFBF2" } : {}}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-black text-benblack-500 text-center lg:text-left">
                  Your Stay at the {loc.name} Hacker House
                </h3>
                <p className="text-bengrey-400 text-center lg:text-left text-lg mt-6 mb-6">
                  {loc.stayDescription}
                </p>
                <ul className="text-bengrey-400 font-mont font-medium text-md mt-6 space-y-3 max-w-lg mx-auto lg:mx-0">
                  {loc.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <div className="flex justify-center lg:justify-start mt-8">
                  <a
                    href={loc.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-benorange-500 text-white rounded-full font-bold transition hover:bg-benorange-400"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <ImageSlider location={loc.name} />
              </div>
            </div>
          </section>
        </div>
      ))}

      {/* Testimonials */}
      <section className="bg-benorange-500 py-14 px-7">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-8">
            What Past Founders Are Saying
          </h2>
          <div className="space-y-8">
            <blockquote className="text-white text-lg italic text-center">
              "The Hacker House gave us the space and connections to move from
              concept to execution in record time."
              <br />
              <span className="font-bold not-italic">— Founder, XYZ Protocol</span>
            </blockquote>
            <blockquote className="text-white text-lg italic text-center">
              "The mix of collaboration and focus made this experience
              unforgettable. The community we built continues to push our project
              forward."
              <br />
              <span className="font-bold not-italic">— Founder, ABC Network</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 px-7">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-benblack-500">
            Ready to Be Part of Something Big?
          </h2>
          <p className="text-benblack-500 text-lg mt-4 max-w-xl mx-auto">
            This isn't just a retreat — it's a moment to connect with peers,
            refine your vision, and build the future of digital assets.
          </p>
          <div className="flex justify-center mt-8">
            <a
              href="https://t.me/cryptoniooo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-benorange-500 text-white rounded-full font-bold transition hover:bg-benorange-400"
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
