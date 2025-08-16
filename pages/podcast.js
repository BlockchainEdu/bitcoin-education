import Head from "next/head";

export default function PodcastRedirect() {
  const url = "https://www.chainstories.xyz/";
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content={`0; url=${url}`} />
        <title>Redirecting…</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <p>
          Redirecting to <a href={url} className="underline">ChainStories</a>…
        </p>
      </div>
      <script
        dangerouslySetInnerHTML={{ __html: `window.location.href='${url}';` }}
      />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${url}`} />
      </noscript>
    </>
  );
}
