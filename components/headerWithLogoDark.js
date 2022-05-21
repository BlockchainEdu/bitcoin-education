import DonateButtonSmall from './donateButtonSmall'
import MobileNav from '../components/mobileNav'
import Dropdown from './dropdown'

export default function HeaderWithLogo() {
    return (
        <section className="pt-10 px-7">
            <div className="block lg:hidden">
                <MobileNav />
            </div>
            <nav className="hidden lg:flex max-w-7xl m-auto justify-between items-center">
                <ul className="font-mont text-black transition duration-500 w-1/3">
                    <li className="flex gap-x-14">
                        <a className="hover:text-benorange-500 transition duration-500" href="/">Home</a>
                        <Dropdown />
                        <a className="hover:text-benorange-500 transition duration-500" href="/programs">Programs</a>
                    </li>
                </ul>
                <div className="w-1/3"><a href="/"><img className="m-auto w-20" src="/images/ben-vertical.svg" /></a></div>
                <ul className="font-mont text-white w-1/3">
                    <li className="flex gap-x-14 justify-end items-center">
                        <a className="hover:text-benorange-500 text-black transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events </a>
                        <a className="hover:text-benorange-500 text-black transition duration-500" target="_blank" href="https://learn.blockchainedu.org/sign_up">Learn</a>
                        <a className="hover:text-benorange-500 text-black transition duration-500" href="/contact"><b>Contact</b></a>
                        <a href="/donate">
                            <button className="text-md px-8 rounded-full py-2 font-bold transition duration-500 shadow-button bg-benorange-500 hover:bg-bengrey-300 text-white">
                                Donate
                            </button>
                        </a>
                    </li>
                </ul>
            </nav>
            <img className="w-24 mx-auto lg:hidden" src="/images/ben-vertical.svg" />
        </section>
    )
}
