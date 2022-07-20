import { useEffect, useState } from "react";
import MobileNav from "./mobileNav";
import Head from "next/head";
import Dropdown from "./dropdown";

export default function HeaderWithLogo({ className = "", children }) {
  const [offset, setOffset] = useState(0);
  const logoSrc = children
    ? `/images/ben-vertical-alt.svg`
    : `/images/ben-vertical.svg`;
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section
      className={`py-6 px-7 sticky top-0 z-10 white-header header ${
        offset > 100 ? "scrolled" : ""
      } ${className}`}
    >
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>
      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        {children}
        {!children && <MobileNav />}
      </div>
      <nav className="flex max-w-7xl m-auto justify-between items-center relative font-inter">
        <div className="w-2/12 lg:w-1/3 absolute lg:relative top-[-.5rem] lg:top-0 left-0">
          {" "}
          <a href="/">
            <img className="w-12" src={logoSrc} />
          </a>{" "}
        </div>
        <ul
          className={`font-mont text-black transition duration-500 ${className}`}
        >
          <li className="mr-14 float-left">
            <a
              className="hover:text-benorange-500 transition duration-500 text-base font-semibold"
              href="/programs"
            >
              Learn Web3 Programs
            </a>
          </li>
          <li className="mr-14 float-left">
            <a
              className="hover:text-benorange-500 transition duration-500  text-base font-semibold"
              href="/programs"
            >
              FAQ{" "}
            </a>
          </li>
          <li className="mr-14 float-left">
            <a
              className="hover:text-benorange-500 transition duration-500 text-base font-semibold"
              href="/programs"
            >
              Events
            </a>
          </li>
          <li className="mr-16 float-left">
            <a
              className="hover:text-benorange-500 transition duration-500 text-base font-semibold"
              href="/programs"
            >
              Contact
            </a>
          </li>
          <li className="mr-16 float-left">
            <a
              className="hover:text-benorange-500 transition duration-500 text-base font-semibold underline"
              href="/programs"
            >
              Donate
            </a>
          </li>
          <li className="float-left">
            <a
              className="hover:text-benorange-500 transition duration-500 text-base font-semibold underline"
              href="/programs"
            >
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
