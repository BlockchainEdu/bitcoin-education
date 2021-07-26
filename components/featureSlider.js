import React, { useEffect, useState } from "react";
import { TeamMemberService } from "../services";
import Slider from "react-slick";

const FeatureSlider = () => {
  const [features, setFeatures] = useState([]);
  const settings = {
    infinite: features.length > 4 ? true : false,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    speed: 40000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(async () => {
    let body = {
      query: `{
        boards (ids: 1515443648) {
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
      {features.length > 0 && (
        <Slider {...settings}>
          {features.map((item, index) => (
            <div key={index} className="font-mont pb-36">
              <div className="flex items-center" style={{ height: "130px" }}>
                <img
                  className="m-auto"
                  style={{ maxWidth: "200px" }}
                  src={item.url}
                />
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FeatureSlider;
