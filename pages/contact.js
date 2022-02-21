import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Head from "next/head"

export default function Contact() {
    return (
        <div id="contact-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Contact | Blockchain Education Network</title>
            </Head>
            <section className="py-24 rounded-md mt-4 lg:mt-10">
                <div className="max-w-4xl m-auto">
                    <div class="pipedriveWebForms flex mx-auto justify-center" data-pd-webforms="https://webforms.pipedrive.com/f/6ckRPrbXjDMRP9SfAgh0sIZx3kM8oyY5PO9sNf4b2k8k5WJqQV6TFgw6NrPBSk8uFd"><script src="https://webforms.pipedrive.com/f/loader"></script></div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
