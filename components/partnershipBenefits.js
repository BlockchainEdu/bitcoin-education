import Image from 'next/image'

const PartnerShipBenefits = (props) => {

    return (
        <div>
            <div className={`flex items-start space-x-3 ${props.style}`}>
                <img src="/images/orange-check.svg"></img>
                <p className="font-mont text-sm font-bold max-w-xs leading-normal">{props.benefit}</p>
            </div>
        </div>
    )
}

export default PartnerShipBenefits