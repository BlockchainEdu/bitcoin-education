
export default function Header() {
    return (
        <section className="pt-10">
            <nav className="flex max-w-7xl m-auto justify-between">
                <ul className="font-mont text-black transition duration-500">
                    <li className="flex gap-x-14">
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Home </a>
                      <a className="hover:text-benorange-500 transition duration-500" href="/">About </a>
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Programs </a>
                    </li>
                </ul>
                <ul className="font-mont text-black">
                    <li className="flex gap-x-14">
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Get Involved </a>
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Events </a>
                      <a className="hover:text-benorange-500 transition duration-500" href="/">Learn </a>
                      <a className="hover:text-benorange-500 transition duration-500 ml-10" href="/"><b>Login</b></a>
                    </li>
                </ul>
            </nav>
        </section>
    )
}
