import { useRef, useState } from 'react'
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function ClubsDropdown({locations, onSelected}) {
  const buttonRef = useRef(null)
  const [showingText, setShowingText] = useState('Locations')
  return (
    <div className="m-auto flex justify-center lg:justify-start pt-14 lg:pt-0">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              ref={buttonRef}
              className={`
                ${open ? '' : ''}
                menu-dropdown font-mont shadow-button bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white px-10 rounded-full py-4 rounded-full inline-flex items-center text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>{showingText}</span>

            <ChevronDownIcon
                  className={`${
                    open ? 'transform -rotate-90' : 'text-opacity-70'
                  } ml-2 h-5 w-5 text-chagreen-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                />
            </Popover.Button>

              <Popover.Panel className="absolute z-50 max-w-sm px-4 mt-3 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid bg-white pl-0 lg:grid-cols-1 my-3 ">
                    <div
                      onClick={(e) => {
                        onSelected('All');
                        buttonRef.current.click();
                        setShowingText('Locations')
                      }}
                      className="cursor-pointer flex items-center p-2 px-4 mx-10 hover:bg-benorange-300 transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="">
                        <p className="font-proximabold font-bold text-xl text-black hover:text-benorange-500 hover:bg-opacity-20 py-2 rounded-md inline-flex text-left text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          All
                        </p>
                      </div>
                    </div>
                    {locations.map((item, index) => (
                      <div
                        onClick={(e) => {
                          buttonRef.current.click();
                          onSelected(item);
                          setShowingText(item);
                        }}
                        key={index}
                        className="cursor-pointer flex items-center p-2 px-4 mx-10 hover:bg-benorange-300 transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="">
                          <p className="font-proximabold font-bold text-xl text-black hover:text-benorange-500 hover:bg-opacity-20 py-2 rounded-md inline-flex text-left text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  )
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#36ad8b" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#36ad8b" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#fff"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}