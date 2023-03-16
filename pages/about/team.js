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
        new TeamMember("/images/team/erick.jpeg", "Erick Pinos", "President", "Erick Pinos is the President of the Blockchain Education Network (BEN). Erick is also the Americas Ecosystem Lead at Ontology Network, a public blockchain project focused on decentralized identity and data. Erick has a BS in Management from the Massachusetts Institute of Technology (MIT), where he was the President of the MIT Bitcoin Club, as well as a researcher at the MIT Digital Currency Initiative.", "https://www.linkedin.com/in/erickpinos/", "https://twitter.com/erickpinos", "erick@blockchainedu.org"),
        new TeamMember("/images/team/antonio.jpg", "António Gomes", "Vice President", "Antonio is the past president of Gator Blockchain Club and a 2020 graduate of Warrington College of Business at U of F. With a proven talent for aligning business strategy, Antonio worked for over a year at Oracle Inc headquarters, as part of the ISV BDC Team. He now focus in enabling students in developing nations to acquire educational opportunities in blockchain technology. In his free time he enjoys sailing.", "", "", "antonio@blockchainedu.org"),
        new TeamMember("/images/team/jeremy-gardner-new.jpg", "Jeremy Gardner", "Board Member", "", "", "", ""),
        new TeamMember("/images/team/ba.jpg", "Ba Minuzzi", "Board Member", "Ba Minuzzi is the Founder & CEO of UMANA, Inc, and the co-founder and Chief Strategy Officer of Venture Studio and U House of Funds. At BEN she is our CFO.", "https://www.linkedin.com/in/baminuzzi", "https://twitter.com/ba_minuzzi?lang=en", "ben@umana.family"),
        new TeamMember("/images/team/drasen.jpg", "Drasen Rasmussen", "", "Drasen is an activist in the Miami Crypto scene. From connecting partnerships with The North American Bitcoin Conference to supporting the grand opening of the Blockchain Center in Miami, Drasen has been in action in Miami over the years. Inside BEN, he operates with marketing, managing in-person events, handling social media & doing internal work. In his free time, he DJs & Produces House Music.", "https://www.linkedin.com/in/drasen/", "https://twitter.com/DrasenDefi", "drasen@blockchainedu.org"),
        new TeamMember("/images/team/jeremy-guzman.jpg", "Jeremy Guzmán", "", "Jeremy is the Founder and past President of Mount St. Mary’s University’s Blockchain Club. He has gone on to become the Founder of Mass Adoption, a DeFi education & onboarding company that aims to be the catalyst for DeFi adoption.   BEN’s Meta-Governance structure, BEN’s Intercollegiate Crypto Fund, and multiple Meta-Delegate committees. When Jeremy isn’t working on BEN initiatives, he can be found Degening into High Yield pools, researching upcoming protocols, or diving into Governance forums.", "", "", "guzman@blockchainedu"),
        new TeamMember("/images/team/kate.jpg", "Kate Stapleton", "", "Kate is the founder and former President of the Concordia Blockchain Club. She is currently the community lead for Axelar, a cross-chain blockchain startup based out of Toronto, Canada. Kate has been involved with BEN since 2019, originally as the Ethereum teaching assistant. When not working with BEN, Kate gives her time to her other passion, a dog rescue based in Montreal.", "", "", "kate@blockchaindedu.org"),
        new TeamMember("/images/team/ashton.jpg", "Ashton Barger", "", "Ashton Barger is a Past President of the Miami University Blockchain Club and a 2020 Graduate of Miami University of Ohio. He currently works full time as an Account Manager for Zebu Digital, a Crypto and Blockchain Marketing Agency. He has been volunteering as the President of BEN USA since January of 2021 and is loving the progress the team has made since joining BEN. In his free time he enjoys hiking, skiing, and traveling.", "http://linkedin.com/in/ashtonbarger", "http://twitter.com/@ashton_barger", "ashton@blockchainedu.org"),
        new TeamMember("/images/team/bennett.jpg", "Bennett Thompson", "", "Bennett Thompson is a second year undergraduate student at Northeastern University studying Computer Science and Business administration with a FinTech concentration. He is the Co-Founder and Co-President of the Northeastern Blockchain Organization. Bennett currently works for dClimate, the first decentralized network for climate data. He also works on Boston Blockchain Association’s “Gateway to Blockchain Entrepreneurship” program.", "https://www.linkedin.com/in/thompsonbennett/", "https://twitter.com/B1ggans12", "bennett@blockchainedu.org"),
        new TeamMember("/images/team/alec.jpg", "Alec Shaw", "", "As a Finance undergraduate at Marquette University, Alec founded Marquette's Blockchain Lab. In addition, Alec launched Euphrates Group Consulting in 2017: providing DLT education and implementation services to SMB's in the greater Milwaukee area. He was awarded Wisconsin Inno's 25 Under 25 Innovators for this work. After graduation, he worked at Marquette University's business school: managing the finances of student startups at Marquette's Student-run Business Program. Now, he is a partner of business development at Sperax, a decentralized stablecoin project on Ethereum. Outside of financial technology, Alec is passionate about snowboarding, digital privacy, men's streetwear and finding the best deli in your city.", "", "", "alec@blockchainedu.org"),
        new TeamMember("/images/team/buse.jpg", "Buse Kaya", "", "Buse is a sophomore at Istanbul University studying Mathematics and Management Information Systems. She is a board member and R&D lead of the Blocktech and was appointed BEN Turkey Ambassador of Istanbul University. She is Math and Blockchain enthusiast. She is looking forward to boosting make Blockchain more accessible to all students all around the world.", "https://www.linkedin.com/in/buse-kaya-6a1788198", "", "buse@blockchainedu.org"),
    ],
    
    "Advisors": [
        new TeamMember("/images/team/dean.jpg", "Dean Masley", "Advisor", "", "", "https://twitter.com/dmasley"),
        new TeamMember("/images/team/jinglan.jpg", "Jinglan Wang", "Advisor", "", "", ""),
        new TeamMember("/images/team/mel.jpg", "Mel Vera", "Advisor", "", "", ""),
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
