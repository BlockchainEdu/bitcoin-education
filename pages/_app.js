import 'tailwindcss/tailwind.css'
import { useEffect } from 'react';
import '../public/styles/global.css'
import TagManager from 'react-gtm-module';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-213540060-2' });
  }, []);
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
