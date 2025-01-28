import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ImageSlider = ({ location }) => {
  const imagesByLocation = {
    Ibiza: [
      "/images/hackerhouses/ibiza/mesaexterior.png",
      "/images/hackerhouses/ibiza/piscina.png",
      "/images/hackerhouses/ibiza/piscinadois.png",
      "/images/hackerhouses/ibiza/tenda.png",
      "/images/hackerhouses/ibiza/quarto.png",
      "/images/hackerhouses/ibiza/quartodois.png",
      "/images/hackerhouses/ibiza/quartoum.png",
      "/images/hackerhouses/ibiza/quartovista.png",
      "/images/hackerhouses/ibiza/salaexterior.png",
    ],
    Peniche: [
      "/images/hackerhouses/peniche/casa1.png",
      "/images/hackerhouses/peniche/casa2.png",
      "/images/hackerhouses/peniche/casa3.png",
      "/images/hackerhouses/peniche/casa4.png",
      "/images/hackerhouses/peniche/casa5.jpg",
      "/images/hackerhouses/peniche/casa6.jpg",
      "/images/hackerhouses/peniche/casa7.png",
    ],
    Ericeira: [
      "/images/hackerhouses/ericeira/casa1.jpg",
      "/images/hackerhouses/ericeira/casa2.jpeg",
      "/images/hackerhouses/ericeira/casa3.png",
      "/images/hackerhouses/ericeira/casa4.jpg",
      "/images/hackerhouses/ericeira/casa5.png",
      "/images/hackerhouses/ericeira/casa6.jpg",
      "/images/hackerhouses/ericeira/casa7.png",
      "/images/hackerhouses/ericeira/casa8.jpg",
      "/images/hackerhouses/ericeira/casa9.png",
      "/images/hackerhouses/ericeira/casa10.png",
    ],
  };

  const imageUrls = imagesByLocation[location] || [];

  return (
    <div className="w-full h-[500px] mt-2">
      {" "}
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;