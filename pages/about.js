import Footer from "../components/footer";
import HeaderWithLogo from "../components/headerWithLogo";

export default function About() {
    return (
        <div>
            <HeaderWithLogo />
            <div className="about-header p-60 -mt-24">
                <div className="flex max-w-7xl m-auto">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-white max-w-3xl m-auto pt-10 leading-snug">
                            The Blockchain Education Network (BEN)
                        </h1>
                        <p className="text-white text-md pt-10 max-w-xl">
                            The Blockchain Education Network (BEN) is a 501(c)(3) non-porfit charitable organization.
                        </p>
                    </div>
                </div>
            </div>
            <section>
                <div className="flex max-w-7xl m-auto justify-between py-36">
                    <div><img src="/images/temp-image.png" /></div>
                    <div>
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            About
                        </div>
                        <h2 className="font-black text-5xl text-black pb-10 max-w-xs leading-snug">
                            501(c)(3) non-profit charitable organization
                        </h2>
                        <p className="font-mont max-w-2xl text-bengrey-400 max-w-lg">
                            We are the largest and longest running network of students, alumni, professors, teachers, professionals, and community leaders excited about blockchain across the world. We are on a mission to spur blockchain adoption by empowering our leaders to bring blockchain to their companies and communities.
                        </p>
                    </div>
                </div>
                <div className="flex max-w-7xl m-auto justify-between py-36 pb-24">
                    <div>
                        <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
                            Our Work
                        </div>
                        <h2 className="font-black text-5xl text-black pb-10 max-w-4xl leading-snug">
                            Providing students with accessible, high quality blockchain education
                        </h2>
                        <p className="font-mont text-bengrey-400 max-w-lg">
                            Since blockchain was ﬁrst invented in 2008, most universities around the world haven't been able to create a dedicated curriculum around  it , thus creating a high demand from students to learn about blockchain. We address students' desire to learn about blockchain and pursue opportunities in the industry.
                        </p>
                    </div>
                    <div><img src="/images/temp-image.png" /></div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
