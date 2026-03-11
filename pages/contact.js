import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Head from "next/head";

export default function Contact() {
  const stats = [
    { value: "10K+", label: "Students & alumni" },
    { value: "35+", label: "Countries" },
    { value: "200+", label: "Universities reached" },
    { value: "$20B+", label: "Alumni company value" },
  ];

  const products = [
    {
      name: "Talent Pipeline",
      description:
        "The best blockchain hires don\u2019t come from job boards. They come from the clubs and classrooms where the next protocols are being sketched out. Tap into students filtered by skill, university, and region.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
    },
    {
      name: "Newsletter & Content",
      description:
        "Thousands of blockchain students open our newsletter every week. One featured slot per issue. Your protocol, your opportunity, their inbox.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
      ),
    },
    {
      name: "Campus Events",
      description:
        "Run a hackathon at MIT. Host a workshop at KAIST. Sponsor a demo day at University of Michigan. Your event, our network, real students in seats.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      ),
    },
    {
      name: "Bounties & Grants",
      description:
        "Post a bounty, fund a grant, or sponsor a challenge. Students compete, you get working prototypes and a shortlist of builders who actually ship.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      ),
    },
    {
      name: "Campus Sponsorship",
      description:
        "Put your name in front of the next generation of builders. Your brand in every event, every newsletter, every student\u2019s first exposure to the industry.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      ),
    },
    {
      name: "Podcast & Media",
      description:
        "Feature your founder on the BEN podcast or sponsor an episode. Reach an audience that\u2019s actively learning, building, and choosing where to work next.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      ),
    },
  ];

  return (
    <div id="contact-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Partner with BEN — Recruit 10K+ Blockchain Students & Alumni</title>
        <meta name="description" content="Access 10,000+ blockchain-native students and alumni who founded $20B+ in companies across 35 countries. Recruit talent, sponsor events, fund research, and grow your ecosystem." />
        <link rel="canonical" href="https://www.blockchainedu.org/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/contact" />
        <meta property="og:title" content="Partner with BEN — Recruit 10K+ Blockchain Students & Alumni" />
        <meta property="og:description" content="Recruit talent, sponsor campus events, and grow your ecosystem with the world's largest university blockchain network." />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Partner with BEN — 10K+ Students, 200+ Universities" />
        <meta name="twitter:description" content="Recruit blockchain talent, sponsor hackathons, and grow your ecosystem with BEN." />
        <meta name="twitter:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
      </Head>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.07,
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, #FF872A 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #FF872A 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.02,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center">
            <span
              className="inline-block text-xs font-semibold uppercase px-4 py-1 rounded-full border mb-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.5)",
                borderColor: "rgba(255,255,255,0.08)",
                letterSpacing: "0.18em",
                fontSize: "10px",
              }}
            >
              Partnerships
            </span>

            <h1
              className="font-mont text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              Your next 1,000 builders
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                are already on campus.
              </span>
            </h1>

            <p
              className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-inter"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              BEN is the world&apos;s largest university blockchain network.
              <br className="hidden sm:block" />
              Partner with us to recruit, educate, and grow.
            </p>

            <div className="mt-10 flex flex-wrap justify-center" style={{ gap: "2rem 2.5rem" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mont">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-inter" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition-all duration-200"
                style={{ boxShadow: "0 8px 20px rgba(255, 135, 42, 0.2)" }}
              >
                Get in Touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#FFFBF2" }}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-12">
              <div
                className="inline-block text-benorange-500 font-bold uppercase px-3 rounded-full mb-4"
                style={{
                  backgroundColor: "rgba(255, 135, 42, 0.08)",
                  letterSpacing: "0.15em",
                  fontSize: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                The Problem
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-4">
                Everyone wants blockchain talent.
                <br />
                Almost no one knows where to find it.
              </h2>
              <p className="text-bengrey-500 text-sm md:text-base max-w-2xl mx-auto font-inter leading-relaxed">
                Protocols spend millions on grants with no distribution. Exchanges
                post jobs that reach the wrong candidates. Conferences run events
                that students never hear about. The talent exists — it&apos;s in
                classrooms, in campus clubs, in dorm rooms building the next
                protocol. The problem was never supply. It was access.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 text-center" style={{ gap: "2rem" }}>
              {[
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  ),
                  label: "Hire from the source",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ),
                  label: "Be the first brand they see",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  ),
                  label: "Fund what gets built",
                },
                {
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  ),
                  label: "Fill seats with real students",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-3 text-benorange-500"
                    style={{ backgroundColor: "rgba(255, 135, 42, 0.08)" }}
                  >
                    {item.icon}
                  </div>
                  <p className="text-sm font-inter text-black font-medium leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section
          id="products"
          className="py-16 md:py-20"
          style={{ backgroundColor: "#f5f7f7", borderTop: "1px solid rgba(0,0,0,0.04)" }}
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-12">
              <div
                className="inline-block text-benorange-500 font-bold uppercase px-3 rounded-full mb-4"
                style={{
                  backgroundColor: "rgba(255, 135, 42, 0.08)",
                  letterSpacing: "0.15em",
                  fontSize: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                What We Offer
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-3">
                Six ways to reach the next generation.
              </h2>
              <p className="text-bengrey-500 text-sm md:text-base max-w-lg mx-auto font-inter leading-relaxed">
                Each one connects you directly to students who are actively
                building, learning, and choosing where to work next.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="rounded-2xl p-6 flex flex-col"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-benorange-500"
                      style={{ backgroundColor: "rgba(255, 135, 42, 0.08)" }}
                    >
                      {product.icon}
                    </div>
                  </div>
                  <h3 className="font-mont font-bold text-base text-black mb-2">
                    {product.name}
                  </h3>
                  <p
                    className="text-sm font-inter leading-relaxed flex-1"
                    style={{ color: "rgba(0,0,0,0.55)" }}
                  >
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Partners With Us */}
        <section className="py-16 md:py-20" style={{ backgroundColor: "#FFFBF2" }}>
          <div className="max-w-5xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-12">
              <div
                className="inline-block text-benorange-500 font-bold uppercase px-3 rounded-full mb-4"
                style={{
                  backgroundColor: "rgba(255, 135, 42, 0.08)",
                  letterSpacing: "0.15em",
                  fontSize: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                Who Partners With Us
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-3">
                If you&apos;re building the future of finance,
                <br className="hidden md:block" />
                your next hire is in our network.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  who: "Protocols & Foundations",
                  description:
                    "You\u2019re shipping product and need developers who understand the stack. Our students don\u2019t need to be taught what a rollup is \u2014 they\u2019re already building on one.",
                },
                {
                  who: "Exchanges & Enterprises",
                  description:
                    "Compliance-aware, crypto-native, ready on day one. Skip the six-month onboarding. The students in our network have been living in this space since freshman year.",
                },
                {
                  who: "Events & Accelerators",
                  description:
                    "The difference between an empty room and a packed one is distribution. One listing reaches every student in our network \u2014 from Cambridge to Seoul.",
                },
              ].map((item) => (
                <div
                  key={item.who}
                  className="rounded-2xl p-6 text-center"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <h3 className="font-mont font-bold text-base text-black mb-3">
                    {item.who}
                  </h3>
                  <p
                    className="text-sm font-inter leading-relaxed"
                    style={{ color: "rgba(0,0,0,0.55)" }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 md:py-14" style={{ backgroundColor: "#f5f7f7", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
            <p
              className="text-xs font-inter font-medium uppercase mb-6"
              style={{ color: "rgba(0,0,0,0.3)", letterSpacing: "0.15em" }}
            >
              BEN alumni have built at or been backed by
            </p>
            <div
              className="flex flex-wrap justify-center items-center"
              style={{ gap: "1.2rem 2.5rem" }}
            >
              {[
                "Pantera Capital", "Founders Fund", "Blockchain Capital",
                "Coinbase", "Augur", "Optimism", "Injective",
                "Bolt", "CoinList", "GDA Capital",
              ].map((name) => (
                <span
                  key={name}
                  className="font-mont font-bold text-base md:text-lg"
                  style={{ color: "rgba(0,0,0,0.13)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section
          id="contact"
          className="relative overflow-hidden py-16 md:py-20"
          style={{ backgroundColor: "#202127" }}
        >
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.12,
              backgroundImage:
                "radial-gradient(ellipse at 50% 0%, #FF872A, transparent 60%)",
            }}
          />

          <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-10">
              <h2 className="font-mont font-black text-2xl md:text-4xl text-white mb-4 leading-tight">
                Let&apos;s build together.
              </h2>
              <p
                className="text-sm md:text-base max-w-lg mx-auto font-inter leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Tell us what you&apos;re looking for and we&apos;ll figure out
                the fastest way to make it happen.
              </p>
            </div>

            <div
              className="rounded-2xl overflow-hidden mx-auto text-center py-12"
              style={{
                maxWidth: "640px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p className="font-inter text-base mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
                Reach out to us directly:
              </p>
              <a
                href="mailto:team@blockchainedu.org"
                className="inline-flex items-center gap-2 font-mont font-bold text-sm text-white px-8 py-4 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#FF872A" }}
              >
                team@blockchainedu.org
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
