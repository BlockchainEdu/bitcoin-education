import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"

export default function ThankYou() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Thank You | Blockchain Education Network</title>
      </Head>
      <section className="flex h-auto lg:h-screen mt-24 lg:mt-auto mb-24 lg:mb-auto">
        <div className="max-w-lg m-auto px-7">
          <h1 className="text-center font-mont text-4xl lg:text-5xl font-black">Thank you for your donation!</h1>
          <div className="flex flex-col lg:flex-row max-w-3xl justify-between mx-auto mt-14">
            <StandardButton
              link="/"
              text="Go Home"
              color="orange"
              styling="px-14 flex mx-auto lg:mx-0"
            />
            <StandardButton
              link="/about"
              text="Learn More"
              styling="px-12 flex mx-auto lg:mx-0 mt-6 lg:mt-0"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
