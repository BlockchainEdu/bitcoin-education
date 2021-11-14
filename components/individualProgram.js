import NationalTeamCard from '../components/nationalTeamCard'
import { TeamMemberService } from '../services';


import React, { useState, useEffect } from 'react';

export default function IndividualProgram() {

  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(async () => {
    // Get Members list
    let body = {
      query: `{
            boards (ids: 1897479716) {
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
    if (result?.data?.data?.boards) {
      console.log(result.data.data.boards[0].items);
      setTeamMembers(result.data.data.boards[0].items);
    } else {
      setTeamMembers([]);
    }

  }, [setTeamMembers]);

  return (
    <div id="team-page" onClick={(e) => {
      if (e.target.getAttribute('filp-card-container') == "true") {
        //find object   
        setGlobalClick(true);
      } else {
        //remove object
        setGlobalClick(false);
      }
    }}>
      {teamMembers.length > 0 && teamMembers.map(global => {
        return global.group.title == "Programs" &&
          <div className="max-w-7xl m-auto flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-6/12">
              <div className="font-mont text-center lg:text-left text-xs uppercase">
                {JSON.parse(global.column_values[0].value)}
              </div>
              <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                {global.name}
              </h1>
              <p className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                The BEN Intercollegiate Crypto Fund is an initiative that aims to offer our student-members the opportunity to showcase their fundamental & technical prowess without the need for them to put up the capital risk. On April 22nd, our Crypto Fund Analysts launched the BEN Moon Fund ($BENMO) via TokenSets  which exposes token holders to multiple industries seen within the DeFi economy.
              </p>
              <div className="flex justify-center lg:justify-start">
              </div>
            </div>
            <div className="w-full lg:w-6/12 m-auto pt-14 pb-0 lg:pb-24">
              <img className="m-auto" src={global.assets.length > 0 ? global.assets[0]?.public_url : ""} />
            </div>
          </div>
      }
      )}
    </div>
  )
}
