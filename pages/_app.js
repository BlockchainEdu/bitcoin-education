import 'tailwindcss/tailwind.css'
import { useEffect } from 'react';
import '../public/styles/global.css'
import TagManager from 'react-gtm-module';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-213540060-2' });
  }, []);
  return <Component {...pageProps} />
}

export default MyApp
