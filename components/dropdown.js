import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'

const solutions = [
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Learn',
    href: '/learn'
  },
  {
    name: 'Clubs',
    href: '/about/clubs'
  },
  {
    name: 'The Team',
    href: '/about/team',
  },
  {
    name: 'Partners',
    href: '/about/partners'
  },
  {
    name: 'Alumni',
    href: '/about/alumni'
  },
  {
    name: 'Blockchain Centers',
    href: '/about/blockchain-centers'
  },
  {
    name: 'Professor',
    href: '/about/professor'
  }
]

export default function Dropdown() {
  return (
    <div className="">
      <Popover className="">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : ''}
                menu-dropdown font-mont text-black text-black hover:text-benorange-500 transition duration-500 px-3 rounded-md inline-flex items-center text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>About</span>

            <ChevronDownIcon
                  className={`${
                    open ? 'transform -rotate-90' : 'text-opacity-70'
                  } ml-2 h-5 w-5 text-chagreen-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                />
            </Popover.Button>

              <Popover.Panel className="absolute z-50 max-w-sm px-4 mt-3 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid bg-white pl-0 lg:grid-cols-1 my-3 ">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="navdropdown flex items-center p-2 px-4 mx-10 hover:bg-benorange-300 hover:text-benorange-500 transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="">
                          <p className="font-proximabold font-bold text-xl hover:bg-opacity-20 py-2 rounded-md inline-flex text-left text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            {item.name}
                          </p>
                        </div>
                      </a>
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