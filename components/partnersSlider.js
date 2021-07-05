import React, {useEffect} from "react";
import Slider from "react-slick";

const PartnerSlider = ({data, title}) => {
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    speed: 40000,
    autoplaySpeed: 0,
    cssEase: "linear"
  };

  return (
    <div className="mb-6">
      <h2 className="text-center font-mont text-4xl md:text-5xl font-black pb-24">
        {title} Partners
      </h2>
      {data.length > 0 &&
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index} className="font-mont pb-36">
              <img className="m-auto" src={item.url}/>
              <p className="font-bold text-lg pt-10 text-center">{item.name}</p>
            </div>
          ))}   
        </Slider>
      }
    </div>
  );
}

export default PartnerSlider;