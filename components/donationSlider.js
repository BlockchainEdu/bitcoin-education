import { createRef, useEffect, useState } from "react";

export default function DonationSlider(props) {
  const sliderRef = createRef();
  const sliderCoverRef = createRef();
  const sliderCoverLeftArrow = createRef();
  const sliderCoverAmountRef = createRef();
  const sliderCoverRightArrow = createRef();

  useEffect(() => {
    const currPercentage =
          Math.min(100, 100 * props.currValue / (props.max - props.min));
    sliderCoverRef.current.style.left = `${Math.max(currPercentage - 30, 0)}%`;
    sliderCoverAmountRef.current.innerHTML = `\$${Math.floor(props.currValue)}`;
  }, [props.currValue]);

  function moveDonationSlider(event) {
    const xPosition = sliderRef.current.getBoundingClientRect().x;
    const minValue = sliderRef.current.min;
    const maxValue = sliderRef.current.max;
    const currValue = sliderRef.current.value;
    const currPercentage = 100 * currValue / (maxValue - minValue);
    props.onChange(currValue);
    sliderCoverRef.current.style.left = `${Math.max(currPercentage - 30, 0)}%`;
    sliderCoverAmountRef.current.innerHTML = `\$${currValue}`;
    sliderCoverLeftArrow.current.style.color = "black";
    sliderCoverRightArrow.current.style.color = "black";
    if (currValue === minValue) {
      sliderCoverLeftArrow.current.style.color = "gray";
    }
    if (currValue === maxValue) {
      sliderCoverRightArrow.current.style.color = "gray";
    }
  }

  return (
    <>
                    <div className="slidecontainer relative">
                      <div className="donation-slider-track relative z-0"></div>
                      <div className="donation-slider-cover absolute top-0 z-1 shadow-3xl" ref={sliderCoverRef}>
                        <span className="left-arrow mr-3" ref={sliderCoverLeftArrow}>&lt;</span>
                        <span className="dollar-amount" ref={sliderCoverAmountRef}>${props.currValue}</span>
                        <span className="right-arrow ml-3" ref={sliderCoverRightArrow}>&gt;</span>
                      </div>
                      <input type="range" min={props.min} max={props.max} step={props.step}
                             className="slider relative z-10" id="donation-slider" defaultValue={props.defaultValue}
                        onChange={moveDonationSlider} ref={sliderRef} />
                    </div>
    </>
  );
}
