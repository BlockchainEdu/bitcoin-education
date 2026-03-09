import React from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
import { getPostsPage } from "../../lib/posts";

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
    <Link href={`/blog/${post.slug}`}>
      <a
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
      </a>
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
        <Link href={prevHref}>
          <a
            className="px-5 py-2.5 rounded-full text-sm font-semibold font-inter transition-all duration-200"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#202127",
            }}
          >
            ← Previous
          </a>
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
        <Link href={nextHref}>
          <a
            className="px-5 py-2.5 rounded-full text-sm font-semibold font-inter transition-all duration-200"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#202127",
            }}
          >
            Next →
          </a>
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

export default function BlogIndexPage({ featured, rest, pagination }) {
  return (
    <div id="blog-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Blog | Blockchain Education Network</title>
        <meta
          name="description"
          content="Founder interviews, market breakdowns and crypto career resources from the Blockchain Education Network. 200+ schools, 60+ clubs, 35+ countries."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/blog" />
        <meta property="og:type" content="blog" />
        <meta
          property="og:title"
          content="Blog | Blockchain Education Network"
        />
        <meta
          property="og:description"
          content="Founder interviews, market breakdowns and crypto career resources from BEN."
        />
        <meta
          property="og:url"
          content="https://www.blockchainedu.org/blog"
        />
      </Head>

      <main>
        {/* ── Hero Section ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          {/* Subtle orange glow */}
          <div
            className="absolute inset-0"
            style={{
              opacity: 0.07,
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, #FF872A 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #FF872A 0%, transparent 50%)",
            }}
          />
          {/* Grid pattern overlay */}
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
              BEN Blog
            </span>

            <h1
              className="font-mont text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.08 }}
            >
              Ideas from the people
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-benorange-500 to-yellow-400">
                building what comes next.
              </span>
            </h1>

            <p
              className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-inter"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Founder interviews, market breakdowns, and crypto
              <br className="hidden sm:block" />
              career playbooks — straight from the network.
            </p>

            {/* Newsletter inline */}
            <div className="mt-8 max-w-sm mx-auto">
              <iframe
                src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true"
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
                Free weekly newsletter. No spam.
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="mt-10 flex justify-center">
              <div
                className="w-5 h-8 rounded-full flex items-start justify-center pt-2"
                style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
              >
                <div
                  className="w-1 rounded-full animate-bounce"
                  style={{
                    height: "8px",
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Post ── */}
        {featured ? (
          <section
            className="py-16 md:py-20"
            style={{ backgroundColor: "#FFFBF2" }}
          >
            <div className="max-w-5xl mx-auto px-6 sm:px-10">
              <div className="text-center mb-10">
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
                  Featured
                </div>
              </div>

              <Link href={`/blog/${featured.slug}`}>
                <a
                  className="group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden transition-all duration-200"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="overflow-hidden">
                    {featured.cover ? (
                      <img
                        src={featured.cover}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        style={{ minHeight: "280px" }}
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center text-benorange-500"
                        style={{
                          minHeight: "280px",
                          backgroundColor: "rgba(255, 135, 42, 0.08)",
                        }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                    {featured.tags?.[0] ? (
                      <span
                        className="inline-block text-benorange-500 font-bold uppercase mb-3"
                        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                      >
                        {featured.tags[0].replace(/-/g, " ")}
                      </span>
                    ) : null}

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-black leading-tight group-hover:text-benorange-500 transition-colors font-mont">
                      {featured.title}
                    </h2>

                    {featured.excerpt ? (
                      <p
                        className="mt-3 text-sm sm:text-base leading-relaxed font-inter line-clamp-3"
                        style={{ color: "rgba(0,0,0,0.55)" }}
                      >
                        {featured.excerpt}
                      </p>
                    ) : null}

                    <div
                      className="mt-4 flex items-center text-xs font-inter"
                      style={{ color: "rgba(0,0,0,0.4)", gap: "0.75rem" }}
                    >
                      <span>{formatDate(featured.date)}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{featured.readingMinutes} min read</span>
                    </div>

                    <div
                      className="mt-5 inline-flex items-center text-sm font-bold text-benorange-500 font-inter"
                      style={{ gap: "0.5rem" }}
                    >
                      Read article
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </section>
        ) : null}

        {/* ── Latest Posts ── */}
        <section
          className="py-16 md:py-20"
          style={{
            backgroundColor: "#f5f7f7",
            borderTop: "1px solid rgba(0,0,0,0.04)",
          }}
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
                Latest
              </div>
              <h2 className="font-mont font-black text-3xl md:text-4xl text-black mb-3">
                Recent posts
              </h2>
              <p className="text-bengrey-500 text-sm md:text-base max-w-md mx-auto font-inter leading-relaxed">
                Playbooks, founder stories, and market analysis from the BEN
                network.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
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
                src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true"
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
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const PAGE_SIZE = 9;
  const { items, totalPages, currentPage } = getPostsPage(1, PAGE_SIZE);

  const featured = items.find((p) => p.featured) || items[0] || null;
  const rest = items.filter((p) => p.slug !== featured?.slug);

  return {
    props: {
      featured,
      rest,
      pagination: { totalPages, currentPage },
    },
    revalidate: 3600,
  };
}
