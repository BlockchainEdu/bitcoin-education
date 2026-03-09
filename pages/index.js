import React, { useMemo, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { TeamMemberService } from "../services";
import { slugify } from "../lib/slugify";
import {
  OFFICIAL_LINKS,
  FLOATING_ICONS,
  COMPANIES_FROM_BEN,
  FOUNDERS_AND_PROJECTS,
  UNICORNS,
  USERS,
  TESTIMONIALS,
} from "../content/ben-network.data";
import styles from "../styles/ben-network.module.css";

const BASE = "/images/ben-network";
const BENEVENTS_IMG = "/images/benevents.png";

const BG_BASE = "bg-benwhite-500";
const BG_WARM = "bg-[#FFFBF2]";
const BG_WHITE = "bg-white";

const FLOATING_POSITIONS = [
  { top: 10, left: 8 },
  { top: 14, left: 18 },
  { top: 8, left: 26 },
  { top: 8, left: 95 },
  { top: 10, left: 74 },
  { top: 12, left: 84 },
  { top: 26, left: 10 },
  { top: 30, left: 24 },
  { top: 75, left: 20 },
  { top: 80, left: 83 },
  { top: 29, left: 77 },
  { top: 26, left: 90 },
  { top: 46, left: 6 },
  { top: 44, left: 18 },
  { top: 80, left: 30 },
  { top: 82, left: 71 },
  { top: 48, left: 82 },
  { top: 41, left: 95 },
  { top: 65, left: 12 },
  { top: 60, left: 28 },
  { top: 86, left: 10 },
  { top: 88, left: 92 },
  { top: 62, left: 76 },
  { top: 60, left: 90 },
];

function imgSrc(path) {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return encodeURI(path);
}

function joinSrc(...parts) {
  const clean = parts
    .filter(Boolean)
    .map((p) => String(p).replace(/^\/+|\/+$/g, ""));
  return imgSrc("/" + clean.join("/"));
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

function LogoImage({
  primaryDir,
  file,
  alt,
  className,
  loading = "lazy",
  fallbackDirs = [],
  onLoad,
}) {
  const primary = joinSrc(BASE, primaryDir, file);
  const fallbacks = fallbackDirs.map((d) => joinSrc(BASE, d, file));

  return (
    <SmartImage
      src={primary}
      fallbackSrcs={fallbacks}
      alt={alt}
      className={className}
      loading={loading}
      onLoad={onLoad}
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
  if (total <= maxVisible)
    return Array.from({ length: total }, (_, i) => i + 1);

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

export default function BenNetwork({ universitiesGroups = [] }) {
  const onDominantBgLoad = useDominantBg();

  const floatingIcons = FLOATING_ICONS;
  const companiesFromBen = COMPANIES_FROM_BEN;
  const foundersAndProjects = FOUNDERS_AND_PROJECTS;
  const unicorns = UNICORNS;
  const users = USERS;
  const testimonials = TESTIMONIALS;

  const visibleUniGroups = useMemo(() => {
    return (universitiesGroups || [])
      .filter((g) => (g?.items?.length || 0) > 0)
      .map((g) => ({
        ...g,
        items: (g.items || []).filter((it) => it?.name),
      }));
  }, [universitiesGroups]);

  const allUniFlat = useMemo(() => {
    const out = [];
    visibleUniGroups.forEach((g) => {
      (g.items || []).forEach((it) => out.push({ ...it, groupId: g.id }));
    });
    return out;
  }, [visibleUniGroups]);

  const uniRankById = useMemo(() => {
    const m = new Map();
    allUniFlat.forEach((it, idx) => m.set(String(it.id), idx + 1));
    return m;
  }, [allUniFlat]);

  const PAGE_SIZE = 21;
  const [uniPage, setUniPage] = useState(1);
  const [navigatingTo, setNavigatingTo] = useState(null);

  useEffect(() => {
    setUniPage(1);
  }, [allUniFlat.length]);

  useEffect(() => {
    const onDone = () => setNavigatingTo(null);
    if (typeof window === "undefined") return;

    window.addEventListener("pageshow", onDone);
    return () => window.removeEventListener("pageshow", onDone);
  }, []);

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const uniTotal = allUniFlat.length;
  const uniTotalPages = Math.max(1, Math.ceil(uniTotal / PAGE_SIZE));
  const uniPageClamped = clamp(uniPage, 1, uniTotalPages);
  const uniStart = (uniPageClamped - 1) * PAGE_SIZE;
  const uniPaged = allUniFlat.slice(uniStart, uniStart + PAGE_SIZE);
  const uniPagesWindow = buildPageWindow(uniPageClamped, uniTotalPages, 5);

  return (
    <div className={`${styles.root} ${BG_BASE} min-h-screen text-benblack-500`}>
      <Head>
        <title>Blockchain Education Network (BEN) | The Largest Student Blockchain Community</title>
        <meta
          name="description"
          content="The Blockchain Education Network (BEN) is the largest and longest running network of blockchain students, professors, and alumni with 10,000+ students and alumni worldwide. Join us for education, events, jobs, and community."
        />
        <link rel="canonical" href="https://www.blockchainedu.org" />
        <meta property="og:title" content="Blockchain Education Network (BEN) | The Largest Student Blockchain Community" />
        <meta property="og:description" content="The largest and longest running network of blockchain students, professors, and alumni with 10,000+ students and alumni worldwide." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Blockchain Education Network",
              alternateName: "BEN",
              url: "https://www.blockchainedu.org",
              logo: "https://www.blockchainedu.org/images/ben-logo-color-no-slogan.svg",
              description: "The largest and longest running network of blockchain students, professors, and alumni with 10,000+ students and alumni worldwide.",
              sameAs: [
                "https://twitter.com/BlockchainEdu",
                "https://instagram.com/blockchainedu",
                "https://medium.com/blockchainedu",
                "https://www.youtube.com/c/BlockchainEdu",
                "https://www.linkedin.com/company/blockchain-education-network"
              ],
              foundingDate: "2014",
            }),
          }}
        />
      </Head>

      <HeaderWithLogoDark />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-benorange-100 opacity-90" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="floating-layer absolute inset-0">
          {floatingIcons.map((l, idx) => {
            const sizeVariant =
              idx % 9 === 0
                ? "xl"
                : idx % 5 === 0
                  ? "lg"
                  : idx % 3 === 0
                    ? "sm"
                    : "md";

            const p = FLOATING_POSITIONS[idx % FLOATING_POSITIONS.length];
            const v = `floatv${(idx % 3) + 1}`;
            const href = l.href || "#";
            const clickable = href && href !== "#";

            return (
              <a
                key={`${l.name}-${idx}`}
                href={href}
                target={clickable ? "_blank" : undefined}
                rel={clickable ? "noopener noreferrer" : undefined}
                aria-label={clickable ? `Abrir site de ${l.name}` : l.name}
                title={clickable ? `Abrir ${l.name}` : l.name}
                className={`floating-chip ${v} size-${sizeVariant} ${
                  clickable ? "is-clickable" : "is-disabled"
                }`}
                style={{ top: `${p.top}%`, left: `${p.left}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!clickable) e.preventDefault();
                }}
              >
                <div className="floating-chip-inner">
                  <LogoImage
                    primaryDir={l.dir || "companies-from-ben"}
                    fallbackDirs={[
                      "companies-from-ben",
                      "portfolio-companies",
                      "network-of-universities/row-1",
                      "network-of-universities/row-2",
                      "network-of-universities/row-3",
                      "network-of-universities/row-4",
                      "network-of-universities/row-5",
                      "network-of-universities/row-6",
                      "network-of-universities/row-7",
                    ]}
                    file={l.file}
                    className="floating-img"
                    alt={l.name}
                  />
                </div>
              </a>
            );
          })}
        </div>

        <div className="relative container mx-auto pt-24 pb-16 px-6 hero-content">
          <div className="hero-badge inline-flex items-center gap-4 rounded-full bg-white/70 backdrop-blur border-2 border-black/30 px-4 py-2 text-xs mb-6 shadow-sm">
            <span className="font-semibold">Proof of impact</span>
            <span className="opacity-70">
              $20B+ in value created, 10,000+ students in 35+ countries and 2.2M
              impressions on X
            </span>
          </div>

          <div className="max-w-xl mx-auto text-center hero-glass">
            <div className="hero-glass-content">
              <h1 className="flex justify-center leading-none">
                <img
                  src="/images/ben-network/ben-network-logo.png"
                  alt="BEN Network"
                  className="h-auto max-w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]"
                  style={{ width: "clamp(220px, 42vw, 560px)" }}
                  loading="eager"
                  decoding="async"
                />
              </h1>

              <p className="mt-5 text-base md:text-lg text-benblack-500/80 max-w-2xl mx-auto">
                A global network of student founders, alumni and companies built
                through the Blockchain Education Network
              </p>

              <div className="hero-media mt-8">
                <div className="benevents-card">
                  <div className="benevents-frame">
                    <img
                      src={BENEVENTS_IMG}
                      alt="BEN Events"
                      className="benevents-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="flex justify-center">
                  {users.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`User ${i + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-benorange -ml-2 object-cover"
                    />
                  ))}
                </div>

                <p className="mt-2 text-sm text-bengrey-500">
                  📡 Followed by 25k+ in Web3
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${BG_WARM} border-t border-black/5`}>
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Our formula for{" "}
              <span className="text-benorange-500">success</span>.
            </h2>

            <div className="mt-8 overflow-hidden shadow-sm border border-black/5 bg-black">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Lvs78FukfpI?rel=0&modestbranding=1"
                  title="Our formula for success"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${BG_WHITE} py-16 border-t border-black/5`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Who <span className="text-benorange-500">We</span> Are
            </h2>

            <p className="mt-4 text-sm md:text-base text-benblack-500/75 max-w-3xl mx-auto">
              BEN (est. 2014) is one of the largest and longest-running networks
              connecting blockchain students, professors, and alumni worldwide.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              {[
                "Founded in 2014 and built by student leaders.",
                "A global network connecting students, founders, and alumni.",
                "Helping founders launch and scale real projects.",
                "Community-led: students, professors, builders.",
                "Events, mentorship, and warm intros across the ecosystem.",
                "From universities to unicorns: a full-stack network.",
              ].map((text) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-benorange-500 shrink-0" />
                  <p className="text-sm md:text-base text-benblack-500/80">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                "/images/ben-network/ben-group-pic-1.jpg",
                "/images/ben-network/ben-group-pic-2.png",
                "/images/ben-network/ben-group-pic-3.png",
              ].map((src) => (
                <div
                  key={src}
                  className="rounded-xl overflow-hidden border border-black/5 bg-white"
                >
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <img
                      src={src}
                      alt="BEN community"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { value: "25k+", label: "X Followers" },
                { value: "8k+", label: "Newsletter" },
                { value: "4k+", label: "Students & Alumni" },
                { value: "15+", label: "Startups Founded" },
                { value: "60+", label: "Blockchain Clubs" },
                { value: "200+", label: "Schools" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white border border-black/5 px-4 py-5 text-center shadow-sm"
                >
                  <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-benblack-500/70">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${BG_WARM} border-t border-black/5`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-sm font-semibold tracking-wide text-benorange-500">
                BEN LEARN&apos;S SOLUTION
              </div>

              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                One scalable platform for{" "}
                <span className="text-benorange-500">education</span> +{" "}
                <span className="text-benorange-500">entrepreneurship</span>
              </h2>

              <p className="mt-5 text-base md:text-lg text-benblack-500/75 leading-relaxed">
                We believe the best way to start a project in Web3 is by
                combining education and entrepreneurship in one scalable
                platform to empower learners, identify their needs, and connect
                them with the right set of resources, scalable to thousands of
                potential learners.
              </p>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
                {[
                  {
                    src: "/images/ben-network/ben-learn-1.png",
                    pos: "top-0 left-10",
                  },
                  {
                    src: "/images/ben-network/ben-learn-2.png",
                    pos: "top-10 right-0",
                  },
                  {
                    src: "/images/ben-network/ben-learn-3.png",
                    pos: "bottom-10 left-0",
                  },
                  {
                    src: "/images/ben-network/ben-learn-4.png",
                    pos: "bottom-0 right-10",
                  },
                ].map((img) => (
                  <div
                    key={img.src}
                    className={`absolute ${img.pos} w-[170px] h-[170px] sm:w-[190px] sm:h-[190px]
                      rounded-full overflow-hidden border border-black/5 bg-white shadow-sm`}
                  >
                    <img
                      src={img.src}
                      alt="BEN Learn"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}

                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(255,122,0,0.28), transparent 60%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${BG_WHITE} border-t border-black/5`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Testimonials
              </h2>
            </header>

            <div className="testimonials-list">
              {testimonials.map((t) => (
                <div key={t.name} className="testimonial-row">
                  <div className="testimonial-avatar">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="testimonial-avatarImg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="testimonial-body">
                    <p className="testimonial-quote">“{t.quote}”</p>
                    <div className="testimonial-byline">
                      <span className="testimonial-name">{t.name}</span>
                      {t.title ? (
                        <span className="testimonial-title">, {t.title}</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${BG_WARM}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Class of 2025
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                Current builders and projects coming out of the network
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {companiesFromBen.slice(0, 18).map((c) => (
                <div key={c.name} className="mini-logo reveal">
                  <LogoImage
                    primaryDir={c.dir}
                    fallbackDirs={["portfolio-companies"]}
                    file={c.file}
                    alt={c.name}
                    className="mini-logo-img"
                  />
                  <div className="mt-2 text-xs font-semibold text-center">
                    {c.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="unicorns"
        className={`py-16 ${BG_WHITE} border-t border-black/5`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Unicorns and major companies 🦄
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A selection of well-known companies connected to the BEN
                ecosystem
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
              {unicorns.map((c) => (
                <div key={c.name} className="logo-card reveal">
                  <div className="logo-wrap">
                    <LogoImage
                      primaryDir={c.dir}
                      fallbackDirs={["companies-from-ben"]}
                      file={c.file}
                      alt={c.name}
                      className="logo-img"
                    />
                  </div>
                  <div className="mt-3">
                    <div className="text-sm font-semibold">{c.name}</div>
                    {c.tagline ? (
                      <div className="text-xs text-benblack-500/60">
                        {c.tagline}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 ${BG_WARM} border-t border-black/5`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                BEN founders and projects
              </h2>
              <p className="mt-2 text-sm text-benblack-500/70">
                A curated set of founders and projects shaped by the BEN
                community
              </p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foundersAndProjects.map((p) => {
                const href = p.href || "#";
                const clickable = href && href !== "#";

                return (
                  <div key={p.name} className="card-premium reveal">
                    <div className="flex items-start gap-4">
                      {p.logoFile ? (
                        <a
                          data-dominant-bg
                          href={href}
                          target={clickable ? "_blank" : undefined}
                          rel={clickable ? "noopener noreferrer" : undefined}
                          aria-label={
                            clickable ? `Abrir site de ${p.name}` : p.name
                          }
                          title={clickable ? `Abrir ${p.name}` : p.name}
                          className={`project-logo ${
                            clickable ? "cursor-pointer" : "cursor-default"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!clickable) e.preventDefault();
                          }}
                        >
                          <LogoImage
                            primaryDir="companies-from-ben"
                            fallbackDirs={["portfolio-companies"]}
                            file={p.logoFile}
                            alt={p.name}
                            className="project-logo-img"
                            onLoad={onDominantBgLoad}
                          />
                        </a>
                      ) : null}

                      <div>
                        <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                        <p className="text-sm text-benblack-500/70">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="universities"
        className={`${BG_WHITE} py-16 border-t border-black/5`}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <header className="uni-head">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Universities
              </h2>
            </header>

            <div className="uni-panel reveal">
              {uniTotal === 0 ? (
                <div className="uni-empty">Sem dados de Universities.</div>
              ) : (
                <>
                  <div className="uni-grid">
                    {uniPaged.map((u) => {
                      const globalRank = uniRankById.get(String(u.id)) || 0;
                      const badge = Number(u.peopleCount || 0);
                      const href = `/universities/${slugify(u.name)}`;
                      const isLoading = navigatingTo === u.id;

                      return (
                        <Link key={u.id} href={href} prefetch>
                          <a
                            className={`uni-item ${
                              isLoading ? "is-loading" : ""
                            }`}
                            title={u.name}
                            onClick={() => setNavigatingTo(u.id)}
                            aria-label={`Open ${u.name}`}
                          >
                            <div className="uni-rank">{globalRank}</div>

                            <div className="uni-logoWrap" data-dominant-bg>
                              {u.image ? (
                                <SmartImage
                                  src={imgSrc(u.image)}
                                  fallbackSrcs={[]}
                                  alt={u.name}
                                  className="uni-logoImg"
                                  loading="lazy"
                                  onLoad={onDominantBgLoad}
                                />
                              ) : (
                                <div
                                  className="uni-logoFallback"
                                  aria-label={u.name}
                                >
                                  {initialsFromName(u.name)}
                                </div>
                              )}
                            </div>

                            <div className="uni-name">
                              {u.name}
                              {isLoading ? (
                                <div className="uni-loading">Loading...</div>
                              ) : null}
                            </div>

                            <div className="uni-badgeWrap">
                              <span
                                className={`uni-badge ${
                                  badge > 0 ? "" : "is-zero"
                                }`}
                                aria-label={`Number of People: ${badge}`}
                                title={`Number of People: ${badge}`}
                                onClick={(e) => e.preventDefault()}
                              >
                                <svg
                                  className="uni-badgeIcon"
                                  viewBox="0 0 24 24"
                                  width="14"
                                  height="14"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M16 11c1.66 0 3-1.79 3-4s-1.34-4-3-4-3 1.79-3 4 1.34 4 3 4ZM8 11c1.66 0 3-1.79 3-4S9.66 3 8 3 5 4.79 5 7s1.34 4 3 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45v2h6v-2c0-2.66-5.33-3.5-7-3.5Z"
                                  />
                                </svg>
                                <span className="uni-badgeNum">{badge}</span>
                              </span>
                            </div>
                          </a>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="uni-footerMeta uni-footerMeta--pager">
                    <div className="uni-pager">
                      <button
                        className="uni-pagerBtn"
                        onClick={() =>
                          setUniPage(
                            clamp(uniPageClamped - 1, 1, uniTotalPages),
                          )
                        }
                        disabled={uniPageClamped <= 1}
                        aria-label="Página anterior"
                        title="Anterior"
                      >
                        ‹
                      </button>

                      <div
                        className="uni-pageNums"
                        role="navigation"
                        aria-label="Paginação"
                      >
                        {uniPagesWindow.map((pNum) => (
                          <button
                            key={pNum}
                            className={`uni-pageNum ${
                              pNum === uniPageClamped ? "is-active" : ""
                            }`}
                            onClick={() => setUniPage(pNum)}
                            aria-label={`Ir para página ${pNum}`}
                          >
                            {pNum}
                          </button>
                        ))}
                      </div>

                      <button
                        className="uni-pagerBtn"
                        onClick={() =>
                          setUniPage(
                            clamp(uniPageClamped + 1, 1, uniTotalPages),
                          )
                        }
                        disabled={uniPageClamped >= uniTotalPages}
                        aria-label="Próxima página"
                        title="Próxima"
                      >
                        ›
                      </button>
                    </div>

                    <div className="uni-pageJump">
                      <span className="uni-pageLabel">Page</span>
                      <input
                        className="uni-pageInput"
                        type="number"
                        min={1}
                        max={uniTotalPages}
                        value={uniPageClamped}
                        onChange={(e) => {
                          const v = Number(e.target.value || 1);
                          if (!Number.isFinite(v)) return;
                          setUniPage(clamp(v, 1, uniTotalPages));
                        }}
                        onBlur={(e) => {
                          const v = Number(e.target.value || 1);
                          setUniPage(clamp(v, 1, uniTotalPages));
                        }}
                        aria-label="Selecionar página"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
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
      groups { id title }
      items_page (limit: 500) {
        items {
          id
          name
          group { id title }
          assets { id public_url }
          column_values { id value text }
        }
      }
    }
  }`;

  const uniRes = await TeamMemberService.getMembers({ query: universitiesQuery });

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

  const groupsIndex = new Map(
    (uniBoard?.groups ?? []).map((g, idx) => [String(g.id), idx]),
  );

  const groupBuckets = new Map();

  for (const item of uniItems) {
    const groupId = String(item?.group?.id || "unknown");
    const groupTitle = item?.group?.title || "Other";

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

    if (!groupBuckets.has(groupId)) {
      groupBuckets.set(groupId, {
        id: groupId,
        title: groupTitle,
        items: [],
      });
    }

    groupBuckets.get(groupId).items.push({
      id: item.id,
      name: item.name,
      image: imgFromAssets || imgFallback || null,
      peopleCount,
    });
  }

  const universitiesGroups = Array.from(groupBuckets.values()).sort((a, b) => {
    const ai = groupsIndex.has(String(a.id))
      ? groupsIndex.get(String(a.id))
      : 9999;
    const bi = groupsIndex.has(String(b.id))
      ? groupsIndex.get(String(b.id))
      : 9999;
    return ai - bi;
  });

  return {
    props: { universitiesGroups },
    revalidate: 3600,
  };
}
