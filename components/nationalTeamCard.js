import MobileDropdown from "./mobileDropdown"

const NationalTeamCard = (props) => {
    return (
        <div className="text-center m-auto">
            <div>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img className="m-auto" src={props.image} />
                        </div>
                        <div className="flip-card-back text-black font-mont p-5 text-sm text-left">
                            <div>Ashton Barger is a Past President of the Miami University Blockchain Club and a 2020 Graduate of Miami University of Ohio. He currently works full time as an Account Manager for Zebu Digital, a Crypto and Blockchain Marketing Agency. He has been volunteering as the President of BEN USA since January of 2021 and is loving the progress the team has made since joining BEN. In his free time he enjoys hiking, skiing,</div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="font-mont font-bold text-xl text-black pt-5">{props.name}</h3>
            <div className="text-bengrey-300">{props.title}</div>
        </div>
    )
}

export default NationalTeamCard