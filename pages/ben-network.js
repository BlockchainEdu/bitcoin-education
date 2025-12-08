import React from "react";
import Head from "next/head";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import StandardButton from "../components/standardButton";

export default function BenNetwork() {
  return (
    <div className="bg-benwhite-500 min-h-screen">
      <Head>
        <title>BEN Network | Blockchain Education Network</title>
      </Head>

      <HeaderWithLogoDark />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-benorange-100 opacity-80" />
        <div className="relative container mx-auto pt-24 pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 tracking-[-0.02em]">
              <span className="text-benorange-500">BEN</span>{" "}
              <span className="text-benblack-500">Network</span>
            </h1>
            <p className="text-lg text-benblack-500 opacity-90">
              A global network of student founders, alumni and companies built
              through the Blockchain Education Network.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-benblack-500 tracking-tight mb-6">
              The Blockchain Education Network
            </h2>

            <div className="space-y-4 text-sm md:text-base leading-relaxed text-benblack-500">
              <p>
                The College Cryptocurrency Network (CCN) began as a way to
                connect student Bitcoin clubs across universities. Founded by
                Jeremy Gardner, Daniel Bloch, and others at the University of
                Michigan, it quickly evolved into a global movement.
              </p>

              <p>
                Within ten months, it expanded to 160+ chapters in 35+
                countries, rebranding as the Blockchain Education Network (BEN)
                to support blockchain education.
              </p>

              <p>
                BEN became a launchpad for future leaders, with alumni founding
                billion-dollar projects like IOTA, Optimism, Bitso, Augur, and
                Injective, as well as other industry-shaping ventures including
                Wanchain, Notional Finance, Roll, and GDA Capital, collectively
                exceeding $20 billion in peak valuations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unicorns & major companies */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-benblack-500 tracking-tight">
                Unicorns and major companies
              </h2>
            </div>

            {/* Logos grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {[
                { name: "Optimism", desc: "Layer 2 infrastructure" },
                { name: "IOTA", desc: "Distributed ledger" },
                { name: "Bitso", desc: "Crypto exchange" },
                { name: "Injective", desc: "DeFi infrastructure" },
                { name: "Augur", desc: "Prediction markets" },
                { name: "Wanchain", desc: "Interoperability" },
                { name: "Notional", desc: "DeFi lending" },
                { name: "GDA Capital", desc: "Digital asset fund" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition"
                >
                  {/* Placeholder logo */}
                  <div className="h-12 flex items-center justify-center text-benblack-500 font-semibold text-lg mb-2">
                    {item.name}
                  </div>

                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders & projects */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-benblack-500 tracking-tight">
                BEN founders and projects
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Optimism",
                  desc: "Scaling Ethereum through Layer 2 infrastructure.",
                },
                {
                  name: "Injective",
                  desc: "Decentralized derivatives and trading infrastructure.",
                },
                {
                  name: "Bitso",
                  desc: "Leading crypto exchange in Latin America.",
                },
                {
                  name: "Notional Finance",
                  desc: "Fixed-rate DeFi lending protocol.",
                },
                {
                  name: "Roll",
                  desc: "Social tokens for creators and communities.",
                },
                {
                  name: "Wanchain",
                  desc: "Cross-chain infrastructure for DeFi and assets.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-benblack-500 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                  </div>

                  <StandardButton text="Learn more" link="#" styling="w-fit" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
