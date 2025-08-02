import Footer from "../components/footer";
import Header from "../components/header";
import Head from "next/head";
import Script from "next/script";
import { useRef } from "react";

export default function VolunteerPage() {
  const rolesRef = useRef(null);

  const renderLordIcon = (item) =>
    typeof window !== "undefined" && (
      <lord-icon
        src={item.iconSrc}
        trigger="hover"
        colors="primary:#fff3ea,secondary:#FF872B"
        style={{ width: "50px", height: "50px" }}
      />
    );

  return (
    <div className="overflow-hidden">
      <Header />

      <Head>
        <title>Volunteer with BEN | Make an Impact</title>
      </Head>

      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="beforeInteractive"
      />

      {/* Hero Section */}
      <section className="relative h-[90vh] bg-black overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/generation-blockchain.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 h-full flex flex-col justify-between items-center py-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-sm">
            Volunteer with BEN
          </h1>
        </div>
      </section>

      {/* Roles Section */}
      <section
        ref={rolesRef}
        id="roles"
        className="bg-benorange-500 py-10 px-6"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">
            Open Volunteer Roles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <div
                key={idx}
                className="relative group bg-black border border-white/5 rounded-3xl p-10 overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:bg-neutral-900 hover:border-white/10"
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute top-0 left-[-75%] w-[200%] h-full transform rotate-12 bg-white/10 blur-lg opacity-0 group-hover:opacity-20 group-hover:animate-light-swipe" />
                </div>

                <h3 className="text-lg font-semibold mb-2 text-white drop-shadow-sm">
                  Volunteer Role #{idx + 1}
                </h3>
                <p className="text-white/80 text-sm mb-5 leading-relaxed">
                  A short description of this position and why it matters to the
                  mission.
                </p>
                <a
                  href="https://example.com/apply"
                  className="inline-block px-5 py-2 rounded-xl font-semibold text-xs tracking-wide text-white bg-benorange-500 transition-all duration-300 hover:text-white hover:bg-benorange-500 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="pt-20 pb-32 px-10 bg-[#000] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-20 drop-shadow-sm">
            What You’ll Gain Volunteering with BEN
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                iconSrc: "https://cdn.lordicon.com/ssdupzsv.json",
                title: "Hands-On Experience",
                text: "Work directly on blockchain education initiatives and real-world projects.",
              },
              {
                iconSrc: "https://cdn.lordicon.com/kndkiwmf.json",
                title: "Global Network",
                text: "Connect with pioneers, mentors, and fellow builders in the Web3 space.",
              },
              {
                iconSrc: "https://cdn.lordicon.com/tyounuzx.json",
                title: "Career Momentum",
                text: "Develop skills that open doors in Web3, DAOs, and emerging tech careers.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group bg-white/10 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-10 transition duration-300 rounded-3xl pointer-events-none" />
                <div className="mb-4 flex justify-center">
                  {renderLordIcon(item)}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-sm">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="bg-benorange-500 py-16 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
        <p className="text-lg mb-6">
          Whether you see a perfect fit or not, we’d love to hear how you want
          to contribute.
        </p>
        <a
          href="https://example.com/contact"
          className="inline-block px-8 py-3 bg-white text-benorange-500 font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </section>

      <Footer />
    </div>
  );
}
