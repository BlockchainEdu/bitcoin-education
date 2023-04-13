import Footer from "../components/footer";
import Header from "../components/header";
import StandardButton from "../components/standardButton";
import Head from "next/head"
import Image from 'next/image'

export default function ThankYou() {
  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Thank You | Blockchain Education Network</title>
      </Head>
      <section className="flex mt-24 lg:mt-auto mb-24 lg:mb-auto px-7 lg:px-0">
        <div className="max-w-lg m-auto py-4">
          <h1 className="mb-10 text-center font-mont text-4xl lg:text-5xl font-black">Thank You for Subscribing!</h1>
          <h2 className="mb-6 text-center text-xl lg:text-2xl">Welcome to BEN Beats!</h2>
          <div className="mb-6">Hey, BENsters! Excited to hit the road with ya!</div>
          <div className="mb-6">To-Do List:</div>
          <div className="mb-6 show-bullets">
              <ol>
                <li className="mb-3"><strong>Don't forget to shoot us an "OK" in response to our welcome email.</strong> That way, you won't miss a beat with our weekly newsletters!</li>
                <li className="mb-3"><strong>Make sure you've got our email in your inbox.</strong> If you <strong>can't see</strong> it, check your <strong>spam folder</strong> and make sure to add us to <strong>your 'not spam' section.</strong></li>
              </ol>
          </div>
          <div className="mb-6">This takes less than 4 mins to read! How awesome is that? 😎</div>
          <div className="mb-6">🧙‍♂️We've put together all our crypto knowledge for over 9 years into this newsletter to figure out when the bulls are coming and to find new trends. You gotta be in the know! 🦄</div>
          <div className="mb-6">⭐ And guess what? We've potentially found some of the sickest projects in crypto 📈 ! </div>
          <div className="mb-6">Keep your eyes peeled 👀, don't wanna miss out on this!</div>
          <div className="mb-6">Do you have a minute or two to check your email? We just sent you something! 😊</div>
          <div className="mb-6">To the moon and beyond 🚀🌙,<br/>- BEN Team</div>
          <img width="250px" height="250px" src="/images/dogecoin-to-the-moon.gif" loop />
        </div>
      </section>
      <Footer />
    </div>
  )
}
