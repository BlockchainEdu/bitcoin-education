import React from "react"
import MobileDropdown from "./mobileDropdown"

class StoryCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        }
    }

    onClickFlip = () => {
        this.props.setGlobalClick(true);
        this.setState({ toggle: !this.state.toggle })
    }

    render() {
        return (
            <div className="text-center m-auto story">
                <div>
                    <div className={"flip-card " + (this.state.toggle && this.props.globalClick ? "hover" : "")}>
                        <div className="flip-card-inner" onClick={() => this.onClickFlip()} >
                            <div className="flip-card-front" flip-card-container="true" style={{backgroundImage: `url(${this.props.image})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                            </div>
                            <div className="flip-card-back text-black font-mont p-5 text-sm text-left overflow-y-scroll">
                                {/* <div flip-card-container="true">Ashton Barger is a Past President of the Miami University Blockchain Club and a 2020 Graduate of Miami University of Ohio. He currently works full time as an Account Manager for Zebu Digital, a Crypto and Blockchain Marketing Agency. He has been volunteering as the President of BEN USA since January of 2021 and is loving the progress the team has made since joining BEN. In his free time he enjoys hiking, skiing,</div> */}
                                <div flip-card-container="true">{this.props.bio}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 className="font-mont font-bold text-xl text-black pt-5">{this.props.name}</h3>
                <div className="text-bengrey-300 pt-2">{this.props.title}</div>
                <div className="text-center social-icons pt-3">
                    {this.props.twitter &&
                        <a href={this.props.twitter} target="_blank"><img className="m-auto" src="/images/twitter-icon.png" /></a>
                    }
                    {this.props.linkedin &&
                        <a href={this.props.linkedin} target="_blank"><img className="m-auto" src="/images/linkedin-icon.png" /></a>
                    }
                    {this.props.email &&
                        <a href={this.props.email} target="_blank"><img className="m-auto" src="/images/mail-icon.png" /></a>
                    }
                </div>
            </div>
        )
    }
}

export default StoryCard
