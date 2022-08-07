import Subscribe from '../components/subscribe'
import Image from 'next/image'

export default function Footer() {
    return (
        <section className="pt-20 pb-4" style={{ background: "#191C1F" }}>
            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-start lg:justify-between pb-20" style={{ maxWidth: "1000px" }}>
                <div className="w-full lg:w-1/2 lg:max-w-xs">
                    <Image
                        width="71px"
                        height="73px"
                        src="/images/ben-footer.svg"
                    />
                    <div className="font-inter mt-10 text-sm" style={{ color: "#CFD2DC" }}>
                        <div className="font-bold mb-3">
                            Blockchain Education Network EST. 2014
                        </div>
                        <div className="mb-6">
                            BEN is the largest and oldest network of blockchain students, alumni, and professors across the world.
                        </div>
                        <div className="mb-6">
                            625 Kenmoor Ave Suite <br />301-97251 Grand Rapids, MI 49546
                        </div>
                        <div className="text-white">
                            Blockchain Education Network Inc is qualified charity with a US 501 (c)(3) public charity, EIN: 46-5280397
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="mt-10 lg:mt-0 space-y-10 md:space-y-0 flex flex-col sm:flex-row justify-start lg:justify-between  md:space-x-20 font-inter" style={{ color: "#CFD2DC" }}>
                        <div>
                            <ul className="space-y-3">
                                <li className="uppercase font-bold text-xs">Product</li>
                                <li className="text-sm">Donate</li>
                                <li className="text-sm">Start Learning</li>
                                <li className="text-sm">Programs</li>
                                <li className="text-sm">For Professors</li>
                                <li className="text-sm">For Projects</li>
                                <li className="text-sm">For Clubs</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-3">
                                <li className="uppercase font-bold text-xs">Company</li>
                                <li className="text-sm">About Us</li>
                                <li className="text-sm">Twitter</li>
                                <li className="text-sm">Medium</li>
                                <li className="text-sm">Facebook</li>
                                <li className="text-sm">Instagram</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="space-y-3">
                                <li className="uppercase font-bold text-xs">Resources</li>
                                <li className="text-sm">FAQ</li>
                                <li className="text-sm">Testimonials</li>
                                <li className="text-sm">Support</li>
                                <li className="text-sm">Terms</li>
                                <li className="text-sm">Privacy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-row gap-x-8">
                        <Image
                            width="135px"
                            height="40px"
                            src="/images/google-play.svg"
                        />
                        <Image
                            width="120px"
                            height="40px"
                            src="/images/app-store.svg"
                        />
                    </div>
                </div>
            </div>
            <div className="border-t border-bengrey-500 pt-6">
                <div className="flex flex-col lg:flex-row justify-between items-center mx-auto" style={{ maxWidth: "1000px" }}>
                    <div className="flex space-x-3">
                        <Image
                            width="10px"
                            height="10px"
                            src="/images/green-dot.svg"
                        />
                        <div className="font-inter text-white text-sm">
                            All Services Operational
                        </div>
                    </div>
                    <div className="my-6 lg-my-0">
                        <Image
                            width="25px"
                            height="25px"
                            src="/images/ben-footer-small.svg"
                        />
                    </div>
                    <div className="font-inter text-white text-sm">
                        © 2022 Blockchain Education Network
                    </div>
                </div>
            </div>
        </section>
    )
}
