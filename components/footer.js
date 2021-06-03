
export default function Footer() {
    return (
        <section>
            <div className="max-w-7xl m-auto flex justify-between items-center py-24 pb-10">
                <div className="font-mont text-black max-w-lg">
                    Subscribe to the BEN newsletter to keep up to date with everything happening in the Blockchain and Education.
                </div>
                <div>
                    <button className="bg-benorange-500 text-white font-bold text-xl px-12 rounded-full py-4">
                        Subscribe
                    </button>
                </div>
            </div>
            <div className="flex grid-cols-3 max-w-7xl m-auto border-t py-14">
                <div className="w-1/6"><img src="/images/logo-footer.svg" /></div>
                <div className="w-3/6">
                    <div className="font-mont font-bold">
                        The Blockchain Education Network (BEN)
                    </div>
                    <div className="max-w-lg pt-3">
                        BEN is the largest and oldest netwrok of blockchain students, alumni, and professors across the world.
                    </div>
                </div>
                <div className="grid grid-cols-5 w-1/6 ml-auto gap-x-3">
                    <a href=""><img src="/images/facebook.svg" /></a>
                    <a href=""><img src="/images/twitter.svg" /></a>
                    <a href=""><img src="/images/instagram.svg" /></a>
                    <a href=""><img src="/images/medium.svg" /></a>
                    <a href=""><img src="/images/discord.svg" /></a>
                </div>
            </div>
            <div className="bg-benblack-500 py-14">
                <div className="flex justify-between max-w-7xl m-auto">
                    <ul className="flex justify-between items-center text-white font-mont w-3/6">
                        <li>Home</li>
                        <li>About</li>
                        <li>Programs</li>
                        <li>Get Involved</li>
                        <li>Events</li>
                        <li>Learn</li>
                    </ul>
                    <div className="font-mont text-white">
                    © 2021 BEN All Rights Reserved
                    </div>
                </div>
            </div>
        </section>
    )
}
