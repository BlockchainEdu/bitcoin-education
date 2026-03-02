import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../../components/headerWithLogoDark";
import Footer from "../../components/footer";
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

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{meta.title} | BEN</title>
        {meta.excerpt ? (
          <meta name="description" content={meta.excerpt} />
        ) : null}
      </Head>

      <HeaderWithLogoDark />

      <article className="pt-14 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Link href="/blog">
              <a className="text-sm font-semibold text-benorange-500 hover:text-bencustomorange-500">
                ← Back to blog
              </a>
            </Link>
          </div>

          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-benblack-500 leading-tight">
              {meta.title}
            </h1>

            <div className="mt-4 text-sm text-bengrey-500 flex items-center justify-center gap-2 flex-wrap">
              {meta.author ? (
                <span className="font-semibold text-benblack-500/80">
                  {meta.author}
                </span>
              ) : null}
              {meta.author ? <span className="opacity-40">•</span> : null}
              <span>{formatDate(meta.date)}</span>
              <span className="opacity-40">•</span>
              <span>{meta.readingMinutes} min read</span>
            </div>

            {meta.cover ? (
              <div className="mt-8 rounded-3xl overflow-hidden border border-black/5">
                <img
                  src={meta.cover}
                  alt={meta.title}
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}

            {meta.excerpt ? (
              <p className="mt-6 text-lg text-bengrey-500 leading-relaxed">
                {meta.excerpt}
              </p>
            ) : null}
          </header>

          <div
            className="mt-10 prose prose-lg max-w-none blog-prose prose-headings:text-benblack-500 prose-p:text-benblack-500/80 prose-a:text-benorange-500 prose-strong:text-benblack-500 prose-li:text-benblack-500/80"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </article>

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
