import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Stories from "../content/stories";
import NationalTeamCard from "../components/nationalTeamCard";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripe";

// ─── Data ─────────────────────────────────────────────────────────
// ⚠️  SECURITY: Wallet addresses are frozen to prevent runtime tampering via XSS or prototype pollution.
//     Always verify addresses against the official BEN records before deploying changes.
const CRYPTO_WALLETS = Object.freeze([
  // ── Native coins ──
  Object.freeze({ name: "Bitcoin",   ticker: "BTC",  address: "bc1qlrhhekzlcnhxu72xes2d8lxuqr60w3l3ck0c4k",                               image: "/images/bitcoin-icon.svg" }),
  Object.freeze({ name: "Ethereum",  ticker: "ETH",  address: "0xe727784c6067A5756b02a79428b118A172455761",                                   image: "/images/ethereum-icon.svg" }),
  Object.freeze({ name: "Solana",    ticker: "SOL",  address: "HuqXTadhYsP933NsgMJjYBMHhwRz9eS6jtah5ebkBruD",                                image: "/images/solana-icon.svg" }),
  Object.freeze({ name: "XRP",       ticker: "XRP",  address: "rLK54LQLjfYB2NzSuqvywHNM7m632SJfVu",                                          image: "/images/xrp-icon.svg" }),
  Object.freeze({ name: "BNB",       ticker: "BNB",  address: "0xe727784c6067A5756b02a79428b118A172455761" }),
  Object.freeze({ name: "Dogecoin",  ticker: "DOGE", address: "D6Y61k78mp4zPeQdxg5sX6vhsD61itapt2",                                          image: "/images/dogecoin-icon.svg" }),
  Object.freeze({ name: "Zcash",     ticker: "ZEC",  address: "t1UBjqQ9trKrWC99yYicyBo3tvZM87hjxGW" }),
  Object.freeze({ name: "Algorand",  ticker: "ALGO", address: "G4E2Z7RB47PGN6SAP5JQ6MIMF5CIKNSIMZNPTQFQFV7UEKVRIDIGHMC6FI" }),
  Object.freeze({ name: "EOS",       ticker: "EOS",  address: "kpdcwg4j1bww" }),
  Object.freeze({ name: "Tron",      ticker: "TRX",  address: "TL6iEShVVceEzcAMQjjg69CUoZYQh19EyA" }),
  // ── USDT (Tether) ──
  Object.freeze({ name: "USDT",      ticker: "USDT-ETH",  network: "Ethereum",  address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-TRX",  network: "Tron",      address: "TL6iEShVVceEzcAMQjjg69CUoZYQh19EyA",                image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-SOL",  network: "Solana",    address: "HuqXTadhYsP933NsgMJjYBMHhwRz9eS6jtah5ebkBruD",      image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-POLY", network: "Polygon",   address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-BNB",  network: "BNB Chain", address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/tether-icon.svg" }),
  // ── USDC ──
  Object.freeze({ name: "USDC",      ticker: "USDC-ETH",  network: "Ethereum",  address: "0xe727784c6067A5756b02a79428b118A172455761" }),
  Object.freeze({ name: "USDC",      ticker: "USDC-POLY", network: "Polygon",   address: "0xe727784c6067A5756b02a79428b118A172455761" }),
]);

const VIDEO_IDS = [
  "DvBfOIxNldw", "dSrwr2oj910", "6_AzuUhIJmk", "8aVwyWurv1E",
  "t0s9cNM5NU4", "SZvMgIj9r_I", "Lvs78FukfpI", "tbchiByUSm0",
  "dvBxuupurK0", "6hfJ2fRQTYc", "GMIIo8j9b90", "L1-yHKLctzM",
];

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

// Show first 12 stories initially, reveal rest on click
const STORIES_INITIAL = 12;

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [cardView, setCardView] = useState("donate"); // "donate" | "wire" | "crypto" | "tax"
  const donateRef = useRef(null);

  const currentAmount = isCustom ? (parseInt(customAmount) || 0) : selectedAmount;
  const studentsImpacted = Math.max(1, Math.floor(currentAmount / 12));

  function selectPreset(amount) {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  }

  function handleCustomInput(e) {
    setCustomAmount(e.target.value.replace(/[^0-9]/g, ""));
    setIsCustom(true);
  }

  async function handleDonate() {
    if (currentAmount < 1) return;
    setLoading(true);
    try {
      const response = await fetchPostJSON("/api/checkout_sessions", {
        amount: { amount: currentAmount, frequency: frequency === "monthly" ? "monthly" : "one time" },
      });
      if (response.statusCode === 500) {
        console.error(response.message);
        alert("Something went wrong. Please try again or contact us.");
        setLoading(false);
        return;
      }
      const stripe = await getStripe();
      if (!stripe) {
        alert("Payment system is loading. Please try again.");
        setLoading(false);
        return;
      }
      await stripe.redirectToCheckout({ sessionId: response.id });
    } catch (err) {
      console.error(err);
      alert("Could not connect to payment. Please try again or use PayPal/Crypto.");
    }
    setLoading(false);
  }

  function scrollToDonate() {
    donateRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function copyText(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      console.error(e);
    }
  }

  const visibleVideos = showAllVideos ? VIDEO_IDS : VIDEO_IDS.slice(0, 6);

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>Donate | Blockchain Education Network</title>
        <meta name="description" content="Support blockchain education for students at 200+ universities worldwide. Your tax-deductible donation funds conferences, hackathons, and mentorship programs." />
      </Head>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO — Clean: headline + form. Nothing else.
             Apple principle: one message, one action.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom right, #000, #111827, #000)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.07,
          background: "radial-gradient(ellipse at 20% 50%, #FF872A 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #FF872A 0%, transparent 50%)"
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.02,
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: one clear message */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div
                className="inline-block font-inter text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-8"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                501(c)(3) Non-Profit
              </div>
              <h1 className="font-mont font-black text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6">
                Invest in the Next Generation of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                  Builders
                </span>
              </h1>
              <p className="font-inter text-lg md:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your donation sends students to conferences, funds hackathons,
                and builds blockchain communities at 200+ universities worldwide.
              </p>
            </div>

            {/* Right: donation card with flip views */}
            <div className="w-full lg:w-1/2 flex justify-center" ref={donateRef}>
              <div className="w-full" style={{ maxWidth: "460px" }}>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Smooth crossfade between views */}
                  <div className="p-6 md:p-8">

                    {/* ── DONATE VIEW ── */}
                    {cardView === "donate" && (
                      <>
                        {/* Monthly / One-time toggle */}
                        <div className="flex items-center justify-center mb-8">
                          <div className="inline-flex rounded-full p-1" style={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
                            <button
                              className={`px-6 py-2 rounded-full font-inter font-semibold text-sm transition-all duration-200 ${frequency === "monthly" ? "bg-benorange-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
                              onClick={() => setFrequency("monthly")}
                            >Monthly</button>
                            <button
                              className={`px-6 py-2 rounded-full font-inter font-semibold text-sm transition-all duration-200 ${frequency === "onetime" ? "bg-benorange-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}
                              onClick={() => setFrequency("onetime")}
                            >One-time</button>
                          </div>
                        </div>

                        {/* Preset amounts */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {PRESET_AMOUNTS.map((amt) => (
                            <button
                              key={amt}
                              onClick={() => selectPreset(amt)}
                              className={`py-3 rounded-xl font-inter font-bold text-lg transition-all duration-200 border-2 ${
                                !isCustom && selectedAmount === amt
                                  ? "bg-benorange-500 text-white border-benorange-500 shadow-md"
                                  : "bg-white text-gray-800 border-gray-200 hover:border-benorange-500"
                              }`}
                            >${amt.toLocaleString()}</button>
                          ))}
                        </div>

                        {/* Custom amount */}
                        <div className={`flex items-center border-2 rounded-xl px-4 py-3 mb-5 transition-all duration-200 ${isCustom ? "border-benorange-500" : "border-gray-200"}`}>
                          <span className="font-inter font-bold text-lg text-gray-400 mr-1">$</span>
                          <input
                            type="text" inputMode="numeric" placeholder="Other amount"
                            value={customAmount} onChange={handleCustomInput} onFocus={() => setIsCustom(true)}
                            className="w-full font-inter font-bold text-lg text-gray-800 outline-none bg-transparent"
                          />
                        </div>

                        {/* Impact message */}
                        {currentAmount > 0 && (
                          <p className="text-center font-inter text-gray-600 text-sm mb-5">
                            Your <span className="font-bold text-gray-900">${currentAmount.toLocaleString()}{frequency === "monthly" ? "/mo" : ""}</span> educates{" "}
                            <span className="font-bold text-benorange-500">{studentsImpacted} {studentsImpacted === 1 ? "student" : "students"}</span>
                          </p>
                        )}

                        {/* Donate button */}
                        <button
                          onClick={handleDonate} disabled={loading || currentAmount < 1}
                          className="w-full bg-benorange-500 hover:bg-yellow-500 text-white font-mont font-bold text-xl py-5 rounded-2xl transition-all duration-300 shadow-lg disabled:opacity-50"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {loading ? "Processing..." : `Donate $${currentAmount.toLocaleString()}${frequency === "monthly" ? "/month" : ""}`}
                        </button>

                        {/* Payment icons row */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <svg viewBox="0 0 24 24" fill="none" className="text-gray-400" style={{ width: "14px", height: "14px" }}>
                            <path d="M12 2C9.24 2 7 4.24 7 7v3H5v12h14V10h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3z" fill="currentColor"/>
                          </svg>
                          <span className="font-inter text-xs text-gray-400">Secure</span>
                          <span className="text-gray-300 mx-1">&middot;</span>
                          <span className="font-inter text-xs text-gray-400">Apple Pay, Google Pay, Visa, Mastercard</span>
                        </div>

                        {/* Alt payment methods */}
                        <div className="flex items-center justify-center gap-2 mt-3 font-inter text-xs flex-wrap">
                          <a target="_blank" rel="noopener noreferrer" href="https://www.paypal.com/donate/?hosted_button_id=JZT2VJ5WA6GJJ" className="font-semibold text-gray-400 hover:text-benorange-500 underline transition-colors">PayPal</a>
                          <span className="text-gray-300">&middot;</span>
                          <button onClick={() => setCardView("crypto")} className="font-semibold text-gray-400 hover:text-benorange-500 underline transition-colors">Crypto</button>
                          <span className="text-gray-300">&middot;</span>
                          <button onClick={() => setCardView("wire")} className="font-semibold text-gray-400 hover:text-benorange-500 underline transition-colors">Wire</button>
                          <span className="text-gray-300">&middot;</span>
                          <button onClick={() => setCardView("tax")} className="font-semibold text-gray-400 hover:text-benorange-500 underline transition-colors">Tax Benefits</button>
                        </div>
                      </>
                    )}

                    {/* ── WIRE VIEW ── */}
                    {cardView === "wire" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-mont font-bold text-lg text-gray-900">Wire Transfer</h3>
                          <button
                            onClick={() => setCardView("donate")}
                            className="font-inter text-sm font-semibold text-benorange-500 hover:text-yellow-600 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                          </button>
                        </div>
                        <p className="font-inter text-gray-500 text-sm mb-6">
                          Send a wire directly to BEN. Funds are processed immediately.
                        </p>
                        <div className="space-y-4">
                          {[
                            { label: "Bank Name", value: "Mercury", key: null },
                            { label: "Routing Number", value: "121145433", key: "routing", mono: true },
                            { label: "Account Number", value: "843763775352889", key: "account", mono: true },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between">
                              <div>
                                <div className="font-inter text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
                                <div className={`font-semibold text-gray-900 ${item.mono ? "font-mono" : "font-inter"}`}>{item.value}</div>
                              </div>
                              {item.key && (
                                <button onClick={() => copyText(item.value, item.key)} className="font-inter text-xs font-semibold text-benorange-500 hover:text-yellow-600 transition-colors px-3 py-1 rounded-lg" style={{ backgroundColor: "rgba(255,135,42,0.08)" }}>
                                  {copiedField === item.key ? "Copied!" : "Copy"}
                                </button>
                              )}
                            </div>
                          ))}
                          <div>
                            <div className="font-inter text-xs text-gray-400 uppercase tracking-wider">Bank Address</div>
                            <div className="font-inter text-gray-900 text-sm">1 Letterman Drive, Building A, Suite A4-700, San Francisco, CA 94129</div>
                          </div>
                          <div>
                            <div className="font-inter text-xs text-gray-400 uppercase tracking-wider">Beneficiary</div>
                            <div className="font-inter font-semibold text-gray-900">Blockchain Education Network Inc.</div>
                          </div>
                        </div>
                        <div className="mt-6 pt-5 border-t border-gray-100">
                          <p className="font-inter text-xs text-gray-400 text-center">
                            Tax-deductible &middot; EIN: 46-5280397 &middot; Need a receipt? <a href="/contact" className="text-benorange-500 underline">Contact us</a>
                          </p>
                        </div>
                      </>
                    )}

                    {/* ── CRYPTO VIEW ── */}
                    {cardView === "crypto" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-mont font-bold text-lg text-gray-900">Crypto</h3>
                          <button
                            onClick={() => setCardView("donate")}
                            className="font-inter text-sm font-semibold text-benorange-500 hover:text-yellow-600 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                          </button>
                        </div>
                        <p className="font-inter text-gray-500 text-sm mb-4">
                          Tap any address to copy. You may qualify for capital gains tax deductions.
                        </p>
                        <div className="space-y-2" style={{ maxHeight: "420px", overflowY: "auto", paddingRight: "4px" }}>
                          {CRYPTO_WALLETS.map((crypto, i) => (
                            <button
                              key={crypto.ticker}
                              onClick={() => copyText(crypto.address, crypto.ticker)}
                              className="w-full text-left p-3 rounded-xl transition-colors active:bg-gray-100 flex items-start gap-3"
                              style={{ backgroundColor: copiedField === crypto.ticker ? "rgba(255,135,42,0.10)" : "rgba(0,0,0,0.03)" }}
                            >
                              {crypto.image ? (
                                <img src={crypto.image} alt={crypto.name} className="w-7 h-7 flex-shrink-0 mt-0.5" />
                              ) : (
                                <span className="w-7 h-7 flex-shrink-0 mt-0.5 rounded-full flex items-center justify-center font-inter font-bold text-xs text-white" style={{ backgroundColor: "#FF872A" }}>
                                  {crypto.ticker.slice(0, 1)}
                                </span>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="font-inter font-bold text-sm text-gray-900">
                                    {crypto.name}{crypto.network ? <span className="font-normal text-gray-400"> on {crypto.network}</span> : ""}
                                  </span>
                                  <span className="font-inter text-xs font-semibold flex-shrink-0 ml-2" style={{ color: copiedField === crypto.ticker ? "#16a34a" : "#FF872A" }}>
                                    {copiedField === crypto.ticker ? "Copied!" : "Copy"}
                                  </span>
                                </div>
                                <div className="font-mono text-xs text-gray-400 mt-1 break-all leading-relaxed select-all">{crypto.address}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-6 pt-5 border-t border-gray-100">
                          <p className="font-inter text-xs text-gray-400 text-center">
                            All crypto donations are nonrefundable &middot; Need another coin? <a href="/contact" className="text-benorange-500 underline">Contact us</a>
                          </p>
                        </div>
                      </>
                    )}

                    {/* ── TAX BENEFITS VIEW ── */}
                    {cardView === "tax" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-mont font-bold text-lg text-gray-900">Tax Benefits</h3>
                          <button
                            onClick={() => setCardView("donate")}
                            className="font-inter text-sm font-semibold text-benorange-500 hover:text-yellow-600 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                          </button>
                        </div>
                        <p className="font-inter text-gray-500 text-sm mb-5">
                          BEN is a 501(c)(3) nonprofit. Your donation is fully tax-deductible.
                        </p>
                        <div className="space-y-3 mb-6">
                          {[
                            { label: "Individual donors", value: "Deduct up to 30% of Adjusted Gross Income" },
                            { label: "Corporate donors", value: "Deduct up to 10\u201325% of taxable income" },
                            { label: "Crypto donations", value: "No capital gains tax + full fair market value deduction" },
                            { label: "International", value: "US\u2013Canada and other tax treaties may apply" },
                          ].map((item, i) => (
                            <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
                              <div className="font-inter font-bold text-sm text-gray-900">{item.label}</div>
                              <div className="font-inter text-xs text-gray-500 mt-0.5">{item.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-center mb-4">
                          <div className="font-mono text-sm text-gray-400 mb-1">EIN</div>
                          <div className="font-mono font-bold text-lg text-gray-900">46-5280397</div>
                        </div>
                        <div className="pt-5 border-t border-gray-100">
                          <p className="font-inter text-xs text-gray-400 text-center">
                            Need a tax receipt? <a href="/contact" className="text-benorange-500 underline">Contact us</a> after your donation.
                          </p>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. TRUST SHELF — stats + Bullish social proof.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ background: "linear-gradient(135deg, #0a0a12 0%, #111827 50%, #0f1420 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          {/* Hero stat — fundraising total */}
          <div className="text-center mb-10">
            <div className="font-mont font-black text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400" style={{ letterSpacing: "-0.03em" }}>$600K+</div>
            <div className="font-inter text-sm uppercase tracking-widest mt-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>in donations received</div>
          </div>

          {/* Supporting stats */}
          <div className="flex items-center justify-center gap-10 md:gap-20">
            <div className="text-center">
              <div className="font-mont font-black text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>10,000+</div>
              <div className="font-inter text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>Students &amp; Alumni</div>
            </div>
            <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }} />
            <div className="text-center">
              <div className="font-mont font-black text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>200+</div>
              <div className="font-inter text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>Universities</div>
            </div>
            <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)" }} />
            <div className="text-center">
              <div className="font-mont font-black text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}>35+</div>
              <div className="font-inter text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em" }}>Countries</div>
            </div>
          </div>

          {/* Bullish — centered endorsement card */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.bullish.com/eu/news-insights/bullishs-trading-game-winnings-help-save-the-children-and-the-blockchain-education-network"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 group rounded-2xl px-8 py-5 transition-all duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <img src="/images/bullish-logo.svg" alt="Bullish" style={{ height: "36px", filter: "invert(1)", opacity: 0.9 }} />
              <div style={{ width: "1px", height: "36px", backgroundColor: "rgba(255,255,255,0.08)" }} />
              <div>
                <div className="font-mont font-bold text-lg text-white" style={{ letterSpacing: "-0.01em" }}>
                  $100,000 <span className="font-inter font-normal text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>donated to BEN</span>
                </div>
                <div className="font-inter text-xs group-hover:text-benorange-500 transition-colors mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Read the story &rarr;
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. STUDENT VIDEOS — Individual grid. Show 6, reveal rest.
             Apple principle: progressive disclosure.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-mont font-black text-3xl md:text-5xl text-gray-900 mb-4">
              Hear From Our Students
            </h2>
            <p className="font-inter text-gray-500 max-w-lg mx-auto">
              Real stories from students whose lives were changed by BEN.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleVideos.map((videoId) => (
              <div key={videoId} className="rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: "16/9" }}>
                {playingVideo === videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    allow="autoplay; encrypted-media" allowFullScreen
                    className="w-full h-full" frameBorder="0"
                  />
                ) : (
                  <button onClick={() => setPlayingVideo(videoId)} className="relative w-full h-full group">
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Student testimonial" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.15)" }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ backgroundColor: "rgba(255,135,42,0.9)" }}>
                        <svg className="w-6 h-6 text-white" style={{ marginLeft: "2px" }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
          {!showAllVideos && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllVideos(true)}
                className="font-inter font-semibold text-sm text-benorange-500 hover:text-yellow-600 transition-colors"
              >
                Show {VIDEO_IDS.length - 6} more videos &darr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. IMPACT — All student stories + world photos.
             Proof of work. This is the page's biggest asset.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: "#f5f5f7" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-mont font-black text-3xl md:text-5xl text-gray-900 mb-4">
              Our Impact in Action
            </h2>
            <p className="font-inter text-gray-500 max-w-lg mx-auto mb-2">
              Every dollar directly impacts a student&rsquo;s journey into blockchain.
            </p>
            <p className="font-inter text-benorange-500 font-bold">
              {Stories.length}+ students and communities reached
            </p>
          </div>

          {/* Story cards — same style as team page */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
            {(showAllStories ? Stories : Stories.slice(0, STORIES_INITIAL)).map((story, i) => (
              <NationalTeamCard
                key={story.name + i}
                image={story.image}
                name={story.name}
                title={story.title}
                bio={story.bio}
              />
            ))}
          </div>
          {!showAllStories && Stories.length > STORIES_INITIAL && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAllStories(true)}
                className="font-inter font-semibold text-sm text-benorange-500 hover:text-yellow-600 transition-colors"
              >
                Show all {Stories.length} stories &darr;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. MISSION — One dark interlude. Short. Punchy.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(to bottom right, #000, #111827, #000)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.06,
          background: "radial-gradient(ellipse at 50% 50%, #FF872A 0%, transparent 70%)"
        }} />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="font-mont font-black text-3xl md:text-5xl text-white mb-6 leading-tight">
            On a mission to educate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">10 million people</span>
          </h2>
          <p className="font-inter text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
            Since 2014 — flying students to conferences, funding hackathons,
            matching them with jobs, building communities worldwide.
          </p>
          <button
            onClick={scrollToDonate}
            className="bg-benorange-500 hover:bg-yellow-500 text-white font-mont font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 shadow-lg"
          >
            Support Our Mission
          </button>
        </div>
      </section>

      {/* Section 6 removed — Crypto, Wire, Tax all integrated into hero donation card */}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. PUERTO RICO — Separate entity. Dark, immersive.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a12 0%, #0f1420 50%, #0a0a12 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          {/* Header — centered, minimal */}
          <div className="text-center mb-14">
            <div
              className="inline-block font-inter text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)", letterSpacing: "0.15em" }}
            >
              Separate Entity
            </div>
            <h2 className="font-mont font-black text-4xl md:text-5xl text-white mb-5" style={{ letterSpacing: "-0.02em" }}>
              BEN Puerto Rico
            </h2>
            <p className="font-inter text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              A registered 1101 educational organization bringing blockchain literacy to the island&apos;s youth through hands-on workshops.
            </p>
          </div>

          {/* Video — hero, full-width */}
          <div className="rounded-2xl overflow-hidden mb-10" style={{ position: "relative", paddingBottom: "56.25%", height: 0, boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
            <iframe
              src="https://player.vimeo.com/video/653049643?h=c1fa5c7bdf&title=0&byline=0&portrait=0"
              frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            />
          </div>

          {/* Feature row — three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />,
                title: "Boys & Girls Club",
                desc: "Hands-on workshops introducing blockchain and digital skills to underserved youth"
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
                title: "1101 Registered",
                desc: "Qualified public charity under Puerto Rico educational organization statute"
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
                title: "Island Impact",
                desc: "Building a blockchain-literate generation across Puerto Rico communities"
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <svg className="w-6 h-6 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#FF872A" }}>
                  {item.icon}
                </svg>
                <div className="font-mont font-bold text-white text-sm mb-2">{item.title}</div>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Workshop photo — full-width with overlay */}
          <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
            <img
              src="/images/stories/ben-puerto-rico.jpg"
              alt="BEN and Boys & Girls Club in Puerto Rico"
              className="w-full object-cover"
              style={{ height: "300px", objectPosition: "center top" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-8 py-6">
              <div className="font-mont font-bold text-white text-lg">Boys & Girls Club Workshop</div>
              <div className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Puerto Rico</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. TAX BENEFITS — Dedicated section. This converts big donors.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-mont font-black text-3xl md:text-5xl text-gray-900 mb-4">
              Your Donation Is Tax-Deductible
            </h2>
            <p className="font-inter text-lg text-gray-500 max-w-2xl mx-auto">
              BEN is a registered 501(c)(3) nonprofit (EIN: 46-5280397). Every dollar you give reduces your tax burden.
            </p>
          </div>

          {/* Tax benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              {
                title: "Individual Donors",
                amount: "Up to 30%",
                desc: "Deduct up to 30% of your Adjusted Gross Income. Cash donations to a 501(c)(3) are fully deductible.",
                highlight: "of AGI"
              },
              {
                title: "Corporate Donors",
                amount: "Up to 25%",
                desc: "Corporate deductions generally range from 10% to 25% of taxable income for qualified cash contributions.",
                highlight: "of taxable income"
              },
              {
                title: "Crypto Donors",
                amount: "Double benefit",
                desc: "Donate crypto directly \u2014 pay zero capital gains tax and claim a full deduction at fair market value on the date of donation.",
                highlight: "no capital gains"
              },
              {
                title: "International Donors",
                amount: "Treaty eligible",
                desc: "If you file a US return, your donation is deductible. Tax treaties (US\u2013Canada, US\u2013UK, and others) may allow deductions on your home country return.",
                highlight: "check your treaty"
              },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl p-6 md:p-8" style={{ backgroundColor: "#f5f5f7" }}>
                <div className="font-inter text-xs font-semibold text-benorange-500 uppercase tracking-wider mb-3">{card.title}</div>
                <div className="font-mont font-black text-2xl md:text-3xl text-gray-900 mb-1" style={{ letterSpacing: "-0.02em" }}>
                  {card.amount}
                </div>
                <div className="font-inter text-sm text-gray-400 mb-4">{card.highlight}</div>
                <p className="font-inter text-base text-gray-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Transparency documents */}
          <h3 className="font-mont font-bold text-xl text-center text-gray-900 mb-8">
            Full Transparency
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {[
              { href: "https://docs.google.com/presentation/d/1stVgjgui--ok7uG8t6QFvpGkv9rk2NuCRXIHctkbGN0/edit?usp=sharing", icon: "/images/ben-financials.svg", title: "BEN Financials", desc: "Financial reports and spending" },
              { href: "https://drive.google.com/file/d/1DeVoRAEAOzxJQ1jSlykklOakaLs8o_fb/view?usp=sharing", icon: "/images/about-us.svg", title: "501(c)(3) Status", desc: "EIN: 46-5280397" },
              { href: "https://drive.google.com/file/d/1FmpY4Lmy5kX1U26q2b13NtQBf4mni5Es/view", icon: "/images/blockchain-partners.svg", title: "1101 Status (PR)", desc: "Puerto Rico educational org" },
            ].map((card, i) => (
              <a key={i} target="_blank" rel="noopener noreferrer" href={card.href}
                className="border border-gray-200 p-5 rounded-2xl hover:shadow-md hover:border-benorange-500 transition-all duration-300 group flex items-start gap-4">
                <Image width={56} height={56} src={card.icon} />
                <div>
                  <div className="font-inter font-bold text-gray-900 text-base mb-1 group-hover:text-benorange-500 transition-colors">{card.title} {"\u2197"}</div>
                  <div className="font-inter text-sm text-gray-400">{card.desc}</div>
                </div>
              </a>
            ))}
          </div>

          {/* FAQ — readable size */}
          <h3 className="font-mont font-bold text-2xl text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { q: "Are there limits on tax deductions?", a: "You can deduct up to 30% of your Adjusted Gross Income for donations to a 501(c)(3). You cannot deduct contributions of time or services, only monetary and property donations." },
              { q: "Can US corporations get a deduction?", a: "Yes. Corporate deductions generally may not exceed 10% of taxable income, increased to 25% for qualified cash contributions made during the tax year." },
              { q: "Can international donors get tax benefits?", a: "If you file a US return, yes \u2014 your donation is deductible. Tax treaties (like US\u2013Canada and US\u2013UK) may also allow deductions on your home country return. Consult your tax advisor." },
              { q: "How do crypto donations work for taxes?", a: "Donating appreciated crypto directly to BEN means you pay zero capital gains tax and can claim a deduction for the full fair market value on the date of donation. This is often more tax-efficient than selling first." },
              { q: "How do I get a tax receipt?", a: "After your donation, contact us and we\u2019ll issue an official 501(c)(3) tax receipt for your records. For Stripe donations, you\u2019ll receive an automatic email confirmation." },
            ].map((item, i) => (
              <div key={i} className={i > 0 ? "border-t border-gray-200 pt-8" : ""}>
                <h4 className="font-mont font-bold text-base md:text-lg text-gray-900 mb-3">{item.q}</h4>
                <p className="font-inter text-base text-gray-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. FINAL CTA — Simple bar. Not a full form repeat.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ backgroundColor: "#f5f5f7" }}>
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-mont font-black text-2xl md:text-3xl text-gray-900">
              Ready to make a difference?
            </h3>
            <p className="font-inter text-gray-500 mt-1">
              Every dollar helps a student discover blockchain.
            </p>
          </div>
          <button
            onClick={scrollToDonate}
            className="flex-shrink-0 bg-benorange-500 hover:bg-yellow-500 text-white font-mont font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 shadow-lg"
          >
            Donate Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
