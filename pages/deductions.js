import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import PopUpVideo from '../components/popupVideo';

export default function Deductions() {
    return (
        <div className="overflow-hidden">
            <HeaderWithLogoDark />
            <div className="bg-benorange-500 py-14 mt-8">
                <h1 className="text-center text-3xl md:text-5xl font-mont font-black mx-auto max-w-4xl">Donations to 501 (c)(3) nonprofits are tax deductible</h1>
            </div>
            <div className="pt-24 flex flex-col lg:flex-row max-w-7xl mx-auto items-center justify-between">
                <img src="/images/ben-deductible.png" />
                <div className="font-mont text-md max-w-xl text-center">
                    Donations to 501(c)(3) nonprofits are tax deductible. Under the IRS code section 170, <b>when you make a donation to
                        an organization that has been designated as a 501(c)(3) by the IRS</b>, you are eligible to receive a tax deduction on
                    your tax return. The deduction is reported under Itemized Deduction and will be claimed on the Schedule A.
                </div>
            </div>
            <div className="mt-14 lg:mt-0 flex flex-col-reverse lg:flex-row max-w-7xl mx-auto items-center space-x-14 justify-between px-7">
                <div className="font-mont text-md max-w-2xl text-center lg:text-left mb-20 lg:mb-0">
                    <b>You can donate cash or noncash properties in order to claim a deduction.</b> Two common noncash properties are
                    <b> stocks</b> and <b>crypro currency.</b> When you donate a noncash property to the 501(c)(3) organization, the amount of
                    deductions you can claim on your tax return depends on if you have held the property for one year before you donate.
                    If you donate within one year after you acquire the stocks/crypto, the amount of deduction you can claim is the lessor of
                    the Fair Market Value on the date of donation or the actual amount you paid to acquire the properties. If you donate after
                    you own the property for one year, you can deduct a full amount of the FMV of the properties on the date of donation.
                </div>
                <img src="/images/ben-deductible.png" />
            </div>
            <div className="mb-20">
                <img className="m-auto mb-5" src="/images/deductions-examples.png" />
                <p className="font-mont font-bold text-2xl text-center max-w-2xl mx-auto">
                    Here are a couple of examples that can help you understand how the deductions work
                </p>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-7">
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-center lg:justify-start">
                        <div className="border-l-4 border-6 border-benorange-500 font-mont font-bold text-2xl pl-4 mb-7">Example 1</div>
                    </div>
                    <p className="font-mont text-md mb-6 text-center">
                        You purchased 200 shares of stock at $20,000 two years ago and you would like to donate these 200 shares.
                        On the date you make the donation, the shares are worth $24,000. In this case, you have held the stocks for
                        more than one year, so you can claim a full deduction of $24,000 on the Schedule A of your tax return.
                        Meanwhile, since you donate the stocks, you don’t have to pay taxes on the long-term capital gains which is
                        $4,000 in this case. Assuming the long-term capital gain tax rate applicable to you is 20% based on your taxable income,
                        by making the donation, you can avoid paying tax of $800 and get an additional $24,000 tax deductions when you file the tax
                        return. Assuming your effective tax rate is 30%, you can get a tax savings of $7,200 from the deduction. Your total tax savings
                        from this donation is $8,000.
                    </p>
                    <table class="mb-10 lg:mb-0 table-auto flex justify-center lg:justify-start">
                        <thead>
                        </thead>
                        <tbody className="border-black font-mont font-bold text-sm">
                            <tr>
                                <td className="border-r-4 border-white bg-gray-100 p-3">Have you held the property for one year?</td>
                                <td className="bg-gray-100 p-3">No</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Acquisition costs of these shares</td>
                                <td className="bg-gray-100 p-3">$20,000</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">FMV on the date of donation</td>
                                <td className="bg-gray-100 p-3">$24,000</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Amount of deduction you can take</td>
                                <td className="bg-gray-100 p-3">$24,000</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Tax savings in the capital gains</td>
                                <td className="bg-gray-100 p-3">$800 [20% *(24,000-20,000)]</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Tax savings in the deductions</td>
                                <td className="bg-gray-100 p-3">$7,200 (30% *24,000)</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-benorange-500 p-3">Total tax savings from the donation</td>
                                <td className="bg-benorange-500 p-3">$8,000 ($7,200+800)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full lg:w-1/2">
                    <img className="m-auto" src="/images/ben-deductible.png" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center px-7 mt-24">
                <div className="w-full lg:w-1/2">
                    <img className="m-auto" src="/images/ben-deductible.png" />
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex justify-center lg:justify-start">
                        <div className="border-l-4 border-6 border-benorange-500 font-mont font-bold text-2xl pl-4 mb-7">Example 2</div>
                    </div>
                    <p className="font-mont text-md mb-6">
                        You purchased 200 shares of stock at $20,000 six months ago and you would like to donate these 200 shares.
                        On the date you make the donation, the shares are worth $24,000. In this case, you have held the stocks for less
                        than one year, so you can only claim a deduction of $20,000 on the Schedule A of your tax return. Meanwhile, since you
                        donate the stocks, you don’t have to pay taxes on the short-term capital gains which is $4,000 in this case. Assuming you
                        are in the 37% tax bracket, by making the donation, you can avoid paying tax of $1,480 and get an additional $20,000 tax
                        deductions when you file the tax return. Assuming your effective tax rate is 30%, you can get a tax savings of $6,000 from the
                        deduction. The total tax savings you can get from the donation is $7,480.
                    </p>
                    <table class="mb-10 lg:mb-0 table-auto flex justify-center lg:justify-start">
                        <thead>
                        </thead>
                        <tbody className="border-black font-mont font-bold text-sm">
                            <tr>
                                <td className="border-r-4 border-white bg-gray-100 p-3">Have you held the property for one year?</td>
                                <td className="bg-gray-100 p-3">No</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Acquisition costs of these shares</td>
                                <td className="bg-gray-100 p-3">$20,000</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">FMV on the date of donation</td>
                                <td className="bg-gray-100 p-3">$24,000</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Amount of deduction you can take</td>
                                <td className="bg-gray-100 p-3">$24,000</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Tax savings in the capital gains</td>
                                <td className="bg-gray-100 p-3">$1,480 [37% *(24,000-20,000)]</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-gray-100 p-3">Tax savings in the deductions</td>
                                <td className="bg-gray-100 p-3">$6,000 (30% * 20,000)</td>
                            </tr>
                            <tr className="border-t-4 border-white">
                                <td className="border-r-4 border-white bg-benorange-500 p-3">Total tax savings from the donation</td>
                                <td className="bg-benorange-500 p-3">$7,480 ($6,000+800)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="py-24 px-7">
                <img className="m-auto mb-5" src="/images/deductions-examples.png" />
                <div className="font-mont font-bold text-2xl text-center max-w-2xl mx-auto">
                    Same rules apply to crypto currency.
                </div>
                <p className="font-mont text-md max-w-2xl mx-auto text-center mt-6">
                    If you donate crypto directly to the 501(c)(3) nonprofits, not only you don’t have to
                    pay tax on the capital gains, you can also get a full amount of deductions for what crypto
                    is worth on the date of donation.
                </p>
            </div>
            <div className="space-y-14 max-w-7xl mx-auto px-7 pb-20">
                <div className="flex">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/deductions-1.svg" />
                        <p className="font-mont max-w-4xl text-center lg:text-left">
                            Verify that the organization you are donating to has been granted tax-exempt status by the IRS and is
                            eligible to receive tax-deductible, charitable contributions. If you're not sure, ask the organization <b>or
                                search the IRS database</b> https://apps.irs.gov/app/eos/
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/deductions-2.svg" />
                        <p className="font-mont max-w-4xl text-center lg:text-left">
                            Donate the property to the organization by <b>transferring the ownership</b> of the properties.
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/deductions-3.svg" />
                        <p className="font-mont max-w-4xl text-center lg:text-left">
                            The organization will send you a <b>receipt document</b> to acknowledge the gift.
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/deductions-4.svg" />
                        <p className="font-mont max-w-4xl text-center lg:text-left">
                            The organization will senaKeep the receipt till the <b>year end</b> when you file your <b>tax return</b>
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/deductions-5.svg" />
                        <p className="font-mont max-w-4xl text-center lg:text-left">
                            Claim a <b>deduction</b> on your Schedule A line 11 or 12
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 px-7 py-24 mb-20 lg:mb-0 space-y-20">
                <h3 className="font-mont font-black text-5xl max-w-7xl mx-auto text-center lg:text-left">
                    FAQ
                </h3>
                <div className="flex max-w-7xl mx-auto items-center">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/faq-deductions-1.png" />
                        <div>
                            <div className="font-mont font-bold text-2xl mb-6 text-center lg:text-left">Q: Are there any limitations on the deductions of donations on the individual tax returns?</div>
                            <p className="font-mont max-w-4xl text-center lg:text-left">
                                A:  You can't deduct contributions of your time or services, or any part of a contribution from which you benefit. You can only deduct up to 30% of your Adjusted Gross Income on the tax return.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex max-w-7xl mx-auto items-center">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/faq-deductions-2.png" />
                        <div>
                            <div className="font-mont font-bold text-2xl mb-6 text-center lg:text-left">Q: Can a US corporation donate to 503(c)(3) and get a tax deduction?</div>
                            <p className="font-mont max-w-4xl text-center lg:text-left">
                                A: Yes, US corporations can contribute to the nonprofits and get deductions on their business tax return as well. A corporation’s charitable contribution deduction generally may not exceed 10 percent of its taxable income. The limit is increased to 25 percent for qualified contributions made in cash for calendar-year 2020.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex max-w-7xl mx-auto items-center">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-x-0 mx-auto lg:mx-0 lg:space-x-14">
                        <img className="mb-10 lg:mb-0" src="/images/faq-deductions-3.png" />
                        <div>
                            <div className="font-mont font-bold text-2xl mb-6 text-center lg:text-left">Q: How would individuals outside the U.S potentially benefit from tax benefits or any incentives.</div>
                            <p className="font-mont max-w-4xl text-center lg:text-left">
                                A: For example for Canadian citizens that would like to donate. If the foreign person is required to file a US tax return, he/she can deduct the donations on the tax return as well. If there is a tax treaty between the US and the foreign country, the treaty may allow you to deduct the donations on your foreign tax return. For example, the income tax treaty between the Canada and U.S. allows Candian citizens/ residents to claim a donation tax credit for donations made to eligible U.S. charities on the Canadian tax return.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
