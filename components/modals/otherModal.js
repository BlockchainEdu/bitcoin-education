import { createRef, useState } from "react";
import { giftFrequency } from "./donateModal";

export default function OtherModal(props) {
  const donationAmountRef = createRef();
  const [donationAmount, setDonationAmount] = useState(props.donationAmount);

  function formatCurrency() {
    const value = donationAmountRef.current.value;
    const valueNumericOnly = value.replace(/[^0-9\.]+/g, '').split('.')[0] + '.00';
    if (value === valueNumericOnly) { return; }
    donationAmountRef.current.value = valueNumericOnly;
    setDonationAmount(valueNumericOnly);
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
      >
        <div className="relative w-auto my-6 mx-auto max-w-xl" style={{ width: "100%" }}>
          {/*content*/}
          <div className="border-0 donation-modal rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 rounded-t">
              <h3 className="text-3xl font-mont font-bold">
                Other
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 hover:bg-bengray-300 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={props.closeModal}
              >
                <span className="bg-gray rounded-full h-3 w-3 text-black">
                  <img src="/images/close-button.svg" />
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div>
                <input type="number" className="dollar-amount border border-gray bg-gray rounded-full py-2 pl-8 pr-4 w-full" step="0.01" placeholder="0.00" onBlur={formatCurrency} ref={donationAmountRef} required />
              </div>
              <div className="mt-8 text-center">
                <button
                  className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-8 rounded-full py-4"
                  type="button" disabled={props.loading}
                  onClick={() => props.buttonClick(donationAmount)}
                >
                  Confirm Amount
                </button>
              </div>
            </div>
            <p className="p-6 pt-0 text-center font-mont text-xs" style={{color:"#333333", lineHeight:"20px"}}>Upon hitting confirm, you will be redirected back.<br />This does not complete your donation.</p>
          </div>
        </div>
      </div>
      <div className="button-overlay opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
