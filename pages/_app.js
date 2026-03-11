import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../utils/utm-tracking.js";

import { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.blockchainedu.org";
  const pageTitle = "Blockchain Education Network";
  const pageDescription =
    "The largest and longest running network of blockchain students, professors, and alumni. Join 50k+ for crypto news, events, jobs, and tools.";
  const ogImageUrl = `${SITE_URL}/images/light-2-logo.jpg`;

  const canonicalUrl = `${SITE_URL}${router.asPath.split("?")[0]}`;

  // Global route loading indicator (no flicker)
  useEffect(() => {
    let showTimer = null;
    let safetyTimer = null;

    const start = (url) => {
      if (url === router.asPath) return;

      showTimer = setTimeout(() => setRouteLoading(true), 140);
      safetyTimer = setTimeout(() => setRouteLoading(false), 8000);
    };

    const end = () => {
      if (showTimer) clearTimeout(showTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      setRouteLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
      if (showTimer) clearTimeout(showTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [router.asPath, router.events]);

  return (
      <>
        {/* Top loading bar */}
        {routeLoading ? (
          <div className="fixed top-0 left-0 right-0 h-1 bg-benorange-500 animate-pulse z-50" />
        ) : null}

        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="description" content={pageDescription} key="description" />
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* Open Graph */}
          <meta property="og:site_name" content="Blockchain Education Network" key="og:site_name" />
          <meta property="og:title" content={pageTitle} key="og:title" />
          <meta property="og:description" content={pageDescription} key="og:description" />
          <meta property="og:image" content={ogImageUrl} key="og:image" />
          <meta property="og:image:width" content="960" key="og:image:width" />
          <meta property="og:image:height" content="540" key="og:image:height" />
          <meta property="og:url" content={canonicalUrl} key="og:url" />
          <meta property="og:type" content="website" key="og:type" />
          <meta property="og:locale" content="en_US" key="og:locale" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
          <meta name="twitter:site" content="@BlockchainEdu" key="twitter:site" />
          <meta name="twitter:title" content={pageTitle} key="twitter:title" />
          <meta name="twitter:description" content={pageDescription} key="twitter:description" />
          <meta name="twitter:image" content={ogImageUrl} key="twitter:image" />

          {/* AI Crawlers */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" key="robots" />

          {/* Facebook Pixel noscript fallback */}
          <noscript>
            <img
              height="1"
              width="1"
              src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID || "647331727208880"}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </Head>

        {/* Analytics scripts — using next/script instead of next/head */}
        <Script
          src={`https://script.crazyegg.com/pages/scripts/${process.env.NEXT_PUBLIC_CRAZYEGG_ID || "0120/4754"}.js`}
          strategy="afterInteractive"
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_UA_ID || "UA-213540060-2"}`}
          strategy="afterInteractive"
        />
        <Script id="ga-ua" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_UA_ID || "UA-213540060-2"}', { page_path: window.location.pathname });
        `}</Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_4_ID || "G-CY9B33JJWC"}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_4_ID || "G-CY9B33JJWC"}');
        `}</Script>
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID || "647331727208880"}');
          fbq('track', 'PageView');
        `}</Script>
        <Script
          src="https://script.crazyegg.com/pages/scripts/0118/3905.js"
          strategy="afterInteractive"
        />

        <Component {...pageProps} />
      </>
  );
}

export default MyApp;
