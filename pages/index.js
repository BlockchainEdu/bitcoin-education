import React, { useMemo, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { TeamMemberService } from "../services";
import { slugify } from "../lib/slugify";
import { USERS } from "../content/ben-network.data";
import styles from "../styles/ben-network.module.css";

const BENEVENTS_IMG = "/images/benevents-opt.jpg";

function imgSrc(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return encodeURI(path);
}

function extractDominantColor(imgEl) {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    const SIZE = 48;
    canvas.width = SIZE;
    canvas.height = SIZE;

    ctx.drawImage(imgEl, 0, 0, SIZE, SIZE);
    const { data } = ctx.getImageData(0, 0, SIZE, SIZE);

    const buckets = new Map();
    const STEP = 24;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 200) continue;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      if (max < 20 && min < 20) continue;

      const qr = Math.round(r / STEP) * STEP;
      const qg = Math.round(g / STEP) * STEP;
      const qb = Math.round(b / STEP) * STEP;

      const key = `${qr},${qg},${qb}`;
      buckets.set(key, (buckets.get(key) || 0) + 1);
    }

    let top = null;
    let maxCount = 0;

    for (const [color, count] of buckets) {
      if (count > maxCount) {
        maxCount = count;
        top = color;
      }
    }

    if (!top) return null;
    return `rgb(${top})`;
  } catch {
    return null;
  }
}

function useRemoteBlobSrc(src) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    let revoked = false;
    let currentObjectUrl = null;
    const controller = new AbortController();

    async function run() {
      setBlobUrl(null);

      if (!src) return;

      const isRemote = /^https?:\/\//i.test(src);
      if (!isRemote) {
        setBlobUrl(null);
        return;
      }

      try {
        const res = await fetch(src, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) return;

        const blob = await res.blob();
        currentObjectUrl = URL.createObjectURL(blob);
        if (!revoked) setBlobUrl(currentObjectUrl);
      } catch {}
    }

    run();

    return () => {
      revoked = true;
      controller.abort();
      if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    };
  }, [src]);

  return blobUrl;
}

function SmartImage({
  src,
  fallbackSrcs = [],
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  onLoad,
  onFinalError,
}) {
  const [current, setCurrent] = useState(src || null);

  useEffect(() => {
    setCurrent(src || null);
  }, [src]);

  const blobSrc = useRemoteBlobSrc(current);
  const resolvedSrc = blobSrc || current || "";

  const handleError = () => {
    const candidates = [src, ...fallbackSrcs].filter(Boolean);
    const idx = candidates.findIndex((x) => x === current);
    const next =
      idx >= 0 ? candidates.slice(idx + 1).find(Boolean) : candidates[0];

    if (next && next !== current) {
      setCurrent(next);
      return;
    }

    onFinalError?.();
  };

  if (!current) return null;

  return (
    <img
      src={resolvedSrc}
      onError={handleError}
      onLoad={onLoad}
      alt={alt || ""}
      className={className}
      loading={loading}
      decoding={decoding}
    />
  );
}

function useDominantBg() {
  return useCallback((e) => {
    const img = e.currentTarget;
    const wrap = img?.closest?.("[data-dominant-bg]");
    if (!wrap) return;
    const c = extractDominantColor(img);
    if (c) wrap.style.setProperty("--logo-bg", c);
  }, []);
}

function initialsFromName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const a = parts[0]?.[0] || "?";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (a + b).toUpperCase();
}

function safeJsonParse(value) {
  if (!value || typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function buildTitleToId(columns = []) {
  const map = new Map();
  columns.forEach((c) => {
    if (c?.id && c?.title) map.set(c.title.trim().toLowerCase(), c.id);
  });
  return map;
}

function pickId(map, titles) {
  for (const t of titles) {
    const id = map.get(String(t).toLowerCase());
    if (id) return id;
  }
  return null;
}

function col(item, id) {
  return item?.column_values?.find((c) => c.id === id) ?? null;
}

function extractUrlFromMondayValue(cv) {
  const raw = cv?.value ?? cv?.text;
  const parsed = safeJsonParse(raw);

  const url =
    parsed?.url ||
    parsed?.link?.url ||
    parsed?.link?.url?.url ||
    parsed?.files?.[0]?.url ||
    parsed?.files?.[0]?.public_url ||
    parsed?.files?.[0]?.publicUrl ||
    null;

  return url || null;
}

function extractAssetIdFromFilesColumn(cv) {
  const parsed = safeJsonParse(cv?.value);
  const id = parsed?.files?.[0]?.assetId;
  return id ? String(id) : null;
}

function buildAssetsById(assets = []) {
  const m = new Map();
  assets.forEach((a) => {
    if (a?.id && a?.public_url) m.set(String(a.id), a.public_url);
  });
  return m;
}

function parseNumberFromMonday(cv) {
  const parsed = safeJsonParse(cv?.value);
  if (typeof parsed === "number") return parsed;
  if (parsed?.number != null) return Number(parsed.number) || 0;
  const n = Number(String(cv?.text || "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function buildPageWindow(current, total, maxVisible = 5) {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = current - half;
  let end = current + half;

  if (maxVisible % 2 === 0) end -= 1;

  if (start < 1) {
    start = 1;
    end = maxVisible;
  }

  if (end > total) {
    end = total;
    start = total - maxVisible + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function sortUniversitiesDesc(items = []) {
  return [...items].sort((a, b) => {
    const peopleDiff =
      Number(b?.peopleCount || 0) - Number(a?.peopleCount || 0);
    if (peopleDiff !== 0) return peopleDiff;
    return String(a?.name || "").localeCompare(String(b?.name || ""));
  });
}

function chunkUniversitiesForColumns(items = [], columnCount = 3) {
  if (!items.length) return [];

  const rowsPerColumn = Math.ceil(items.length / columnCount);
  const columns = [];

  for (let colIndex = 0; colIndex < columnCount; colIndex += 1) {
    const start = colIndex * rowsPerColumn;
    const end = start + rowsPerColumn;
    columns.push(items.slice(start, end));
  }

  return columns;
}

export default function BenNetwork({ universities = [] }) {
  const router = useRouter();
  const onDominantBgLoad = useDominantBg();

  const users = USERS;

  const allUniFlat = useMemo(() => {
    return sortUniversitiesDesc((universities || []).filter((it) => it?.name));
  }, [universities]);

  const uniRankById = useMemo(() => {
    const m = new Map();
    allUniFlat.forEach((it, idx) => m.set(String(it.id), idx + 1));
    return m;
  }, [allUniFlat]);

  const PAGE_SIZE = 24;
  const [uniPage, setUniPage] = useState(1);
  const [uniSearch, setUniSearch] = useState("");
  const [navigatingTo, setNavigatingTo] = useState(null);

  // Crossfade carousel for About section
  const aboutImages = [
    BENEVENTS_IMG,                                    // Coinvention group
    "/images/ben-network/ben-group-pic-19.jpg",       // India group selfie
    "/images/ben-network/ben-group-pic-1.jpg",        // Mainnet conference group
    "/images/ben-network/ben-group-pic-17.jpg",       // Madrid street selfie
    "/images/ben-network/ben-group-pic-13.jpg",       // Turkey amphitheater 40+ people
    "/images/ben-network/ben-group-pic-22.jpg",       // TNABC stage group (pro photo)
    "/images/ben-network/ben-group-pic-3.jpg",        // ETH Boston large group
    "/images/ben-network/ben-group-pic-18.jpg",       // Africa campus group w/ banner
    "/images/ben-network/ben-group-pic-14.jpg",       // SF Blockchain Week letters
    "/images/ben-network/ben-group-pic-28.jpg",       // Portugal BEN shirts outdoors
    "/images/ben-network/ben-group-pic-4.jpg",        // Group on blue LED stage
    "/images/ben-network/ben-group-pic-20.jpg",       // La Conexion Argentina audience
    "/images/ben-network/ben-group-pic-5.jpg",        // Blockchain Center Miami
    "/images/ben-network/ben-group-pic-30.jpg",       // Prague Dai Dappy Hour group
    "/images/ben-network/ben-group-pic-10.jpg",       // DApperNetwork meetup
    "/images/ben-network/ben-group-pic-21.jpg",       // Colombia presentation audience
    "/images/ben-network/ben-group-pic-24.jpg",       // Beach group casual
    "/images/ben-network/ben-group-pic-11.jpg",       // West Africa WAD Alliance
    "/images/ben-network/ben-group-pic-25.jpg",       // TNABC BEN students group
    "/images/ben-network/ben-group-pic-15.jpg",       // DCentral Miami students
    "/images/ben-network/ben-group-pic-29.jpg",       // Italy Digital Hub panel
    "/images/ben-network/ben-group-pic-9.jpg",        // College Crypto Network (legacy)
    "/images/ben-network/ben-group-pic-23.jpg",       // Miami sponsor backdrop group
    "/images/ben-network/ben-group-pic-12.jpg",       // WAD Alliance close-up
    "/images/ben-network/ben-group-pic-27.jpg",       // Erick presenting BEN Regions
    "/images/ben-network/ben-group-pic-2.jpg",        // Sabanci University BEN flag
    "/images/ben-network/ben-group-pic-31.jpg",       // CharityStars BEN booth
    "/images/ben-network/ben-group-pic-16.jpg",       // Workshop classroom scene
    "/images/ben-network/ben-group-pic-26.jpg",       // Hackathon working scene
  ];
  const [aboutIdx, setAboutIdx] = useState(0);
  const [aboutPrev, setAboutPrev] = useState(aboutImages.length - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutPrev((prev) => (prev + 1) % aboutImages.length);
      setAboutIdx((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setUniPage(1);
  }, [allUniFlat.length, uniSearch]);

  useEffect(() => {
    const onDone = () => setNavigatingTo(null);
    if (typeof window === "undefined") return;

    window.addEventListener("pageshow", onDone);
    return () => window.removeEventListener("pageshow", onDone);
  }, []);

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const uniFiltered = useMemo(() => {
    if (!uniSearch.trim()) return allUniFlat;
    const q = uniSearch.trim().toLowerCase();
    return allUniFlat.filter((u) => u.name.toLowerCase().includes(q));
  }, [allUniFlat, uniSearch]);

  const isSearching = uniSearch.trim().length > 0;
  const uniTotal = allUniFlat.length;
  const uniFilteredTotal = uniFiltered.length;
  const uniTotalPages = Math.max(1, Math.ceil(uniFilteredTotal / PAGE_SIZE));
  const uniPageClamped = clamp(uniPage, 1, uniTotalPages);
  const uniStart = (uniPageClamped - 1) * PAGE_SIZE;
  const uniPaged = uniFiltered.slice(uniStart, uniStart + PAGE_SIZE);
  const uniPagesWindow = buildPageWindow(uniPageClamped, uniTotalPages, 5);

  // Top 3 only shown on page 1 without search
  const showPodium = !isSearching && uniPageClamped === 1;
  const uniTop3 = showPodium ? uniPaged.slice(0, 3) : [];
  const uniRest = showPodium ? uniPaged.slice(3) : uniPaged;

  return (
    <div className={`${styles.root} min-h-screen text-benblack-500`}>
      <Head>
        <title>Blockchain Education Network — 10K+ Students, 200+ Universities, 35 Countries</title>
        <meta name="description" content="The world's largest university blockchain network. Join 10,000+ students and alumni building the future of web3 across 200+ campuses. Courses, scholarships, hackathons, conferences, and jobs." />
        <link rel="canonical" href="https://www.blockchainedu.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/" />
        <meta property="og:title" content="Blockchain Education Network — The Largest University Blockchain Network" />
        <meta property="og:description" content="10,000+ students and alumni building the future of web3 across 200+ universities in 35 countries. Courses, scholarships, hackathons, conferences, and jobs." />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blockchain Education Network — 10K+ Students, 200+ Universities" />
        <meta name="twitter:description" content="The world's largest university blockchain network. Courses, scholarships, hackathons, conferences & jobs for students and alumni." />
        <meta name="twitter:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
      </Head>

      <HeaderWithLogoDark />

      {/* ── HERO ── Deep charcoal with warm glow */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(165deg, #1a1b20 0%, #202127 40%, #1a1b20 100%)" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 40%, rgba(255,135,42,0.12) 0%, transparent 50%)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-10 pt-28 pb-16 sm:pt-32 md:pt-40 sm:pb-20 md:pb-28 text-center">
          {/* Pill badge — wraps gracefully on small screens */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-2 text-xs font-inter mb-6 sm:mb-8" style={{ backgroundColor: "rgba(255,135,42,0.12)", border: "1px solid rgba(255,135,42,0.25)", color: "rgba(255,255,255,0.85)" }}>
            <span style={{ color: "#FF872A" }} className="font-semibold">Est. 2014</span>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
            <span className="hidden sm:inline">The largest student blockchain network</span>
          </div>

          {/* Logo text */}
          <h1 className="font-mont font-black tracking-tight mb-4 sm:mb-6 md:mb-8" style={{ fontSize: "clamp(2.5rem, 10vw, 6rem)", lineHeight: 1 }}>
            <span className="text-white">ben</span>
            <span className="text-benorange-500">network</span>
          </h1>

          <p className="font-inter text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2" style={{ color: "rgba(255,255,255,0.7)" }}>
            A global network of student founders, alumni, and companies built through the Blockchain Education Network.
          </p>

          {/* Stats — 2x2 grid on mobile, single row on desktop */}
          <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-6 sm:gap-10 md:gap-16 max-w-xs sm:max-w-none mx-auto">
            {[
              { value: "$20B+", label: "Value created" },
              { value: "10,000+", label: "Students" },
              { value: "200+", label: "Universities" },
              { value: "35+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-mont font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">{s.value}</div>
                <div className="mt-1 text-xs font-inter uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* User avatars */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center">
            <div className="hero-users">
              {users.map((src, i) => (
                <img key={i} src={src} alt={`Community member ${i + 1}`} className="hero-user-avatar" />
              ))}
            </div>
            <p className="mt-3 text-xs sm:text-sm font-inter" style={{ color: "rgba(255,255,255,0.5)" }}>
              Followed by 25k+ in Web3
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT BEN ── Single clean section, one image, breathing room */}
      <section style={{ backgroundColor: "#FFFBF2" }} className="py-16 sm:py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-10">
          {/* About text + image beside it */}
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-inter font-semibold tracking-wide uppercase" style={{ backgroundColor: "rgba(255,135,42,0.08)", color: "#FF872A" }}>
                About BEN
              </span>
              <h2 className="mt-4 sm:mt-5 font-mont font-bold text-2xl sm:text-3xl md:text-4xl text-benblack-500 tracking-tight leading-tight">
                From dorm rooms to{" "}
                <span className="text-benorange-500">billion-dollar protocols</span>
              </h2>
              <p className="mt-5 sm:mt-6 font-inter text-sm sm:text-base leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                Founded in 2014, BEN is one of the largest and longest-running networks connecting blockchain students, professors, and alumni worldwide. We help founders launch and scale real projects through events, mentorship, and warm intros across the ecosystem.
              </p>
              {/* Stats */}
              <div className="grid grid-cols-4 mt-10" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: "1.5rem" }}>
                {[
                  { num: "10k", suffix: "+", label: "Students & alumni" },
                  { num: "200", suffix: "+", label: "Universities" },
                  { num: "35", suffix: "+", label: "Countries" },
                  { num: "15", suffix: "+", label: "Alumni startups" },
                ].map((s, i) => (
                  <div key={s.label} style={i > 0 ? { borderLeft: "1px solid rgba(0,0,0,0.06)", paddingLeft: "1rem" } : {}}>
                    <div className="font-mont font-black text-2xl sm:text-3xl tracking-tight" style={{ color: "#1d1d1f", lineHeight: 1 }}>
                      {s.num}<span style={{ color: "#FF872A" }}>{s.suffix}</span>
                    </div>
                    <div className="font-inter mt-1.5" style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", letterSpacing: "0.01em", lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Crossfade image — only 2 images in DOM at a time for iOS performance */}
            <div className="flex justify-center">
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ maxWidth: "440px", aspectRatio: "4 / 3", boxShadow: "0 16px 48px rgba(0,0,0,0.06)" }}>
                {/* Outgoing image */}
                <img
                  key={`prev-${aboutPrev}`}
                  src={aboutImages[aboutPrev]}
                  alt="BEN community"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: aboutPrev === aboutIdx ? 1 : 0, transition: "opacity 1.2s ease-in-out" }}
                  decoding="async"
                  loading="lazy"
                />
                {/* Incoming image */}
                <img
                  key={`curr-${aboutIdx}`}
                  src={aboutImages[aboutIdx]}
                  alt="BEN community"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 1, transition: "opacity 1.2s ease-in-out" }}
                  decoding="async"
                  loading="lazy"
                />
                {/* Preload next image */}
                <link rel="prefetch" href={aboutImages[(aboutIdx + 1) % aboutImages.length]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEN ACADEMY ── Clean text-forward section, no image grid */}
      <section className="bg-white py-16 sm:py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-5 sm:px-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-inter font-semibold tracking-wide uppercase" style={{ backgroundColor: "rgba(255,135,42,0.08)", color: "#FF872A" }}>
            BEN Academy
          </span>
          <h2 className="mt-5 font-mont font-bold text-3xl sm:text-4xl md:text-5xl text-benblack-500 tracking-tight leading-tight">
            From zero to{" "}
            <span className="text-benorange-500">Web3 career</span>
          </h2>
          <p className="mt-5 sm:mt-6 font-inter text-base sm:text-lg leading-relaxed mx-auto" style={{ color: "rgba(0,0,0,0.45)", maxWidth: "540px" }}>
            Self-paced courses from blockchain basics to full-stack Solidity. A job board that connects graduates with companies hiring now. Scholarships so talent is never blocked by tuition.
          </p>

          {/* Three pillars — icon-driven, no photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 mt-12 sm:mt-16">
            {[
              { icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", title: "Courses", desc: "Blockchain basics to Solidity. Learn at your own pace." },
              { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Job Board", desc: "Companies hiring Web3 talent. Internships and full-time." },
              { icon: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342", title: "Scholarships", desc: "Apply for funding. Talent should never be blocked by tuition." },
            ].map((pillar) => (
              <div key={pillar.title}>
                <div className="mx-auto mb-4 flex items-center justify-center rounded-2xl" style={{ width: "56px", height: "56px", backgroundColor: "rgba(255,135,42,0.08)" }}>
                  <svg className="w-6 h-6 text-benorange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d={pillar.icon} />
                  </svg>
                </div>
                <h3 className="font-mont font-bold text-base text-benblack-500">{pillar.title}</h3>
                <p className="mt-2 font-inter text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.4)" }}>{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3">
            <span
              onClick={() => router.push("/learn")}
              className="inline-flex items-center gap-2 font-mont font-bold text-sm text-white px-7 py-3.5 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: "#FF872A" }}
            >
              Explore Courses
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
            </span>
            <span
              onClick={() => router.push("/donate")}
              className="inline-flex items-center gap-2 font-mont font-bold text-sm px-7 py-3.5 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ color: "#FF872A", border: "2px solid rgba(255,135,42,0.3)" }}
            >
              Fund a Scholarship
            </span>
          </div>
        </div>
      </section>

      {/* ── UNIVERSITIES ── Premium leaderboard */}
      <section id="universities" style={{ backgroundColor: "#eeeef0" }} className="py-14 sm:py-20 md:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-10 overflow-hidden">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-inter font-semibold tracking-wide uppercase" style={{ backgroundColor: "rgba(255,135,42,0.08)", color: "#FF872A" }}>
              Global Reach
            </span>
            <h2 className="mt-4 sm:mt-5 font-mont font-bold text-3xl sm:text-4xl md:text-5xl text-benblack-500 tracking-tight">
              University Network
            </h2>
            <p className="mt-3 sm:mt-4 font-inter text-sm sm:text-base max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.45)" }}>
              {uniTotal} universities and blockchain clubs across 35+ countries
            </p>
          </div>

          <div className="uni-panel">
            {/* Search */}
            <div className="uni-search">
              <svg className="uni-searchIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                className="uni-searchInput"
                type="text"
                placeholder="Search universities..."
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
              />
            </div>

            {uniFilteredTotal === 0 ? (
              <div className="uni-empty">No universities found for &ldquo;{uniSearch}&rdquo;</div>
            ) : (
              <>
                {/* Top 3 podium cards */}
                {showPodium && uniTop3.length > 0 && (
                  <>
                    <div className="uni-podium">
                      {uniTop3.map((u, i) => {
                        const badge = Number(u.peopleCount || 0);
                        const href = `/universities/${slugify(u.name)}`;
                        const isLoading = navigatingTo === u.id;
                        const rankColors = ["#FF872A", "#64748b", "#a1785c"];
                        return (
                          <div
                            key={u.id}
                            className={`uni-podiumCard ${isLoading ? "is-loading" : ""}`}
                            onClick={() => { setNavigatingTo(u.id); router.push(href); }}
                            style={{ cursor: "pointer" }}
                          >
                              <div className="uni-podiumRank" style={{ backgroundColor: rankColors[i] }}>
                                {i + 1}
                              </div>
                              <div className="uni-podiumLogo" data-dominant-bg>
                                {u.image ? (
                                  <SmartImage
                                    src={imgSrc(u.image)}
                                    fallbackSrcs={[]}
                                    alt={u.name}
                                    loading="eager"
                                    onLoad={onDominantBgLoad}
                                  />
                                ) : (
                                  <div className="uni-cardLogoFallback">{initialsFromName(u.name)}</div>
                                )}
                              </div>
                              <div className="uni-podiumName">{u.name}</div>
                              <div className="uni-podiumCount">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                  <circle cx="9" cy="7" r="4" />
                                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                  <path d="M16 3.13a4 4 0 010 7.75" />
                                </svg>
                                {badge} members
                              </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="uni-divider" />
                  </>
                )}

                {/* Card grid */}
                <div className="uni-grid">
                  {uniRest.map((u) => {
                    const globalRank = uniRankById.get(String(u.id)) || 0;
                    const badge = Number(u.peopleCount || 0);
                    const href = `/universities/${slugify(u.name)}`;
                    const isLoading = navigatingTo === u.id;

                    return (
                      <div
                        key={u.id}
                        className={`uni-card ${isLoading ? "is-loading" : ""}`}
                        onClick={() => { setNavigatingTo(u.id); router.push(href); }}
                        style={{ cursor: "pointer" }}
                      >
                          <div className="uni-cardRank">{globalRank}</div>
                          <div className="uni-cardLogo" data-dominant-bg>
                            {u.image ? (
                              <SmartImage
                                src={imgSrc(u.image)}
                                fallbackSrcs={[]}
                                alt={u.name}
                                className="uni-cardLogoImg"
                                loading="lazy"
                                onLoad={onDominantBgLoad}
                              />
                            ) : (
                              <div className="uni-cardLogoFallback">{initialsFromName(u.name)}</div>
                            )}
                          </div>
                          <div className="uni-cardBody">
                            <div className="uni-cardName">{u.name}</div>
                            <div className="uni-cardCount">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                                <path d="M16 3.13a4 4 0 010 7.75" />
                              </svg>
                              {badge}
                            </div>
                          </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {uniTotalPages > 1 && (
                  <div className="uni-pagerWrap">
                    <button
                      className="uni-pagerBtn"
                      onClick={() => setUniPage(clamp(uniPageClamped - 1, 1, uniTotalPages))}
                      disabled={uniPageClamped <= 1}
                      aria-label="Previous page"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    {uniPagesWindow.map((pNum) => (
                      <button
                        key={pNum}
                        className={`uni-pageNum ${pNum === uniPageClamped ? "is-active" : ""}`}
                        onClick={() => setUniPage(pNum)}
                      >
                        {pNum}
                      </button>
                    ))}

                    <button
                      className="uni-pagerBtn"
                      onClick={() => setUniPage(clamp(uniPageClamped + 1, 1, uniTotalPages))}
                      disabled={uniPageClamped >= uniTotalPages}
                      aria-label="Next page"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                )}

                {/* Result count */}
                {isSearching && (
                  <div className="uni-resultCount">
                    {uniFilteredTotal} {uniFilteredTotal === 1 ? "university" : "universities"} found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-16 sm:py-24 md:py-32" style={{ backgroundColor: "#202127" }}>
        <div className="absolute inset-0" style={{ opacity: 0.1, backgroundImage: "radial-gradient(ellipse at 50% 100%, #FF872A 0%, transparent 50%)" }} aria-hidden="true" />
        <div className="relative max-w-xl mx-auto px-5 sm:px-10 text-center">
          <h2 className="font-mont font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Build with us.
          </h2>
          <p className="mt-4 sm:mt-5 font-inter text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
            Join 10,000+ students, alumni, and founders across 35 countries shaping the future of Web3.
          </p>
          {/* Full-width stacked buttons on mobile, side-by-side on sm+ */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <span
              onClick={() => router.push("/opportunities#apply")}
              className="inline-flex items-center justify-center gap-2 font-mont font-bold text-sm text-white px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: "#FF872A", boxShadow: "0 4px 24px rgba(255,135,42,0.3)" }}
            >
              Join BEN
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
            </span>
            <span
              onClick={() => router.push("/blog")}
              className="inline-flex items-center justify-center gap-2 font-mont font-bold text-sm px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              Read Our Blog
            </span>
          </div>
          <p className="mt-5 sm:mt-6 font-inter text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Join 12,000+ subscribers.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const universitiesQuery = `{
    boards (ids: 18394872099) {
      id
      columns { id title type }
      items_page (limit: 500) {
        items {
          id
          name
          assets { id public_url }
          column_values { id value text }
        }
      }
    }
  }`;

  const uniRes = await TeamMemberService.getMembers({
    query: universitiesQuery,
  });

  const uniBoard = uniRes?.data?.data?.boards?.[0];
  const uniItems = uniBoard?.items_page?.items ?? [];
  const uniColumnsMap = buildTitleToId(uniBoard?.columns ?? []);

  const uniPicturesId =
    pickId(uniColumnsMap, ["Pictures", "files", "pictures"]) || "files";

  const uniPeopleId =
    pickId(uniColumnsMap, [
      "Number of People",
      "number of people",
      "People",
      "people",
      "Number",
      "numbers",
    ]) || "numbers";

  const universities = sortUniversitiesDesc(
    uniItems.map((item) => {
      const picsCv = col(item, uniPicturesId);
      const assetId = extractAssetIdFromFilesColumn(picsCv);
      const assetsById = buildAssetsById(item?.assets ?? []);
      const imgFromAssets =
        (assetId ? assetsById.get(assetId) : null) ||
        item?.assets?.[0]?.public_url ||
        null;

      const imgFallback =
        extractUrlFromMondayValue(picsCv) || picsCv?.text || null;

      const peopleCount = parseNumberFromMonday(col(item, uniPeopleId));

      // Use local logo file instead of slow Monday.com S3 signed URLs
      const slug = slugify(item.name);
      const remoteUrl = imgFromAssets || imgFallback || null;
      const ext = remoteUrl && /\.png/i.test(remoteUrl) ? ".png" : ".jpg";
      const localImage = `/images/universities/${slug}${ext}`;

      return {
        id: item.id,
        name: item.name,
        image: localImage,
        peopleCount,
      };
    }),
  );

  return {
    props: { universities },
    revalidate: 3600,
  };
}
