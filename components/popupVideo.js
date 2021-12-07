import React from "react";
import Mailchimp from 'react-mailchimp-form'

export default function PopUpVideo(props) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button
                className=""
                type="button"
                onClick={() => setShowModal(true)}
            >
                <img className="rounded-md shadow-2xl" src={props.thumbnail} />
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{width:"90%"}}>
                            {/*content*/}
                            <div className="border-0 pt-3 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between pb-2 pr-2 pt-0 rounded-t z-30">
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
                                <iframe className="popup-video-frame rounded-b-xl" src="https://player.vimeo.com/video/653049643?h=c1fa5c7bdf&autoplay=1&title=0&byline=0&portrait=0" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="button-overlay opacity-75 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}