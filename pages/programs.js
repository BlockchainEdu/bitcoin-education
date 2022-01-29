import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import IndividualProgram from '../components/individualProgram';
import Head from "next/head"

export default function Programs() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <Head>
                <title>Programs | Blockchain Education Network</title>
            </Head>
            <IndividualProgram />
            <Footer />
        </div>
    )
}
