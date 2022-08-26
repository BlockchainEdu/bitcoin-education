import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Header from '../components/header'
import Image from 'next/image'
import TestComponent from '../components/testComponent';
import PartnerShipBenefits from '../components/partnershipBenefits';
import PartnersSlider from '../components/partnersSlider';
import PartnersSliderAlt from '../components/partnersSliderAlt'
import Head from "next/head"

export default function GetInvolved() {

    const Questions = [
        {
            name: "Are you a student?",
            description: "Are you currently enrolled as an undergraduate, masters, PhD, or high school student with a .edu email?"
        },
        {
            name: "Are you a professor?",
            description: "Are you a University professor, faculty member or a High School teacher?"
        },
        {
            name: "University clubs",
            description: "We provide mentorship, support, and guidance for clubs all around the world. Join our network of the best and the brightest minds and universities in the blockchain space.",
        },
        {
            name: "Alumni",
            description: "We are looking for prestigious speakers for club events, teachers for BEN Learn, and mentors for our career center."
        }
    ]


    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Get Involved | Blockchain Education Network</title>
            </Head>
            <div className="pt-20 md:py-24 pb-20 px-7">
                <div className="max-w-7xl m-auto flex flex-col lg:flex-row items-center">
                    <div className="" style={{ marginRight: "-3rem" }}>
                        <div className="mx-auto lg:mx-0 rounded-full text-xs text-center py-3 mb-10 bg-benorange-300 font-mont uppercase font-bold" style={{ backgroundColor: "#F1F1F1", width: "135px" }}>
                            Get involved
                        </div>
                        <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-md leading-snug">
                            What can we offer to you
                        </h1>
                        <p className="text-black text-lg md:text-2xl pt-10 max-w-xs m-auto lg:m-0 text-center lg:text-left font-medium leading-normal">
                            We offer a number of ways for you to get involved
                        </p>
                        <a href="https://learn.blockchainedu.org/sign_up?from=https%3A%2F%2Flearn.blockchainedu.org%2F" target="_blank">
                        <button className="flex mx-auto lg:mx-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                            Join us today
                        </button>
                        </a>
                    </div>
                    <div className="py-20 lg:py-0">
                    <Image 
                            src="/images/get-involved-hero.png"
                            width={593}
                            height={721}
                    />
                    </div>
                    <div className="pl-4 flex flex-col space-y-10 font-mont" style={{ marginRight: "1rem" }}>
                        {Questions.map((Questions) =>
                            <div>
                                <div className="text-xs uppercase pb-4 text-center lg:text-left text-black">
                                    {Questions.name}
                                </div>
                                <div style={{ maxWidth: "263px", color: "#acacac" }} className="text-sm text-center lg:text-left m-auto lg:m-0">
                                    {Questions.description}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <section className="get-involved-bg">
                <div className="flex flex-col lg:flex-row max-w-7xl gap-x-20 m-auto justify-between items-center pt-10 lg:pt-36 py-24 px-7">
                    <div className="w-full lg:w-3/5 flex justify-center lg:justify-start">
                        <Image 
                            className="m-auto lg:m-0 pb-20 lg:pb-0"
                            src="/images/are-you-a-student.png"
                            width="686"
                            height="519"
                        />
                    </div>
                    <div className="w-full lg:w-2/5">
                        <h2 className="font-black text-center lg:text-left m-auto lg:m-0 text-4xl md:text-5xl text-black pb-10 max-w-md md:max-w-xs leading-10">
                            Are you a student?
                        </h2>
                        <p className="font-mont text-center lg:text-left m-auto lg:m-0 max-w-2xl text-bengrey-400 max-w-lg">
                            Are you a University professor, faculty member or a High School teacher? From connecting to the largest running faculty network in the world, to publishing your academic research in our journal. Learn from other blockchain professors and get access to great resources to become a better teacher. <br /><br />Enable underrepresented students to have access to a formal blockchain education with your courses and content.
                        </p>
                        <a href="https://learn.blockchainedu.org/sign_up?from=https%3A%2F%2Flearn.blockchainedu.org%2F" target="_blank">
                        <button className="flex mx-auto lg:mx-0 mt-10 border font-bold text-xl px-16 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">Join Us</button>
                        </a>
                    </div>
                </div>
            </section>
            <section className="get-involved-bg">
                <div className="flex flex-col lg:flex-row max-w-7xl gap-x-20 m-auto justify-between items-center pt-0 lg:py-24 pb-10 lg:pb-36 px-7">
                    <div className="w-full lg:w-3/5 flex justify-center lg:justify-start">
                        <Image 
                            className="m-auto lg:m-0 pb-20 lg:pb-0"
                            src="/images/are-you-a-professor.png"
                            width="686"
                            height="519"
                        />
                    </div>
                    <div className="w-full lg:w-2/5">
                        <h2 className="pt-10 lg:pt-0 font-black text-center lg:text-left m-auto lg:m-0 text-4xl md:text-5xl text-black pb-10 max-w-md md:max-w-xs leading-10">
                            Are you a professor?
                        </h2>
                        <p className="font-mont text-center lg:text-left m-auto lg:m-0 max-w-2xl text-bengrey-400 max-w-lg">
                            Are you a University professor, faculty member or a High School teacher? From connecting to the largest running faculty network in the world, to publishing your academic research in our journal. Learn from other blockchain professors and get access to great resources to become a better teacher. <br /><br />Enable underrepresented students to have access to a formal blockchain education with your courses and content.
                        </p>
                        <a href="https://learn.blockchainedu.org/sign_up?from=https%3A%2F%2Flearn.blockchainedu.org%2F" target="_blank">
                        <button className="flex mx-auto lg:mx-0 mt-10 border font-bold text-xl px-16 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">Join Us</button>
                        </a>
                    </div>
                </div>
            </section>
            <section className="get-involved-split mb-14 lg:mb-0">
            <div className="flex flex-col lg:flex-row max-w-7xl m-auto py-20 pb-0">
                <div className="bg-benorange-500 lg:bg-transparent py-24 lg:py-0 w-full lg:w-1/2 flex justify-center lg:justify-start px-7">
                    <div>
                        <div className="font-mont text-center lg:text-left text-xs uppercase pb-7">
                            Choose Now
                        </div>
                        <h2 className="font-black text-4xl md:text-5xl text-center lg:text-left text-black pb-10 m-auto lg:m-0 max-w-xl md:max-w-4xl leading-snug">
                            Alumni
                        </h2>
                        <p className="font-mont text-center lg:text-left m-auto text-sm lg:m-0 text-black max-w-lg leading-normal" style={{maxWidth:"440px;"}}>
                            If you’ve already graduated from college but still want ways to help BEN, join us as an alumni! We are looking for prestigious speakers for club events, teachers for BEN Learn, and mentors for our career center. Get involved and become an advisor to help us grow to the next level. Support the next generation of B.E.N. students with a donation and see the impact you have on students. <br /><br />Connect with fellow alumni through our extended network online or join us as national and international events.
                        </p>
                        <a href="https://learn.blockchainedu.org/feed" target="_blank">
                        <button className="flex mx-auto lg:mx-0 mt-10 border border-benblack-500 hover:border-bengrey-300 font-bold text-xl bg-benblack-500 px-16 rounded-full py-4 transition duration-500 hover:text-white text-white hover:bg-bengrey-300 shadow-button">Join Us</button>
                        </a>
                    </div>
                </div>
                <div className="bg-bengrey-100 lg:bg-transparent py-24 lg:pt-0 w-full lg:w-1/2 flex justify-center lg:justify-end px-7">
                    <div>
                        <div className="font-mont text-center lg:text-left text-xs uppercase pb-7">
                            Choose Now
                        </div>
                        <h2 className="font-black text-4xl md:text-5xl text-center lg:text-left text-black pb-10 m-auto lg:m-0 max-w-xl md:max-w-4xl leading-snug">
                            University Club
                        </h2>
                        <p className="font-mont text-center lg:text-left m-auto text-sm lg:m-0 text-bengrey-400 max-w-lg leading-normal" style={{maxWidth:"440px;"}}>
                            If you’ve already graduated from college but still want ways to help BEN, join us as an alumni! We are looking for prestigious speakers for club events, teachers for BEN Learn, and mentors for our career center. Get involved and become an advisor to help us grow to the next level. Support the next generation of B.E.N. students with a donation and see the impact you have on students. <br /><br />Connect with fellow alumni through our extended network online or join us as national and international events.
                        </p>
                        <a href="https://learn.blockchainedu.org/feed" target="_blank">
                        <button className="flex mx-auto lg:mx-0 mt-10 border border-white hover:border-benorange-500 font-bold text-xl bg-white px-16 rounded-full py-4 transition duration-500 hover:text-white text-black hover:bg-benorange-500 shadow-button">Join Us</button>
                        </a>
                    </div>
                </div>
            </div>
            </section>
            <Footer />
        </div>
    )
}
