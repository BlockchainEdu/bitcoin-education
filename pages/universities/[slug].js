import React, { useEffect, useState, useMemo, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
import { TeamMemberService } from "../../services";
import styles from "../../styles/ben-network.module.css";
import { slugify } from "../../lib/slugify";
import {
  buildTitleToId,
  pickId,
  col,
  extractAssetIdFromFilesColumn,
  buildAssetsById,
  extractUrlFromMondayValue,
  parseTitleToRoleCompany,
  imgSrc,
  initialsFromName,
} from "../../lib/mondayHelpers";

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

const UNIVERSITIES_BOARD_ID = 18394872099;
const STUDENTS_BOARD_ID = 18398134588;

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

export default function UniversityPage({ university, students }) {
  const uniName = university?.name || "University";
  const uniLogo = university?.image || null;
  const slug = university?.slug || "";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white flex items-center justify-center overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              {uniLogo ? (
                <img src={imgSrc(uniLogo)} alt={uniName} className="w-full h-full object-contain p-2" loading="eager" />
              ) : (
                <span className="text-lg font-mont font-bold" style={{ color: "#9FA9B9" }}>
                  {initialsFromName(uniName)}
                </span>
              )}
            </div>
          </div>
          <h1 className="font-mont font-bold text-2xl sm:text-3xl tracking-tight text-benblack-500">
            {uniName}
          </h1>
          <p className="mt-2 font-inter text-sm" style={{ color: "#8e8e93" }}>
            {allStudents.length} alumni in the BEN network
          </p>
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
                }}
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
              </div>
            ))}
          </div>
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
  const universitiesQuery = `{
    boards (ids: ${UNIVERSITIES_BOARD_ID}) {
      columns { id title type }
      items_page (limit: 500) {
        items { name column_values { id value text } }
      }
    }
  }`;

  const uniRes = await TeamMemberService.getMembers({ query: universitiesQuery });
  const uniBoard = uniRes?.data?.data?.boards?.[0];
  const uniItems = uniBoard?.items_page?.items ?? [];
  const uniColumnsMap = buildTitleToId(uniBoard?.columns ?? []);
  const uniTitleId = pickId(uniColumnsMap, ["Title", "title", "Name"]) || "name";

  const paths = uniItems.map((it) => ({
    params: { slug: slugify(col(it, uniTitleId)?.text || it?.name || "") },
  })).filter((p) => p.params.slug);

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug || "";

  const uniQuery = `{
    boards (ids: ${UNIVERSITIES_BOARD_ID}) {
      items_page (limit: 500) {
        items { id name assets { id public_url } column_values { id value text } }
      }
    }
  }`;

  const uniRes = await TeamMemberService.getMembers({ query: uniQuery });
  const uniItems = uniRes?.data?.data?.boards?.[0]?.items_page?.items ?? [];

  const uniItem = uniItems.find((it) => slugify(it?.name || "") === slug);
  if (!uniItem) return { notFound: true, revalidate: 3600 };

  const uniTitle = uniItem?.name || "University";
  const remoteImg = uniItem?.assets?.[0]?.public_url || null;
  const logoExt = remoteImg && /\.png/i.test(remoteImg) ? ".png" : ".jpg";

  const university = {
    id: uniItem.id,
    name: uniTitle,
    image: `/images/universities/${slug}${logoExt}`,
    slug,
  };

  const titleId = "text";
  const universityColId = "text_mm059kda";
  const picturesId = "files";
  const linkedinId = "text2";
  const twitterId = "text4";

  const escapedName = uniTitle.replace(/"/g, '\\"');
  const studentsQuery = `{
    boards (ids: ${STUDENTS_BOARD_ID}) {
      items_page (limit: 500, query_params: {rules: [{column_id: "${universityColId}", compare_value: ["${escapedName}"]}]}) {
        cursor
        items { id name assets { id public_url } column_values { id value text } }
      }
    }
  }`;

  const studentsRes = await TeamMemberService.getMembers({ query: studentsQuery });
  const firstPage = studentsRes?.data?.data?.boards?.[0]?.items_page;
  let studentsItems = firstPage?.items ?? [];
  let cursor = firstPage?.cursor ?? null;

  while (cursor) {
    const nextRes = await TeamMemberService.getMembers({
      query: `{ next_items_page (limit: 500, cursor: "${cursor}") { cursor items { id name assets { id public_url } column_values { id value text } } } }`,
    });
    const nextPage = nextRes?.data?.data?.next_items_page;
    studentsItems = studentsItems.concat(nextPage?.items ?? []);
    cursor = nextPage?.cursor ?? null;
  }

  const students = studentsItems.map((it) => {
    const titleText = col(it, titleId)?.text ?? "";
    const { role, company } = parseTitleToRoleCompany(titleText);

    const ln = extractUrlFromMondayValue(col(it, linkedinId)) || col(it, linkedinId)?.text || null;
    const tw = extractUrlFromMondayValue(col(it, twitterId)) || col(it, twitterId)?.text || null;

    const picsCv = col(it, picturesId);
    const assetId = extractAssetIdFromFilesColumn(picsCv);
    const assetsById = buildAssetsById(it?.assets ?? []);
    const imgFromAssets =
      (assetId ? assetsById.get(assetId) : null) ||
      it?.assets?.[0]?.public_url ||
      null;
    const imgFallback = extractUrlFromMondayValue(picsCv) || picsCv?.text || null;

    return {
      id: it.id,
      name: it.name,
      role,
      company,
      image: imgFromAssets || imgFallback || null,
      linkedin: ln,
      twitter: tw,
    };
  });

  return { props: { university, students }, revalidate: 3600 };
}
