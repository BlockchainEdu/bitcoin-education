import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Head from "next/head";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
import styles from "../../styles/ben-network.module.css";
import {
  parseTitleToRoleCompany,
  imgSrc,
  initialsFromName,
} from "../../lib/helpers";

const PER_PAGE = 24;

function Avatar({ src, name, size }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);

  const px = size || 72;
  const style = { width: px, height: px, minWidth: px };

  if (!src || failed) {
    return (
      <div
        className="rounded-full flex items-center justify-center font-mont font-bold text-white"
        style={{ ...style, backgroundColor: "#d1d5db", fontSize: px * 0.32 }}
        aria-label={name || "Avatar"}
      >
        {initialsFromName(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name || ""}
      className="rounded-full object-cover"
      style={style}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

// Pinned members who should appear first on specific university pages
const PINNED_MEMBERS = {
  "university-of-florida": [
    {
      id: "pinned-antonio",
      name: "Antonio Gomes",
      role: "President & GP, BEN Ventures",
      company: "Advisory Board, UF Blockchain Lab",
      image: "/images/team/antonio-photo.jpg",
      linkedin: "https://www.linkedin.com/in/antoniogomes/",
      twitter: "https://x.com/antoniogomes",
      pinned: true,
    },
    {
      id: "pinned-perianne",
      name: "Perianne Boring",
      role: "Founder & Chair",
      company: "The Digital Chamber",
      image: "/images/people/perianne-boring.jpg",
      linkedin: "https://www.linkedin.com/in/perianne-boring-43363991",
      twitter: null,
      pinned: true,
    },
    {
      id: "pinned-marko",
      name: "Marko Suvajdzic",
      role: "Director, UF Blockchain Lab",
      company: "Associate Professor, Digital Arts & Sciences",
      image: "/images/people/marko-suvajdzic.png",
      linkedin: "https://www.linkedin.com/in/markosuvajdzic/",
      twitter: null,
      pinned: true,
    },
  ],
};

function ProfileModal({ person, onClose }) {
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Trigger entrance animation
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 240);
  }, [onClose]);

  if (!person) return null;

  const hasRole = person.role || person.company;
  const roleText = [person.role, person.company].filter(Boolean).join(", ");

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      className="fixed inset-0 flex items-end sm:items-center justify-center"
      style={{
        zIndex: 9999,
        backgroundColor: visible ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)",
        transition: "background-color 0.24s ease",
        WebkitBackdropFilter: "blur(8px)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="relative w-full sm:max-w-md"
        style={{
          backgroundColor: "#fff",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 20,
          boxShadow: "0 25px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)",
          transform: visible ? "translateY(0)" : "translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.32s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.24s ease",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Top handle (mobile sheet indicator) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div style={{ width: 36, height: 5, borderRadius: 3, backgroundColor: "rgba(0,0,0,0.12)" }} />
        </div>

        {/* Close pill */}
        <button
          onClick={handleClose}
          className="absolute flex items-center justify-center transition-colors sm:hidden"
          style={{
            top: 16,
            right: 16,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "rgba(0,0,0,0.06)",
            zIndex: 10,
          }}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Desktop close */}
        <button
          onClick={handleClose}
          className="hidden sm:flex absolute items-center justify-center rounded-full transition-colors"
          style={{
            top: 18,
            right: 18,
            width: 32,
            height: 32,
            backgroundColor: "rgba(0,0,0,0.05)",
            zIndex: 10,
          }}
          aria-label="Close"
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)"; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Card content */}
        <div className="pt-8 sm:pt-10">

          {/* Avatar */}
          <div className="flex justify-center px-10">
            <div style={{
              borderRadius: "50%",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "3px solid #fff",
              outline: "1px solid rgba(0,0,0,0.04)",
            }}>
              <Avatar src={person.image ? imgSrc(person.image) : null} name={person.name} size={96} />
            </div>
          </div>

          {/* Name — the hero */}
          <div className="px-10 mt-6 text-center">
            <h2
              className="font-mont font-black"
              style={{
                fontSize: 28,
                lineHeight: 1.1,
                color: "#1d1d1f",
                letterSpacing: "-0.03em",
              }}
            >
              {person.name}
            </h2>

            {hasRole && (
              <p
                className="font-inter mt-2"
                style={{
                  fontSize: 15,
                  lineHeight: 1.4,
                  color: "#86868b",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {person.role}
                {person.role && person.company && (
                  <span style={{ color: "#d2d2d7" }}>{" / "}</span>
                )}
                {person.company}
              </p>
            )}
          </div>

          {/* Bio */}
          {person.bio && (
            <div className="px-10 mt-7">
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)" }} />
              <p
                className="font-inter"
                style={{
                  marginTop: 24,
                  fontSize: 15,
                  lineHeight: 1.73,
                  color: "#1d1d1f",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {person.bio}
              </p>
            </div>
          )}

          {/* Social row — quiet, at the bottom */}
          {(person.linkedin || person.twitter) && (
            <div className="px-10" style={{ marginTop: person.bio ? 28 : 32 }}>
              <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)" }} />
              <div className="flex items-center justify-center gap-6" style={{ paddingTop: 20, paddingBottom: 28 }}>
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-inter transition-colors"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#0077B5",
                      letterSpacing: "-0.01em",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15">
                      <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05C12 8.88 13.57 7.7 15.94 7.7 20.02 7.7 21 10.29 21 14.1V23h-4v-7.9c0-1.88-.04-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.16V23h-4V8Z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {person.linkedin && person.twitter && (
                  <div style={{ width: 1, height: 16, backgroundColor: "rgba(0,0,0,0.08)" }} />
                )}
                {person.twitter && (
                  <a
                    href={person.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-inter transition-colors"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#1d1d1f",
                      letterSpacing: "-0.01em",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path fill="currentColor" d="M18.244 2H21l-6.54 7.47L22.5 22h-6.6l-5.17-6.77L4.8 22H2l7.06-8.07L1.5 2h6.77l4.67 6.12L18.244 2Zm-1.16 18h1.83L7.27 3.9H5.31L17.084 20Z" />
                    </svg>
                    {(person.twitter || "").split("/").pop()}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Bottom spacing when no social */}
          {!person.linkedin && !person.twitter && <div style={{ height: 32 }} />}

        </div>
      </div>
    </div>
  );
}

export default function UniversityPage({ university, students }) {
  const uniName = university?.name || "University";
  const uniLogo = university?.image || null;
  const slug = university?.slug || "";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Merge pinned members at the top, avoiding duplicates
  const allStudents = useMemo(() => {
    const pinned = PINNED_MEMBERS[slug] || [];
    if (!pinned.length) return students;
    const pinnedNames = new Set(pinned.map((p) => p.name.toLowerCase()));
    const rest = students.filter((s) => !pinnedNames.has(s.name?.toLowerCase()));
    return [...pinned, ...rest];
  }, [students, slug]);

  const filtered = useMemo(() => {
    if (!search.trim()) return allStudents;
    const q = search.toLowerCase();
    return allStudents.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) ||
        a.role?.toLowerCase().includes(q) ||
        a.company?.toLowerCase().includes(q)
    );
  }, [allStudents, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  useEffect(() => setPage(1), [search]);

  const goTo = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Build visible page numbers (max 5 around current)
  const pageNums = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const nums = [1];
    let start = Math.max(2, safePage - 1);
    let end = Math.min(totalPages - 1, safePage + 1);
    if (safePage <= 3) { start = 2; end = 4; }
    if (safePage >= totalPages - 2) { start = totalPages - 3; end = totalPages - 1; }
    if (start > 2) nums.push(null);
    for (let i = start; i <= end; i++) nums.push(i);
    if (end < totalPages - 1) nums.push(null);
    nums.push(totalPages);
    return nums;
  }, [totalPages, safePage]);

  return (
    <div className={`${styles.root} min-h-screen`} style={{ backgroundColor: "#f8f8fa" }}>
      <Head>
        <title>{uniName} | BEN Network</title>
        <meta name="robots" content="index,follow" />
        <meta name="description" content={`${allStudents.length} alumni from ${uniName} in the BEN Network - the largest university blockchain community.`} />
      </Head>

      <HeaderWithLogoDark />

      {/* Hero header */}
      <div className="border-b" style={{ backgroundColor: "#fff", borderColor: "rgba(0,0,0,0.06)" }}>
        <div className="max-w-3xl mx-auto px-5 py-10 sm:py-14 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-white flex items-center justify-center overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              {uniLogo ? (
                <img src={imgSrc(uniLogo)} alt={uniName} className="w-full h-full object-contain p-4" loading="eager" />
              ) : (
                <span className="text-5xl font-mont font-bold" style={{ color: "#9FA9B9" }}>
                  {initialsFromName(uniName)}
                </span>
              )}
            </div>
          </div>
          <h1 className="font-mont font-bold text-5xl sm:text-7xl tracking-tight text-benblack-500">
            {uniName}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        {/* Search */}
        {allStudents.length > 8 && (
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(0,0,0,0.3)" }}
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search alumni..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search alumni"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl font-inter text-sm focus:outline-none"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              />
            </div>
            {search && (
              <p className="mt-2 text-xs font-inter text-center" style={{ color: "#8e8e93" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}

        {/* People card grid */}
        {visible.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {visible.map((a) => (
              <div
                key={a.id || a.name}
                className="rounded-2xl flex flex-col items-center text-center px-4 py-6 sm:py-8 transition-all duration-300"
                style={{
                  backgroundColor: a.pinned ? "#FFFBF5" : "#fff",
                  border: a.pinned ? "1.5px solid rgba(255,135,42,0.25)" : "1px solid rgba(0,0,0,0.05)",
                  cursor: a.bio ? "pointer" : "default",
                }}
                onClick={() => a.bio && setSelectedPerson(a)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Avatar
                  src={a.image ? imgSrc(a.image) : null}
                  name={a.name}
                  size={96}
                />
                <div className="mt-4 w-full min-w-0">
                  <div className="font-mont font-semibold text-sm sm:text-base text-benblack-500 leading-tight" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {a.name}
                  </div>
                  {(a.role || a.company) && (
                    <div className="font-inter text-xs sm:text-sm mt-1.5 leading-snug" style={{ color: "#8e8e93", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {a.role}{a.role && a.company ? ", " : ""}{a.company}
                    </div>
                  )}
                </div>
                {(a.linkedin || a.twitter) && (
                  <div className="flex items-center gap-2.5 mt-4">
                    {a.linkedin && (
                      <a
                        href={a.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-full transition-colors"
                        style={{ width: 34, height: 34, backgroundColor: "rgba(0,0,0,0.04)" }}
                        aria-label={`LinkedIn - ${a.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" style={{ color: "#666" }}>
                          <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7 0h3.83v2.05h.05C12 8.88 13.57 7.7 15.94 7.7 20.02 7.7 21 10.29 21 14.1V23h-4v-7.9c0-1.88-.04-4.29-2.61-4.29-2.61 0-3.01 2.04-3.01 4.16V23h-4V8Z" />
                        </svg>
                      </a>
                    )}
                    {a.twitter && (
                      <a
                        href={a.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-full transition-colors"
                        style={{ width: 34, height: 34, backgroundColor: "rgba(0,0,0,0.04)" }}
                        aria-label={`X - ${a.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" width="13" height="13" style={{ color: "#666" }}>
                          <path fill="currentColor" d="M18.244 2H21l-6.54 7.47L22.5 22h-6.6l-5.17-6.77L4.8 22H2l7.06-8.07L1.5 2h6.77l4.67 6.12L18.244 2Zm-1.16 18h1.83L7.27 3.9H5.31L17.084 20Z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
                {a.bio && (
                  <div className="mt-3 font-inter text-xs" style={{ color: "#FF872A" }}>
                    View profile
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Profile modal */}
        {selectedPerson && (
          <ProfileModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
        )}

        {/* Empty states */}
        {filtered.length === 0 && search && (
          <div className="rounded-2xl py-16 text-center" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="font-inter text-sm" style={{ color: "#8e8e93" }}>
              No results for &ldquo;{search}&rdquo;
            </p>
          </div>
        )}
        {allStudents.length === 0 && (
          <div className="rounded-2xl py-16 text-center" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
            <p className="font-inter text-sm" style={{ color: "#8e8e93" }}>
              No alumni listed yet.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => goTo(Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              className="flex items-center justify-center rounded-xl font-inter text-sm transition-colors disabled:opacity-25"
              style={{ width: 40, height: 40, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#fff", color: "#333" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {pageNums.map((p, i) =>
              p === null ? (
                <span key={`dots-${i}`} className="px-1 text-xs" style={{ color: "#8e8e93" }}>...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => goTo(p)}
                  className="font-inter text-xs font-medium rounded-xl transition-colors"
                  style={{
                    width: 40,
                    height: 40,
                    color: p === safePage ? "#fff" : "#555",
                    backgroundColor: p === safePage ? "#FF872A" : "#fff",
                    border: p === safePage ? "none" : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goTo(Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              className="flex items-center justify-center rounded-xl font-inter text-sm transition-colors disabled:opacity-25"
              style={{ width: 40, height: 40, border: "1px solid rgba(0,0,0,0.08)", backgroundColor: "#fff", color: "#333" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Footer count */}
        {!search && allStudents.length > PER_PAGE && (
          <p className="mt-4 text-center font-inter text-xs" style={{ color: "#c7c7cc" }}>
            Page {safePage} of {totalPages}
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const { supabase } = await import("../../lib/supabase");

  if (!supabase) return { paths: [], fallback: "blocking" };

  const { data: unis } = await supabase
    .from("universities")
    .select("slug");

  const paths = (unis || [])
    .filter((u) => u.slug)
    .map((u) => ({ params: { slug: u.slug } }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug || "";
  const { supabase } = await import("../../lib/supabase");
  const fs = await import("fs");
  const path = await import("path");

  if (!supabase) return { notFound: true, revalidate: 3600 };

  // Fetch university
  const { data: uni } = await supabase
    .from("universities")
    .select("id, name, slug, image_url")
    .eq("slug", slug)
    .single();

  if (!uni) return { notFound: true, revalidate: 3600 };

  const university = {
    id: String(uni.id),
    name: uni.name,
    image: uni.image_url,
    slug: uni.slug,
  };

  // Load bio data from static JSON
  let bios = {};
  try {
    const biosPath = path.join(process.cwd(), "content", "student-bios.json");
    bios = JSON.parse(fs.readFileSync(biosPath, "utf-8"));
  } catch (_) {}

  // Fetch students for this university
  const { data: studentRows } = await supabase
    .from("students")
    .select("id, name, title, image_url, linkedin, twitter")
    .eq("university", uni.name)
    .order("name");

  const students = (studentRows || []).map((s) => {
    const { role, company } = parseTitleToRoleCompany(s.title || "");
    const bioData = bios[String(s.id)];
    return {
      id: String(s.id),
      name: s.name,
      role,
      company,
      image: s.image_url || null,
      linkedin: s.linkedin || null,
      twitter: s.twitter || null,
      bio: bioData?.bio || null,
    };
  });

  return { props: { university, students }, revalidate: 3600 };
}
