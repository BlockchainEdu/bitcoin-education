import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import NationalTeamCard from '../../components/nationalTeamCard'
import TeamMembers from '../../content/team'
import { TeamMemberService } from '../../services';


import React, {useState, useEffect} from 'react';

export default function About() {

    const [globalClick, setGlobalClick] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect( async () => {
        // Get Members list
        let body = {
            query: `{
            boards (ids: 1383021348) {
                items {
                    group {
                        id
                        title
                    }
                    id
                    name
                    column_values {
                        id
                        title
                        value
                    }
                    assets {
                        public_url 
                    }
                }
            }
        }`}
        let result = await TeamMemberService.getMembers(body);
        if(result?.data?.data?.boards){
            console.log(result.data.data.boards[0].items);
            setTeamMembers(result.data.data.boards[0].items);
        } else {
            setTeamMembers([]);
        }
        
    }, [setTeamMembers]);

    return (
        <div id="team-page" onClick={(e) => { 
                if(e.target.getAttribute('filp-card-container') == "true"){
                    //find object   
                    setGlobalClick(true);
                }else{
                    //remove object
                    setGlobalClick(false);
                }
            }}>
            <HeaderWithLogoDark />
            <div className="pt-10 pb-24 md:py-36 px-7">
                <div className="max-w-7xl m-auto">
                    <div>
                        <h1 className="text-center md:text-left text-4xl md:text-6xl font-black text-black max-w-3xl pt-10 leading-snug">
                            The BEN Team
                        </h1>
                        <p className="text-center md:text-left m-auto md:m-0 text-black text-md pt-10 max-w-xl">
                            The Blockchain Education Network (BEN) is a 501(c)(3) non-profit organization and relies mainly on volunteer help from bright and distinguished students or alumni. All of BEN’s team members are past presidents or leaders of their University Blockchain club, and we strive ourselves to build leaders and give them opportunities to give back to the organization.
                        </p>
                    </div>
                </div>
            </div>
            <section className="py-24" style={{backgroundColor: "#f5f7f7"}}>
                <h2 className="font-black text-4xl md:text-5xl text-black text-center pb-8">
                    Global Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">
                    
                    {teamMembers.length > 0 && teamMembers.map(global =>
                        {return global.group.title == 'BEN Team' &&
                             <NationalTeamCard 
                            image={global.assets.length > 0 ? global.assets[0]?.public_url : ""}
                            name={global.name}
                            title={JSON.parse(global.column_values[1].value)}
                            bio={JSON.parse(global.column_values[2].value)}
                            linkedin={JSON.parse(global.column_values[4].value)}
                            twitter={JSON.parse(global.column_values[5].value)}
                            globalClick = {globalClick}
                            setGlobalClick = {setGlobalClick}
                            />
                        }
                    )}
                    {/* {TeamMembers.global.map(global =>
                        <NationalTeamCard 
                        image={global.image}
                        name={global.name}
                        title={global.title}
                        globalClick = {globalClick}
                        setGlobalClick = {setGlobalClick}
                        />
                    )} */}
                </div>
            </section>
            <section className="py-24 -mb-14">
                <h2 className="font-black text-4xl md:text-5xl text-black text-center pb-8">
                        Advisors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">
                    {teamMembers.length > 0 && teamMembers.map(global =>
                        {return global.group.title == "Advisors" &&
                             <NationalTeamCard 
                            image={global.assets.length > 0 ? global.assets[0]?.public_url : ""}
                            name={global.name}
                            title={JSON.parse(global.column_values[1].value)}
                            bio={JSON.parse(global.column_values[2].value)}
                            linkedin={JSON.parse(global.column_values[4].value)}
                            twitter={JSON.parse(global.column_values[5].value)}
                            globalClick = {globalClick}
                            setGlobalClick = {setGlobalClick}
                            />
                        }
                    )}
                    {/* {TeamMembers.advisors.map(advisors =>
                        <NationalTeamCard 
                        image={advisors.image}
                        name={advisors.name}
                        title={advisors.title}
                        globalClick = {globalClick}
                        setGlobalClick = {setGlobalClick}
                        />    
                    )} */}
                </div>
            </section>
            <Footer />
        </div>
    )
}
