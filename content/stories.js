class Story {
    constructor(image, name, title, bio) {
        this.image = image;
        this.name = name;
        this.title = title;
        this.bio = bio;
    }
}

const Stories = [
    new Story("/images/scholars/priya-g.jpeg", "Priya G. '23", "New York University", "I am doing my masters thesis on ZK in the EVM ecosystem. I also am a project founder that focuses on validating skills using AI and issuing credentials as SBTs on an EVM chain (Ethereum compatible). I hope to meet more builders to grow my team or users/angel investors so I can go into this project fulltime as soon as I graduate from school."),
    new Story("/images/scholars/roberto-m.jpeg", "Roberto M. '24", "Florida International University", "I want to meet really cool people and see how the ecosystem is since the last Ethereum event I went to. I also want to hack along with others and expand my relationships with like-minded individuals in the industry."),
    new Story("/images/scholars/azteca-s.jpeg", "Azteca S. '25", "University of Texas at Austin", "I am superrrr excited about this conference! As a dev, I'm excited for networking with the twitter anons that'll be there. As a founder I'm even more excited because I am looking for funding in two ventures. The first is a non-profit (@aztechkidzcode) I started that teaches students how to code blockchain. And the other for is for the growth of our defi start up called Superseed! (more about superseed in the startup-question section.)"),
    new Story("/images/scholars/amrita-b.jpeg", "Amrita B. '23", "University of California at Berkeley", "I attended ETHDenver last year and it was incredibly value for me in learning more about the newest technologies in web3 and blockchain. I also would like to hack on something related to public goods, lending protocols and would like to meet other builders and founders and hackers in the Ethereum ecosystem. I was a Devcon Scholar awarded by the Ethereum Foundation in October 2022 and this exposed me to so many cool projects in the ecosystem. Attending for ETHDenver would be super valuable for me and would provide an opportunity for in person networking and building."),
    new Story("/images/scholars/amrita-b.jpeg", "Valkyrie Holmes", "Las Vegas", "Crypto has been a wonderful chance to hone my skills. When I'm doing things in Solidity, that means I'm honing my skills for Web 3 development."),
    new Story("/images/scholars/amrita-b.jpeg", "Sohail Mohammed", "Boston, Massachusetts", "I think BEN is fulfilling such an important mission as people my age are going to be building and innovating the future. BEN is making this possible!"),
    new Story("/images/scholars/amrita-b.jpeg", "Sarah Roff", "", "BEN is making it possible for students to gain the best education surrounding blockchain so that we can become the next generation of innovators in the space!"),
    new Story("/images/scholars/amrita-b.jpeg", "Anthony Ung", "Toronto, Ontario", "Most of my time is spent explaining the technology behind Blockchain and why it is genuinely going to be world-changing!"),
    new Story("/images/scholars/amrita-b.jpeg", "Chase Blakely", "Dallas, Texas, SMU", "I have been intrigued by the creativity in the NFT and Metaverse space. My next major career goal is to transition to this blockchain industry and find my own niche in the space."),
    new Story("/images/scholars/amrita-b.jpeg", "Daniel Dogby", "University of Texas", "Over the past year I've seriously fallen in love with the possibilities of blockchain! So much so that 2 months ago I started building a NFT project with my roommate. I spent a couple weeks diving into blockchain development using my computer science background and realized I could really build something with this!"),
    new Story("/images/scholars/amrita-b.jpeg", "Ryan Jones", "University of Texas", "I was fortunate enough to hear about the BEN team. The BEN team educates the youth and demonstrates why blockchain is the future, and for that I am thankful to potentially have this opportunity."),
    new Story("/images/scholars/amrita-b.jpeg", "Alejandro Arias", "", "Watch Alejandros video about his journey to the Blockchain Space and how BEN helped him get to DCentral Con Miami!"),
    new Story("/images/scholars/amrita-b.jpeg", "Marko", "University of Florida", "In my work to promote blockchain technology among my students, the relation with BEN (Blockchain Education Network) has been an invaluable resource. BEN provides support for students in a form of conference travel, tickets, organizes hackathons, and so much more."),
    new Story("/images/scholars/amrita-b.jpeg", "Caleb Lo", "Toronto, Canada", "I believe that BEN helps me to actually have an experience and networking opportunity that furthers my interest & potential project ideas I'd be interested in!"),
    new Story("/images/scholars/amrita-b.jpeg", "Raymond Zhu", "Canada", "If everyone worked with top blockchain-based technology & finance, the world would change fundamentally."),
    new Story("/images/scholars/amrita-b.jpeg", "Timmy Hein", "Purdue University", "Huge thanks to BEN (Blockchain Education Network) for sponsoring us to attend this conference and their guidance as we build our blockchain ecosystem at Purdue University."),
    new Story("/images/scholars/amrita-b.jpeg", "Drew Cousin", "NEU Boston", "I plan to bring back all the knowledge I learn to the Northeastern Blockchain Club and The Gateway to Blockchain as we launch a second entrepreneurship program this summer and launch other immersive programs."),
    new Story("/images/scholars/amrita-b.jpeg", "Lucas Moraes", "Miami", "I'm certain that as time goes by the masses will be able to see the advantages of having decentralized organizations and government, and knowing how to create/manage DAOs and make smart contracts will be a must. Being able to learn all this useful information through a conference in Miami that BEN was able to put together is amazing! I can't wait to go and learn as much as I can!"),
    new Story("/images/scholars/amrita-b.jpeg", "Deandra Boosen", "", "Tracy Mourning Senior High School in Miami", "I have come to an understanding that blockchain is the future, and I want to become more educated on the topic through the BEN conference. It will entice me to go to more conferences and learn even more about blockchain!"),
    new Story("/images/scholars/amrita-b.jpeg", "BEN India", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Portugal", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Prague", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Turkey Students", "", "Group of Student from Sabanci University Blockchain Club attend a lecture from BEN team member."),
    new Story("/images/scholars/amrita-b.jpeg", "BEN San Francisco Blockchain Week", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Africa", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Colombia", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Italy", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN ETH Denver", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Puerto Rico", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Vietnam", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Blockchain at Berkeley", "University of Berkeley", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Coinvention", "Philadelphia", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Cubs", "Northwestern University", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN Cubs", "DePaul University", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN ETH Boston", ""),
    new Story("/images/scholars/amrita-b.jpeg", "BEN La Conexion", ""),
    new Story("/images/scholars/amrita-b.jpeg", "Thomas", "Solana breakpoint and Cosmosverse in Lisbon", "Thomas is a student from Sabanci University who travel from Turkey to Lisbon to attend Solana Breakpoint and Cosmoverse Conference. In this series of events he met people from outside of Turkey for the first time where he recorded podcast and met with potential leaders/employers in the industry. "),
    new Story("/images/scholars/amrita-b.jpeg", "Kevin Choe", "", "Finally, I have never been to Miami and meeting with other students from BEN will enable me to connect and forge relationships with other like-minded individuals whole accelerating my career. In short, I look forward to leveraging this unique opportunity to expand my horizons. Having the ability to network with incredible people in the same space will enable me to hear more about the web3/defi community."),
    new Story("/images/scholars/amrita-b.jpeg", "Yuqi Ma", "University of Southern California", "I started studying blockchain technology as a minor in 2019. Under my leadership, Blockchain@USC has grown to a total member of more than 300 students and has become the hub of Southern California's blockchain innovations."),
    new Story("/images/scholars/amrita-b.jpeg", "William Blakeley", "Duke University", "I hope this conference will inspire new ideas for business models as I return to Duke to work on our capstone project, which tasks us with presenting a new blockchain venture to professors, students, and outside professionals. This is a great time to step back from learning autodidactically to open my ears to others' ideas, conceptualize the big picture of what is possible, and practice articulating to others why blockchain could be useful and even necessary to solve real-world problems."),
    new Story("/images/scholars/amrita-b.jpeg", "Timothy Hein", "", "I'm particularly excited to get insight to the world of NFTs and the industry that surrounds it. My colleagues and I at Purdue have a very technical experience with web3. The industry is much more broad than that and where the really exciting projects show up is at intersections between web3 and other industries."),
    new Story("/images/scholars/amrita-b.jpeg", "Alex Kim", "")
]

export default Stories