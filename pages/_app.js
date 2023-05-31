import 'tailwindcss/tailwind.css'
import { useEffect } from 'react';
import { AppWrapper } from '../context/state'; // import based on where you put it
import '../public/styles/global.css'
import TagManager from 'react-gtm-module';
import Head from 'next/head';
import '../utils/utm-tracking.js'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-213540060-2' });
  }, []);

  const pageTitle = 'Blockchain Education Network';
  const pageDescription = 'Join 50k+ for crypto news, events, jobs, and tools in just 2 min a day!';
  const ogImageUrl = '/images/ben-beats-thumbnail.png?4362984378' ;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

return (
    <AppWrapper>
        <div>
            <Head>

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
                      <img height="1" width="1" src="https://www.facebook.com/tr?id=647331727208880&ev=PageView&noscript=1"/>
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
  )
}

export default MyApp
