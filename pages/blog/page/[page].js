import React from "react";
import Head from "next/head";
import Link from "next/link";
import HeaderWithLogoDark from "../../../components/headerWithLogoDark";
import Footer from "../../../components/footer";
import NewsletterSignup from "../../../components/newsletterSignup";
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
    <Link href={`/blog/${post.slug}`}>
      <a className="group block rounded-2xl overflow-hidden bg-white border-2 border-black/30 hover:border-benorange-500/50 hover:shadow-lg transition-all duration-200">
        <div className="blog-card-media">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="group-hover:scale-[1.03] transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>

        <div className="p-5">
          {post.tags?.[0] ? (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-benorange-500 mb-2">
              {post.tags[0].replace(/-/g, " ")}
            </span>
          ) : null}

          <h3 className="text-base font-bold text-benblack-500 leading-snug group-hover:text-benorange-500 transition-colors">
            {post.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-xs text-bengrey-500">
            <span>{formatDate(post.date)}</span>
            <span className="opacity-40">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
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
    <div className="mt-12 flex items-center justify-center gap-4">
      {currentPage > 1 ? (
        <Link href={prevHref}>
          <a className="px-5 py-2.5 rounded-lg border-2 border-black/30 text-sm font-semibold text-benblack-500 hover:border-benorange-500/50 transition">
            ← Previous
          </a>
        </Link>
      ) : (
        <span className="px-5 py-2.5 rounded-lg border-2 border-black/10 text-sm font-semibold text-bengrey-500/40">
          ← Previous
        </span>
      )}

      <span className="text-sm text-bengrey-500 px-3">
        {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link href={nextHref}>
          <a className="px-5 py-2.5 rounded-lg border-2 border-black/30 text-sm font-semibold text-benblack-500 hover:border-benorange-500/50 transition">
            Next →
          </a>
        </Link>
      ) : (
        <span className="px-5 py-2.5 rounded-lg border-2 border-black/10 text-sm font-semibold text-bengrey-500/40">
          Next →
        </span>
      )}
    </div>
  );
}

function BlogHeader() {
  return (
    <div className="bg-white border-b-2 border-black/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-benblack-500">
              BEN <span className="text-benorange-500">Blog</span>
            </h1>
            <p className="mt-1.5 text-sm text-bengrey-500">
              From dorm rooms to billion-dollar protocols.
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-[320px]">
            <iframe
              src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true"
              data-test-id="beehiiv-embed"
              height="52"
              frameBorder="0"
              scrolling="no"
              style={{ margin: 0, borderRadius: "0px", backgroundColor: "transparent", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage({ posts, pagination }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
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

      <HeaderWithLogoDark />
      <BlogHeader />

      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />

          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </section>

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
