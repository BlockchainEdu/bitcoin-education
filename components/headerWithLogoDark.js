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
                    </li>
                </ul>
                <div className="w-1/3"><a href="/"><img className="m-auto" src="/images/ben-logo-color.png"/></a></div>
                <ul className="font-mont text-white w-1/3">
                    <li className="flex gap-x-14 justify-end items-center">
                      <a className="hover:text-benorange-500 text-black transition duration-500" target="_blank" href="https://medium.com/blockchainedu">Blog </a>
                      <DonateButtonSmall />
                    </li>
                </ul>
            </nav>
        </section>
    )
}
