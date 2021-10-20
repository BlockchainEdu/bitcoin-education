import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';

export default function Contact() {
    return (
        <div id="contact-page">
            <HeaderWithLogoDark />
            <section className="py-24 rounded-md">
                <div className="max-w-3xl m-auto">
                <iframe className="monday-form--contact rounded-md shadow-2xl" src="https://forms.monday.com/forms/embed/5e438fc2336c69a7ba7e88901093cd4d?r=use1" width="650" height="500"></iframe>
                </div>
            </section>
            <Footer />
        </div>
    )
}
