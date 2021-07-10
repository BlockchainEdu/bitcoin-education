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
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
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
              <div className="flex items-center" style={{height:"130px"}}>
              <img className="m-auto" style={{maxWidth:"200px"}} src={item.url}/>
              </div>
              <p className="font-bold text-lg pt-10 text-center">{item.name}</p>
            </div>
          ))}   
        </Slider>
      }
    </div>
  );
}

export default PartnerSlider;