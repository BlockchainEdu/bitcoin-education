import { TeamMemberService } from '../services';

import React, { useState, useEffect } from 'react';

export default function InteractiveMap2() {

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
        }`};
    body = {
      query: `{
            boards (ids: 1983862095) {
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
        }`
    };
    let result = await TeamMemberService.getMembers(body);
    /*if (result?.data?.data?.boards) {
      console.log(result.data.data.boards[0].items);
      setTeamMembers(result.data.data.boards[0].items);
    } else {
      setTeamMembers([]);
    }*/
    console.log(result);

  }, [setTeamMembers]);

  return (
    <div><h1>Map Component</h1></div>
  )
}
