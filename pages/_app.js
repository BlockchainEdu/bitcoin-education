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
            >
              <div class="revue-form-group">
                <label for="member_email">Email address</label>
                <input
                  class="revue-form-field"
                  placeholder="Your email address..."
                  type="email"
                  name="member[email]"
                  id="member_email"
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
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </AppWrapper>
  );
}

export default MyApp;
