import React from "react";

class AlumniCard extends React.Component {
    render() {
        return (
            <div className="text-center m-auto flex flex-col items-center justify-center"> {/* Flexbox utilities added here */}
                {/* Image container with square dimensions */}
                <div className="image-container" style={{
                    width: '150px', // Fixed width
                    height: '150px', // Fixed height to maintain a square
                    position: 'relative', // Relative positioning for the absolute child
                    overflow: 'hidden', // Hide overflow to maintain square shape
                }}>
                    <img src={this.props.image} alt={this.props.name} style={{
                        maxWidth: '100%', // Max width to be 100% of the parent
                        maxHeight: '100%', // Max height to be 100% of the parent
                        width: 'auto', // Width auto for maintaining aspect ratio
                        height: 'auto', // Height auto for maintaining aspect ratio
                        objectFit: 'cover', // Cover ensures the image fills the area
                        objectPosition: 'center', // Centers the image
                        position: 'absolute', // Absolute position
                        top: '50%', // Top 50% of the parent
                        left: '50%', // Left 50% of the parent
                        transform: 'translate(-50%, -50%)' // Translate back by 50% of its own size
                    }} />
                </div>
                <h3 className="font-mont font-bold text-xl text-black pt-5">{this.props.name}</h3>
                <div className="text-bengrey-300 pt-2">{this.props.title}</div>
                <div className="text-center social-icons pt-3">
                    {this.props.twitter &&
                        <a href={this.props.twitter} target="_blank" rel="noopener noreferrer" className="inline-block mx-2">
                            <img className="m-auto" src="/images/twitter-icon.png" alt="Twitter" />
                        </a>
                    }
                    {this.props.linkedin &&
                        <a href={this.props.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mx-2">
                            <img className="m-auto" src="/images/linkedin-icon.png" alt="LinkedIn" />
                        </a>
                    }
                    {this.props.email &&
                        <a href={`mailto:${this.props.email}`} className="inline-block mx-2">
                            <img className="m-auto" src="/images/mail-icon.png" alt="Email" />
                        </a>
                    }
                </div>
            </div>
        )
    }
}

export default AlumniCard;
