import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import IndividualProgram from '../components/individualProgram';


export default function DonateOptions() {
    return (
        <div>
            <div className="bg-white rounded-md p-6 py-14 ml-auto max-w-xl">
                <div className="flex justify-between m-auto">
                    <div className="">
                        <div className="font-mont uppercase text-xs mb-3 tracking-widest">
                            Select Gift Frequency
                        </div>
                        <div className="flex rounded-full p-1 justify-between" style={{ border: "1px solid #CCCCCC"}}>
                            <button className="font-mont text-benorange-500 text-sm font-bold shadow-2xl px-5 py-3 rounded-full" style={{ boxShadow: "(0px 10px 18px rgba(0, 0, 0, 0.08));" }}>
                                Monthly
                            </button>
                            <button className="font-mont font-bold text-sm px-5 py-3">
                                One Time
                            </button>
                        </div>
                    </div>
                    <div className="w-6/12">
                        <div className="flex justify-between">
                            <div className="font-mont uppercase text-xs mb-3 tracking-widest">
                                Select Amount
                            </div>
                            <div className="text-benorange-500 font-mont uppercase text-xs mb-3 underline tracking-widest">
                                Other
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-7 mb-5">
                    <button className="m-auto bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-12 rounded-full py-4">
                        Donate Now
                    </button>
                </div>
                <div className="mb-8 flex justify-center space-x-8 font-mont font-semibold text-benorange-500 text-sm">
                    <div>
                        Give with PayPal
                    </div>
                    <div>
                        Give with Crypto
                    </div>
                    <div>
                        Give with Wire Transfer
                    </div>
                </div>
                <div className="flex justify-center m-auto text-center font-mont space-x-8" style={{fontSize:"10px"}}>
                    <div className="border- border-black w-5/12">
                        Your <b>$1,000 monthly</b> donation can give 300 people clean water every year.
                    </div>
                    <div className="h-70 w-2/12" style={{width:"1px", background:"#E3E6E6"}}>

                    </div>
                    <div className="w-5/12">
                        By donating, you agree to our terms of service and <b>privacy policy</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
