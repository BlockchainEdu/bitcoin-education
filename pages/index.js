import Footer from "../components/footer";
import Header from "../components/header";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="pt-24">
        <img className="m-auto" src="/images/ben-logo.svg" />
        <h1 className="text-center text-4xl md:text-6xl font-black max-w-7xl m-auto pt-10 text-benblack-500 leading-snug">Providing borderless blockchain education</h1>
        <div className="flex flex-col sm:flex-row relative items-center justify-center space-y-14 sm:space-y-0 gap-x-4 mt-14">
          <button className="bg-benorange-500 text-white font-bold text-xl px-16 rounded-full py-4">
            Donate
        </button>
          <button className="border font-bold text-xl px-8 rounded-full py-4 text-benblack-500">
            Get involved TEST
        </button>
        </div>
      </div>
      <div className="max-w-7xl m-auto py-24 pt-48">
        <div className="grid grid-cols-5 gap-x-3 max-w-xs mx-auto md:mx-0">
          <a href=""><img src="/images/facebook-light.svg" /></a>
          <a href=""><img src="/images/twitter-light.svg" /></a>
          <a href=""><img src="/images/instagram-light.svg" /></a>
          <a href=""><img src="/images/medium-light.svg" /></a>
          <a href=""><img src="/images/discord-light.svg" /></a>
        </div>
        <div className="mt-14 md:-mt-8">
          <img className="m-auto" src="/images/scroll.svg" />
        </div>
      </div>
      <section className="bg-benorange-500 py-20">
        <h2 className="font-black text-4xl md:text-5xl text-black text-center">
          What is BEN?
      </h2>
        <p className="text-black text-md what-is-ben text-center m-auto pt-10">
          The Blockchain  Education Network (BEN)  is the largest and longest running network  of students, alumni, professors, teachers,  professionals, and community leaders  excited about blockchain across the world.  We are on a journey to spur blockchain  adoption by empowering our leaders to  bring blockchain to their companies and  communities.
      </p>
      </section>
      <section className="max-w-7xl m-auto py-24">
        <h2 className="font-black text-4xl md:text-5xl text-black text-center md:text-left">
          Our impact
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 pt-20 max-w-7xl m-auto align-center">
          <div className="">
            <img src="/images/ambassadors.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">200+</div>
            <div className="uppercase font-mont text-sm">Ambassadors</div>
          </div>
          <div className="">
            <img src="/images/ambassadors.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">250</div>
            <div className="uppercase font-mont text-sm">Companies Founded</div>
          </div>
          <div className="">
            <img src="/images/ambassadors.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">$100m</div>
            <div className="uppercase font-mont text-sm max w-60">Valuation of Companies Founded Through BEN</div>
          </div>
          <div className="">
            <img src="/images/ambassadors.svg" />
            <div className="font-medium font-mont text-benorange-500 text-4xl pt-6 pb-3">1500+</div>
            <div className="uppercase font-mont text-sm">Jobs Matches</div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl m-auto py-24 pb-14">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-mont text-center md:text-left text-xs uppercase pb-7">
              Our Vision
            </div>
            <h2 className="font-black text-center md:text-left text-5xl text-black pb-10">
              The 10:10 Plan
            </h2>
            <div className="flex items-center gap-x-10">
              <div className="border-r-none md:border-r md:border-4 md:border-benorange-500  h-24">

              </div>
              <div>
                <p className="font-mont text-center md:text-left mx-auto md:mx-0 text-2xl font-bold max-w-sm">
                  Over the next 10 years we plan to educate over 10M people in Blockchain Technology
                 </p>
              </div>
            </div>
            <button className="bg-benorange-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
              Learn more
            </button>
          </div>
          <div>
            <img className="mx-auto md:mx-0" src="/images/10-10-plan.png" />
          </div>
        </div>
      </section>
      <section className="py-24 bg-bengrey-500">
        <div className="max-w-7xl m-auto">
          <h2 className="font-black text-5xl text-black pb-10">
            BEN Ambassadors
          </h2>
          <p className="font-mont max-w-2xl text-bengrey-400">
            BEN actively mentors and supports over 200+ blockchain clubs around the world. We educate students about blockchain technology and inspire them to ﬁnd their talent and own it!  Either as a disrupter, entrepreneur,  investor, and team member.
          </p>
        </div>
        <div className="flex max-w-7xl m-auto items-center justify-between pt-20">
          <div className="w-1/5">
            <div>
              <img src="/images/clubs-icon.svg" />
              <div className="font-mont text-xs uppercase pt-3">
                Clubs
            </div>
            </div>
            <div className="py-10">
              <img src="/images/blockchain-center-icon.svg" />
              <div className="font-mont text-xs uppercase pt-3">
                Blockchain Center
            </div>
            </div>
            <div>
              <img src="/images/professors-icon.svg" />
              <div className="font-mont text-xs uppercase pt-3">
                Professors
            </div>
            </div>
          </div>
          <div className="w-4/5">
            <img className="m-auto" src="/images/static-map.svg"/>
          </div>
        </div>
      </section>
      <section className="flex max-w-7xl m-auto items-center justify-between py-24">
        <div>
          <h2 className="font-black text-5xl text-black pb-10">
            What do we do?
          </h2>
          <p className="font-mont max-w-lg">
            We serve our students by providing an abundance of resources. With our global chapters we host events, educate, create a community, build careers and mentor.
          </p>
        </div>
        <div>
          <img src="/images/what-do-we-do.png" />
        </div>
      </section>
      <section className="max-w-7xl m-auto py-24 pb-36">
        <h2 className="font-black text-5xl text-black pb-10">
          Featured in
          </h2>
        <div className="grid grid-cols-4 pt-4 gap-y-14">
          <img className="m-auto" src="/images/distributed.png" />
          <img className="m-auto" src="/images/crypto-core.png" />
          <img className="m-auto" src="/images/forbes.png" />
          <img className="m-auto" src="/images/nasdaq.png" />
          <img className="m-auto" src="/images/future-tech.png" />
          <img className="m-auto" src="/images/bitcoin.png" />
          <img className="m-auto" src="/images/hacked.png" />
          <img className="m-auto" src="/images/bitcoin-magazine.png" />
        </div>
      </section>
      <Footer />
    </div>
  )
}
