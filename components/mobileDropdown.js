import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import DonationButtonSmall from '../components/donateButtonSmall'
import { ChevronRightIcon } from '@heroicons/react/solid'
import StandardButton from './standardButton'


const solutions = [
  {
    name: 'Product',
    description: 'Measure actions your users take',
    href: '/product',
    icon: IconOne,
  },
  {
    name: 'Pricing',
    description: 'Create your own targeted content',
    href: '/pricing',
    icon: IconTwo,
  },
  {
    name: 'Resources',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
  {
    name: 'About',
    description: 'Keep track of your growth',
    href: '/about',
    icon: IconThree,
  },
]

export default function MobileDropdown(props) {
  return (
    <div className="w-full max-w-sm px-4 top-16">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="block" style={{ width: '24px' }}>
              <FontAwesomeIcon
                icon={faBars}
                className={`${open ? '' : 'text-opacity-70'} mobile-dropdown text-xl text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Popover.Panel className="absolute z-40 w-screen md:max-w-none pt-14 px-4 right-0 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  <ul className="space-y-4 font-mont text-chablack-300 hover:text-chablack-500">
                    <li>
                      <a target="_blank" href="/donate">Donate</a>
                    </li>
                    <li>
                      <li>
                        <div className="bg-white rounded-2xl">
                          <Disclosure>
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex items-center font-mont text-chablack-300 hover:text-chablack-500 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                  <span>About</span>
                                  <ChevronRightIcon
                                    className={`${open ? 'transform rotate-90' : ''
                                      } w-5 h-5 text-chagreen-300 ml-3`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="pl-3 pt-4 text-gray-500">
                                  <ul className="ml-3 space-y-4 text-black font-proximasemi text-md text-chablack-300 hover:text-chablack-500">
                                    <li>
                                      <a href="/about">About</a>
                                    </li>
                                    <li>
                                      <a href="/learn">Learn</a>
                                    </li>
                                    <li>
                                      <a href="/about/clubs">Clubs</a>
                                    </li>
                                    <li>
                                      <a href="/about/team">Team</a>
                                    </li>
                                    <li>
                                      <a href="/about/partners">Partners</a>
                                    </li>
                                    <li>
                                      <a href="/about/alumni">Alumni</a>
                                    </li>
                                    <li>
                                      <a href="/about/professor">Professors</a>
                                    </li>
                                  </ul>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </div>
                      </li>
                    </li>
                    <li>
                      <a className="hover:text-benorange-500 text-black transition duration-500" target="_blank" href="/programs">Programs</a>
                    </li>
                    <li>
                      <a className="hover:text-benorange-500 text-black transition duration-500" target="_blank" href="https://learn.blockchainedu.org/events">Events</a>
                    </li>
                    <li>
                      <a className="hover:text-benorange-500 text-black transition duration-500" href="/contact"><b>Contact</b></a>
                    </li>
                  </ul>
                </div>
                <div className="bg-white pb-7 text-center">
                  <StandardButton
                    link="https://learn.blockchainedu.org/sign_in"
                    text="Sign In"
                    color="orange"
                    styling="px-16 py-3"
                  />
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
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
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
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
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