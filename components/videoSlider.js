import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import YouTube from "react-youtube";
import { useRef } from "react";

const VideoSlider = () => {
  const videoUrls = [
    "DvBfOIxNldw",
    "dSrwr2oj910",
    "X55t_B00bRk",
    "6_AzuUhIJmk",
    "8aVwyWurv1E",
    "t0s9cNM5NU4",
    "SZvMgIj9r_I",
    "Lvs78FukfpI",
    "tbchiByUSm0",
    "dvBxuupurK0",
    "6hfJ2fRQTYc",
    "GMIIo8j9b90",
    "L1-yHKLctzM",
  ];

  // Ref to store player instances
  const playersRef = useRef([]);

  const handleSlideChange = (swiper) => {
    // Pause all videos on slide change
    playersRef.current.forEach((player) => {
      if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo();
      }
    });
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <Swiper
        navigation // enables navigation arrows
        loop // enables looping from last to first slide
        spaceBetween={20}
        slidesPerView={1}
        modules={[Navigation]}
        onSlideChange={handleSlideChange} // pause video on slide change
      >
        {videoUrls.map((videoId, index) => (
          <SwiperSlide key={index}>
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "400px",
                playerVars: {
                  autoplay: 0, // don't autoplay videos
                  controls: 1, // show playback controls
                  modestbranding: 1, // disable YouTube logo in controls
                  rel: 0, // don't show related videos at the end
                },
              }}
              onReady={(event) => {
                // store the player instance for this slide
                playersRef.current[index] = event.target;
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
