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
        <ul className={`font-mont text-black w-10/12 ${className} hidden lg:flex justify-end items-center`}>
          <li className="flex justify-end items-center">
            {scrolled == true && !shouldHideButton && (
              <>

                <li className="display-on-scroll px-4 font-semibold"><a href="/podcast" className="hidden" >Podcast</a></li>
                <Menu>
                  <div className="relative px-4 pr-1"> {/* Added positioning wrapper */}
                    <Menu.Button className="font-semibold inline-flex items-center">
                      Events
                      <svg className="w-5 h-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Menu.Button>
                    <Menu.Items className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a href="/main-events" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 font-semibold`}>
                            Main Events
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="/side-events" className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 font-semibold`}>
                            Side Events
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </div>
                </Menu>

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
                  link="https://x.com/BlockchainEdu"
                  text="Start Learning"
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
