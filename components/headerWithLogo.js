import { useEffect, useState } from 'react';
import DonateButtonSmall from './donateButtonSmall'
import MobileNavWithLogo from '../components/mobileNavWithLogo'
import Dropdown from './dropdown'

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
        <section className={`pt-3 md:py-10 px-7 fixed w-full top-0 z-10 orange-header header ${ offset > 0 ? "scrolled" : "" }`}>
          <div className="block lg:hidden">
            <MobileNavWithLogo />
          </div>
          <nav className="hidden lg:flex max-w-7xl m-auto justify-between items-center">
            <ul className="font-mont text-white transition duration-500 w-1/3">
              <li className="flex gap-x-14">
                <a className="hover:text-benorange-500 transition duration-500" href="/">Home</a>
                <Dropdown />
                <a className="hover:text-benorange-500 transition duration-500" href="/programs">Programs</a>
              </li>
            </ul>
            <div className="w-1/3"><a href="/"><img className="m-auto w-20" src="/images/ben-vertical-alt.svg" /></a></div>
            <ul className="font-mont text-white w-1/3">
              <li className="flex gap-x-14 justify-end items-center">
                <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events </a>
                <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/sign_up">Learn </a>
                <a className="hover:text-benorange-500 transition duration-500" target="_blank"><b>Contact</b></a>
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
