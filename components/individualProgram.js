import React, { useEffect, useState } from "react";
import { TeamMemberService } from "../services";
import Slider from "react-slick";

const programOrder = () => {
    return `flex flex-col ${props.type % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`
}

const IndividualProgram = () => {
  const [features, setFeatures] = useState([]);
  useEffect(async () => {
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
      }`,
    };
    let result = await TeamMemberService.getMembers(body);
    console.log(result);
    if (result?.data?.data?.boards) {
      let temp = result?.data?.data?.boards[0].items;
      temp = temp.map((item) => {
        return {
          name: item.name,
          title: item.column_values.title,
          url: item.assets[0].public_url,
        };
      });
      setFeatures(temp);
    }
  }, []);
  return (
    <div className="mb-6">
      <h2 className="text-center font-mont text-4xl md:text-5xl font-black pb-24">
        Featured in
      </h2>
          {features.map((item, index) => (
            <div key={index} className="font-mont pb-36">
              <div className="flex items-center">
                <img
                  className="m-auto"
                  style={{maxWidth:"300px"}}
                  src={item.url}
                />
                <p>{item.name}</p>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default IndividualProgram;
