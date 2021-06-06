import Footer from '../../components/footer';
import HeaderWithLogoDark from '../../components/headerWithLogoDark';
import Header from '../../components/header'
import NationalTeamCard from '../../components/nationalTeamCard'
import TeamMembers from '../../content/team'

export default function About() {
    return (
        <div id="team-page">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl m-auto gap-y-14">
                    {TeamMembers.global.map(global =>
                        <NationalTeamCard 
                        image={global.image}
                        name={global.name}
                        title={global.title}
                        />    
                    )}
                </div>
            </section>
            <section className="py-24">
                <h2 className="font-black text-4xl md:text-5xl text-black text-center pb-8">
                    BEN USA
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">
                    {TeamMembers.usa.map(usa =>
                        <NationalTeamCard 
                        image={usa.image}
                        name={usa.name}
                        title={usa.title}
                        />    
                    )}
                </div>
            </section>
            <section className="pt-10 py-24">
                <h2 className="font-black text-4xl md:text-5xl text-black text-center pb-8">
                    BEN Italy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">
                    {TeamMembers.italy.map(italy =>
                        <NationalTeamCard 
                        image={italy.image}
                        name={italy.name}
                        title={italy.title}
                        />    
                    )}
                </div>
            </section>
            <section className="pt-10 py-24">
                <h2 className="font-black text-4xl md:text-5xl text-black text-center pb-8">
                        Advisors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl m-auto gap-y-14">
                    {TeamMembers.advisors.map(advisors =>
                        <NationalTeamCard 
                        image={advisors.image}
                        name={advisors.name}
                        title={advisors.title}
                        />    
                    )}
                </div>
            </section>
            <Footer />
        </div>
    )
}
