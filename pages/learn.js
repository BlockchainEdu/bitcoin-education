import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Header from '../components/header'
import Image from 'next/image'
import FormPopup from '../components/formPopup';
import Modal from '../components/donateButton';
import Head from "next/head"

export default function Learn() {
    return (
        <div id="learn-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Learn | Blockchain Education Network</title>
            </Head>
            <section className="px-7">
                <div className="max-w-7xl m-auto pt-24">
                    <h1 className="font-black text-4xl md:text-5xl text-black text-center md:text-left">
                        What is BEN Learn?
                    </h1>
                    <div className="flex flex-col md:flex-row pt-14 space-y-10 md:space-y-0 gap-x-0 md:gap-x-14 font-mont text-center md:text-left">
                        <div className="what-is-learn-blurb mx-auto">
                            Are you new to Blockchain? Trading Cryptocurrency? Looking for a deep dive on DeFi? We have the platform for everyone and anyone trying to learn more about a topic in the Blockchain industry.
                        </div>
                        <div className="what-is-learn-blurb mx-auto">
                            Created by knowledgeable Blockchain professors, experienced Blockchain professionals, and some of the best educators in the space, you can trust our content is top notch.
                        </div>
                        <div className="what-is-learn-blurb mx-auto">
                            You can even get a job in the space with companies hiring our graduates.
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-7">
                <div className="flex flex-col-reverse lg:flex-row max-w-7xl m-auto justify-between items-center py-10">
                    <div className="border w-full lg:w-2/5 text-center px-10 md:px-28 py-12">
                        <div className="font-bold uppercase text-lg pb-7">
                            What is there to learn
                        </div>
                        <div className="font-black" style={{ fontSize: "24px" }}>
                            Available courses
                        </div>
                        <div className="pt-5">
                            <div className="pb-3">Blockchain Fundamentals</div>
                            <div className="pb-3">Virtual Lands course</div>
                            <div className="pb-3">DeFi Fundamentals</div>
                            <div className="pb-3">Crypto Trading</div>
                            <div className="pb-3">How to set up Metamask</div>
                            <div className="pb-3">How to start a Blockchain club</div>
                        </div>
                        <a href="https://learn.blockchainedu.org/all-courses" target="_blank">
                            <button className="mt-5 border font-bold text-xl px-8 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">Sign up to learn</button>
                        </a>
                    </div>
                    <div className="w-full md:w-3/5">
                        <div className="py-14 lg:p-0 flex justify-end">
                            <Image
                                src="/images/learn-hero-illustration.png"
                                width="650"
                                height="581"
                                quality="100"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-7xl m-auto pt-14 pb-4 md:py-24 pb-0 px-7">
                <div className="flex flex-col md:flex-row justify-between md:space-x-20 items-center">
                    <div className="w-full md:w-3/6 pb-20 md:pb-0">
                        <img className="mx-auto md:mx-0" src="/images/learn-teachers-illustration.png" />
                    </div>
                    <div className="w-full md:w-3/6">
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            Share what you know with the world
                        </div>
                        <h2 className="font-black text-center md:text-left text-4xl md:text-5xl text-black">
                            Teachers
                        </h2>
                        <div className="font-mont py-6 text-center md:text-left">
                            Whether you’re a professor at an accredited University, an Alumni of a BEN University, or even an experienced professional in the industry with a unique topic. BEN Learn relies mainly on volunteers helping to create content, especially in the early stages of our platform, so your help would be greatly appreciated. Share what you know with the world today, as we make it super simple to create and upload a course!
                        </div>
                        <div className="flex items-center gap-x-0 md:gap-x-10">
                            <div className="border-r-none md:border-r md:border-4 md:border-benorange-500  h-36">

                            </div>
                            <div>
                                <p className="font-mont text-center md:text-left mx-auto md:mx-0 text-xl md:text-2xl font-bold">
                                    We invite anyone interested in creating a course on BEN Learn to fill out the form below and we will get back to you as soon as we can with whether we can support your course.
                                </p>
                            </div>
                        </div>
                        <div className="m-auto flex content-center justify-center md:justify-start">
                            <FormPopup
                                buttonStyle="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10"
                                buttonText="Sign up as a Teacher"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="max-w-7xl m-auto pt-0 md:py-24 pb-24 px-7">
                <div className="flex flex-col-reverse md:flex-row justify-between">
                    <div className="w-full md:w-1/2">
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            Our Vision
                        </div>
                        <h2 className="font-black text-center md:text-left text-4xl md:text-5xl text-black pb-8">
                            The 10:10 Plan
                        </h2>
                        <div className="font-mont max-w-full md:max-w-md text-center md:text-left">
                            Largely with the help of the BEN Learn Platform, we intend to educate over 10 million people in the next 10 years. We believe in providing borderless access to Blockchain Education. Your support of the BEN Learn Platform can help us get closer to that goal!
                        </div>
                        <div className="m-auto flex content-center items-center justify-center md:justify-start pt-10">
                            <div className="flex">
                                <div className="-mr-4">
                                    <img src="/images/accounts-created-icon.svg" />
                                </div>
                                <div>
                                    <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3 mt-2">2,00+</div>
                                    <div className="uppercase font-mont text-sm">BEN Learn accounts created</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 mt-14">
                        <Image
                            src="/images/10-10-plan.png"
                            width="528"
                            height="356"
                            quality={100}
                        />
                    </div>
                </div>
            </section> */}
            <Footer />
        </div>
    )
}
