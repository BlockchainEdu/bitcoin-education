import { createRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom';

export default function DonationSlider(props) {
  const [isMovingSlider, setIsMovingSlider] = useState(false);
  const sliderRef = createRef();
  const sliderCoverRef = createRef();
  const sliderCoverLeftArrow = createRef();
  const sliderCoverAmountRef = createRef();
  const sliderCoverRightArrow = createRef();

  useEffect(() => {
    setSliderPosition(props.currValue, props.min, props.max);
    window.addEventListener("mouseup", stopMovingSlider);
    window.addEventListener("touchend", stopMovingSlider);
    window.addEventListener("mousemove", moveDonationSlider);
    window.addEventListener("touchmove", moveDonationSlider);
    return () => {
      window.removeEventListener("touchmove", moveDonationSlider);
      window.removeEventListener("touchup", stopMovingSlider);
      window.removeEventListener("mousemove", moveDonationSlider);
      window.removeEventListener("mouseup", stopMovingSlider);
    }
  }, [props.currValue]);
  function setSliderPosition(currValue, minValue, maxValue, validateValue = false) {
    if (validateValue) {
      currValue = Math.round(currValue / props.step) * props.step;
    } else {
      currValue = Math.floor(currValue);
    }
    const currPercentage =
          Math.min(100, 100 * (currValue - minValue) / (maxValue - minValue));
    if (currPercentage <= 0) {
      currValue = minValue;
    }
    sliderCoverRef.current.style.left = `${Math.max(currPercentage - 30, 0)}%`;
    sliderCoverAmountRef.current.innerHTML = `\$${Math.floor(currValue)}`;
    sliderCoverLeftArrow.current.style.color = "black";
    sliderCoverRightArrow.current.style.color = "black";
    if (currValue === minValue) {
      sliderCoverLeftArrow.current.style.color = "gray";
    }
    if (currValue >= maxValue) {
      sliderCoverRightArrow.current.style.color = "gray";
    }
    props.onChange(currValue);
  }

  function moveDonationSlider(event) {
    if (!isMovingSlider) {
      return;
    }
    event.stopPropagation();
    const xPosition = sliderRef.current.getBoundingClientRect().x;
    const maxXPosition = sliderRef.current.getBoundingClientRect().right;
    const width = sliderRef.current.getBoundingClientRect().width;
    const minValue = props.min;
    const maxValue = props.max;
    const currMousePos = event.nativeEvent.pageX ? event.nativeEvent.pageX : event.nativeEvent.touches[0].pageX;
    let currValue = (((Math.min(currMousePos, maxXPosition) - xPosition) / width) * (maxValue - minValue)) + minValue;
    setSliderPosition(currValue, minValue, maxValue);
  }

  function startMovingSlider() {
    setIsMovingSlider(true);
  }

  function stopMovingSlider() {
    setIsMovingSlider(false);
  }

  return (
    <>
      <div className="slidecontainer relative" ref={sliderRef} onMouseDown={startMovingSlider} onTouchStart={startMovingSlider} onMouseMove={moveDonationSlider} onTouchMove={moveDonationSlider}>
        <div className="donation-slider-track relative z-0"></div>
        <div className="donation-slider-cover absolute top-0 z-1 shadow-3xl select-none" ref={sliderCoverRef}>
          <span className="left-arrow mr-3" ref={sliderCoverLeftArrow}>&lt;</span>
          <span className="dollar-amount" ref={sliderCoverAmountRef}>${props.currValue}</span>
          <span className="right-arrow ml-3" ref={sliderCoverRightArrow}>&gt;</span>
        </div>
      </div>
    </>
  );
}
