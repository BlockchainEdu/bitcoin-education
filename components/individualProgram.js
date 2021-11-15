import NationalTeamCard from '../components/nationalTeamCard'
import { TeamMemberService } from '../services';


import React, { useState, useEffect } from 'react';

export default function IndividualProgram() {

  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  const changeFlexProgram = () => {
    return `max-w-7xl m-auto flex flex-col items-center ${teamMembers.index % 2 ? 'lg:flex-row-reverse' : 'hidden'}`
}

  const changeFlexDirection = [`max-w-7xl m-auto flex flex-col items-center lg:flex-row`, `max-w-7xl m-auto flex flex-col items-center lg:flex-row-reverse`]
  

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
      {teamMembers.length > 0 && teamMembers.map((global, index) => {
        return global.group.title == "Programs" &&
          <div key={index} className={index % 2 ? changeFlexDirection[0] : changeFlexDirection[1]}>
            <div className="w-full lg:w-6/12">
              <div className="font-mont text-center lg:text-left text-xs uppercase">
                {JSON.parse(global.column_values[0].value)}
              </div>
              <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                {global.name}
              </h1>
              <p className="text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                {JSON.parse(global.column_values[1].value)}
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
