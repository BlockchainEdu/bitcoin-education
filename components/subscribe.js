import React from "react";
import Mailchimp from 'react-mailchimp-form'

export default function Subscribe() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-16 rounded-full py-4"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Subscribe
      </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 donation-modal rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="pt-10 flex items-start justify-between p-5 rounded-t">
                                    <h3 className="text-3xl font-mont font-bold">
                                        Subscribe
                  </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 hover:bg-bengray-300 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-gray rounded-full h-3 w-3 text-black">
                                            ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 pb-10 md:pb-0 flex-auto">
                                    <div>
                                        <Mailchimp
                                            action='https://blockchainedu.us4.list-manage.com/subscribe/post?u=8f05e1771877392fa3d41df41&amp;id=a53b080887'
                                            fields={[
                                                {
                                                    name: 'EMAIL',
                                                    placeholder: 'Email',
                                                    type: 'email',
                                                    required: true
                                                },
                                                {
                                                    name: 'SCHOOL',
                                                    placeholder: 'School',
                                                    type: 'text',
                                                    required: true
                                                }
                                            ]}
                                            messages = {
                                                {
                                                  sending: "Sending...",
                                                  success: "Thank you for subscribing!",
                                                  error: "An unexpected internal error has occurred.",
                                                  empty: "You must write an e-mail.",
                                                  duplicate: "Too many subscribe attempts for this email address",
                                                  button: "Subscribe"
                                                }
                                              }
                                            className="subscribe-form text-center "
                                        />
                                    </div>
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