import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import HeaderWithLogoDark from '../components/headerWithLogoDark';
import { TeamMemberService } from '../services';
import Head from "next/head";
import StandardButton from '../components/standardButton';
import Countdown from '../components/countdown';

export default function Airdrop() {
  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [ethAddress, setEthAddress] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const deadline = new Date('2024-01-31'); // You can keep this here or move it to where you use <Countdown />

  useEffect(() => {
    const mockLeaderboardData = [
      { rank: 1, name: 'MIT Bitcoin Club', url: 'https://bitcoin.mit.edu', participants: 50 },
      { rank: 2, name: 'The Rollup', url: 'https://therollup.co', participants: 45 },
      { rank: 3, name: 'CollegeDAO', url: 'https://collegedao.io/', participants: 45 },
      { rank: 4, name: 'Kerala Blockchain Academy', url: 'https://kba.ai/', participants: 45 },
      { rank: 5, name: 'MIT Bitcoin Club', url: 'https://bitcoin.mit.edu', participants: 50 },
      { rank: 6, name: 'The Rollup', url: 'https://therollup.co', participants: 45 },
      { rank: 7, name: 'CollegeDAO', url: 'https://collegedao.io/', participants: 45 },
      { rank: 8, name: 'Kerala Blockchain Academy', url: 'https://kba.ai/', participants: 45 },
      { rank: 9, name: 'MIT Bitcoin Club', url: 'https://bitcoin.mit.edu', participants: 50 },
      { rank: 10, name: 'The Rollup', url: 'https://therollup.co', participants: 45 },
      { rank: 11, name: 'CollegeDAO', url: 'https://collegedao.io/', participants: 45 },
      { rank: 12, name: 'Kerala Blockchain Academy', url: 'https://kba.ai/', participants: 45 },

      // ... more mock data ...
    ];

    mockLeaderboardData.splice(5, 0, {
      rank: '',
      name: 'Interested in Sponsoring? Get your token or wallet in front of thousands of blockchain enthusiasts',
      participants: ''
    });

    setLeaderboardData(mockLeaderboardData);

  }, []);

  const handleEthAddressChange = (e) => {
    setEthAddress(e.target.value);
  };

  const handleTeamChange = (e) => {
    setSelectedTeam(e.target.value);
  };

const renderLeaderboardRow = (entry, index) => {
  // Check if the current row is the "Interested in Sponsoring" row
  const isSponsoringRow = entry.name === 'Interested in Sponsoring? Get your token or wallet in front of thousands of blockchain enthusiasts';

  return (
    <tr 
      key={index} 
      className={`clickable-row ${isSponsoringRow ? 'bg-yellow-100 text-black' : ''}`}
      onClick={() => isSponsoringRow ? null : window.open(entry.url, '_blank')}
    >
      <td className="rank-cell">{entry.rank}</td>
      <td>{entry.name}</td>
      <td>{entry.participants}</td>
    </tr>
  );
};

  const renderTopTenLeaderboardTable = () => (
    <div className="leaderboard-container">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th># of Participants</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.slice(0, 5).map(renderLeaderboardRow)}
        </tbody>
      </table>
    </div>
  );

  const renderRemainingLeaderboardTable = () => (
    <div className="leaderboard-container">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th># of Participants</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.slice(5).map(renderLeaderboardRow)}
        </tbody>
      </table>
    </div>
  );

  return (
    <div id="partners-page">
      <HeaderWithLogoDark />
      <Head>
        <title>Programs | Blockchain Education Network</title>
      </Head>

      <div id="team-page">
        <div className="countdown-section bg-black text-white p-10 text-center">
          <h2 className="text-3xl font-bold mb-2">Airdrop Countdown</h2>
          <p><Countdown deadline={deadline} /> until liftoff</p>
          <p>Mark your calendars for our Twitter Spaces on Jan 31st where we will be doing the airdrop live</p>
        </div>
        
  <div className="countdown-section bg-yellow-100 text-black p-10 text-center">
      <h2 className="text-3xl font-bold mb-2">$5k in prizes</h2>
      <p className="mb-4">Sponsored by GDA and Life Wallet</p>
      <div className="grid grid-cols-2 gap-4 items-center">
          <img src="/images/airdrop/life-wallet.jpg" alt="Life Wallet" className="max-w-[100px]"/>
          <img src="/images/airdrop/gda.jpeg" alt="GDA" className="max-w-[100px]" />
      </div>
  </div>

<div className="airdrop-signup-section bg-gray-200 p-10 text-center">
  <h2 className="text-3xl font-bold mb-4">Join the BEN Global Airdrop</h2>
  
  <div className="form-container" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
    <input 
      type="text" 
      placeholder="Enter your email address" 
      className="p-4 mb-4 w-full" 
    />
    <input 
      type="text" 
      placeholder="Enter your ETH address" 
      className="p-4 mb-4 w-full" 
      value={ethAddress}
      onChange={handleEthAddressChange}
    />
    <select 
      className="p-4 mb-4 w-full" 
      value={selectedTeam}
      onChange={handleTeamChange}
    >
      <option value="">Select a Team</option>
      <option value="team1">Team 1</option>
      <option value="team2">Team 2</option>
      {/* Add more teams as needed */}
    </select>
    <StandardButton
      link="https://www.blockchainedu.org/apply"
      text="Sign Up"
      color="orange"
      target="blank"
      styling="text-center py-3 rounded-lg text-white w-full text size 10"
    />
  </div>
  
  <p className="mt-4">Don't see your team? Add it now</p>
</div>


{/*
        <div className="airdrop-blurb bg-yellow-100 p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Join Our Airdrop?</h2>
          <p>Be a part of the most exciting blockchain event this year! Exclusive rewards, community, and more!</p>
        </div>
*/}
        {/* Leaderboard Table - Top 10 */}
        <div className="bg-black">
          {renderTopTenLeaderboardTable()}
        </div>

        <div className="airdrop-blurb bg-yellow-100 p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Sponsoring?</h2>
          <p>Get your token or wallet in front of thousands of blockchain enthusiasts</p>
        </div>

        {/* Leaderboard Table - Remaining */}
        <div className="bg-black">
          {renderRemainingLeaderboardTable()}
        </div>

      </div>
      <Footer />
    </div>
  );
}
