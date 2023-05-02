import { useState } from 'react'
import Mailchimp from 'react-mailchimp-form'

export default function Popup() {
  const [display, setDisplay] = useState(true);
  const closePopup = (e) => {
    setDisplay(false)
  }
  return <>
    {display &&
      <div id="popup" className="overlay-popup-container" onClick={closePopup}>
        <div className="overlay-popup" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end">
            <div className="overlay-popup-close w-6 mb-3" onClick={closePopup}><img src="/images/popup-close.svg" /></div>
          </div>
          <div className="p-10" style={{ background: "#F6F6F6" }}>
            <div className="flex flex-col lg:flex-row bg-white gap-x-20 px-6 lg:px-0">
              <div className="w-full lg:w-1/2 py-14 pl-0 lg:pl-14">
                <div className="text-3xl font-average" style={{ maxWidth: "400px" }}>
                  Learn to earn!
                </div>
                <div className="text-sm font-inter my-6">
                  Join our community of 50k+ for crypto market news, promo codes, and your free 24-page "Ultimate Guide to the Wild World of Crypto" by signing up below 👇
                </div>
                <div>
                    <div className="mx-auto lg:mx-0">
                        <iframe src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style={{margin: "0", borderRadius: "0px", backgroundColor: "transparent", width: "100%"}}></iframe>
                     </div>

{/*
                  <Mailchimp
                    action='https://blockchainedu.us4.list-manage.com/subscribe/post?u=8f05e1771877392fa3d41df41&amp;id=a53b080887'
                    fields={[
                      {
                        name: 'FNAME',
                        placeholder: 'First Name',
                        type: 'text',
                        required: true
                      },
                      {
                        name: 'LNAME',
                        placeholder: 'Last Name',
                        type: 'text',
                        required: true
                      },
                      {
                        name: 'EMAIL',
                        placeholder: 'Email',
                        type: 'email',
                        required: true
                      },

                    ]}
                    messages={
                      {
                        sending: "Sending...",
                        success: "Thank you for subscribing!",
                        error: "An unexpected internal error has occurred.",
                        empty: "You must write an e-mail.",
                        duplicate: "Too many subscribe attempts for this email address",
                        button: "Subscribe"
                      }
                    }
                    className="subscribe-form text-center flex items-start w-full flex-col"
                  />
*/}
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-sm font-inter" style={{ backgroundImage: "url(/images/popup.png)", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "80%"}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </>
}
