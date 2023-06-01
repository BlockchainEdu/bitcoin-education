import { useState } from 'react';
import Mailchimp from 'react-mailchimp-form';
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
      {display && (
        <div id="popup" className="overlay-popup-container" onClick={closePopup}>
          <div className="overlay-popup" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <div className="overlay-popup-close w-6 mb-3" onClick={closePopup}><img src="/images/popup-close.svg" /></div>
            </div>
           <div className="p-10" style={{ background: "#F6F6F6" }}>
              <div className="flex flex-col lg:flex-row bg-white gap-x-20 px-6 lg:px-0">
                <div className="w-full lg:w-1/2 py-14 pl-0 lg:pl-14">
                  <div className="text-3xl font-average" style={{ maxWidth: "400px" }}>
                      Hours of research, condensed into minutes
                  </div>
                  <div className="text-sm font-inter my-6">
                    Get a free "Guide to the Wild World of Crypto" when you sign up now 👇
                  </div>
                  <div>
                      <div className="mx-auto lg:mx-0">
                          <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style={{margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%"}}></iframe>
                       </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 text-sm font-inter" style={{ backgroundImage: "url(/images/popup.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "80%"}}>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
