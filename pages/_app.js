import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../utils/utm-tracking.js";

import { useEffect, useState } from "react";
import { AppWrapper } from "../context/state";
import TagManager from "react-gtm-module";
import Head from "next/head";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);

  const SITE_URL = "https://www.blockchainedu.org";
  const pageTitle = "Blockchain Education Network";
  const pageDescription =
    "The largest and longest running network of blockchain students, professors, and alumni. Join 50k+ for crypto news, events, jobs, and tools.";
  const ogImageUrl = `${SITE_URL}/images/light-2-logo.jpg`;

  const canonicalUrl = `${SITE_URL}${router.asPath.split("?")[0]}`;

  // GTM init
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-213540060-2" });
  }, []);
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
    <AppWrapper>
      <>
        {/* Top loading bar */}
        {routeLoading ? (
          <div className="fixed top-0 left-0 right-0 h-1 bg-benorange-500 animate-pulse z-[9999]" />
        ) : null}

        <Head>
          {/* crazy egg */}
          <script
            type="text/javascript"
            src="//script.crazyegg.com/pages/scripts/0120/4754.js"
            async="async"
          />

          {/* Intercom settings */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.intercomSettings = { app_id: 'bf65zudc' };
              `,
            }}
          />

          {/* Intercom loader */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  var w = window;
                  var ic = w.Intercom;
                  if (typeof ic === 'function') {
                    ic('reattach_activator');
                    ic('update', window.intercomSettings);
                  } else {
                    var d = document;
                    var i = function () { i.c(arguments); };
                    i.q = [];
                    i.c = function (args) { i.q.push(args); };
                    w.Intercom = i;
                    var l = function () {
                      var s = d.createElement('script');
                      s.type = 'text/javascript';
                      s.async = true;
                      s.src = 'https://widget.intercom.io/widget/bf65zudc';
                      var x = d.getElementsByTagName('script')[0];
                      x.parentNode.insertBefore(s, x);
                    };
                    if (w.attachEvent) w.attachEvent('onload', l);
                    else w.addEventListener('load', l, false);
                  }
                })();
              `,
            }}
          />

          {/* Google Analytics (UA) */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-213540060-2"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-213540060-2', { page_path: window.location.pathname });
              `,
            }}
          />

          {/* Google Ads / GA4 */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-CY9B33JJWC"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-CY9B33JJWC');
              `,
            }}
          />

          {/* Facebook Pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;
                  n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;
                  n.push=n;
                  n.loaded=!0;
                  n.version='2.0';
                  n.queue=[];
                  t=b.createElement(e);t.async=!0;t.src=v;
                  s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '647331727208880');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              src="https://www.facebook.com/tr?id=647331727208880&ev=PageView&noscript=1"
              alt=""
            />
          </noscript>

          {/* CrazyEgg Analytics (segundo script) */}
          <script
            type="text/javascript"
            src="//script.crazyegg.com/pages/scripts/0118/3905.js"
            async="async"
          />

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="description" content={pageDescription} />
          <link rel="shortcut icon" href="/favicon.ico" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Average&display=swap"
            rel="stylesheet"
          />

          {/* Open Graph */}
          <meta property="og:site_name" content="Blockchain Education Network" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:width" content="960" />
          <meta property="og:image:height" content="540" />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@BlockchainEdu" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta
            name="twitter:image"
            content={`${SITE_URL}/images/ben-beats-thumbnail.png`}
          />

          {/* AI Crawlers */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        </Head>

        <Component {...pageProps} />
      </>
    </AppWrapper>
  );
}

export default MyApp;
