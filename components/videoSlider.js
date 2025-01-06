import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import YouTube from "react-youtube";

const VideoSlider = () => {
  const videoUrls = [
    "tbchiByUSm0",
    "dvBxuupurK0",
    "6hfJ2fRQTYc",
    "GMIIo8j9b90",
    "L1-yHKLctzM",
  ];

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <Swiper
        navigation // enables navigation arrows
        spaceBetween={20}
        slidesPerView={1}
        modules={[Navigation]}
      >
        {videoUrls.map((videoId, index) => (
          <SwiperSlide key={index}>
            <YouTube
              videoId={videoId}
              opts={{
                width: "100%",
                height: "400px",
                playerVars: {
                  autoplay: 0, // dont autoplay videos
                  controls: 1, // show playback controls
                  modestbranding: 1, // disable YouTube logo in controls
                  rel: 0, // dont show related videos at the end
                  showinfo: 0, // hide video title and uploader
                },
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlider;
