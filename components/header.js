import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MobileNav from "./mobileNav";
import Head from 'next/head';
import Dropdown from "./dropdown";
import StandardButton from './standardButton';
import { Menu } from '@headlessui/react';


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
    <section className={`pt-10 bg-white px-7 sticky top-0 z-[100] white-header header ${scrolled == true ? "scrolled" : ""} ${className}`}>
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>

      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        {children}
        {!children && <MobileNav />}
      </div>

      <nav className="flex max-w-7xl m-auto justify-between items-start lg:items-center relative">
        <div className="w-2/12 lg:w-1/3 left-0"> <a href="/"><img className="w-24 mx-auto max-w-none" src={logoSrc} /></a> </div>
        <ul className={`font-mont text-black w-10/12 ${className} hidden lg:flex justify-end items-center`}>
          <li className="flex justify-end items-center">
            {scrolled == true && !shouldHideButton && (
              <>
                <a className="display-on-scroll px-4 font-semibold hidden" href="/podcast">Podcast</a>
                <a className="display-on-scroll px-2 font-semibold" href="/ibiza">Hacker House</a>
                <a className="display-on-scroll px-4 font-semibold" href="/team">Team</a>
                <a className="display-on-scroll px-4 font-semibold" href="/donate">Donate</a>
                <a className="display-on-scroll px-4 font-semibold" href="/contact">Contact</a>
                {/*
              <StandardButton
                link="/donate"
                text="Scholarships"
                styling="display-on-scroll mx-4"
              />
              */}

                <StandardButton
                  link="/volunteer"
                  text="Volunteer Now"
                  color="orange"
                  styling="display-on-scroll mx-4"
                  target="_blank"
                />
              </>
            )}

          </li>
        </ul>
      </nav>
    </section>
  );
}
