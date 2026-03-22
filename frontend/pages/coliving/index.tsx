import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";

const LOCATIONS = [
  {
    name: "Ibiza",
    slug: "ibiza",
    tagline: "Mediterranean villa for builders",
    description: "14-bedroom villa in Sant Antoni de Portmany. Pool, sauna, on-site chef. Where Bitcoin and Polkadot ideas first took shape.",
    features: ["Pool & Sauna", "On-site Chef", "14 Bedrooms", "Near Cala Salada"],
    emoji: "ES",
  },
  {
    name: "Ericeira",
    slug: "ericeira",
    tagline: "Atlantic coast retreat for builders",
    description: "Seaside retreat in a UNESCO World Surfing Reserve. The epicenter of Europe's digital nomad and builder scene.",
    features: ["World-class Surf", "On-site Chef", "14 Bedrooms", "Nomad Hub"],
    emoji: "PT",
  },
];

export default function ColivingIndex() {
  const router = useRouter();

  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Co-Living — Builder Residencies | BEN</title>
        <meta
          name="description"
          content="Join BEN's curated builder residencies in Ibiza and Ericeira. Co-live, co-build, and accelerate with Web3 founders."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/coliving" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/coliving" />
        <meta property="og:title" content="Co-Living — Builder Residencies | BEN" />
        <meta property="og:description" content="Curated builder residencies in Ibiza and Ericeira for Web3 founders." />
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
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.07,
            background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)",
          }}
        />
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
            2 locations open
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
            Builder{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF872A, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Co-Living
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
            Curated residencies for founders and builders shipping real products.
            Small cohorts, high signal, zero tourists.
          </p>

          <div className="mt-10 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span
              className="font-inter"
              style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              Choose a location
            </span>
          </div>
        </div>
      </div>

      {/* ── Location Cards ── */}
      <section className="py-20 px-7" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.slug}
              onClick={() => router.push(`/coliving/${loc.slug}`)}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Color bar */}
              <div style={{ height: 4, background: "linear-gradient(135deg, #FF872A, #ffb347)" }} />

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-inter font-medium" style={{ fontSize: 12, color: "#86868b", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {loc.emoji}
                  </span>
                  <h2
                    className="font-mont font-black"
                    style={{ fontSize: 32, color: "#1d1d1f", letterSpacing: "-0.03em" }}
                  >
                    {loc.name}
                  </h2>
                </div>

                <p
                  className="font-inter font-medium mb-3"
                  style={{ fontSize: 15, color: "#FF872A", letterSpacing: "-0.01em" }}
                >
                  {loc.tagline}
                </p>

                <p
                  className="font-inter mb-6"
                  style={{ fontSize: 15, lineHeight: 1.6, color: "#6e6e73" }}
                >
                  {loc.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {loc.features.map((f) => (
                    <span
                      key={f}
                      className="font-inter font-medium rounded-full"
                      style={{
                        fontSize: 12,
                        padding: "6px 14px",
                        backgroundColor: "rgba(0,0,0,0.03)",
                        color: "#6e6e73",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <span
                  className="font-inter font-semibold inline-flex items-center gap-2"
                  style={{ fontSize: 14, color: "#FF872A" }}
                >
                  View details
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Apply CTA */}
        <div className="max-w-5xl mx-auto mt-12 text-center">
          <p className="font-inter mb-4" style={{ fontSize: 15, color: "#86868b" }}>
            Not sure which location? Apply and tell us your preference.
          </p>
          <button
            onClick={() => router.push("/coliving/apply")}
            className="font-mont font-bold text-white rounded-full transition"
            style={{ padding: "14px 32px", fontSize: 15, backgroundColor: "#FF872A" }}
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
