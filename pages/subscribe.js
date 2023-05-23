import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"
import Image from 'next/image'

export default function Subscribe() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Subscribe | Blockchain Education Network</title>
      </Head>

      <section className="pt-10 lg:py-10 lg:pb-0 px-0">

        <div className="w-12/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ maxWidth: "1200px"}}>

          <div className="col-span-1 pt-0 px-1">
            <div className="pt-0 pb-20 px-5">
            <a href="/">
              <Image
                width={158}
                height={50}
                layout="intrinsic"
                objectFit="contain"
                src="/images/ben-logo.png"
                quality={100}
              />
              </a>
            </div>
            <h1 className="font-average text-6xl xl:text-6xl text-center max-w-4xl mx-auto mt-4 mx-1">
              Crypto news, events, jobs, and tools!
            </h1>
            <div className="text-bengrey-500 text-xl text-center mx-auto leading-6" style={{ maxWidth: "610px" }}>
              Join our community of 50k+ by signing up below 👇
            </div>
            <div className="flex flex-col lg:flex-row justify-center space-y-6 lg:space-y-0 lg:space-x-4 my-10 m-auto" style={{ maxWidth: "800px" }}>
              <div className="mx-auto lg:mx-0 md:w-full lg:w-5/6">
                <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%" }}></iframe>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <Image
              width={595}
              height={620}
              layout="intrinsic"
              objectFit="contain"
              src="/images/homepage-thumbnail-2.png"
              quality={100}
            />
          </div> 
        </div>

      </section>
    </div>
  )
}