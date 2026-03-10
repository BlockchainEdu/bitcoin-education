import React, { useMemo } from "react";
import Slider from "react-slick";

const PartnerSlider = ({ data = [], title }) => {
  const safeData = Array.isArray(data) ? data : [];

  const keys = useMemo(
    () =>
      safeData.map(
        (item, index) => item?.id ?? `${item?.name ?? "item"}-${index}`
      ),
    [safeData]
  );

  const settings = {
    infinite: safeData.length > 4,
    slidesToShow: 5,
    slidesToScroll: 4,
    autoplay: true,
    speed: 40000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
    ],
  };

  if (safeData.length === 0) return null;

  return (
    <div className="mb-6">
      {title ? (
        <h2 className="text-center font-mont text-4xl md:text-5xl font-white pb-24">
          {title}
        </h2>
      ) : null}

      <Slider {...settings}>
        {safeData.map((item, index) => {
          const key = keys[index];
          const content = (
            <div className="font-mont">
              <div className="flex items-center" style={{ height: "175px" }}>
                {item?.url ? (
                  <img
                    className="m-auto"
                    style={{ maxWidth: "200px" }}
                    src={item.url}
                    alt={item?.name ?? "Partner"}
                  />
                ) : null}
              </div>
              {item?.name ? (
                <p className="font-bold text-lg pt-10 text-center">
                  {item.name}
                </p>
              ) : null}
            </div>
          );

          return item?.link ? (
            <a href={item.link} target="_blank" rel="noopener noreferrer" key={key}>
              {content}
            </a>
          ) : (
            <div key={key}>{content}</div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PartnerSlider;