import React from "react";
import Mailchimp from 'react-mailchimp-form'

export default function CryptoDonateItem(props) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className="text-center hover:bg-gray-50 duration-300 py-6 w-full m-auto"
                style={{ border: "1px dashed #CCCCCC", maxWidth: "200px" }}
                type="button"
                onClick={() => setShowModal(true)}
            >
                <div className="font-bold text-xl font-mont">{props.name}<span className="font-light"> {props.tickerName}</span></div>
                <img className="m-auto pt-4" src={props.image} />
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 pb-14 pt-10 p-3 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 pt-0 rounded-t z-30">
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 hover:bg-bengray-300 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-gray rounded-full h-3 w-3 text-black">
                                            <img src="/images/close-button.svg" />
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="flex items-center px-0 lg:px-7 -mt-10">
                                    <div>
                                        <img className="w-32 hidden lg:flex" src="/images/test-address.png" />
                                    </div>
                                    <div className="relative px-6 gap-x-20 items-center">
                                        <div className="flex items-center space-x-3 pb-3">
                                            <img className="h-7" src={props.image} />
                                            <img className="h-8" src="/images/color-logo-small.svg" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-mont font-bold">Send your donation</p>
                                            <p className="font-mont text-sm pt-2">To make a direct donation in {props.name} send {props.tickerName} to the address below.</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="flex items-center mx-5 mt-3 mb-6 justify-between rounded-full p-3 px-6 bg-gray-100 duration-300"
                                    onClick={() => navigator.clipboard.writeText(`${props.address}`)}

                                >
                                    <textarea className="h-6 bg-gray-100 justify-between w-full" style={{resize:"none"}}>
                                        {props.address}
                                    </textarea>
                                    <div className="font-mont text-sm uppercase text-benorange-500 font-medium">Copy</div>
                                </button>
                                <div className="font-mont text-xs text-center">
                                    By donating, you agree to our <b>terms of service</b> and <b>privacy policy</b>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-overlay opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}