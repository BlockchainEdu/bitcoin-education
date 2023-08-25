import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MobileNav from "./mobileNav";
import Head from 'next/head';
import Dropdown from "./dropdown";
import StandardButton from './standardButton';

export default function HeaderWithLogo({className="", children}) {
  const [ offset, setOffset ] = useState(0);
  const logoSrc = `/images/ben-logo-color-no-slogan.svg`;
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hideButtonOnPage = ['/join'];
  const shouldHideButton = hideButtonOnPage.includes(router.pathname);

  return (
    <section className={`pt-10 bg-white px-7 sticky top-0 z-10 white-header header ${ offset > 0 ? "scrolled" : "" } ${className}`}>
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>

      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        { children }
        { !children && <MobileNav /> }
      </div>

      <nav className="flex max-w-7xl m-auto justify-between items-start lg:items-center relative">
        <div className="w-2/12 lg:w-1/3 left-0"> <a href="/"><img className="w-24 mx-auto max-w-none" src={logoSrc} /></a> </div>
        <ul className={`font-mont text-black w-10/12 ${className}`}>
          <li className="flex justify-end items-center">
            {/*
            <a className="font-semibold" href="/contact">Contact</a>
            <a className="font-semibold" href="/about/partners">Partners </a>
            <a className="font-semibold" href="/about/team">Team </a>
            */}
            { offset > 0 && !shouldHideButton && (
              <>
                {/*
                <StandardButton
                  link="/donate"
                  text="Scholarships"
                  styling="hidden display-on-scroll text-center py-3 rounded-lg w-full px-8"
                />
                */}

                <StandardButton
                  link="https://learn.blockchainedu.org/"
                  text="Join the Community"
                  target="blank"
                  color="orange"
                  styling="text-center py-3 rounded-lg w-full px-8"
                />
              </>
            )}
            {/*
            <a className="px-4 font-semibold underline hidden-on-scroll" href="/donate">
                Scholarships
            </a>
            <a className="px-4 font-semibold underline hidden-on-scroll" target="_blank" href="https://beats.blockchainedu.org/">
                Subscribe
            </a>
            */} 
            { !shouldHideButton && (
              <StandardButton
                link="https://learn.blockchainedu.org"
                text="Join the Community"
                color="orange"
                styling="hidden-on-scroll text-center py-3 rounded-lg w-full px-8"
              />
            )}
          </li>
        </ul>
      </nav>
    </section>
  );
}
