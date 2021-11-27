import CryptoDonateItem from '../components/cryptoDonateItem';
import DonateOptions from '../components/donateOptions';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import IndividualProgram from '../components/individualProgram';

const cryptoInfo = [
    {
        name: "Bitcoin",
        tickerName: "BTC",
        address: "temp address",
        image: "/images/bitcoin-icon.svg"
    },
    {
        name: "Ethereum",
        tickerName: "ETH",
        address: "temp address",
        image: "/images/ethereum-icon.svg"
    },
    {
        name: "Tether",
        tickerName: "USDT",
        address: "temp address",
        image: "/images/tether-icon.svg"
    },
    {
        name: "Solana",
        tickerName: "SOL",
        address: "temp address",
        image: "/images/solana-icon.svg"
    },
    {
        name: "Filecoin",
        tickerName: "FIL",
        address: "temp address",
        image: "/images/filecoin-icon.svg"
    },
    {
        name: "IoTa",
        tickerName: "MIOTA",
        address: "temp address",
        image: "/images/iota-icon.svg"
    },
    {
        name: "Augur",
        tickerName: "REP",
        address: "temp address",
        image: "/images/augur-icon.svg"
    },
    {
        name: "Ontology",
        tickerName: "ONT",
        address: "temp address",
        image: "/images/ontology-icon.svg"
    },
    {
        name: "XRP",
        tickerName: "XRP",
        address: "temp address",
        image: "/images/xrp-icon.svg"
    },
    {
        name: "Dogecoin",
        tickerName: "DOGE",
        address: "temp address",
        image: "/images/dogecoin-icon.svg"
    },
    {
        name: "Shiba",
        tickerName: "SHIB",
        address: "temp address",
        image: "/images/shiba-icon.svg"
    },
]


export default function Donate() {
    return (
        <div id="partners-page">
            <HeaderWithLogoDark />
            <section className="bg-benorange-500">
                <div className="flex max-w-7xl m-auto py-24">
                    <div className="w-full lg:w-4/12">
                        <div className="font-mont text-center lg:text-left text-xs uppercase">
                            Donate Today
                        </div>
                        <h1 className="text-4xl md:text-5xl text-center lg:text-left font-black text-black max-w-sm pt-10 leading-snug">
                            Why you should donate
                        </h1>
                        <p className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                            Turn your crypto into free education to help empower communities around the world
                            When you donate your crypto directly to BEN, we will directly use it to have free
                            Blockchain education around the world, and empower communities to use blockchain
                            technology to create wealth.
                        </p>
                    </div>
                    <div className="w-8/12">
                        <DonateOptions />
                    </div>
                </div>
            </section>
            <section className="max-w-7xl m-auto py-14">
                <h2 className="text-4xl md:text-5xl text-center font-black text-black pt-10 leading-snug">
                    We are disrupting blockchain education with the world most innovative currencies
                </h2>
                <p className="text-black text-md pt-10 m-auto lg:m-0 text-center font-medium">
                    When you donate crypto directly to BEN, we immediately convert your coins into fiat.<br />
                    Your gift will fund blockchain education through workshop around the world.
                </p>
                <p className="text-black text-xs pt-4 m-auto lg:m-0 text-center font-medium">
                    Please note that all donations made in crypto are nonrefundable.
                </p>
            </section>
            <div className="grid grid-cols-4 gap-y-2 m-auto justify-between p-6 py-7" style={{ border: "1px solid #E5E5E5", maxWidth: "880px" }}>
                {cryptoInfo.map((item) => (
                    <CryptoDonateItem
                        name={item.name}
                        tickerName={item.tickerName}
                        address={item.address}
                        image={item.image}
                    />
                ))}
            </div>
            <section>
                <div className="flex max-w-7xl m-auto items-center justify-between">
                    <div className="w-full lg:w-6/12 m-auto pt-14 pb-0 lg:pb-24">
                        <img className="m-auto" src="/images/tax-benefits.png" />
                    </div>
                    <div className="w-1/2">
                        <div className="font-mont text-center lg:text-left text-xs uppercase">
                            Donating Crypto
                        </div>
                        <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                            Tax Benefits of donating crypto
                        </h1>
                        <ul className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                            If you donate crypto directly to the 501(c)(3) nonprofits, not only you
                            don’t have to pay tax on the capital gains, you can also get a full amount
                            of deductions for what crypto is worth on the date of donation. Find more
                            information on our guide here:
                        </ul>
                        <div className="mt-10 flex gap-x-10 flex-col lg:flex-row mx-auto">
                            <a className="mx-auto lg:mx-0" target="_blank" href="">
                                <button className="border font-bold text-xl px-10 rounded-full py-4 transition duration-500 hover:text-white text-benblack-500 hover:bg-bengrey-300">
                                    Tax Benefits
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
