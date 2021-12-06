import { createRef, useCallback, useEffect, useState } from "react";

export const giftFrequency = {
  monthly: 'monthly',
  oneTime: 'one time',
}

export default function DonateModal(props) {
  const [selectedFrequency, setSelectedFrequency] = useState(giftFrequency.monthly);
  const sliderRef = createRef();
  const sliderCoverRef = createRef();
  const sliderCoverLeftArrow = createRef();
  const sliderCoverAmountRef = createRef();
  const sliderCoverRightArrow = createRef();
  let mouseDownTime = 0;

  function moveDonationSlider(event) {
    const xPosition = sliderRef.current.getBoundingClientRect().x;
    const minValue = sliderRef.current.min;
    const maxValue = sliderRef.current.max;
    const currValue = sliderRef.current.value;
    const currPercentage = 100 * currValue / (maxValue - minValue);
    sliderCoverRef.current.style.left = `${Math.max( currPercentage - 30, 0 )}%`;
    sliderCoverAmountRef.current.innerHTML = `\$${currValue}`;
    sliderCoverLeftArrow.current.style.color = "black";
    sliderCoverRightArrow.current.style.color = "black";
    if ( currValue === minValue ) {
      sliderCoverLeftArrow.current.style.color = "gray";
    }
    if ( currValue === maxValue ) {
      sliderCoverRightArrow.current.style.color = "gray";
    }
  }

  function setMouseDownTime() {
    mouseDownTime = Date.now();
  }

  function doSliderClickActions() {
    const maxTimeForClick = 100;
    const didClick = Date.now() - mouseDownTime < maxTimeForClick;
    if ( !didClick ) { return; }
    props.sliderClick();
  }

  function dontPropagateClick(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
        onClick={props.closeModal}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={dontPropagateClick}>
          {/*content*/}
          <div className="border-0 donation-modal rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="grid grid-cols-2" id="gift-grid">
                <div>
                  <div className="uppercase mb-8">
                    Select Gift Frequency
                  </div>
                  <div
                    className="relative grid grid-cols-2 border rounded-full text-center hover:cursor-pointer"
                    style={{
                      borderColor: "#CCC",
                      fontFamily: "sans-serif",
                      width: 300
                    }}
                    id="gift-frequency"
                  >
                    <div className={selectedFrequency === giftFrequency.monthly ? "border rounded-full text-orange text-center" : undefined } onClick={() => setSelectedFrequency(giftFrequency.monthly)}>Monthly</div>
                    <div className={selectedFrequency === giftFrequency.oneTime ? "border rounded-full text-orange text-center" : undefined } onClick={() => setSelectedFrequency(giftFrequency.oneTime)}>One time</div>
                  </div>
                </div>
                <div>
                  <div className="uppercase mb-8">
                    Select Amount
                  </div>
                  <div className="slidecontainer relative">
                    <div className="donation-slider-track relative z-0"></div>
                    <div className="donation-slider-cover absolute top-0 z-1" ref={sliderCoverRef}>
                      <span className="left-arrow mr-3" ref={sliderCoverLeftArrow}>&lt;</span>
                      <span className="dollar-amount" ref={sliderCoverAmountRef}>$10</span>
                      <span className="right-arrow ml-3" ref={sliderCoverRightArrow}>&gt;</span>
                    </div>
                    <input type="range" min={props.minDonationAmount} max={props.maxDonationAmount}
                           className="slider relative z-10" id="donation-slider" defaultValue={props.startingDonationAmount}
                           onMouseDown={setMouseDownTime} onMouseUp={doSliderClickActions}
                           onChange={moveDonationSlider} ref={sliderRef} />
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <button
                  className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-16 rounded-full py-4"
                  type="button"
                  onClick={() => props.buttonClick(sliderRef.current.value, selectedFrequency)}
                >
                  Donate Now
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-y-7 md:gap-y-0 pt-10 gap-x-10 justify-center">
                <a className="text-center" target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=JZT2VJ5WA6GJJ">
                  <button className="text-orange">
                    Give with PayPal
                  </button>
                </a>
                <a className="text-center" target="_blank" href="https://commerce.coinbase.com/checkout/041362e5-b215-4484-82d9-fb27e513563a">
                  <button className="text-orange">
                    Give with Crypto
                  </button>
                </a>
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
