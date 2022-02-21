import React from "react";

export default function FormPopup(props) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className={props.buttonStyle}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {props.buttonText}
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-3 md:mx-0"
          >
            <div className="relative w-auto my-6 mx-auto max-w-5xl">
              {/*content*/}
              <div className="border-0 donation-modal rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-mont font-bold">
                    Signup Form
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 hover:bg-bengray-300 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-gray rounded-full h-3 w-3 text-black">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <iframe className="monday-form" src="https://forms.monday.com/forms/embed/190fe5ce23ac7b55f074d8f673570ea2?r=use1"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="button-overlay opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}