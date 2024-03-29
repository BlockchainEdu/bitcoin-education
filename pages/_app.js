import 'tailwindcss/tailwind.css'
import { useEffect } from 'react';
import { AppWrapper } from '../context/state';
import '../public/styles/global.css'
import TagManager from 'react-gtm-module';
import Head from 'next/head';
import '../utils/utm-tracking.js';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-213540060-2' });
  }, []);

  const pageTitle = 'Blockchain Education Network';
  const pageDescription = 'Join 50k+ for crypto news, events, jobs, and tools in just 2 min a day!';
  const ogImageUrl = '/images/light-2-logo.jpg';

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {

    // Redirect specific paths
    if (router.pathname === '/join') {
      window.location.href = 'https://learn.blockchainedu.org';
    }

    if (router.pathname === '/learn') {
      window.location.href = 'https://learn.blockchainedu.org';
    }

    if (router.pathname === '/playbook') {
      window.location.href = 'https://blockchainedu.org';
    }

  }, [router.pathname, router.asPath, router.isFallback]);

  return (
    <AppWrapper>
      <div>
        <Head>
          {/*crazy egg*/}
          <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0120/4754.js" async="async"></script>

          {/* Intercom script */}
          <script>
            {`
              window.intercomSettings = {
                app_id: 'bf65zudc',
                // Add any additional Intercom settings here
              };
            `}
          </script>
          <script>
            {`
              (function () {
                var w = window;
                var ic = w.Intercom;
                if (typeof ic === 'function') {
                  ic('reattach_activator');
                  ic('update', window.intercomSettings);
                } else {
                  var d = document;
                  var i = function () {
                    i.c(arguments);
                  };
                  i.q = [];
                  i.c = function (args) {
                    i.q.push(args);
                  };
                  w.Intercom = i;
                  var l = function () {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/bf65zudc';
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                  };
                  if (window.attachEvent) {
                    window.attachEvent('onload', l);
                  } else {
                    window.addEventListener('load', l, false);
                  }
                }
              })();
            `}
          </script>

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-213540060-2`}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'UA-213540060-2', {
                page_path: window.location.pathname,
                });
              `,
            }}
          />

          {/* Global Site Tag (gtag.js) - Google Ads*/}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-CY9B33JJWC`}
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

          {/* Facebook Pixel Code */}
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
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
              }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '647331727208880');
              fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img height="1" width="1" src="https://www.facebook.com/tr?id=647331727208880&ev=PageView&noscript=1" />
          </noscript>

          {/* CrazyEgg Analytics */}
          <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0118/3905.js" async="async"></script>
          <link rel="shortcut icon" href="" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Average&display=swap" rel="stylesheet" />

          {/* Social Media Thumbnails */}
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:image:width" content="960" />
          <meta property="og:image:height" content="540" />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blockchain Education Network" />
          <meta name="twitter:description" content="Join 50k+ for crypto news, events, jobs, and tools in just 2 min a day!" />
          <meta name="twitter:image" content="https://www.blockchainedu.org/images/ben-beats-thumbnail.png" />

        </Head>

        <Component {...pageProps} />
      </div>
    </AppWrapper>
  );
}

export async function getServerSideProps({ req }) {
  const { url } = req;

  if (url === '/join') {
    return {
      redirect: {
        destination: 'https://learn.blockchainedu.org',
        permanent: true,
      },
    };
  }

  if (url === '/playbook') {
    return {
      redirect: {
        destination: 'https://blockchainedu.org',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

export default MyApp
