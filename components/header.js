import { useEffect, useState } from 'react'
import MobileNav from "./mobileNav"
import Head from 'next/head'
import Dropdown from "./dropdown"

export default function HeaderWithLogo({className="", children}) {
  const [ offset, setOffset ] = useState(0)
  const logoSrc = children ? `/images/ben-vertical-alt.svg` : `/images/ben-vertical.svg`
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    // clean up code
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section className={`py-10 px-7 sticky top-0 z-10 white-header header ${ offset > 100 ? "scrolled" : "" } ${className}`}>
      <Head>
        <link rel="shortcut icon" href="" />
      </Head>
      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        { children }
        { !children && <MobileNav /> }
      </div>
      <nav className="flex max-w-7xl m-auto justify-between items-center relative">
        <ul className={`font-mont text-black transition duration-500 w-5/12 ${className}`}>
          <li className="flex gap-x-14">
            <a className="hover:text-benorange-500 transition duration-500" href="/">Home </a>
            <Dropdown />
            <a className="hover:text-benorange-500 transition duration-500" href="/programs">Programs </a>
          </li>
        </ul>
        <div className="w-2/12 lg:w-1/3 absolute lg:relative top-[-.5rem] lg:top-0 left-0"> <a href="/"><img className="w-24 mx-auto" src={logoSrc} /></a> </div>
        <ul className={`font-mont text-black w-5/12 ${className}`}>
          <li className="flex gap-x-14 justify-end items-center">
            <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events </a>
            <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="/donate">Donate </a>
            <a className="hover:text-benorange-500 transition duration-500 font-bold" href="/contact">Contact </a>
            <a id="always-visible-menu-button" target="_blank" href="https://learn.blockchainedu.org/sign_up">
              <button className="text-md px-8 rounded-full py-2 font-bold transition duration-500 shadow-button bg-benorange-500 hover:bg-bengrey-300 text-white">
                Learn
              </button>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
