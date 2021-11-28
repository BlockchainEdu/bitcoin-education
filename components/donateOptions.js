import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import IndividualProgram from '../components/individualProgram';


export default function DonateOptions() {
    return (
        <div className="px-3">
            <div className="bg-white rounded-3xl p-6 py-14 ml-auto max-w-xl shadow-2xl">
                <div className="flex flex-col lg:flex-row justify-between m-auto">
                    <div className="w-full lg:w-auto">
                        <div className="font-mont uppercase text-center lg:text-left text-xs mb-3 tracking-widest">
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
                    <div className="w-full lg:w-6/12">
                        <div className="flex justify-center space-x-10 lg:justify-between">
                            <div className="mt-6 lg:mt-0 font-mont text-center lg:text-left uppercase text-xs mb-3 tracking-widest">
                                Select Amount
                            </div>
                            <div className="hidden lg:flex text-benorange-500 font-mont uppercase text-xs mb-3 underline tracking-widest">
                                Other
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-7 mb-10 lg:mb-5">
                    <button className="m-auto bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-12 rounded-full py-4">
                        Donate Now
                    </button>
                </div>
                <div className="mb-5 lg:mb-8 flex justify-center space-x-8 font-mont font-semibold text-benorange-500 text-sm">
                    <div>
                        Give with PayPal
                    </div>
                    <div>
                        Give with Crypto
                    </div>
                    <div className="hidden lg:flex">
                        Give with Wire Transfer
                    </div>
                </div>
                    <div className="lg:hidden font-mont font-semibold text-benorange-500 text-sm text-center">
                        Give with Wire Transfer
                    </div>
                <div className="mt-10 lg:mt-0 flex flex-col lg:flex-row justify-center m-auto text-center font-mont space-x-2 lg:space-x-8" style={{fontSize:"10px"}}>
                    <div className="border- border-black mx-auto lg:mx-0 w-8/12 lg:w-5/12 ">
                        Your <b>$1,000 monthly</b> donation can give 300 people clean water every year.
                    </div>
                    <div className="h-70 w-2/12 hidden lg:flex" style={{width:"1px", background:"#E3E6E6"}}>

                    </div>
                    <div className="pt-4 lg:pt-0 mx-auto lg:mx-0 w-8/12 lg:w-5/12">
                        By donating, you agree to our terms of service and <b>privacy policy</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
