import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MobileNav from "./mobileNav";
import Head from "next/head";
import StandardButton from "./standardButton";

export default function HeaderWithLogo({ className = "", children }) {
  const [offset, setOffset] = useState(0);
  const logoSrc = `/images/ben-logo-color-no-slogan.svg`;
  const router = useRouter();

  let scrolled = offset > 0;

  // Keep header styled as scrolled
  scrolled = true;

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideButtonOnPage = [];
  const shouldHideButton = hideButtonOnPage.includes(router.pathname);

  return (
    <section
      className={`pt-10 bg-white px-7 sticky top-0 z-50 white-header header ${
        scrolled ? "scrolled" : ""
      } ${className}`}
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {/* Mobile menu */}
      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        {children}
        {!children && <MobileNav />}
      </div>

      {/* Desktop menu */}
      <nav className="flex max-w-7xl m-auto justify-between items-start lg:items-center relative">
        <div className="w-2/12 lg:w-1/3 left-0 cursor-pointer" onClick={() => router.push("/")}>
          <img className="w-24 mx-auto max-w-none" src={logoSrc} alt="BEN home" />
        </div>

        <ul
          className={`font-mont text-black w-10/12 hidden lg:flex justify-end items-center`}
        >
          <li className="flex justify-end items-center">
            {scrolled && !shouldHideButton && (
              <>
                {/* Main navigation */}
                <span
                  className="display-on-scroll px-4 font-semibold cursor-pointer"
                  onClick={() => router.push("/opportunities")}
                >
                  Get Involved
                </span>
                <span
                  className="display-on-scroll px-4 font-semibold cursor-pointer"
                  onClick={() => router.push("/blog")}
                >
                  Blog
                </span>
                <span
                  className="display-on-scroll px-4 font-semibold cursor-pointer"
                  onClick={() => router.push("/team")}
                >
                  Our People
                </span>
                <span
                  className="display-on-scroll px-4 font-semibold cursor-pointer"
                  onClick={() => router.push("/donate")}
                >
                  Support Us
                </span>
                {/* Primary CTA */}
                <StandardButton
                  link="/opportunities#apply"
                  text="Join BEN"
                  textColor="white"
                  color="orange"
                  styling="display-on-scroll ml-4"
                />
              </>
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
}
