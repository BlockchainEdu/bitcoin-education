import MobileDropdown from "./mobileDropdown"

const NationalTeamCard = (props) => {
    return (
        <div className="text-center m-auto">
            <img src={props.image} />
            <h3 className="font-mont font-bold text-xl text-black pt-5">{props.name}</h3>
            <div className="text-bengrey-300">{props.title}</div>
        </div>
    )
}

export default NationalTeamCard