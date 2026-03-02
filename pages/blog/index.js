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
      <a className="group block rounded-2xl overflow-hidden bg-white border border-black/5 hover:border-black/10 transition">
        <div className="blog-card-media">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="group-hover:scale-[1.02] transition-transform"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>

        <div className="p-5">
          <div className="text-xs text-bengrey-500 flex items-center gap-2">
            <span>{formatDate(post.date)}</span>
            <span className="opacity-40">•</span>
            <span>{post.readingMinutes} min</span>
          </div>

          <h3 className="mt-2 text-[15px] font-semibold text-benblack-500 leading-snug">
            {post.title}
          </h3>

          {post.excerpt ? (
            <p className="mt-2 text-sm text-bengrey-500 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </a>
    </Link>
  );
}

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const prevHref = currentPage <= 2 ? "/blog" : `/blog/page/${currentPage - 1}`;
  const nextHref = `/blog/page/${currentPage + 1}`;

  return (
    <div className="mt-10 flex items-center justify-center gap-6 text-sm text-bengrey-500">
      {currentPage > 1 ? (
        <Link href={prevHref}>
          <a className="hover:text-benblack-500">← Prev</a>
        </Link>
      ) : (
        <span className="opacity-30">← Prev</span>
      )}

      <span className="text-benblack-500/70">
        Page {currentPage} / {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={nextHref}>
          <a className="hover:text-benblack-500">Next →</a>
        </Link>
      ) : (
        <span className="opacity-30">Next →</span>
      )}
    </div>
  );
}

export default function BlogIndexPage({ featured, rest, pagination }) {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Blog | BEN</title>
      </Head>

      <HeaderWithLogoDark />

      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-black/5 px-4 py-2 text-xs shadow-sm">
              <span className="font-semibold">Articles</span>
              <span className="opacity-70">Updates, recaps and stories</span>
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-benblack-500">
              BEN <span className="text-benorange-500">Stories</span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-bengrey-500">
              One featured story, plus the latest posts below.
            </p>
          </div>

          {featured ? (
            <div className="mt-10">
              <Link href={`/blog/${featured.slug}`}>
                <a className="group grid grid-cols-1 md:grid-cols-2 gap-6 rounded-3xl overflow-hidden border border-black/5 hover:border-black/10 transition bg-white">
                  <div className="blog-card-media bg-bengrey-100 overflow-hidden">
                    {featured.cover ? (
                      <img
                        src={featured.cover}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="text-xs text-bengrey-500 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-benorange-500">
                        Featured
                      </span>
                      <span className="opacity-40">•</span>
                      <span>{formatDate(featured.date)}</span>
                      <span className="opacity-40">•</span>
                      <span>{featured.readingMinutes} min</span>
                    </div>

                    <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-benblack-500 leading-tight">
                      {featured.title}
                    </h2>

                    {featured.excerpt ? (
                      <p className="mt-3 text-base text-bengrey-500 leading-relaxed">
                        {featured.excerpt}
                      </p>
                    ) : null}

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-benorange-500">
                      Read article <span className="opacity-60">→</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ) : null}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const PAGE_SIZE = 7;
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
