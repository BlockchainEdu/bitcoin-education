import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"
import Image from 'next/image'

export default function Sponsor() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Sponsor | Blockchain Education Network</title>
      </Head>

      <section className="pt-10 lg:py-10 lg:pb-0 px-0">

        <div className="w-11/12 lg:w-7/12 text-xl lg:text-xl text-justify max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10" style={{ maxWidth: "1200px" }}>


          <h2 className="text-3xl font-bold text-center">ChainStories Podcast</h2>
          <p>The ChainStories podcast interviews ultra-successful founders in digital assets. Hosted by Cryptoniooo, this podcast upholds the highest standards to provide unbiased education and deep insights from the best minds in the industry.
          </p>
          <p>Spots are extremely limited. </p>

          <p>If you believe you have what it takes, send a short email with:</p>
          <ul className="checklist" style={{ paddingLeft: "30px" }}>
            <li>Your socials</li>
            <li>A brief history of the founder</li>
            <li>Why you should be on the podcast—What makes your journey stand out? What impact have you made?</li>
            <li>Are you launching or planning to launch a token? If so, share details.</li>
          </ul>

          <div className="flex justify-center">
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTloeIw4TxyPD84WqAnmcCldGYmYaAEc5QuXfLy9rSa2TJlH4JWLT8fXEhIvbcshmBiZEZjq0UdjYqW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
          <div className="flex justify-center mb-10">
            <a href="mailto:contact@blockchainedu.org" className="px-4 py-2 bg-benorange-500 text-white rounded-md">
              Apply Now
            </a>
          </div>

        </div>

      </section>
      <Footer />
    </div>
  )
}
