import { useEffect, useState } from 'react';
import MobileNav from "./mobileNav";
import Head from 'next/head';
import Dropdown from "./dropdown";
import StandardButton from "./standardButton";

export default function HeaderWithLogo() {
  const [ offset, setOffset ] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <section className={`pt-10 px-7 sticky top-0 z-10 white-header header ${ offset > 0 ? "scrolled" : "" }`}>
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>
      <div className="block lg:hidden mobile-nav">
        <MobileNav />
      </div>
      <nav className="hidden lg:flex max-w-7xl m-auto justify-between items-center relative">
        <ul className="font-mont text-black transition duration-500 w-5/12">
          <li className="flex gap-x-14">
            <a className="hover:text-benorange-500 transition duration-500" href="/">Home </a>
            <Dropdown />
            <a className="hover:text-benorange-500 transition duration-500" href="/programs">Programs </a>
          </li>
        </ul>
        <div className="w-2/12 absolute lg:relative top-[-1.25rem] lg:top-0 left-0">
          <a href=""><img className="w-24 mx-auto" src="/images/ben-vertical.svg" /></a>
        </div>
        <ul className="font-mont text-black w-5/12">
          <li className="flex gap-x-14 justify-end items-center">
            <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events </a>
            <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/sign_up">Learn </a>
            <a className="hover:text-benorange-500 transition duration-500 font-bold" href="/contact">Contact </a>
            <a href="/donate">
              <button className="text-md px-8 rounded-full py-2 font-bold transition duration-500 shadow-button bg-benorange-500 hover:bg-bengrey-300 text-white">
                Donate 
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
