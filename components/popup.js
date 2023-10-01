﻿import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Popup() {
  const [display, setDisplay] = useState(true);
  const closePopup = (e) => {
    setDisplay(false);
  };

  const router = useRouter();
  const hidePopupOnPage = ['/join'];
  const shouldHidePopup = hidePopupOnPage.includes(router.pathname);

  if (shouldHidePopup) {
    return null;
  }

  return (
    <>
      {false && (
        <div id="popup" className="overlay-popup-container" onClick={closePopup}>
          <div className="overlay-popup mx-6" onClick={(e) => e.stopPropagation()}>

            <div className="flex justify-end">
              <div className="overlay-popup-close w-6 mb-3" onClick={closePopup}><img src="/images/popup-close.svg" /></div>
            </div> */

            <div className="flex flex-col lg:flex-row bg-white gap-x-20 px-6 lg:px-0">
              <div className="w-full lg:w-1/2 py-10 pl-0 lg:ml-14">
                <div className="text-lg text-center mb-4">
                  Get your FREE
                </div>
                <div className="text-3xl text-center font-bold">
                  Ultimate Guide to the Wild World of Crypto
                </div>
                <div className="text-lg text-center my-4">
                  Learn why crypto crashed in 2022 and how to prepare for 2024 👇
                </div>
                <div className="flex justify-center">
                  <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true&utm_source=website&utm_medium=popup&utm_content=popup" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%" }}></iframe>
                </div>
              </div>
              <div className="w-full lg:h-auto lg:w-1/3" style={{ backgroundImage: "url(/images/your-guide-to-the-wild-world-of-crypto-3.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
              </div>
            </div>

          </div >
        </div >
      )
      }
    </>
  );
}
