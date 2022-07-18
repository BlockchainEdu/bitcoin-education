import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import NationalTeamCard from '../../components/nationalTeamCard'
import TeamMembers from '../../content/team'
import { TeamMemberService } from '../../services';
import Head from "next/head"

import React, { useState, useEffect } from 'react';

class TeamMember {
    constructor(image, name, title, bio, linkedin, twitter, email="") {
        this.image = image;
        this.name = name;
        this.title = title;
        this.bio = bio;
        this.linkedin = linkedin === "" ? undefined : linkedin;
        this.twitter = twitter === "" ? undefined : twitter;
        this.email = email === "" ? undefined : `mailto:${email}`;
    }
}
const teamMembers = {
    "BEN Team": [
        new TeamMember("http://www.dumpaday.com/wp-content/uploads/2019/12/pictures-10-2.jpg", "BEN Team 1", "BEN Team 1 Title", "Some bio text here", "", "https://www.twitter.com", "someemail@email.com"),
        new TeamMember("", "BEN Team 2", "BEN Team 2 Title", "", "https://www.linkedin.com", "", "someemail2@email.com"),
    ],
    "Advisors": [
        new TeamMember("http://www.dumpaday.com/wp-content/uploads/2019/12/pictures-10-2.jpg", "Advisors 1", "Advisors 1 Title", "Some bio text goes here.", "", ""),
        new TeamMember("", "Advisors 2", "Advisors 2 Title", "", "https://www.linkedin.com", "https://www.twitter.com"),
    ],
};

export default function About() {

    const [globalClick, setGlobalClick] = useState(false);

    return (
        <div id="team-page" onClick={(e) => {
            if (e.target.getAttribute('flip-card-container') == "true") {
                //find object   
                setGlobalClick(true);
            } else {
                //remove object
                setGlobalClick(false);
            }
        }}>
            <HeaderWithLogoDark />
            <Head>
                <title>Team | Blockchain Education Network</title>
            </Head>
            <div className="pt-0 pb-14 md:py-14 px-7">
                <div className="max-w-7xl m-auto">
                    <div className="flex items-center flex-col md:flex-row md:space-x-10">
                        <div className="w-full md:w-3/5">
                            <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-3xl pt-10 leading-snug">
                                The BEN Team
                            </h1>
                            <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-10 max-w-xl">
                                The Blockchain Education Network (BEN) is a 501(c)(3) non-profit organization and relies mainly on volunteer help from bright and distinguished students or alumni. All of BEN’s team members are past presidents or leaders of their University Blockchain club, and we strive ourselves to build leaders and give them opportunities to give back to the organization.
                            </p>
                        </div>
                        <div className="w-full md:w-2/5 mx-auto">
                            <img className="" src="/images/team-illustration.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <section className="py-24" style={{ backgroundColor: "#f5f7f7" }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">

                    {teamMembers["BEN Team"].length > 0 && teamMembers["BEN Team"].map(member =>
                            <NationalTeamCard
                              image={member.image}
                              name={member.name}
                              title={member.title}
                              bio={member.bio}
                              linkedin={member.linkedin}
                              twitter={member.twitter}
                              email={member.email}
                              globalClick={globalClick}
                              setGlobalClick={setGlobalClick}
                            />
                    )}
                </div>
            </section>
            <section className="py-24 -mb-14">
                <h2 className="font-black text-4xl md:text-5xl text-black text-center pb-8">
                    Advisors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">
                    {teamMembers["Advisors"].length > 0 && teamMembers["Advisors"].map(member =>
                            <NationalTeamCard
                              image={member.image}
                              name={member.name}
                              title={member.title}
                              bio={member.bio}
                              linkedin={member.linkedin}
                              twitter={member.twitter}
                              email={member.email}
                              globalClick={globalClick}
                              setGlobalClick={setGlobalClick}
                            />
                    )}
                </div>
            </section>
            <Footer />
        </div>
    )
}
