import DonateButtonSmall from './donateButtonSmall'
import MobileNavWithLogo from '../components/mobileNavWithLogo'
import Dropdown from './dropdown'

export default function HeaderWithLogo() {
    return (
        <section className="pt-10 px-7">
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
                <div className="w-1/3"><a href="/"><img className="m-auto" src="/images/white-menu-logo.svg" /></a></div>
                <ul className="font-mont text-white w-1/3">
                    <li className="flex gap-x-14 justify-end items-center">
                        <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events </a>
                        <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/all-courses">Learn </a>
                        <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://learn.blockchainedu.org/sign_in"><b>Login</b></a>
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
