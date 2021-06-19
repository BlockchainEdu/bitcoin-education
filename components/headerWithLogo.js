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
                    </li>
                </ul>
                <div className="w-1/3"><a href="/"><img className="m-auto" src="/images/white-menu-logo.svg"/></a></div>
                <ul className="font-mont text-white w-1/3">
                    <li className="flex gap-x-14 justify-end items-center">
                      <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://medium.com/blockchainedu">Blog </a>
                      <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://portal.blockchainedu.org/sign_in"><b>Login</b></a>
                      <DonateButtonSmall />
                    </li>
                </ul>
            </nav>
        </section>
    )
}
