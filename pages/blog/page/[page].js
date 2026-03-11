import React from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderWithLogoDark from "../../../components/headerWithLogoDark";
import Footer from "../../../components/footer";
import HeroNetwork from "../../../components/HeroNetwork";
import { getPostsPage } from "../../../lib/posts";

function formatDate(d) {
  const dt = new Date(d || "");
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
        <div className="blog-card-media">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-benorange-500"
              style={{ backgroundColor: "rgba(255, 135, 42, 0.08)" }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-5">
          {post.tags?.[0] ? (
            <span
              className="inline-block text-benorange-500 font-bold uppercase mb-2"
              style={{ fontSize: "10px", letterSpacing: "0.12em" }}
            >
              {post.tags[0].replace(/-/g, " ")}
            </span>
          ) : null}

          <h3 className="text-base font-bold text-black leading-snug group-hover:text-benorange-500 transition-colors font-mont">
            {post.title}
          </h3>

          <div
            className="mt-3 flex items-center text-xs font-inter"
            style={{ color: "rgba(0,0,0,0.4)", gap: "0.5rem" }}
          >
            <span>{formatDate(post.date)}</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </div>
    </Link>
  );
}

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const prevHref =
    currentPage <= 2 ? "/blog" : `/blog/page/${currentPage - 1}`;
  const nextHref = `/blog/page/${currentPage + 1}`;

  return (
    <div
      className="mt-12 flex items-center justify-center"
      style={{ gap: "1rem" }}
    >
      {currentPage > 1 ? (
        <Link
          href={prevHref}
          className="px-5 py-2.5 rounded-full text-sm font-semibold font-inter transition-all duration-200"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            color: "#202127",
          }}
        >
            ← Previous
        </Link>
      ) : (
        <span
          className="px-5 py-2.5 rounded-full text-sm font-semibold font-inter"
          style={{
            color: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          ← Previous
        </span>
      )}

      <span
        className="text-sm font-inter px-3"
        style={{ color: "rgba(0,0,0,0.4)" }}
      >
        {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={nextHref}
          className="px-5 py-2.5 rounded-full text-sm font-semibold font-inter transition-all duration-200"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            color: "#202127",
          }}
        >
            Next →
        </Link>
      ) : (
        <span
          className="px-5 py-2.5 rounded-full text-sm font-semibold font-inter"
          style={{
            color: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          Next →
        </span>
      )}
    </div>
  );
}

export default function BlogPage({ posts, pagination }) {
  return (
    <div id="blog-page">
      <HeaderWithLogoDark />
      <Head>
        <title>{`Blog - Page ${pagination.currentPage} | Blockchain Education Network`}</title>
        <meta
          name="description"
          content={`Founder interviews, market breakdowns and crypto careers from BEN — page ${pagination.currentPage} of ${pagination.totalPages}.`}
        />
        <link
          rel="canonical"
          href={`https://www.blockchainedu.org/blog/page/${pagination.currentPage}`}
        />
      </Head>

      <main>
        {/* ── Compact Hero ── */}
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
          <HeroNetwork />

          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-14 md:py-20 text-center" style={{ zIndex: 2 }}>
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-semibold uppercase px-4 py-1 rounded-full border mb-5 transition-all duration-200"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.5)",
                borderColor: "rgba(255,255,255,0.08)",
                letterSpacing: "0.18em",
                fontSize: "10px",
                gap: "0.4rem",
              }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                BEN Blog
            </Link>

            <h1
              className="font-mont text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              Page {pagination.currentPage}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                {" "}of {pagination.totalPages}
              </span>
            </h1>
          </div>
        </section>

        {/* ── Posts Grid ── */}
        <section
          className="py-16 md:py-20"
          style={{
            backgroundColor: "#f5f7f7",
            borderTop: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section
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

          <div className="relative max-w-2xl mx-auto px-6 sm:px-10 text-center">
            <h2 className="font-mont font-black text-2xl md:text-4xl text-white mb-4 leading-tight">
              Don&apos;t miss the next one.
            </h2>
            <p
              className="text-sm md:text-base max-w-md mx-auto mb-8 font-inter leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Founder interviews, market breakdowns, and career playbooks
              <br className="hidden sm:block" />
              delivered to your inbox every week.
            </p>

            <div className="max-w-sm mx-auto">
              <iframe
                src={`https://embeds.beehiiv.com/${process.env.NEXT_PUBLIC_BEEHIIV_EMBED_ID || "cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c"}?slim=true`}
                data-test-id="beehiiv-embed"
               
                height="52"
                frameBorder="0"
                scrolling="no"
                style={{
                  margin: 0,
                  borderRadius: "0px",
                  backgroundColor: "transparent",
                  width: "100%",
                }}
              />
              <p
                className="mt-2 text-xs font-inter"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Join 12,000+ subscribers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const PAGE_SIZE = 9;
  const { totalPages } = getPostsPage(1, PAGE_SIZE);

  const paths = [];
  for (let p = 2; p <= totalPages; p += 1) {
    paths.push({ params: { page: String(p) } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const PAGE_SIZE = 9;
  const page = Number(params?.page || 1) || 1;
  const { items, totalPages, currentPage } = getPostsPage(page, PAGE_SIZE);

  if (page <= 1) {
    return { redirect: { destination: "/blog", permanent: false } };
  }

  return {
    props: {
      posts: items,
      pagination: { totalPages, currentPage },
    },
    revalidate: 3600,
  };
}
