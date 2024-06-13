import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import Head from "next/head"

export default function Contact() {
    return (
        <div id="contact-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Internships | Blockchain Education Network</title>
            </Head>
            <section className="pt-10 lg:pt-24 py-24 rounded-md mt-4 lg:mt-10">
                <div className="max-w-4xl m-auto">
                    <iframe src="https://forms.monday.com/forms/embed/93ba212497018932d89afe673c7a35ee?r=use1" className="m-auto" width="100%" style={{height:"90vh"}}></iframe>
                </div>
            </section>
            <Footer />
        </div>
    )
}
