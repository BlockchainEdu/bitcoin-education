import { useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Vimeo from '@u-wave/react-vimeo';
import ReactMarkdown from 'react-markdown'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StandardButton from "./standardButton";

export const MediaType = {
  none: 'none',
  image: 'image',
  video: 'video',
};

const navigationControlStyle = {
  top: 36,
  right: 0,
  padding: '10px',
};

export default function Map({ locations, style }) {
  const isLatitude = num => num && isFinite(num) && Math.abs(num) <= 90;
  const isLongitude = num => num && isFinite(num) && Math.abs(num) <= 180;
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    // The latitude and longitude of the center of London
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const [currSlideIdx, setCurrSlideIdx] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({});
  console.log({ locations });

  return (
    <ReactMapGL
      mapStyle="/mapboxstyle.json"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      style={style}
    >
      <NavigationControl style={navigationControlStyle} />
      {locations.map((location) => isLatitude(location.center[1]) && isLongitude(location.center[0]) && (
        <div key={location.id} className={'mapboxgl-marker-overlay ' + (location === selectedLocation ? 'selected' : '')}>
          <Marker latitude={location.center[1]} longitude={location.center[0]}>
            <a
              onClick={() => {
                setCurrSlideIdx(0)
                setSelectedLocation(location)
              }}
            >
              <img className="w-8 h-8 bg-benorange-500 p-2 rounded-full" role="img" src="/images/pin-indicator.svg" />
            </a>
          </Marker>
          {selectedLocation.id === location.id && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeButton={true}
              closeOnClick={true}
              latitude={location.center[1]}
              longitude={location.center[0]}
              className={`transform-none pin-popup border-none shadow-2xl rounded-md relative w-full h-full`}
            >
              <div className="absolute lg:relative top-0 max-w-7xl mx-auto p-4 w-[inherit] h-[inherit] grid">
                <Link href={`/projects/${location.id}`}>
                  <div className="mx-auto flex justify-center mb-4">
                    <button className="text-md px-8 rounded-full py-2 font-bold transition duration-500 shadow-button bg-benorange-500 hover:bg-bengrey-300 text-white">
                    {location.place_name}
                    </button>
                  </div>
                  {/* <h1 className="mapboxgl-marker-title text-2xl font-mont font-bold text-center mb-4"></h1> */}
                </Link>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  navigation
                  pagination={{ clickable: true }}
                  onSlideChange={swiper => setCurrSlideIdx(swiper.activeIndex)}
                  className={location.gallery && location.gallery[currSlideIdx]?.file_extension === '.mp4' && "video-slide w-full" || "w-full"}
                >
                  {location.gallery?.map((item, idx) => (
                    <SwiperSlide className="pb-16 overflow-hidden">
                      {item.file_extension === '.mp4' && item.public_url != '' && idx === currSlideIdx &&
                        <Vimeo video={item.public_url} className="relative top-[-.75rem] flex justify-center items-center swiper-slide-vimeo" />
                      }
                      {item.file_extension !== '.mp4' && item.public_url != '' &&
                        <div className="mx-auto text-center">
                          <img className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] grow-1" src={item.public_url} />
                        </div>
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* <Link href={`/projects/${location.id}`}>
                  <a>
                    <div className="overflow-hidden">

                      <p className="mapboxgl-marker-story text-sm mt-4 font-mont overflow-hidden"><ReactMarkdown children={location.place_story} /></p>
                    </div>
                  </a>
                </Link> */}
              </div>
            </Popup>
          )}
        </div>
      ))}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </ReactMapGL>
  );
}
