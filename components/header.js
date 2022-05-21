import MobileNav from "./mobileNav";
import Head from 'next/head';
import Dropdown from "./dropdown";
import StandardButton from "./standardButton";

export default function HeaderWithLogo() {
  return (
    <section className="pt-3 md:pt-10 mx-7">
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>
      <div className="block lg:hidden">
        <MobileNav />
      </div>
      <nav className="hidden lg:flex max-w-7xl m-auto justify-center items-center">
        <ul className="font-mont text-black transition duration-500 w-5/12">
          <li className="flex gap-x-14">
            <a className="hover:text-benorange-500 transition duration-500" href="/">Home </a>
            <Dropdown />
            <a className="hover:text-benorange-500 transition duration-500" href="/programs">Programs </a>
          </li>
        </ul>
        <div className="w-2/12">
          <a href=""><img className="w-24 mx-auto" src="/images/ben-vertical.svg" /></a>
        </div>
        <ul className="font-mont text-black w-5/12">
          <li className="flex gap-x-14 justify-end items-center">
            <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events </a>
            <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/all-courses">Learn </a>
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
