import React from "react"
import MobileDropdown from "./mobileDropdown"

class IndustyIconContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
    }

    render() {
        return (
            <div className="font-mont">
            <img src={this.props.image} style={{maxWidth:"300px", margin: "auto"}}/>
            <p className="text-center font-bold text-lg pt-10">{this.props.name}</p>
          </div>
        )
    }
}

// const NationalTeamCard = (props) => {




// }

export default IndustyIconContainer