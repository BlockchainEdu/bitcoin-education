import Footer from '../components/footer';
import HeaderWithLogo from '../components/headerWithLogo';
import Header from '../components/header'
import Head from "next/head"
import StandardButton from '../components/standardButton';

export default function About() {
    return (
        <div id="about-page">
            <HeaderWithLogo />
            <Head>
                <title>About | Blockchain Education Network</title>
            </Head>
            <div className="about-header pt-10 lg:py-40 pb-20 px-7">
              <img className="w-24 mx-auto mb-10 lg:hidden" src="/images/ben-vertical-alt.svg" />
                <div className="max-w-7xl m-auto flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <h1 className="text-4xl md:text-6xl mt-0 lg:mt-24 font-black text-white max-w-3xl pt-10 leading-snug">
                            The Blockchain Education Network (BEN)
                        </h1>
                        <p className="text-black text-md pt-10 max-w-xl">
                            The Blockchain Education Network (BEN) is a 501(c)(3) non-porfit charitable organization founded in 2014.<br/><br/>
                            We exist to provide borderless education in blockchain technology, making it accessible to anyone 
                            and everyone while building a global transparent community.<br/><br/>
                            BEN educates students about blockchain technology and inspires them to find their talent and 
                            own it! Either as a disrupter, entrepreneur, investor, and team member.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 m-auto">
                        <img className="mt-14" src="/images/about-header-illustration.png" />
                    </div>
                </div>
            </div>
            <section className="max-w-7xl m-auto py-24 pb-10 px-7">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <div>
                        <div className="max-w-sm pb-4">
                            <h2 className="font-mont font-black text-5xl">
                                The 10:10 Plan
                            </h2>
                            <img className="ml-auto -mt-2 mr-6" src="/images/10-plan-underline-orange.png" />
                        </div>
                        <div className="flex items-center gap-x-0 lg:gap-x-10 justify-center">
                            <div className="border-r-none lg:border-r lg:border-4 lg:border-benorange-500  h-24">

                            </div>
                            <div>
                                <p className="font-mont text-center lg:text-left mx-auto lg:mx-0 text-xl lg:text-2xl font-bold max-w-sm">
                                    Over the next 10 years we plan to educate over 10M people in Blockchain Technology
                                </p>
                            </div>
                        </div>
                        <div className="m-auto flex content-center justify-center lg:justify-start">
                            <StandardButton
                                link="/about"
                                color="orange"
                                text="Learn more"
                                styling="px-12 mt-10"
                            />
                        </div>
                    </div>
                    <div>
                        <img className="mt-14 lg:mt-0 mx-auto md:mx-0" src="/images/10-plan-home.png" />
                    </div>
                </div>
            </section>
            <section>
                <div className="flex flex-col lg:flex-row max-w-7xl m-auto justify-between items-center py-24 pb-10 px-7">
                    <div className="w-full lg:w-3/5"><img className="m-auto lg:m-0 pb-20 lg:pb-0" src="/images/about-globe.png" /></div>
                    <div className="w-full lg:w-2/5">
                        <h2 className="font-black text-center lg:text-left m-auto lg:m-0 text-4xl md:text-5xl text-black pb-10 max-w-md md:max-w-xs leading-10">
                            501(c)(3) non-profit charitable organization
                        </h2>
                        <p className="font-mont text-center lg:text-left m-auto lg:m-0 max-w-2xl text-bengrey-400 max-w-lg">
                            We are the largest and longest running network of students, alumni, professors, teachers, professionals, and community leaders excited about blockchain across the world. We are on a mission to spur blockchain adoption by empowering our leaders to bring blockchain to their companies and communities.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col-reverse lg:flex-row max-w-7xl m-auto justify-between items-center pt-0 lg:pt-20 py-36 pb-24 px-7">
                    <div className="w-full lg:w-3/5">
                        <h2 className="font-black text-4xl md:text-5xl text-center lg:text-left text-black pb-10 m-auto lg:m-0 md:max-w-4xl leading-snug">
                            Providing students with accessible, high quality blockchain education
                        </h2>
                        <p className="font-mont text-center lg:text-left m-auto lg:m-0 text-bengrey-400 max-w-lg">
                            Since blockchain was ﬁrst invented in 2008, most universities around the world haven't been able to create a dedicated curriculum around  it , thus creating a high demand from students to learn about blockchain. We address students' desire to learn about blockchain and pursue opportunities in the industry.
                        </p>
                    </div>
                    <div className=""><img className="m-auto lg:m-0 pb-20 md:pb-0" src="/images/about-computer.png" /></div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
