import React, { useEffect } from "react";
import Slider from "react-slick";

const PartnerSlider = ({ data, title }) => {
  const settings = {
    infinite: data.length > 4 ? true : false,
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

  return (
    <div className="mb-6">
      <h2 className="text-center font-mont text-4xl md:text-5xl font-white pb-24">
        {title}
      </h2>
      {data.length > 0 && (
        <Slider {...settings}>
          {data.map((item, index) =>
            item.link ? (
              <a href={item.link} target="_blank">
                <div key={index} className="font-mont">
                  <div
                    className="flex items-center"
                    style={{ height: "175px" }}
                  >
                    <img
                      className="m-auto"
                      style={{ maxWidth: "200px" }}
                      src={item.url}
                    />
                  </div>
                  <p className="font-bold text-lg pt-10 text-center">
                    {item.name}
                  </p>
                </div>
              </a>
            ) : (
              <div key={index} className="font-mont">
                <div className="flex items-center" style={{ height: "175px" }}>
                  <img
                    className="m-auto"
                    style={{ maxWidth: "200px" }}
                    src={item.url}
                  />
                </div>
                <p className="font-bold text-lg pt-10 text-center">
                  {item.name}
                </p>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default PartnerSlider;
