import MobileNav from "./mobileNav";
import Head from 'next/head';
import Dropdown from "./dropdown";

export default function HeaderWithLogo() {
    return (
        <section className="pt-3 md:pt-10 mx-7">
            <Head>
                <link rel="shortcut icon" href="" />
            </Head>
            <div className="block md:hidden">
             <MobileNav />   
            </div>
            <nav className="hidden md:flex max-w-7xl m-auto justify-between items-center">
                <ul className="font-mont text-black transition duration-500 w-1/3">
                    <li className="flex gap-x-14">
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Home </a>
                      <Dropdown />
                    </li>
                </ul>
                <ul className="font-mont text-black w-1/3">
                    <li className="flex gap-x-14 justify-end">
                      <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://portal.blockchainedu.org/event">Events </a>
                      <a className="hover:text-benorange-500 transition duration-500" target="_blank" href="https://medium.com/blockchainedu">Blog </a>
                      <a className="hover:text-benorange-500 text-black transition duration-500" target="_blank" href="https://portal.blockchainedu.org/sign_in"><b>Login</b></a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
