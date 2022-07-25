import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { AppWrapper } from "../context/state"; // import based on where you put it
import "../public/styles/global.css";
import TagManager from "react-gtm-module";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [app, setApp] = useState(false);
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-213540060-3" });
    if (!window.localStorage.getItem("subscribed")) {
      setApp(true);
    }
  }, []);

  const clickReadIt = () => {
    window.localStorage.setItem("subscribed", "true");
    window.setTimeout(() => {
      setApp(false);
    }, 500);
    return true;
  };
  return (
    <AppWrapper>
      <div>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-213540060-3`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-213540060-3', {
              page_path: window.location.pathname + window.location.search,
              campaign:{
                'id': 'weekly.123',
                'source': 'Weekly BEN NEWSLETTER',
                'medium': 'cpc',
                'name': 'Weekly BEN NEWSLETTER',
                'content': 'Weekly BEN NEWSLETTER'
              }
              
            });
          `,
            }}
          />
          <link rel="shortcut icon" href="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        {app ? (
          <div id="revue-embed">
            <form
              action="https://www.getrevue.co/profile/blockchainedu/add_subscriber"
              method="post"
              id="revue-form"
              name="revue-form"
              target="_blank"
              className="subscribe-form"
              onSubmit={clickReadIt}
            >
              <img src="/images/ben-vertical.svg" />
              <p className="description">
                The Blockchain Education Network (BEN), a public charity
                established in 2014, is the largest and longest-running
                community of disrupters, entrepreneurs, investors, and students.{" "}
                <br /> <br />
                We offer unbiased courses, reports, coding classes, and much
                more in Web 3.0! <br />
                <br />
                Start a new career and create wealth & financial freedom! <br />
                <br />
                Donate now, and together we can educate more students to become
                engineers, traders, innovators, entrepreneurs, and leaders of
                tomorrow in the crypto industry.
              </p>
              <div class="revue-form-group">
                <label for="member_email">Email address</label>
                <input
                  class="revue-form-field"
                  placeholder="Your email address..."
                  type="email"
                  name="member[email]"
                  id="member_email"
                  required
                />
              </div>
              <div class="revue-form-group">
                <label for="member_first_name">Name</label>
                <input
                  class="revue-form-field"
                  placeholder="Name"
                  type="text"
                  name="member[first_name]"
                  id="member_first_name"
                  required
                />
              </div>
              <div class="revue-form-actions">
                <input
                  type="submit"
                  value="Subscribe"
                  name="member[subscribe]"
                  id="member_submit"
                />
                <a
                  href="/donate"
                  className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-14 rounded-full py-2 donate"
                  onClick={clickReadIt}
                >
                  Donate
                </a>
              </div>
            </form>
            <div className="read-it-first" onClick={clickReadIt}>
              Access Website
            </div>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </AppWrapper>
  );
}

export default MyApp;
