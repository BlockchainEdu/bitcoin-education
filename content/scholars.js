class Scholar {
    constructor(image, name, title, bio) {
        this.image = image;
        this.name = name;
        this.title = title;
        this.bio = bio;
    }
}

const Scholars = [
    new Scholar("/images/scholars/priya-g.jpeg", "Priya G. '23", "New York University", "I am doing my masters thesis on ZK in the EVM ecosystem. I also am a project founder that focuses on validating skills using AI and issuing credentials as SBTs on an EVM chain (Ethereum compatible). I hope to meet more builders to grow my team or users/angel investors so I can go into this project fulltime as soon as I graduate from school."),
    new Scholar("/images/scholars/roberto-m.jpeg", "Roberto M. '24", "Florida International University", "I want to meet really cool people and see how the ecosystem is since the last Ethereum event I went to. I also want to hack along with others and expand my relationships with like-minded individuals in the industry."),
    new Scholar("/images/scholars/azteca-s.jpeg", "Azteca S. '25", "University of Texas at Austin", "I am superrrr excited about this conference! As a dev, I'm excited for networking with the twitter anons that'll be there. As a founder I'm even more excited because I am looking for funding in two ventures. The first is a non-profit (@aztechkidzcode) I started that teaches students how to code blockchain. And the other for is for the growth of our defi start up called Superseed! (more about superseed in the startup-question section.)"),
    new Scholar("/images/scholars/amrita-b.jpeg", "Amrita B. '23", "University of California at Berkeley", "I attended ETHDenver last year and it was incredibly value for me in learning more about the newest technologies in web3 and blockchain. I also would like to hack on something related to public goods, lending protocols and would like to meet other builders and founders and hackers in the Ethereum ecosystem. I was a Devcon Scholar awarded by the Ethereum Foundation in October 2022 and this exposed me to so many cool projects in the ecosystem. Attending for ETHDenver would be super valuable for me and would provide an opportunity for in person networking and building.")

]

export default Scholars