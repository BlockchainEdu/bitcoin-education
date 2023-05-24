import { useState } from 'react'

export default function PopupMOdule() {
  const [activeTab, setActiveTab] = useState("annual");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="col-span-1 flex justify-center">
      <div className=" w-11/12 lg:w-1/2 flex flex-col p-4 rounded-lg border border-gray-300 p-8 shadow-lg">
        <div className="flex justify-center">
            <div className="flex w-full max-w-sm space-x-1 bg-gray-300 rounded-xl p-1 items-stretch mb-4 justify-center">
              <button
                className={`px-4 py-2 rounded-md w-full ${
                  activeTab === "annual" ? "bg-white text-black" : "bg-gray-300 text-black"
                }`}
                onClick={() => handleTabClick("annual")}
              >
                Annual (20% off!)
              </button>
              <button
                className={`px-4 py-2 rounded-md w-full ${
                  activeTab === "monthly" ? "bg-white  text-black" : "bg-gray-300 text-black"
                }`}
                onClick={() => handleTabClick("monthly")}
              >
                Monthly
              </button>
    </div>
        </div>
        <div>
          {activeTab === "annual" && (
              <div>
                <div className="text-center">  
                    <div className="mb-1"><span className="text-8xl font-bold">$16</span><span> / mo</span></div>
                    <div><i>$192 billed annually</i></div>
                </div>
        <div className="flex justify-center mt-4 mb-4">
          <a href="https://learn.blockchainedu.org/membership-account/membership-checkout/?level=4" className="px-4 py-2 bg-benorange-500  text-white rounded-md">
            Get A 7 Day Free Trial!
          </a>
        </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>✅ Deep dive analyses to potential 1000x projects</span>
                  </li>
                  <li className="flex justify-between">
                    <span>✅ Access to a premium community of investors, builders, and founders</span>
                  </li>
                  <li className="flex justify-between">
                    <span>✅ Direct access to team members for questions and answers</span>
                  </li>
                  <li className="flex justify-between">
                    <span>✅ Access to networking opportunities with other founders</span>
                  </li>
                </ul>
              </div>
          )}
          {activeTab === "monthly" && (
            <div>
                <div className="text-center">  
                    <div className="mb-1"><span className="text-8xl font-bold">$20</span><span> / mo</span></div>
                  <div><i>$20 billed monthly</i></div>
                </div>
        <div className="flex justify-center mt-4 mb-4">
          <a href="https://learn.blockchainedu.org/membership-account/membership-checkout/?level=3" className="px-4 py-2 bg-benorange-500 text-white rounded-md">
            Get A 7 Day Free Trial!
          </a>
        </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>✅ Deep dive analyses to potential 1000x projects</span>
                  </li>
                  <li className="flex justify-between">
                    <span>✅ Access to a premium community of investors, builders, and founders</span>
                  </li>
                  <li className="flex justify-between">
                    <span>✅ Direct access to team members for questions and answers</span>
                  </li>
                  <li className="flex justify-between">
                    <span>✅ Access to networking opportunities with other founders</span>
                  </li>
                </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}