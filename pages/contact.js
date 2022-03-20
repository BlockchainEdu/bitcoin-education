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
                    <iframe src="https://forms.monday.com/forms/embed/498adfc24b900b7c8d04e66a88d15d51?r=use1" className="m-auto" width="100%" style={{height:"90vh"}}></iframe>
                    <div class="pipedriveWebForms flex mx-auto justify-center" data-pd-webforms="https://webforms.pipedrive.com/f/6UURQKVAXIrvlnr2T6iyOX75xqbyYdLp6iHKmGYWedgMyJ25vpNmlZn3V8s8LEi9hx"><script src="https://webforms.pipedrive.com/f/loader"></script></div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
