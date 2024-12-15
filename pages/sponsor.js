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

        <div className="w-11/12 lg:w-7/12 mx-auto grid grid-cols-1 lg:grid-cols-1 gap-10" style={{ maxWidth: "1200px" }}>


          <h2 className="text-3xl font-bold text-center">Sponsor</h2>
          <p>The ChainStories podcast tells the stories of the innovative trailblazers
            turning their audacious ideas into billion dollar startups.
            Your host, Cryptoniooo, has been investing in crypto for 10+ years,
            building projects and investing in early-stage blockchain startups.</p>
          <div className="flex justify-center">
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTloeIw4TxyPD84WqAnmcCldGYmYaAEc5QuXfLy9rSa2TJlH4JWLT8fXEhIvbcshmBiZEZjq0UdjYqW/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
          </div>
          <div className="flex justify-center">
            <a href="mailto:contact@blockchainedu.org" className="px-4 py-2 bg-benorange-500 text-white rounded-md">
              Book Main Ad
            </a>
          </div>

          <div className="mb-10"><i>All ads are subject to approval. The best fit for our audience are products related to blockchain, tech, and productivity. Irrelevant ads will not be approved.</i></div>
        </div>

      </section>
      <Footer />
    </div>
  )
}
