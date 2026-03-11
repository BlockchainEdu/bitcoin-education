import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
import HeroNetwork from "../../components/HeroNetwork";
import { getAllPostsMeta, getPostBySlug } from "../../lib/posts";

function formatDate(d) {
  const dt = new Date(d || "");
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleSkeleton() {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <div className="h-4 w-24 mx-auto bg-white rounded-lg animate-pulse" style={{ opacity: 0.1 }} />
        <div className="mt-8 h-10 w-3/4 mx-auto bg-white rounded-xl animate-pulse" style={{ opacity: 0.1 }} />
        <div className="mt-4 h-4 w-1/3 mx-auto bg-white rounded-lg animate-pulse" style={{ opacity: 0.1 }} />
      </div>
    </div>
  );
}

export default function ArticlePage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>
        <Head>
          <title>Loading… | BEN</title>
        </Head>
        <HeaderWithLogoDark />
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          <ArticleSkeleton />
        </section>
        <Footer />
      </div>
    );
  }

  if (!post?.meta) {
    return (
      <div>
        <Head>
          <title>Not found | BEN</title>
        </Head>
        <HeaderWithLogoDark />
        <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center">
            <h1 className="font-mont text-3xl font-black text-white">
              Article not found
            </h1>
            <div className="mt-6">
              <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition-all duration-200">
                  ← Back to Blog
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const { meta, contentHtml } = post;
  const SITE_URL = "https://www.blockchainedu.org";
  const pageUrl = `${SITE_URL}/blog/${meta.slug}`;
  const coverUrl = meta.cover?.startsWith("http")
    ? meta.cover
    : `${SITE_URL}${meta.cover}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.excerpt || "",
    image: meta.cover || "",
    datePublished: meta.date,
    author: {
      "@type": meta.author === "The BEN Team" ? "Organization" : "Person",
      name: meta.author || "The BEN Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Blockchain Education Network",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/ben-logo-color-no-slogan.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <div id="blog-article-page">
      <Head>
        <title>{meta.title} | BEN</title>
        {meta.excerpt ? (
          <meta name="description" content={meta.excerpt} />
        ) : null}
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        {meta.excerpt ? (
          <meta property="og:description" content={meta.excerpt} />
        ) : null}
        <meta property="og:url" content={pageUrl} />
        {meta.cover ? (
          <meta property="og:image" content={coverUrl} />
        ) : null}
        <meta property="article:published_time" content={meta.date} />
        <meta
          property="article:author"
          content={meta.author || "The BEN Team"}
        />
        {meta.tags?.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        {meta.excerpt ? (
          <meta name="twitter:description" content={meta.excerpt} />
        ) : null}
        {meta.cover ? (
          <meta name="twitter:image" content={coverUrl} />
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </Head>

      <HeaderWithLogoDark />

      <main>
        {/* ── Article Hero ── */}
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

          <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 md:py-28 text-center" style={{ zIndex: 2 }}>
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-semibold uppercase px-4 py-1 rounded-full border mb-6 transition-all duration-200"
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
                Back to Blog
            </Link>

            {meta.tags?.[0] ? (
              <div className="flex items-center justify-center mb-4" style={{ gap: "0.5rem" }}>
                {meta.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-benorange-500 font-bold uppercase px-3 py-1 rounded-full"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      backgroundColor: "rgba(255, 135, 42, 0.15)",
                    }}
                  >
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            ) : null}

            <h1
              className="font-mont text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight"
              style={{ lineHeight: 1.12 }}
            >
              {meta.title}
            </h1>

            <div
              className="mt-5 flex items-center justify-center flex-wrap text-sm font-inter"
              style={{ color: "rgba(255,255,255,0.4)", gap: "0.75rem" }}
            >
              {meta.author ? (
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  {meta.author}
                </span>
              ) : null}
              {meta.author ? (
                <span style={{ opacity: 0.3 }}>·</span>
              ) : null}
              <span>{formatDate(meta.date)}</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <span>{meta.readingMinutes} min read</span>
            </div>
          </div>
        </section>

        {/* ── Cover Image ── */}
        {meta.cover ? (
          <section className="pt-8" style={{ backgroundColor: "#FFFBF2" }}>
            <div className="max-w-4xl mx-auto px-6 sm:px-10">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <img
                  src={meta.cover}
                  alt={meta.title}
                  className="w-full object-cover"
                  style={{ maxHeight: "480px" }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Article Body ── */}
        <article
          className="py-12 md:py-16"
          style={{ backgroundColor: "#FFFBF2" }}
        >
          <div className="max-w-3xl mx-auto px-6 sm:px-10">
            {meta.excerpt ? (
              <p
                className="text-lg sm:text-xl leading-relaxed mb-8 pb-8 font-inter"
                style={{
                  color: "rgba(0,0,0,0.55)",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {meta.excerpt}
              </p>
            ) : null}

            <div
              className="max-w-none blog-prose"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </article>

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
                title="Newsletter signup"
                height="52"
                frameBorder="0"
                scrolling="no"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
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

            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 font-inter font-semibold text-sm rounded-full transition-all duration-200"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  gap: "0.5rem",
                }}
              >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                  </svg>
                  All posts
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = getAllPostsMeta();

  return {
    paths: posts
      .filter((p) => p?.slug)
      .map((p) => ({ params: { slug: String(p.slug) } })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = String(params?.slug || "").trim();
  const post = await getPostBySlug(slug);

  if (!post?.meta) return { notFound: true, revalidate: 60 };

  return { props: { post }, revalidate: 3600 };
}
