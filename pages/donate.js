import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import HeroNetwork from "../components/HeroNetwork";
import AnimatedCounter from "../components/AnimatedCounter";
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
  Object.freeze({ name: "BNB",       ticker: "BNB",  address: "0xe727784c6067A5756b02a79428b118A172455761",                                   image: "/images/bnb-icon.svg" }),
  Object.freeze({ name: "Dogecoin",  ticker: "DOGE", address: "D6Y61k78mp4zPeQdxg5sX6vhsD61itapt2",                                          image: "/images/dogecoin-icon.svg" }),
  Object.freeze({ name: "Zcash",     ticker: "ZEC",  address: "t1UBjqQ9trKrWC99yYicyBo3tvZM87hjxGW",                                         image: "/images/zcash-icon.svg" }),
  Object.freeze({ name: "Algorand",  ticker: "ALGO", address: "G4E2Z7RB47PGN6SAP5JQ6MIMF5CIKNSIMZNPTQFQFV7UEKVRIDIGHMC6FI",                  image: "/images/algorand-icon.svg" }),
  Object.freeze({ name: "EOS",       ticker: "EOS",  address: "kpdcwg4j1bww",                                                                image: "/images/eos-icon.svg" }),
  Object.freeze({ name: "Tron",      ticker: "TRX",  address: "TL6iEShVVceEzcAMQjjg69CUoZYQh19EyA",                                          image: "/images/tron-icon.svg" }),
  Object.freeze({ name: "Litecoin",  ticker: "LTC",  address: "LZiPanfqmausHLupZ6kJa5Zd9NJKd8c8Kt",                                          image: "/images/litecoin-icon.svg" }),
  Object.freeze({ name: "Dash",      ticker: "DASH", address: "Xd3Vz9vVo1b6czHxQsgSdyK86FhPwkcDQD",                                          image: "/images/dash-icon.svg" }),
  Object.freeze({ name: "Hedera",    ticker: "HBAR", address: "0.0.774440",                                                                   image: "/images/hedera-icon.svg" }),
  // ── Tokens on Ethereum ──
  Object.freeze({ name: "Aave",      ticker: "AAVE", network: "Ethereum", address: "0xe727784c6067A5756b02a79428b118A172455761",               image: "/images/aave-icon.svg" }),
  // ── USDT (Tether) ──
  Object.freeze({ name: "USDT",      ticker: "USDT-ETH",  network: "Ethereum",  address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-TRX",  network: "Tron",      address: "TL6iEShVVceEzcAMQjjg69CUoZYQh19EyA",                image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-SOL",  network: "Solana",    address: "HuqXTadhYsP933NsgMJjYBMHhwRz9eS6jtah5ebkBruD",      image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-POLY", network: "Polygon",   address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/tether-icon.svg" }),
  Object.freeze({ name: "USDT",      ticker: "USDT-BNB",  network: "BNB Chain", address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/tether-icon.svg" }),
  // ── USDC ──
  Object.freeze({ name: "USDC",      ticker: "USDC-ETH",  network: "Ethereum",  address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/usdc-icon.svg" }),
  Object.freeze({ name: "USDC",      ticker: "USDC-POLY", network: "Polygon",   address: "0xe727784c6067A5756b02a79428b118A172455761",          image: "/images/usdc-icon.svg" }),
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
  const [cardView, setCardView] = useState("donate"); // "donate" | "wire" | "crypto" | "tax" | "daf"
  const [mounted, setMounted] = useState(false);
  const donateRef = useRef(null);

  // Sensitive financial data (wire numbers, crypto addresses) renders ONLY client-side.
  // SSR HTML seen by crawlers, bots, and search engines will show "Loading..." instead.
  useEffect(() => { setMounted(true); }, []);

  // Auto-advance hero videos: when one ends, play the next, then loop back
  const heroVideoIds = useRef(["geBcmjzpqVY", VIDEO_IDS[0]]);
  const playingRef = useRef(playingVideo);
  playingRef.current = playingVideo;

  useEffect(() => {
    function onMessage(e) {
      if (e.origin !== "https://www.youtube.com") return;
      let data = e.data;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch (_) { return; }
      }
      if (!data) return;
      // YT iframe API: info === 0 means video ended
      if (data.event === "onStateChange" && data.info === 0) {
        const ids = heroVideoIds.current;
        const cur = playingRef.current;
        const idx = ids.indexOf(cur);
        if (idx !== -1) {
          const nextId = ids[(idx + 1) % ids.length];
          setPlayingVideo(null);
          setTimeout(() => setPlayingVideo(nextId), 150);
        }
      }
    }

    // Subscribe to YT iframe events by sending "listening" command
    function initListener() {
      const iframe = document.getElementById("hero-yt-player");
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1 }), "https://www.youtube.com");
        iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "addEventListener", args: ["onStateChange"] }), "https://www.youtube.com");
      }
    }

    window.addEventListener("message", onMessage);
    // Re-init listener whenever playingVideo changes (new iframe mounts)
    const timer = setTimeout(initListener, 1000);
    return () => { window.removeEventListener("message", onMessage); clearTimeout(timer); };
  }, [playingVideo]);

  const currentAmount = isCustom ? (parseInt(customAmount) || 0) : selectedAmount;
  const studentsImpacted = Math.max(1, Math.floor(currentAmount / 12));

  function selectPreset(amount) {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  }

  function handleCustomInput(e) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(raw);
    setIsCustom(true);
  }

  const customAmountDisplay = customAmount ? parseInt(customAmount).toLocaleString() : "";

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

  // Strip zero-width chars injected for bot protection, then copy clean text
  async function copyText(text, field) {
    try {
      const clean = text.replace(/[\u200B\u200C\u200D\uFEFF]/g, "");
      await navigator.clipboard.writeText(clean);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (e) {
      console.error(e);
    }
  }

  // Inject zero-width chars between digits so JS-bundle scrapers get garbage
  function armored(str) {
    return str.split("").map((c, i) => i > 0 && i % 3 === 0 ? "\u200B" + c : c).join("");
  }

  const visibleVideos = showAllVideos ? VIDEO_IDS : VIDEO_IDS.slice(0, 6);

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>Donate to BEN — Fund the Next Generation of Blockchain Builders</title>
        <meta name="description" content="Tax-deductible donations fund BEN's blockchain academy, scholarships, student conferences, and hackathons at 200+ universities in 35 countries. Pay with card, crypto, PayPal, or wire." />
        <link rel="canonical" href="https://www.blockchainedu.org/donate" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/donate" />
        <meta property="og:title" content="Donate to BEN — Fund the Next Generation of Blockchain Builders" />
        <meta property="og:description" content="Tax-deductible donations fund BEN's blockchain academy, scholarships, student conferences, and hackathons at 200+ universities worldwide." />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Donate to BEN — Fund Blockchain Education Worldwide" />
        <meta name="twitter:description" content="Your donation funds BEN's academy, scholarships, conferences & hackathons for 10K+ students at 200+ universities. Card, crypto, PayPal, or wire." />
        <meta name="twitter:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
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
        <HeroNetwork />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36" style={{ zIndex: 2 }}>
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
                Your donation funds our academy and scholarships, sends students to
                conferences, and builds blockchain communities at 200+ universities worldwide.
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
                        {/* Monthly label on top */}
                        <p className="text-center font-inter text-xs text-gray-400 mb-3">
                          {frequency === "monthly" ? "Monthly donation" : "One-time donation"}
                        </p>

                        {/* Monthly / One-time toggle — large iOS tap targets */}
                        <div className="flex items-center justify-center mb-7">
                          <div className="inline-flex rounded-full p-1 w-full" style={{ backgroundColor: "rgba(0,0,0,0.06)", maxWidth: "320px" }}>
                            <button
                              className={`flex-1 py-3 rounded-full font-mont font-bold text-sm transition-all duration-200 ${frequency === "monthly" ? "bg-benorange-500 text-white shadow-md" : "text-gray-500 active:text-gray-700"}`}
                              onClick={() => setFrequency("monthly")}
                            >Monthly</button>
                            <button
                              className={`flex-1 py-3 rounded-full font-mont font-bold text-sm transition-all duration-200 ${frequency === "onetime" ? "bg-benorange-500 text-white shadow-md" : "text-gray-500 active:text-gray-700"}`}
                              onClick={() => setFrequency("onetime")}
                            >One-time</button>
                          </div>
                        </div>

                        {/* Preset amounts — 48px min height for iOS touch */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {PRESET_AMOUNTS.map((amt) => (
                            <button
                              key={amt}
                              onClick={() => selectPreset(amt)}
                              className={`rounded-xl font-mont font-black text-xl transition-all duration-150 border-2 active:scale-95 ${
                                !isCustom && selectedAmount === amt
                                  ? "bg-benorange-500 text-white border-benorange-500 shadow-md"
                                  : "bg-white text-gray-900 border-gray-200 active:border-benorange-500"
                              }`}
                              style={{ letterSpacing: "-0.02em", minHeight: "56px" }}
                            >${amt.toLocaleString()}</button>
                          ))}
                        </div>

                        {/* Custom amount — anchored high to inspire big gifts */}
                        <div className={`flex items-center border-2 rounded-xl px-4 mb-5 transition-all duration-200 ${isCustom ? "border-benorange-500" : "border-gray-200"}`} style={{ minHeight: "56px" }}>
                          <span className="font-mont font-black text-xl text-gray-400 mr-1">$</span>
                          <input
                            type="text" inputMode="numeric" placeholder="Enter any amount"
                            value={customAmountDisplay} onChange={handleCustomInput} onFocus={() => setIsCustom(true)}
                            className="w-full font-mont font-black text-xl text-gray-900 outline-none bg-transparent placeholder-gray-300"
                            style={{ fontSize: "20px" }}
                          />
                        </div>
                        {!isCustom && (
                          <p className="text-center font-inter text-xs text-gray-400 -mt-3 mb-5">
                            Some of our donors give $100K, $400K, or more
                          </p>
                        )}

                        {/* Impact message + inspiring quote */}
                        {currentAmount > 0 && (
                          <div className="text-center mb-5">
                            <p className="font-inter text-gray-600 text-sm">
                              Your <span className="font-bold text-gray-900">${currentAmount.toLocaleString()}{frequency === "monthly" ? "/mo" : ""}</span> educates{" "}
                              <span className="font-bold text-benorange-500">{studentsImpacted.toLocaleString()} {studentsImpacted === 1 ? "student" : "students"}</span>
                            </p>
                            <p className="font-inter text-xs mt-1.5 text-gray-500">
                              {currentAmount >= 100000
                                ? "You're building the future of an entire generation"
                                : currentAmount >= 25000
                                ? "This kind of generosity changes the trajectory of lives"
                                : currentAmount >= 5000
                                ? "You're funding scholarships that open real doors"
                                : currentAmount >= 1000
                                ? "That's a semester of blockchain education for a student"
                                : currentAmount >= 100
                                ? "Every student you reach becomes a builder"
                                : "Every dollar moves the mission forward"}
                            </p>
                          </div>
                        )}

                        {/* Donate button — extra tall for easy thumb tap */}
                        <button
                          onClick={handleDonate} disabled={loading || currentAmount < 1}
                          className="w-full bg-benorange-500 text-white font-mont font-black text-xl rounded-2xl transition-all duration-200 shadow-lg disabled:opacity-50 active:scale-98 active:bg-yellow-500"
                          style={{ letterSpacing: "-0.02em", minHeight: "60px" }}
                        >
                          {loading ? "Processing..." : `Donate $${currentAmount.toLocaleString()}${frequency === "monthly" ? "/month" : ""}`}
                        </button>

                        {/* Trust row */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                          <svg viewBox="0 0 24 24" fill="none" className="text-gray-400" style={{ width: "14px", height: "14px" }}>
                            <path d="M12 2C9.24 2 7 4.24 7 7v3H5v12h14V10h-2V7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3v3H9V7c0-1.66 1.34-3 3-3z" fill="currentColor"/>
                          </svg>
                          <span className="font-inter text-xs text-gray-400">Secure</span>
                          <span className="text-gray-300 mx-1">&middot;</span>
                          <span className="font-inter text-xs text-gray-400">Apple Pay, Google Pay, Visa, Mastercard</span>
                        </div>

                        {/* Alt payment methods — pill buttons for easy iOS tapping */}
                        <div className="flex items-center justify-center gap-1.5 mt-4 flex-wrap">
                          {[
                            { label: "PayPal", href: `https://www.paypal.com/donate/?hosted_button_id=${process.env.NEXT_PUBLIC_PAYPAL_BUTTON_ID || "JZT2VJ5WA6GJJ"}` },
                            { label: "Venmo", href: "https://www.venmo.com/u/blockchainedu" },
                          ].map((link) => (
                            <span
                              key={link.label}
                              onClick={() => window.open(link.href, "_blank", "noopener,noreferrer")}
                              className="font-inter font-semibold text-xs text-gray-500 px-3 py-2 rounded-full transition-colors active:text-benorange-500 cursor-pointer"
                              style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                            >{link.label}</span>
                          ))}
                          {[
                            { label: "Crypto", view: "crypto" },
                            { label: "Wire", view: "wire" },
                            { label: "DAF & Stock", view: "daf" },
                            { label: "Tax Info", view: "tax" },
                          ].map((item) => (
                            <button
                              key={item.label}
                              onClick={() => setCardView(item.view)}
                              className="font-inter font-semibold text-xs text-gray-500 px-3 py-2 rounded-full transition-colors active:text-benorange-500"
                              style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                            >{item.label}</button>
                          ))}
                        </div>
                      </>
                    )}

                    {/* ── WIRE VIEW ── */}
                    {/* data-nosnippet: tells Google not to use this block in search snippets */}
                    {/* mounted gate: wire details render ONLY client-side, invisible to crawlers/SSR */}
                    {cardView === "wire" && (
                      <div data-nosnippet="">
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
                        {!mounted ? (
                          <p className="font-inter text-gray-400 text-sm text-center py-8">Loading secure details...</p>
                        ) : (
                          <>
                            <p className="font-inter text-gray-500 text-sm mb-6">
                              Send a wire directly to BEN. Funds are processed immediately.
                            </p>
                            <div className="space-y-4">
                              {[
                                { label: "Bank Name", value: "Mercury", raw: "Mercury", key: "bank" },
                                { label: "Routing Number", value: armored("121145433"), raw: "121145433", key: "routing", mono: true },
                                { label: "Account Number", value: armored("843763775352889"), raw: "843763775352889", key: "account", mono: true },
                                { label: "Bank Address", value: "1 Letterman Drive, Building A, Suite A4-700, San Francisco, CA 94129", raw: "1 Letterman Drive, Building A, Suite A4-700, San Francisco, CA 94129", key: "address", small: true },
                                { label: "Beneficiary", value: "Blockchain Education Network Inc.", raw: "Blockchain Education Network Inc.", key: "beneficiary", bold: true },
                              ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="font-inter text-xs text-gray-400 uppercase tracking-wider">{item.label}</div>
                                    <div className={`text-gray-900 ${item.mono ? "font-mono font-bold text-base" : ""} ${item.small ? "font-inter text-sm" : ""} ${item.bold ? "font-inter font-semibold" : ""} ${!item.mono && !item.small && !item.bold ? "font-inter font-bold text-base" : ""}`}>{item.value}</div>
                                  </div>
                                  <button onClick={() => copyText(item.raw, item.key)} className="font-inter text-xs font-semibold text-benorange-500 hover:text-yellow-600 transition-colors px-3 py-1 rounded-lg flex-shrink-0" style={{ backgroundColor: "rgba(255,135,42,0.08)" }}>
                                    {copiedField === item.key ? "Copied!" : "Copy"}
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 pt-5 border-t border-gray-100">
                              <p className="font-inter text-xs text-gray-400 text-center">
                                Tax-deductible &middot; EIN: 46-5280397 &middot; Need a receipt? <span onClick={() => { window.location.href = "/contact"; }} className="text-benorange-500 underline cursor-pointer">Contact us</span>
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* ── CRYPTO VIEW ── */}
                    {/* data-nosnippet + mounted gate: addresses invisible to crawlers */}
                    {cardView === "crypto" && (
                      <div data-nosnippet="">
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
                        {!mounted ? (
                          <p className="font-inter text-gray-400 text-sm text-center py-8">Loading secure details...</p>
                        ) : (
                          <>
                            <p className="font-inter text-gray-500 text-sm mb-4">
                              Tap any address to copy. You may qualify for capital gains tax deductions.
                            </p>
                            <div className="space-y-2" style={{ maxHeight: "420px", overflowY: "auto", paddingRight: "4px", WebkitOverflowScrolling: "touch" }}>
                              {CRYPTO_WALLETS.map((crypto) => (
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
                            {/* Trust & support footer */}
                            <div className="mt-6 pt-5 border-t border-gray-100 space-y-4">
                              <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,135,42,0.05)", border: "1px solid rgba(255,135,42,0.1)" }}>
                                <div className="flex items-start gap-3">
                                  <svg className="w-5 h-5 text-benorange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                  </svg>
                                  <div>
                                    <p className="font-inter font-semibold text-sm text-gray-900 mb-1">Need a receipt or donating $20K+?</p>
                                    <p className="font-inter text-xs text-gray-500 leading-relaxed">
                                      We provide tax receipts for all donations. For large gifts, we&#39;ll work with you personally to ensure everything is documented.
                                    </p>
                                    <a
                                      href="mailto:finance@blockchainedu.org"
                                      className="inline-flex items-center gap-1.5 font-inter font-semibold text-xs text-benorange-500 hover:text-yellow-600 transition-colors mt-2"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M22 7l-10 6L2 7" />
                                      </svg>
                                      finance@blockchainedu.org
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <p className="font-inter text-xs text-gray-400 text-center">
                                501(c)(3) tax-deductible &middot; EIN: 46-5280397 &middot; All crypto donations are non-refundable
                              </p>
                              <p className="font-inter text-xs text-gray-400 text-center mt-3" style={{ fontStyle: "italic" }}>
                                &ldquo;Best way to offset crypto gains is to donate them directly.&rdquo; &mdash; <span onClick={() => window.open("https://x.com/Disruptepreneur/status/1338992208398045184", "_blank", "noopener,noreferrer")} className="text-benorange-500 cursor-pointer">Jeremy Gardner</span>, Co-Founder
                              </p>
                            </div>
                          </>
                        )}
                      </div>
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
                            Need a tax receipt? <span onClick={() => { window.location.href = "/contact"; }} className="text-benorange-500 underline cursor-pointer">Contact us</span> after your donation.
                          </p>
                        </div>
                      </>
                    )}

                    {/* ── DAF & STOCK VIEW ── */}
                    {cardView === "daf" && (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="font-mont font-bold text-lg text-gray-900">DAF &amp; Stock</h3>
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
                          Donate from your Donor Advised Fund or give stock directly. Often the most tax-efficient way to give.
                        </p>
                        <div className="space-y-3 mb-6">
                          <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-benorange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <div>
                                <div className="font-inter font-bold text-sm text-gray-900">Donor Advised Fund (DAF)</div>
                                <p className="font-inter text-xs text-gray-500 mt-1 leading-relaxed">
                                  Recommend a grant to <strong>Blockchain Education Network Inc.</strong> from your DAF (Fidelity Charitable, Schwab Charitable, etc). EIN: <span className="font-mono">46-5280397</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(0,0,0,0.03)" }}>
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-benorange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              <div>
                                <div className="font-inter font-bold text-sm text-gray-900">Stock &amp; Securities</div>
                                <p className="font-inter text-xs text-gray-500 mt-1 leading-relaxed">
                                  Donating appreciated stock avoids capital gains tax and lets you deduct the full market value. We accept public equities and mutual funds.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* The Giving Block widget */}
                        <div className="mb-4">
                          <span
                            onClick={() => window.open("https://thegivingblock.com/donate/blockchain-education-network", "_blank", "noopener,noreferrer")}
                            className="w-full flex items-center justify-center gap-2 font-inter font-semibold text-sm text-white py-3.5 rounded-xl transition-all duration-300 hover:shadow-md cursor-pointer"
                            style={{ backgroundColor: "#FF872A" }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                              <path d="M15 3h6v6" />
                              <path d="M10 14L21 3" />
                            </svg>
                            Donate via The Giving Block
                          </span>
                        </div>
                        <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,135,42,0.05)", border: "1px solid rgba(255,135,42,0.1)" }}>
                          <p className="font-inter text-xs text-gray-500 leading-relaxed">
                            <strong className="text-gray-700">For gifts over $20K</strong> or to coordinate a DAF/stock transfer, reach out directly and we&#39;ll guide you through it:
                          </p>
                          <a
                            href="mailto:finance@blockchainedu.org"
                            className="inline-flex items-center gap-1.5 font-inter font-semibold text-xs text-benorange-500 hover:text-yellow-600 transition-colors mt-2"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <path d="M22 7l-10 6L2 7" />
                            </svg>
                            finance@blockchainedu.org
                          </a>
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
            <div className="font-mont font-black text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400" style={{ letterSpacing: "-0.03em" }}><AnimatedCounter value={1000000} prefix="$" suffix="+" format={(n) => n >= 1000000 ? "1M" : n.toLocaleString()} /></div>
            <div className="font-inter text-sm uppercase tracking-widest mt-3" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em" }}>in donations &amp; grants received</div>
          </div>

          {/* Supporting stats — grid for mobile, flex for desktop */}
          <div className="grid grid-cols-3 gap-4 md:gap-10 max-w-md md:max-w-2xl mx-auto">
            <div className="text-center">
              <div className="font-mont font-black text-2xl sm:text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}><AnimatedCounter value={10} suffix="K+" /></div>
              <div className="font-inter text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Students</div>
            </div>
            <div className="text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="font-mont font-black text-2xl sm:text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}><AnimatedCounter value={200} suffix="+" /></div>
              <div className="font-inter text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Universities</div>
            </div>
            <div className="text-center">
              <div className="font-mont font-black text-2xl sm:text-3xl md:text-4xl text-white" style={{ letterSpacing: "-0.02em" }}><AnimatedCounter value={35} suffix="+" /></div>
              <div className="font-inter text-xs uppercase tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Countries</div>
            </div>
          </div>

          {/* Social proof — symmetric endorsement cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12" style={{ maxWidth: "640px", margin: "48px auto 0" }}>
            {[
              {
                avatar: <img src="/images/bullish-logo.svg" alt="Bullish" style={{ width: "36px", height: "36px", objectFit: "contain" }} />,
                amount: "$100,000",
                label: "donated to BEN",
                sub: "Bullish",
                url: "https://www.bullish.com/eu/news-insights/bullishs-trading-game-winnings-help-save-the-children-and-the-blockchain-education-network",
                external: true,
              },
              {
                avatar: <img src="/images/team/jeremy-gardner-new.jpeg" alt="Jeremy Gardner" className="rounded-full object-cover" style={{ width: "36px", height: "36px" }} />,
                amount: "$400,000",
                label: "donated by Co-Founder",
                sub: "Jeremy Gardner",
                url: "/blog/blockchain-education-challenge-jeremy-gardner",
                external: false,
              },
            ].map((card) => (
              <span
                key={card.sub}
                onClick={() => card.external ? window.open(card.url, "_blank", "noopener,noreferrer") : (window.location.href = card.url)}
                className="flex items-center gap-4 group rounded-2xl px-5 py-4 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: "44px", height: "44px", backgroundColor: "rgba(255,255,255,0.06)" }}>
                  {card.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-mont font-bold text-base text-white" style={{ letterSpacing: "-0.01em" }}>
                    {card.amount}
                  </div>
                  <div className="font-inter text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {card.sub} &middot; {card.label}
                  </div>
                  <div className="font-inter text-xs group-hover:text-benorange-500 transition-colors mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Read the story &rarr;
                  </div>
                </div>
              </span>
            ))}
          </div>

          {/* Student testimonial */}
          <div className="text-center mt-10 max-w-lg mx-auto">
            <p className="font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
              &ldquo;BEN helped me get exposure to new crypto concepts before mainstream. The experience to attend ETHDenver was invaluable. You&#39;re a trailblazer for the youth.&rdquo;
            </p>
            <span onClick={() => window.open("https://x.com/juellz3/status/1344754639560839169", "_blank", "noopener,noreferrer")} className="font-inter text-xs mt-2 inline-block hover:text-benorange-500 transition-colors cursor-pointer" style={{ color: "rgba(255,255,255,0.3)" }}>
              — @juellz3, BEN Member
            </span>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. STUDENT VIDEOS — Individual grid. Show 6, reveal rest.
             Apple principle: progressive disclosure.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6" style={{ backgroundColor: "#f5f5f7" }}>
        <div className="max-w-6xl mx-auto">
          {/* ── Mission header ── */}
          <div className="text-center mb-12 md:mb-16">
            <div
              className="inline-flex items-center gap-2 font-inter text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(255,135,42,0.08)", color: "#FF872A", border: "1px solid rgba(255,135,42,0.12)" }}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              The 10:10 Plan
            </div>
            <h2 className="font-mont font-black text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6" style={{ letterSpacing: "-0.03em", lineHeight: "1.1" }}>
              10 Million People.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">10 Years.</span>
            </h2>
            <p className="font-inter text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#86868b" }}>
              Since 2014, we&#39;ve been flying students to conferences, funding hackathons, matching them with jobs, and building blockchain communities on every continent. That was just the beginning. We&#39;re now building an academy and job board to train 10 million people in blockchain over the next decade, with scholarships so no student gets left behind. Your donation doesn&#39;t just fund a program. It changes the trajectory of someone&#39;s life.
            </p>

            {/* Founder quote — social proof */}
            <div className="flex items-center justify-center gap-3 mt-8 max-w-xl mx-auto">
              <img src="/images/team/jeremy-gardner-new.jpeg" alt="Jeremy Gardner" className="rounded-full object-cover flex-shrink-0" style={{ width: "44px", height: "44px" }} />
              <p className="font-inter text-sm text-left" style={{ color: "#86868b" }}>
                <span style={{ color: "#1d1d1f" }}>&ldquo;This org was critical to my success and I hope I will inspire others to give.&rdquo;</span>
                <br />
                <span className="text-xs">Jeremy Gardner, Co-Founder &middot; <span onClick={() => { window.location.href = "/blog/blockchain-education-challenge-jeremy-gardner"; }} className="text-benorange-500 cursor-pointer">Donated $400K to BEN</span></span>
              </p>
            </div>
          </div>

          {/* ── Featured videos — auto-advances, loops ── */}
          {(() => {
            const HERO_VIDEOS = [
              { id: "geBcmjzpqVY", label: "The BEN Story: From a Dorm Room to 200+ Universities", sub: "How a student-led movement became the world's largest blockchain education network", start: 7 },
              { id: visibleVideos[0], label: "10 Million People. One Mission.", sub: "The plan to bring blockchain education to every corner of the world" },
            ];
            const activeHero = playingVideo === HERO_VIDEOS[1].id ? 1 : 0;
            const current = HERO_VIDEOS[activeHero];
            const next = HERO_VIDEOS[1 - activeHero];
            return (
              <div className="mb-10 md:mb-14" style={{ maxWidth: "960px", margin: "0 auto" }}>
                <div
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio: "16/9",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)",
                  }}
                >
                  {playingVideo === current.id ? (
                    <iframe
                      id="hero-yt-player"
                      src={`https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${current.start ? `&start=${current.start}` : ""}`}
                      allow="autoplay; encrypted-media" allowFullScreen
                      className="absolute inset-0 w-full h-full" frameBorder="0"
                    />
                  ) : (
                    <button
                      onClick={() => setPlayingVideo(current.id)}
                      className="relative w-full h-full group"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${current.id}/maxresdefault.jpg`}
                        alt={current.label}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.15) 100%)" }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: "rgba(255,135,42,0.95)", boxShadow: "0 8px 32px rgba(255,135,42,0.4), 0 0 0 4px rgba(255,255,255,0.2)" }}
                        >
                          <svg className="w-8 h-8 md:w-10 md:h-10 text-white" style={{ marginLeft: "4px" }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                        <span className="inline-block font-mont font-bold text-white text-sm md:text-base" style={{ opacity: 0.95 }}>
                          {current.label}
                        </span>
                        <span className="block font-inter text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {current.sub}
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Up Next — switch to the other video */}
                <button
                  onClick={() => { setPlayingVideo(null); setTimeout(() => setPlayingVideo(next.id), 50); }}
                  className="flex items-center gap-4 mt-8 mb-6 mx-auto group"
                  style={{ maxWidth: "480px" }}
                >
                  <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: "200px", aspectRatio: "16/9" }}>
                    <img
                      src={`https://img.youtube.com/vi/${next.id}/mqdefault.jpg`}
                      alt={next.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="font-inter text-xs font-semibold uppercase tracking-wider" style={{ color: "#FF872A" }}>Up next</span>
                    <span className="block font-mont font-bold text-base text-gray-900 group-hover:text-benorange-500 transition-colors">{next.label}</span>
                    <span className="block font-inter text-xs mt-1" style={{ color: "#86868b" }}>{next.sub}</span>
                  </div>
                </button>
              </div>
            );
          })()}

          {/* ── Vision pillars ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {[
              { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Academy & Scholarships", desc: "Self-paced courses from zero to Solidity and full-stack web3. Students can apply for scholarships so talent is never blocked by tuition." },
              { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Job Board & Careers", desc: "We connect students with blockchain companies hiring right now. Internships, full-time roles, and the mentorship to actually land them." },
              { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Global Community", desc: "200+ universities across 35 countries. Hackathons, conferences, and campus clubs that turn curious students into founders." },
            ].map((pillar) => (
              <div key={pillar.title} className="text-center md:text-left px-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4" style={{ backgroundColor: "rgba(255,135,42,0.08)" }}>
                  <svg className="w-5 h-5" fill="none" stroke="#FF872A" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d={pillar.icon} />
                  </svg>
                </div>
                <h3 className="font-mont font-bold text-base text-gray-900 mb-2">{pillar.title}</h3>
                <p className="font-inter text-sm leading-relaxed" style={{ color: "#86868b" }}>{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Section transition: more stories ── */}
          <div className="text-center mt-16 md:mt-20 mb-10 md:mb-12" style={{ maxWidth: "960px", margin: "0 auto", paddingTop: "64px" }}>
            <h3 className="font-mont font-black text-2xl md:text-3xl text-gray-900">
              Student Testimonials &amp; Highlights
            </h3>
            <p className="font-inter text-sm mt-3" style={{ color: "#86868b" }}>
              Hear from students and see them represent BEN at global conferences
            </p>
          </div>

          {/* ── Grid of remaining videos ── */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4" style={{ maxWidth: "960px", margin: "0 auto" }}>
            {visibleVideos.slice(1).map((videoId) => (
              <div
                key={videoId}
                className="relative rounded-xl md:rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {playingVideo === videoId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    allow="autoplay; encrypted-media" allowFullScreen
                    className="absolute inset-0 w-full h-full" frameBorder="0"
                  />
                ) : (
                  <button onClick={() => setPlayingVideo(videoId)} className="relative w-full h-full group">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt="Student testimonial"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 50%)" }}
                    />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: "rgba(255,135,42,0.9)",
                          boxShadow: "0 4px 16px rgba(255,135,42,0.3), 0 0 0 3px rgba(255,255,255,0.15)",
                        }}
                      >
                        <svg className="w-4 h-4 md:w-6 md:h-6 text-white" style={{ marginLeft: "2px" }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* ── Show more ── */}
          {!showAllVideos && (
            <div className="text-center mt-10 md:mt-14">
              <button
                onClick={() => setShowAllVideos(true)}
                className="inline-flex items-center gap-2 font-inter font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300"
                style={{
                  color: "#FF872A",
                  backgroundColor: "rgba(255,135,42,0.08)",
                  border: "1px solid rgba(255,135,42,0.15)",
                }}
              >
                Show {VIDEO_IDS.length - 6} more videos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* ── Motivating CTA ── */}
          <div className="text-center mt-16 md:mt-20 pt-12 md:pt-16" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="font-inter text-base md:text-lg max-w-xl mx-auto mb-8" style={{ color: "#86868b" }}>
              Every one of these students started with a single opportunity someone believed in them enough to fund. A scholarship. A conference ticket. A hackathon that changed everything. <span className="text-gray-900 font-semibold">You can be that person for someone right now.</span>
            </p>
            <button
              onClick={scrollToDonate}
              className="inline-flex items-center gap-2 font-mont font-bold text-base md:text-lg px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg text-white"
              style={{
                backgroundColor: "#FF872A",
                boxShadow: "0 4px 24px rgba(255,135,42,0.3)",
              }}
            >
              Donate Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
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
                bioLabel="Our Story"
              />
            ))}
          </div>
          {!showAllStories && Stories.length > STORIES_INITIAL && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAllStories(true)}
                className="font-mont font-bold text-base text-white bg-benorange-500 px-8 py-3 rounded-full shadow-lg active:scale-95 transition-all duration-200 hover:bg-yellow-500"
                style={{ minHeight: "48px" }}
              >
                Show All {Stories.length} Stories &darr;
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
              <span key={i} onClick={() => window.open(card.href, "_blank", "noopener,noreferrer")}
                className="border border-gray-200 p-5 rounded-2xl hover:shadow-md hover:border-benorange-500 transition-all duration-300 group flex items-start gap-4 cursor-pointer">
                <Image width={56} height={56} src={card.icon} alt={card.title} />
                <div>
                  <div className="font-inter font-bold text-gray-900 text-base mb-1 group-hover:text-benorange-500 transition-colors">{card.title} {"\u2197"}</div>
                  <div className="font-inter text-sm text-gray-400">{card.desc}</div>
                </div>
              </span>
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
