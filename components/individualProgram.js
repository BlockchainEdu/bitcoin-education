import NationalTeamCard from '../components/nationalTeamCard'
import { TeamMemberService } from '../services';

import React, { useState, useEffect } from 'react';

function safeParse(value, fallback = "") {
  if (!value || typeof value !== "string") return fallback;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "string" || typeof parsed === "number") return String(parsed);
    if (parsed && typeof parsed === "object" && parsed.text) return String(parsed.text);
    return fallback;
  } catch { return fallback; }
}

function safeParseUrl(value) {
  const url = safeParse(value);
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (["https:", "http:"].includes(parsed.protocol)) return parsed.href;
    return null;
  } catch { return null; }
}

export default function IndividualProgram() {

  const [globalClick, setGlobalClick] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  const changeFlexProgram = () => {
    return `max-w-7xl m-auto flex flex-col items-center ${teamMembers.index % 2 ? 'lg:flex-row-reverse' : 'hidden'}`
  }

  const changeFlexDirection = [`max-w-7xl m-auto flex flex-col items-center lg:flex-row-reverse lg:gap-x-20`, `max-w-7xl m-auto flex flex-col items-center lg:flex-row`]


  useEffect(async () => {
    // Get Members list
    let body = {
      query: `{
            boards (ids: 1897479716) {
                items (limit: 100) {
                    group {
                        title
                    }
                    name
                    column_values {
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
      let items = result.data.data.boards[0].items;
      setTeamMembers(items);
    } else {
      setTeamMembers([]);
    }

  }, [setTeamMembers]);

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
      <div className="pt-20 lg:pt-24 md:pb-0 px-7">
        {teamMembers.length > 0 && teamMembers.map((global, index) => {
          return global.group.title == "Programs" &&
            <div key={index} className={index % 2 ? changeFlexDirection[0] : changeFlexDirection[1]}>
              <div className="w-full lg:w-6/12">
                <h1 className="text-4xl md:text-6xl text-center lg:text-left font-black text-black max-w-5xl pt-10 leading-snug">
                  {global.name}
                </h1>
                <ul className="space-y-10 text-black text-md pt-10 max-w-lg m-auto lg:m-0 text-center lg:text-left font-medium">
                  <li>{safeParse(global.column_values[1]?.value)}</li>
                  <li>{safeParse(global.column_values[7]?.value)}</li>
                  <li>{safeParse(global.column_values[8]?.value)}</li>
                  <li>{safeParse(global.column_values[9]?.value)}</li>
                  <li>{safeParse(global.column_values[10]?.value)}</li>
                </ul>
                <div className="flex gap-x-10 flex-col lg:flex-row mx-auto">
                  {safeParseUrl(global.column_values[4]?.value) &&
                  <a className="mx-auto lg:mx-0" target="_blank" rel="noopener noreferrer" href={safeParseUrl(global.column_values[4].value)}>
                    <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                      {safeParse(global.column_values[3]?.value)}
                    </button>
                  </a>
                  }
                  {safeParse(global.column_values[5]?.value) &&
                  <a className="border-b-10 mx-auto lg:mx-0" target="_blank" rel="noopener noreferrer" href={safeParseUrl(global.column_values[6]?.value)}>
                    <button className="mb-20 md:mb-0 bg-benorange-500 hover:bg-bengrey-300 shadow-button transition duration-500 text-white font-bold text-xl px-12 rounded-full py-4 mt-10">
                      {safeParse(global.column_values[5]?.value)}
                    </button>
                  </a>
                  }
                </div>
              </div>
              <div className="w-full lg:w-6/12 m-auto pt-14 pb-0 lg:pb-24">
                <img className="m-auto" src={global.assets.length > 0 ? global.assets[0]?.public_url : ""} />
              </div>
            </div>
        }
        )}
      </div>
    </div>
  )
}
