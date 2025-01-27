import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const ImageSlider = () => {
  const imageUrls = [
    "/images/hackerhouse/mesaexterior.png",
    "/images/hackerhouse/piscina.png",
    "/images/hackerhouse/piscinadois.png",
    "/images/hackerhouse/tenda.png",
    "/images/hackerhouse/quarto.png",
    "/images/hackerhouse/quartodois.png",
    "/images/hackerhouse/quartoum.png",
    "/images/hackerhouse/quartovista.png",
    "/images/hackerhouse/salaexterior.png",
  ];

  return (
    <div className="w-full h-full mt-2">
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
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
