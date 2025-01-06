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
      <div className="relative w-auto mx-auto max-w-2xl pb-4">
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
                    <div className="font-inter font-semibold text-md text-benblack-500">
                      Gift Amount
                    </div>
                  </div>
                  <div>
                    <div className="hover:cursor-pointer text-benblack-500 text-right underline font-inter font-semibold" onClick={() => props.otherClick()}>Other</div>
                  </div>
                </div>
                <div className="w-full mt-4 mb-8 donation-slider-container border rounded-lg p-4">
                  <DonationSlider min={props.minDonationAmount} max={props.maxDonationAmount} step={props.step}
                                  currValue={props.startingDonationAmount.amount} onChange={setSelectedAmount} />
                </div>
                <p className="w-full font-inter text-benblack-500 font-bold mb-8">Your ${selectedFrequency === giftFrequency.monthly ? selectedAmount + " monthly" : selectedAmount} donation can educate {Math.floor(selectedAmount / 12)} students.</p>
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                  <div>
                    <span className="pr-4 font-inter font-bold text-benblack-500">{selectedFrequency === giftFrequency.monthly ? "Monthly" : "One-time"} Gift</span>
                  </div>
                  <div
                    className="mx-auto lg:mx-0 relative grid grid-cols-2 border rounded-full text-center hover:cursor-pointer font-mont font-bold p-1 bg-black"
                    style={{
                      borderColor: "#CCC",
                      fontFamily: "sans-serif",
                      height: "fit-content",
                    }}
                    id="gift-frequency"
                  >
                    <div className={selectedFrequency === giftFrequency.monthly ? "shadow-3xl rounded-full text-orange text-center bg-white" : undefined} onClick={() => setSelectedFrequency(giftFrequency.monthly)}></div>
                    <div className={selectedFrequency === giftFrequency.oneTime ? "shadow-3xl rounded-full text-orange text-center bg-white" : undefined} onClick={() => setSelectedFrequency(giftFrequency.oneTime)}></div>
                  </div>
                </div>
                <div className="hover:cursor-pointer text-orange underline flex md:hidden justify-center mt-10 md:mt-0" onClick={() => props.otherClick()}>Other</div>
                <div className="text-center mt-8">
                  <button
                    className="bg-benblack-500 hover:bg-bengrey-500 transition duration-500 shadow-button text-white font-bold text-xl px-14 py-4 w-full rounded-lg"
                    type="button" disabled={props.loading}
                    onClick={() => props.buttonClick({ amount: selectedAmount * 1.00, frequency: selectedFrequency })}
                  >
                    Donate Now
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-y-3 md:gap-y-0 pt-10 gap-x-10 justify-center">
                  <a className="text-center" target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=JZT2VJ5WA6GJJ">
                    <button className="text-benblack-500 underline text-md font-semibold">
                      Give with PayPal
                    </button>
                  </a>
                  <a className="text-center" target="_blank" href="/donate#crypto">
                    <button className="text-benblack-500 underline font-semibold">
                      Give with Crypto
                    </button>
                  </a>
                  <a className="text-center" target="_blank" href="/images/ben-wire-details.pdf">
                    <button className="text-benblack-500 underline font-semibold">
                      Give with Wire Transfer
                    </button>
                  </a>
                </div>
                <p className="w-full font-inter mt-8 text-benblack-500">By donating, you agree to our terms of service and privacy policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
