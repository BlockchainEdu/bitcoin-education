import React, { Component } from "react";
import Slider from "react-slick";

export default class PartnerSliderAlt extends Component {
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      speed: 40000,
      autoplaySpeed: 0,
      cssEase: "linear"
    };
    return (
      <div>
        <Slider {...settings}>
          <div className="font-mont">
            <img src="/images/muba.png"/>
            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
          </div>
          <div className="font-mont">
            <img src="/images/muba.png"/>
            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
          </div>
          <div className="font-mont">
            <img src="/images/muba.png"/>
            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
          </div>
          <div className="font-mont">
            <img src="/images/muba.png"/>
            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
          </div>
          <div className="font-mont">
            <img src="/images/muba.png"/>
            <p className="font-bold text-lg pt-10">MIT Bitcoin Club</p>
          </div>

        </Slider>
      </div>
    );
  }
}