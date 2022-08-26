import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover, Transition } from '@headlessui/react'
import { Disclosure } from '@headlessui/react'
import DonationButtonSmall from '../components/donateButtonSmall'
import { ChevronRightIcon } from '@heroicons/react/solid'
import StandardButton from './standardButton'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Image from 'next/image'

export default function FAQItem(props) {
    return (
        <div className="border-b">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-purple-900 items-center">
                            <span className="font-inter font-semibold text-xl text-benblack-500 pb-3" style={{maxWidth:"550px"}}>{props.question}</span>
                            <div
                                className={`${open ? 'rotate-180 transform hidden' : ''
                                    } h-5 w-5 text-purple-500 `}
                            >
                                <Image
                                    width="14px"
                                    height="14px"
                                    src="/images/home-plus.svg"
                                />
                            </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-2 pt-4 pb-6 text-sm text-benblack-500 font-inter">
                            {props.answer}
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    )
}