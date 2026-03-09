import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
import { getAllPostsMeta, getPostBySlug } from "../../lib/posts";
import NewsletterSignup from "../../components/newsletterSignup";

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
    <article className="pt-14 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="h-5 w-36 bg-black/5 rounded-lg animate-pulse" />
        <div className="mt-8 h-10 w-3/4 bg-black/5 rounded-xl animate-pulse" />
        <div className="mt-4 h-4 w-1/2 bg-black/5 rounded-lg animate-pulse" />
        <div className="mt-8 h-56 w-full bg-black/5 rounded-3xl animate-pulse" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full bg-black/5 rounded-lg animate-pulse" />
          <div className="h-4 w-[92%] bg-black/5 rounded-lg animate-pulse" />
          <div className="h-4 w-[84%] bg-black/5 rounded-lg animate-pulse" />
        </div>
      </div>
    </article>
  );
}

export default function ArticlePage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-white">
        <Head>
          <title>Loading… | BEN</title>
        </Head>
        <HeaderWithLogoDark />
        <ArticleSkeleton />
        <Footer />
      </div>
    );
  }

  if (!post?.meta) {
    return (
      <div className="min-h-screen bg-white">
        <Head>
          <title>Not found | BEN</title>
        </Head>
        <HeaderWithLogoDark />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="text-xl font-semibold text-benblack-500">
            Article not found
          </div>
          <div className="mt-4">
            <Link href="/blog">
              <a className="text-sm font-semibold text-benorange-500 hover:text-bencustomorange-500">
                ← Back to blog
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { meta, contentHtml } = post;
  const SITE_URL = "https://www.blockchainedu.org";
  const pageUrl = `${SITE_URL}/blog/${meta.slug}`;
  const coverUrl = meta.cover?.startsWith("http") ? meta.cover : `${SITE_URL}${meta.cover}`;

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
    <div className="min-h-screen bg-white">
      <Head>
        <title>{meta.title} | BEN</title>
        {meta.excerpt ? (
          <meta name="description" content={meta.excerpt} />
        ) : null}
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph - Article */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        {meta.excerpt ? <meta property="og:description" content={meta.excerpt} /> : null}
        <meta property="og:url" content={pageUrl} />
        {meta.cover ? <meta property="og:image" content={coverUrl} /> : null}
        <meta property="article:published_time" content={meta.date} />
        <meta property="article:author" content={meta.author || "The BEN Team"} />
        {meta.tags?.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        {meta.excerpt ? <meta name="twitter:description" content={meta.excerpt} /> : null}
        {meta.cover ? <meta name="twitter:image" content={coverUrl} /> : null}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </Head>

      <HeaderWithLogoDark />

      {/* Blog bar — same as index/paginated pages */}
      <div className="bg-white border-b-2 border-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <Link href="/blog">
                <a className="text-2xl sm:text-3xl font-extrabold tracking-tight text-benblack-500 hover:opacity-80 transition">
                  BEN <span className="text-benorange-500">Blog</span>
                </a>
              </Link>
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

      <article>
        {/* Article header */}
        <div className="pt-8 sm:pt-10 pb-6 sm:pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link href="/blog">
              <a className="inline-flex items-center gap-1.5 text-sm font-semibold text-bengrey-500 hover:text-benorange-500 transition-colors">
                ← Back to blog
              </a>
            </Link>

            <h1 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-benblack-500 leading-tight">
              {meta.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 text-sm text-bengrey-500 flex-wrap">
              {meta.author ? (
                <span className="font-semibold text-benblack-500/80">
                  {meta.author}
                </span>
              ) : null}
              <span className="opacity-40">·</span>
              <span>{formatDate(meta.date)}</span>
              <span className="opacity-40">·</span>
              <span>{meta.readingMinutes} min read</span>
            </div>

            {meta.tags?.[0] ? (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {meta.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block text-[11px] font-semibold uppercase tracking-wide text-benorange-500 bg-benorange-500/8 px-2.5 py-1 rounded-full"
                  >
                    {tag.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Cover image - full bleed */}
        {meta.cover ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-black/30">
              <img
                src={meta.cover}
                alt={meta.title}
                className="w-full h-[240px] sm:h-[360px] md:h-[420px] object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        ) : null}

        {/* Article body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {meta.excerpt ? (
            <p className="text-lg sm:text-xl text-bengrey-500 leading-relaxed mb-8 pb-8 border-b border-black/10">
              {meta.excerpt}
            </p>
          ) : null}

          <div
            className="prose prose-lg max-w-none blog-prose prose-headings:text-benblack-500 prose-p:text-benblack-500/80 prose-a:text-benorange-500 prose-strong:text-benblack-500 prose-li:text-benblack-500/80"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </article>

      {/* Newsletter */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <NewsletterSignup />
      </div>

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
