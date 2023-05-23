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
            <div className="flex w-full max-w-xs space-x-1 bg-gray-300 rounded-xl p-1 items-stretch mb-4 justify-center">
              <button
                className={`px-4 py-2 rounded-md w-full ${
                  activeTab === "annual" ? "bg-white text-black" : "bg-gray-300 text-black"
                }`}
                onClick={() => handleTabClick("annual")}
              >
                Annual (15% off!)
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
                  <span className="text-8xl font-bold mb-8">$17</span><span> / mo</span>
                  <div>$210 billed today</div>
                </div>
        <div className="flex justify-center mt-4">
          <a href="#" className="px-4 py-2 bg-benorange-500  text-white rounded-md">
            Get Access
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
                  <span className="text-8xl font-bold mb-8">$20</span><span> / mo</span>
                  <div>billed monhtly</div>
                </div>
        <div className="flex justify-center mt-4">
          <a href="#" className="px-4 py-2 bg-benorange-500 text-white rounded-md">
            Get Access
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