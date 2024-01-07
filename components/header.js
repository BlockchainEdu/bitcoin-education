import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MobileNav from "./mobileNav";
import Head from 'next/head';
import Dropdown from "./dropdown";
import StandardButton from './standardButton';

export default function HeaderWithLogo({ className = "", children }) {
  const [offset, setOffset] = useState(0);
  const logoSrc = `/images/ben-logo-color-no-slogan.svg`;
  const router = useRouter();

  let scrolled = offset > 0;

  // Turn on Scroll Menu Bar permanently
  scrolled = true;

  useEffect(() => {

    // Adds a scroll listener to update 'offset' state and ensures cleanup on component unmount.
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);


  }, []);

  // Hide Menu Bar on certain pages
  const hideButtonOnPage = ['/join'];
  const shouldHideButton = hideButtonOnPage.includes(router.pathname);

  return (
    <section className={`pt-10 bg-white px-7 sticky top-0 z-10 white-header header ${scrolled == true ? "scrolled" : ""} ${className}`}>
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>

      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        {children}
        {!children && <MobileNav />}
      </div>

      <nav className="flex max-w-7xl m-auto justify-between items-start lg:items-center relative">
        <div className="w-2/12 lg:w-1/3 left-0"> <a href="/"><img className="w-24 mx-auto max-w-none" src={logoSrc} /></a> </div>
        <ul className={`font-mont text-black w-10/12 ${className}`}>
          <li className="flex justify-end items-center">

          {/* Menu Bar Before Scrolling */}
            {/*
            <a className="hidden-on-scroll px-4 font-semibold" href="/donate">
                Scholarships
            </a>
            <a className="hidden-on-scroll px-4 font-semibold" target="_blank" href="https://beats.blockchainedu.org/">
                Subscribe
            </a>
            {!shouldHideButton && (
              <StandardButton
                link="https://www.blockchainedu.org/apply"
                text="Apply Now"
                color="orange"
                styling="hidden-on-scroll text-center py-3 rounded-lg w-full px-8"
              />
            )}
            */}

          {/* Scrolled Menu Bar */}
            {scrolled == true && !shouldHideButton && (
              <>

              <a className="display-on-scroll px-4 font-semibold" href="/events">Events</a>
              <a className="display-on-scroll px-4 font-semibold" href="/contact">Contact</a>
              <a className="display-on-scroll px-4 font-semibold" href="/team">Team</a>

              {/*
              <StandardButton
                link="/donate"
                text="Scholarships"
                styling="display-on-scroll mx-4"
              />
              */}

              <StandardButton
                link="/subscribe"
                text="Join Now"
                color="orange"
                styling="display-on-scroll mx-4"
              />
            </>
          )}

          </li>
        </ul>
      </nav>
    </section>
  );
}
