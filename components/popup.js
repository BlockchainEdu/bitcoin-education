import { useState } from 'react'

export default function Popup() {
  const [display, setDisplay] = useState(true);
  const closePopup = (e) => {
    setDisplay(false)
  }
  return <>
    {display &&
      <div className="overlay-popup-container" onClick={closePopup}>
        <div className="overlay-popup" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end">
            <div className="overlay-popup-close w-6 mb-3" onClick={closePopup}><img src="/images/popup-close.svg" /></div>
          </div>
          <div className="p-10" style={{ background: "#F6F6F6" }}>
            <div className="flex flex-col lg:flex-row bg-white gap-x-20 px-6 lg:px-0">
              <div className="w-full lg:w-1/2 py-14 pl-0 lg:pl-14">
                <div className="text-3xl font-average" style={{ maxWidth: "400px" }}>
                  We offer unbiased courses, reports, coding classes, and much more in Web 3.0!
                </div>
                <div className="text-sm font-inter mt-6">
                  Donate now, and together we can educate more students to become engineers, traders, innovators, entrepreneurs, and leaders of tomorrow in the crypto industry.
                </div>
                <div id="revue-embed">
                  <form action="https://www.getrevue.co/profile/blockchainedu/add_subscriber" method="post" id="revue-form" name="revue-form" target="_blank">

                    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-3 mt-10">
                      <div class="revue-form-group">
                        <input className="revue-form-field border border-bengrey-300 rounded-lg p-3 w-full" placeholder="First Name" type="text" name="member[first_name]" id="member_first_name" />
                      </div>
                      <div class="revue-form-group">
                        <input className="revue-form-field border border-bengrey-300 rounded-lg p-3 pr-0 mt-3 lg:mt-0 w-full max-w-auto" placeholder="Last Name" type="text" name="member[last_name]" id="member_last_name" />
                      </div>
                    </div>
                    <div class="revue-form-group border border-bengrey-300 rounded-lg p-3 mt-3 w-full">
                      <input className="revue-form-field" placeholder="email@domain.com" type="email" name="member[email]" id="member_email" />
                    </div>
                    <div class="revue-form-actions mt-3">
                      <input className="w-full rounded-lg py-4 px-8 font-semibold font-inter transition duration-500 bg-benorange-500 hover:bg-benblack-500 text-white undefined" type="submit" value="Get Started" name="member[subscribe]" id="member_submit" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="w-full lg:w-1/2 text-sm font-inter" style={{ backgroundImage: "url(/images/popup-image.jpg)" }}>

              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </>
}
