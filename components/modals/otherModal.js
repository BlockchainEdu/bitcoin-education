import { createRef, useCallback, useEffect, useState } from "react";

export default function OtherModal(props) {
  const donationAmountRef = createRef();

  function formatCurrency() {
    const value = donationAmountRef.current.value;
    const valueNumericOnly = value.replace(/[^0-9\.]+/g,'').split('.')[0] + '.00';
    if ( value === valueNumericOnly ) { return; }
    donationAmountRef.current.value = valueNumericOnly;
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
                Other
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
              <div>
                <input type="number" className="dollar-amount border border-gray bg-gray rounded-full py-2 pl-8 pr-4 w-full" step="0.01" onBlur={formatCurrency} ref={donationAmountRef} />
              </div>
              <div className="mt-8 text-center">
                <button
                  className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-16 rounded-full py-4"
                  type="button"
                  onClick={() => props.buttonClick(donationAmountRef.current.value)}
                >
                  Confirm Amount
                </button>
              </div>
            </div>
            <p className="p-6 pt-0 text-center">Upon hitting confirm, you will be redirected back.<br/>This does not complete your donation.</p>
          </div>
        </div>
      </div>
      <div className="button-overlay opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
