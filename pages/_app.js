import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import { AppWrapper } from "../context/state"; // import based on where you put it
import "../public/styles/global.css";
import TagManager from "react-gtm-module";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [app, setApp] = useState(false);
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-213540060-2" });
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
            src={`https://www.googletagmanager.com/gtag/js?id=UA-213540060-2`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-213540060-2', {
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
              <h3>BEN</h3>
              <p className="description">
                The Blockchain Education Network (BEN), a public charity
                established in 2014, is the largest and longest-running
                community of disrupters, entrepreneurs, investors, and students.
                We offer unbiased courses, reports, coding classes, and much
                more in Web 3.0 to thousands of students worldwide! With
                hundreds of educational resources available, we are here to
                inspire you to find your talent in Web 3.0 and own it! Start a
                new career and create wealth & financial freedom!
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
                <label for="member_first_name">
                  First name <span class="optional">(Optional)</span>
                </label>
                <input
                  class="revue-form-field"
                  placeholder="First name... (Optional)"
                  type="text"
                  name="member[first_name]"
                  id="member_first_name"
                />
              </div>
              <div class="revue-form-group">
                <label for="member_last_name">
                  Last name <span class="optional">(Optional)</span>
                </label>
                <input
                  class="revue-form-field"
                  placeholder="Last name... (Optional)"
                  type="text"
                  name="member[last_name]"
                  id="member_last_name"
                />
              </div>
              <div class="revue-form-actions">
                <input
                  type="submit"
                  value="Subscribe"
                  name="member[subscribe]"
                  id="member_submit"
                />
              </div>
              <div class="revue-form-footer">
                By subscribing, you agree with Revue’s{" "}
                <a target="_blank" href="https://www.getrevue.co/terms">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a target="_blank" href="https://www.getrevue.co/privacy">
                  Privacy Policy
                </a>
                .
              </div>
            </form>
            <div className="read-it-first" onClick={clickReadIt}>
              Let me Read it First
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
