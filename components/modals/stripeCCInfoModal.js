import { createRef, useCallback, useEffect, useState } from "react";

export default function StripeCCInfoModal(props) {
  function donateNow() {
    const amount = props.donationAmount.amount;
    const frequency = props.donationAmount.frequency;
    alert(`You have donated \$${amount} ${frequency}.`);
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 donation-modal rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 rounded-t">
              <h3 className="text-3xl font-mont font-bold">
                Donate
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 hover:bg-bengray-300 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={props.closeModal}
              >
                <span className="bg-gray rounded-full h-3 w-3 text-black">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="mt-8 text-center">
                <button
                  className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-16 rounded-full py-4"
                  type="button"
                  onClick={donateNow}
                >
                  Confirm Amount
                </button>
              </div>
            </div>
            <p className="p-6">By donating, you agree to our <b>terms of service</b> and <b>privacy policy</b></p>
          </div>
        </div>
      </div>
      <div className="button-overlay opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
