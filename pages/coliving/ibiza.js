import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ImageSlider from "../../components/imageSlider";

const FEATURES = [
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "14 Bedrooms",
    desc: "Including a penthouse and 8 private suites with Mediterranean views",
  },
  {
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    title: "Pool & Sauna",
    desc: "Outdoor infinity pool and private sauna for downtime between build sessions",
  },
  {
    icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 16.546m18-3c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 13.546M21 10.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 10.546",
    title: "Cala Salada Beach",
    desc: "Minutes from one of Ibiza's most stunning coves and agriculture valleys",
  },
  {
    icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
    title: "Full Service",
    desc: "On-site chef, housekeeping, and concierge available on request",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Builder Community",
    desc: "Curated cohort of 12-16 founders, engineers, and operators shipping real products",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Boho-Styled Villa",
    desc: "Inspired by Ibiza's vibrant culture, designed for focus and creative flow",
  },
];

const SCHEDULE = [
  { time: "07:00 - 09:00", activity: "Sunrise surf / yoga / gym", type: "wellness" },
  { time: "09:00 - 09:30", activity: "Breakfast together", type: "social" },
  { time: "09:30 - 13:00", activity: "Deep work block", type: "work" },
  { time: "13:00 - 14:00", activity: "Lunch + lightning talks", type: "social" },
  { time: "14:00 - 18:00", activity: "Build sprint / 1-on-1 mentoring", type: "work" },
  { time: "18:00 - 19:30", activity: "Pool / beach / free time", type: "wellness" },
  { time: "19:30 - 21:00", activity: "Dinner + fireside chat", type: "social" },
  { time: "21:00+", activity: "Optional hackathon / chill", type: "work" },
];

const TYPE_COLORS = {
  work: "#FF872A",
  social: "#3b82f6",
  wellness: "#10b981",
};

export default function IbizaColiving() {
  const router = useRouter();

  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Ibiza Co-Living — Builder Residency | BEN</title>
        <meta
          name="description"
          content="Join BEN's builder residency in Ibiza. A curated co-living experience for Web3 founders, engineers, and operators building the future."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/coliving/ibiza" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/coliving/ibiza" />
        <meta property="og:title" content="Ibiza Co-Living — Builder Residency | BEN" />
        <meta property="og:description" content="Curated builder residency in Ibiza. Apply to join the next cohort." />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)",
        }}
      >
        {/* Orange glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.07,
            background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.02,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 font-inter font-medium rounded-full mb-6"
            style={{
              fontSize: 12,
              padding: "7px 16px",
              color: "rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#FF872A" }} />
            Now accepting applications
          </div>

          <h1
            className="font-mont font-black"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "-0.04em",
              maxWidth: 700,
            }}
          >
            Build in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF872A, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ibiza
            </span>
          </h1>

          <p
            className="font-inter mt-4"
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 520,
              letterSpacing: "-0.01em",
            }}
          >
            A curated residency for builders and founders shipping real products.
            Mediterranean villa, world-class peers, zero distractions.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => router.push("/coliving/apply?location=ibiza")}
              className="font-mont font-bold text-white rounded-full transition"
              style={{
                padding: "14px 32px",
                fontSize: 15,
                backgroundColor: "#FF872A",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5771f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF872A")}
            >
              Apply Now
            </button>
            <button
              onClick={() => {
                document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
              }}
              className="font-mont font-bold rounded-full transition"
              style={{
                padding: "14px 32px",
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              See the Villa
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span
              className="font-inter"
              style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      {/* ── The Story ── */}
      <section className="py-20 px-7" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="font-inter font-medium uppercase mb-4"
            style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}
          >
            Why Ibiza
          </p>
          <h2
            className="font-mont font-black mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Where innovation has always found a home
          </h2>
          <p
            className="font-inter"
            style={{ fontSize: 17, lineHeight: 1.8, color: "#6e6e73", letterSpacing: "-0.01em" }}
          >
            This island has always been a meeting place for creativity and forward-thinking ideas.
            From the Winklevoss twins first learning about Bitcoin to the early concepts for EOS
            and Polkadot taking shape here, Ibiza has a quiet history of fostering innovation. Tucked
            in the heart of Sant Antoni de Portmany, this Mediterranean villa offers the perfect
            environment to reflect, collaborate, and co-create.
          </p>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="bg-white py-20 px-7">
        <div className="max-w-5xl mx-auto">
          <p
            className="font-inter font-medium uppercase mb-4 text-center"
            style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}
          >
            The Villa
          </p>
          <h2
            className="font-mont font-black text-center mb-14"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Everything you need to ship
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 transition-all duration-300"
                style={{
                  backgroundColor: "#fafafa",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-4"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "rgba(255,135,42,0.08)",
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    style={{ color: "#FF872A" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={f.icon} />
                  </svg>
                </div>
                <h3
                  className="font-mont font-bold mb-2"
                  style={{ fontSize: 16, color: "#1d1d1f", letterSpacing: "-0.01em" }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-inter"
                  style={{ fontSize: 14, lineHeight: 1.6, color: "#86868b" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="py-20 px-7" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-5xl mx-auto">
          <p
            className="font-inter font-medium uppercase mb-4 text-center"
            style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}
          >
            Gallery
          </p>
          <h2
            className="font-mont font-black text-center mb-10"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Your home for the month
          </h2>
          <div className="max-w-3xl mx-auto">
            <ImageSlider location="Ibiza" />
          </div>
        </div>
      </section>

      {/* ── Typical Day ── */}
      <section className="bg-white py-20 px-7">
        <div className="max-w-3xl mx-auto">
          <p
            className="font-inter font-medium uppercase mb-4 text-center"
            style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}
          >
            A Typical Day
          </p>
          <h2
            className="font-mont font-black text-center mb-12"
            style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            Structured for deep work
          </h2>
          <div className="space-y-3">
            {SCHEDULE.map((s) => (
              <div
                key={s.time}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <span
                  className="font-inter font-semibold flex-shrink-0"
                  style={{ fontSize: 13, color: "#86868b", width: 120, letterSpacing: "-0.01em" }}
                >
                  {s.time}
                </span>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: TYPE_COLORS[s.type],
                    flexShrink: 0,
                  }}
                />
                <span
                  className="font-inter font-medium"
                  style={{ fontSize: 15, color: "#1d1d1f", letterSpacing: "-0.01em" }}
                >
                  {s.activity}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
                <span
                  className="font-inter capitalize"
                  style={{ fontSize: 12, color: "#86868b" }}
                >
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden py-20 px-7"
        style={{
          background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.07,
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, #FF872A, transparent)",
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2
            className="font-mont font-black mb-4"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Ready to build from paradise?
          </h2>
          <p
            className="font-inter mb-8"
            style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}
          >
            Applications are reviewed on a rolling basis. We accept fewer than 20% of applicants
            to keep the cohort tight and the signal high.
          </p>
          <button
            onClick={() => router.push("/coliving/apply?location=ibiza")}
            className="font-mont font-bold text-white rounded-full transition"
            style={{ padding: "16px 40px", fontSize: 16, backgroundColor: "#FF872A" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5771f")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF872A")}
          >
            Apply Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
