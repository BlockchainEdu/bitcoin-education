import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"
import Image from 'next/image'

export default function Subscribe() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Subscribe | Blockchain Education Network</title>
      </Head>

      <section className="pt-10 lg:py-10 lg:pb-0 px-0">

        <div className="w-12/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ maxWidth: "1200px"}}>

          <div className="col-span-1 pt-0 px-1">
            <div className="pt-0 pb-20 px-5">
            {/*
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
            */}
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

            <div className="col-span-2 mt-12 text-center">
              <div className="flex justify-center">
                <div className="w-full grid grid-cols-8 gap-9 relative" style={{ margin: "-10px", width: "calc(20px * 8 + 4px * 7)" }}>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2">
                    <img
                      src="/images/stories/priya-ganguly.jpeg"
                      alt="User Image 1"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -z-1">
                    <img
                      src="/images/stories/valkyrie-holmes.jpg"
                      alt="User Image 2"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -z-2">
                    <img
                      src="/images/stories/sohail-mohammed.jpg"
                      alt="User Image 2"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -z-3">
                    <img
                      src="/images/stories/sarah-roff.jpeg"
                      alt="User Image 3"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -z-4">
                    <img
                      src="/images/stories/anthony-ung.jpeg"
                      alt="User Image 4"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -z-5">
                    <img
                      src="/images/stories/roberto-martinez.jpeg"
                      alt="User Image 5"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-gray-300 w-12 h-12 border-benorange border-2 -z-6">
                    <img
                      src="/images/stories/amrita-bhasin.jpeg"
                      alt="User Image 6"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-full bg-benorange-500 w-12 h-12 border-benorange border-2 -z-7">
                    <img
                      src="/images/stories//drew-cousin.jpeg"
                      alt="User Image 6"
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="mt-2 ml-8 text-bengrey-500 text-center text-md">Join thousands of readers!</p>
            </div>
          </div>




          <div className="col-span-1">
            <a href="https://beats.blockchainedu.org">
                <Image
                  width={595}
                  height={620}
                  layout="intrinsic"
                  objectFit="contain"
                  src="/images/homepage-thumbnail-3.png"
                  quality={100}
                />
            </a>
          </div> 
        </div>

      </section>
    </div>
  )
}