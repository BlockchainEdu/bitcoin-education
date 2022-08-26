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
    const numPixels = currPercentage / 100 * (sliderRef.current.getBoundingClientRect().width - (sliderCoverRef.current.getBoundingClientRect().width * 3 / 4));
    sliderCoverRef.current.style.left = `${Math.max(numPixels, 0)}px`;
    console.log(sliderCoverRef.current.style.left);
    sliderCoverAmountRef.current.innerHTML = `\$${Math.floor(currValue)}`;
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
        <div className="relative z-0 donation-slider-track"></div>
        <div className="absolute top-0 z-1 shadow-3xl select-none bg-benblack-500 donation-slider-cover" ref={sliderCoverRef}>
          <span className="mr-3 font-inter font-light text-bengrey-300 left-arrow" ref={sliderCoverLeftArrow}>|||</span>
          <span className="font-inter text-lg text-white underline dollar-amount" ref={sliderCoverAmountRef}>$ {props.currValue}</span>
          <span className="ml-3 font-inter font-light text-bengrey-300 right-arrow" ref={sliderCoverRightArrow}>|||</span>
        </div>
      </div>
    </>
  );
}
