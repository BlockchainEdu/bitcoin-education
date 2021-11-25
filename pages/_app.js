import 'tailwindcss/tailwind.css'
import '../public/styles/global.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        dangerouslySetInnerHTML={{
          __html: `
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-213540060-2"></script>
          <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-213540060-2');
  `,
        }}
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
