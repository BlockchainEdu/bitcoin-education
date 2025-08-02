import Footer from "../components/footer";
import Header from "../components/header";
import Head from "next/head";

import { useCallback, useRef } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function VolunteerPage() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const rolesRef = useRef(null);

  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Volunteer with BEN | Make an Impact</title>
        <script src="https://cdn.lordicon.com/lordicon.js" defer />
      </Head>

      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-center bg-cover flex items-center justify-center">
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0 z-0"
          options={{
            fullScreen: false,
            background: { color: "#00000000" },
            particles: {
              number: { value: 100 },
              size: { value: 2 },
              move: { enable: true, speed: 0.5 },
              opacity: { value: 0.3 },
              links: {
                enable: true,
                distance: 100,
                color: "#fff",
                opacity: 0.7,
              },
              color: { value: "#ff7a00" },
            },
          }}
        />

        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 backdrop-blur-[2px] bg-white/2 rounded-lg p-10 text-center max-w-3xl shadow-[0_4px_60px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,122,0,0.3)] transition-shadow duration-700">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white drop-shadow-sm">
            Volunteer with BEN
          </h1>
          <p className="text-white/90 text-lg mt-4 drop-shadow-sm">
            Be part of the movement that’s shaping global blockchain education.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                rolesRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block px-6 py-3 bg-benorange-500 text-white rounded-full font-semibold hover:bg-benorange-400 transition"
            >
              See Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section ref={rolesRef} id="roles" className="bg-black py-10 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">
            Open Volunteer Roles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[1, 2, 3, 4, 5, 6].map((_, idx) => (
              <div
                key={idx}
                className="relative group bg-white/5 backdrop-blur-md border border-white/0 rounded-3xl p-10 shadow-[0_4px_30px_rgba(255,255,255,0.05)] hover:shadow-[0_6px_40px_rgba(255,255,255,0.2)] transition duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-10 transition duration-300 rounded-3xl pointer-events-none" />
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
                  <lord-icon
                    src={item.iconSrc}
                    trigger="hover"
                    colors="primary:#fff3ea,secondary:#FF872B"
                    style={{ width: "50px", height: "50px" }}
                  />
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

      {/* Final */}
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
