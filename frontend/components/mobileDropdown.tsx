import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import { Disclosure } from "@headlessui/react";
import DonationButtonSmall from "../components/donateButtonSmall";
import { ChevronRightIcon } from "@heroicons/react/solid";
import StandardButton from "./standardButton";
import { useRouter } from "next/router";
import { Menu } from "@headlessui/react";

const solutions = [
  {
    name: "Product",
    description: "Measure actions your users take",
    href: "/product",
    icon: IconOne,
  },
  {
    name: "Pricing",
    description: "Create your own targeted content",
    href: "/pricing",
    icon: IconTwo,
  },
  {
    name: "Resources",
    description: "Keep track of your growth",
    href: "##",
    icon: IconThree,
  },
  {
    name: "About",
    description: "Keep track of your growth",
    href: "/about",
    icon: IconThree,
  },
];

export default function MobileDropdown(props) {
  const router = useRouter();

  const hideButtonOnPage = [];
  const shouldHideButton = hideButtonOnPage.includes(router.pathname);

  return (
    <div className="w-full max-w-sm px-4 top-16 display-on-scroll">
      {/*
        <div className="bg-white text-center">
          {!shouldHideButton && (
            <StandardButton
                link="/subscribe"
                text="Get Started"
                color="orange"
                styling="text-center py-3 rounded-lg w-full px-8"
            />
         )}
        </div>
    */}

      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="block" style={{ width: "24px" }} aria-label="Open menu">
              <FontAwesomeIcon
                icon={faBars}
                className={`${
                  open ? "" : "text-opacity-70"
                } mobile-dropdown text-xl text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Popover.Panel className="absolute z-40 top-0 right-0 bg-white md:max-w-none lg:max-w-3xl w-min whitespace-nowrap">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-4 h-screen flex flex-col">
                <div className="text-right">
                  <Popover.Button aria-label="Close menu">
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Popover.Button>
                </div>
                <div className="mobile-menu relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                  <ul className="font-mont text-chablack-300 font-semibold">
                    <li className="my-8">
                      <span className="cursor-pointer" onClick={() => router.push("/academy")}>Academy</span>
                    </li>
                    <li className="my-8">
                      <span className="cursor-pointer" onClick={() => router.push("/pricing")}>Pricing</span>
                    </li>
                    <li className="my-8">
                      <span className="cursor-pointer" onClick={() => router.push("/ventures")}>Ventures</span>
                    </li>
                    <li className="my-8">
                      <span className="cursor-pointer" onClick={() => router.push("/jobs")}>Jobs</span>
                    </li>
                    <li className="my-8">
                      <span className="cursor-pointer" onClick={() => router.push("/conferences")}>Conferences</span>
                    </li>
                    <li className="my-8">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex items-center gap-2 cursor-pointer w-full">
                              Co-Living
                              <svg
                                className="h-3 w-3 transition-transform"
                                style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </Disclosure.Button>
                            <Disclosure.Panel className="mt-4 ml-4 space-y-4">
                              <div>
                                <span className="cursor-pointer text-sm" style={{ color: "#6e6e73" }} onClick={() => router.push("/coliving/ibiza")}>Ibiza</span>
                              </div>
                              <div>
                                <span className="cursor-pointer text-sm" style={{ color: "#6e6e73" }} onClick={() => router.push("/coliving/ericeira")}>Ericeira</span>
                              </div>
                              <div>
                                <span className="cursor-pointer text-sm font-bold" style={{ color: "#FF872A" }} onClick={() => router.push("/coliving/apply")}>Apply Now</span>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </li>
                    <li className="my-8">
                      <span className="cursor-pointer" onClick={() => router.push("/blog")}>Blog</span>
                    </li>
                    <li className="mt-8">
                      <span className="cursor-pointer" onClick={() => router.push("/team")}>Our People</span>
                    </li>
                  </ul>
                </div>
                <StandardButton
                  link="/academy"
                  text="Join BEN"
                  color="orange"
                  textColor="white"
                />
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
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
  );
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
  );
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
  );
}
