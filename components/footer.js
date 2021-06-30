import Subscribe from '../components/subscribe'

export default function Footer() {
    return (
        <section>
            <div className="max-w-7xl m-auto flex flex-col lg:flex-row justify-between items-center pt-0 md:pt-24 py-24 pb-10 px-7">
                <div className="text-center lg:text-left font-mont text-black max-w-lg pb-10 lg:pb-0">
                    Subscribe to the BEN newsletter to keep up to date with everything happening in the Blockchain and Education.
                </div>
                <div className="pt-5 md:pt-0 flex-col sm:flex-row flex space-y-6 sm:space-y-0 gap-x-10 items-center">
                    <button className="join-footer-button bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl rounded-full">
                        <a target="_blank" href="https://portal.blockchainedu.org/">
                            Get Involved
                        </a>
                    </button>
                    <div>
                        <Subscribe />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row max-w-7xl m-auto border-t py-14 px-7">
                <div className="w-full md:w-1/6"><img className="m-auto md:m-0" src="/images/logo-footer.svg" /></div>
                <div className="w-full md:w-3/6">
                    <div className="text-center md:text-left pt-6 md:pt-0 font-mont font-bold">
                        The Blockchain Education Network (BEN)
                    </div>
                    <div className="text-center md:text-left max-w-lg pt-3 m-auto md:m-0">
                        BEN is the largest and oldest network of blockchain students, alumni, and professors across the world.
                    </div>
                </div>
                <div className="grid grid-cols-5 pt-10 md:pt-0 w-full md:w-2/6 gap-x-0 ml-3 md:ml-0">
                    <a target="_blank" href="https://facebook.com/blockchainedu"><img src="/images/Facebook.svg" /></a>
                    <a target="_blank" href="https://twitter.com/blockchainedu"><img src="/images/Twitter.svg" /></a>
                    <a target="_blank" href="https://instagram.com/blockchainedu"><img src="/images/Instagram.svg" /></a>
                    <a target="_blank" href="https://medium.com/blockchainedu"><img src="/images/medium.svg" /></a>
                    <a target="_blank" href="https://t.me/blockchainedu"><img src="/images/telegram.svg" /></a>
                </div>
            </div>
            <div className="bg-benblack-500 py-14 px-7">
                <div className="flex flex-col md:flex-row justify-between max-w-7xl m-auto">
                    <ul className="flex flex-col md:flex-row justify-between items-center text-white font-mont w-full md:w-2/6">
                        <a href="/"><li>Home</li></a>
                        <a href="/about"><li>About</li></a>
                        <a target="_blank" href="https://portal.blockchainedu.org/all-courses"><li>Learn</li></a>
                        <a target="_blank" href="https://portal.blockchainedu.org/sign_in"><li>Login</li></a>
                    </ul>
                    <div className="pt-10 md:pt-0 text-center md:text-left font-mont text-white">
                    © 2021 BEN All Rights Reserved
                    </div>
                </div>
            </div>
        </section>
    )
}
