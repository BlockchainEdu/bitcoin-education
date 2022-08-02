import 'tailwindcss/tailwind.css'
import { useEffect } from 'react';
import { AppWrapper } from '../context/state'; // import based on where you put it
import '../public/styles/global.css'
import TagManager from 'react-gtm-module';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-213540060-2' });
  }, []);
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
          <link rel="shortcut icon" href="" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter&display=optional" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </div>
    </AppWrapper>
  )
}

export default MyApp
