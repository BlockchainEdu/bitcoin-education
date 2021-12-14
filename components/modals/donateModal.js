import { createRef, useEffect, useState } from "react";
import DonationSlider from "../donationSlider";

export const giftFrequency = {
  monthly: 'monthly',
  oneTime: 'one time',
}

export default function DonateModal(props) {
  const [selectedFrequency, setSelectedFrequency] = useState(giftFrequency.monthly);
  const [selectedAmount, setSelectedAmount] = useState(props.startingDonationAmount.amount);
  const [numStudents, setNumStudents] = useState(1);
  const sliderRef = createRef();
  const sliderCoverRef = createRef();
  const sliderCoverLeftArrow = createRef();
  const sliderCoverAmountRef = createRef();
  const sliderCoverRightArrow = createRef();

  return (
    <>
      <div className="relative w-auto mx-auto max-w-2xl">
        {/*content*/}
        <div className="border-0 donation-modal rounded-2xl shadow-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*body*/}
          <div className="relative w-auto">
            {/*content*/}
            <div className="border-0 donation-modal rounded-2xl relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-2 md:p-5 flex-auto">
                <div className="hidden md:grid md:grid-cols-2 " id="gift-grid">
                  <div>
                    <div className="uppercase mb-8">
                      Select Gift Frequency
                    </div>
                  </div>
                  <div>
                    <div className="uppercase mb-8 grid grid-cols-2">
                      <div>Select Amount</div>
                      <div className="hover:cursor-pointer text-orange text-right underline" onClick={() => props.otherClick()}>Other</div>
                    </div>
                  </div>
                </div>
                <div className="font-mont text-sm uppercase flex md:hidden justify-center mb-3 md:mb-0">Select Gift Frequency</div>
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                  <div
                    className="mx-auto lg:mx-0 w-4/12 relative grid grid-cols-2 border rounded-full text-center hover:cursor-pointer font-mont font-bold p-1"
                    style={{
                      borderColor: "#CCC",
                      fontFamily: "sans-serif",
                      maxWidth: "300px",
                      width: "100%"
                    }}
                    id="gift-frequency"
                  >
                    <div className={selectedFrequency === giftFrequency.monthly ? "shadow-3xl rounded-full text-orange text-center" : undefined} onClick={() => setSelectedFrequency(giftFrequency.monthly)}>Monthly</div>
                    <div className={selectedFrequency === giftFrequency.oneTime ? "shadow-3xl rounded-full text-orange text-center" : undefined} onClick={() => setSelectedFrequency(giftFrequency.oneTime)}>One time</div>
                  </div>
                  <div className="w-full md:w-8/12 mt-8 md:mt-0">
                    <div className="font-mont text-sm uppercase flex md:hidden justify-center mb-3 md:mb-0">Select Amount</div>
                    <DonationSlider min={props.minDonationAmount} max={props.maxDonationAmount} step={props.step}
                                    currValue={props.startingDonationAmount.amount} onChange={setSelectedAmount} />
                  </div>
                </div>
                <div className="hover:cursor-pointer text-orange underline flex md:hidden justify-center mt-10 md:mt-0" onClick={() => props.otherClick()}>Other</div>
                <div className="text-center mt-8">
                  <button
                    className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-14 rounded-full py-4"
                    type="button" disabled={props.loading}
                    onClick={() => props.buttonClick({ amount: selectedAmount * 1.00, frequency: selectedFrequency })}
                  >
                    Donate Now
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-0 pt-10 gap-x-10 justify-center">
                  <a className="text-center" target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=JZT2VJ5WA6GJJ">
                    <button className="text-orange">
                      Give with PayPal
                    </button>
                  </a>
                  <a className="text-center" target="_blank" href="/donate#crypto">
                    <button className="text-orange">
                      Give with Crypto
                    </button>
                  </a>
                  <a className="text-center" target="_blank" href="/images/ben-wire-details.pdf">
                    <button className="text-orange">
                      Give with Wire Transfer
                    </button>
                  </a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-x-0 md:gap-x-6 mt-3 mb-6">
                <p className="w-full md:w-5/12 font-mont text-xs text-center mx-auto md:mx-0" style={{ maxWidth: "245px" }}>Your <b>${selectedFrequency === giftFrequency.monthly ? selectedAmount + " monthly" : selectedAmount}</b> donation can educate {Math.floor(selectedAmount / 40)} students.</p>
                <div className="h-10 w-1 bg-gray-100 hidden md:flex"></div>
                <p className="w-full md:w-5/12 font-mont text-xs text-center mx-auto mx-auto md:mx-0 mt-6 md:mt-0" style={{ maxWidth: "245px" }}>By donating, you agree to our <b>terms of service</b> and <b>privacy policy.</b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
