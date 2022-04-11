import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactMarkdown from 'react-markdown'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import StandardButton from "./standardButton";
import clampViewportToBound from "../utils/map-helpers.js";
import { useAppContext } from '../context/state';

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
  const { sharedState, setSharedState } = useAppContext();
  console.log({sharedState});
  const mapConstraints = {
    minZoom: 2,
    maxZoom: 5,
  }
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '624px',
    ...mapConstraints,
    ...sharedState,
  });
  const [currSlideIdx, setCurrSlideIdx] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState({});
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: sharedState.scrollY }), 300);
  }, []);

  return (
    <ReactMapGL
      mapStyle="/mapboxstyle.json"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport({
          ...nextViewport,
          ...mapConstraints,
        })
        setSharedState({
          latitude: nextViewport.latitude,
          longitude: nextViewport.longitude,
          zoom: nextViewport.zoom,
          scrollY: window.scrollY,
        })
      }}
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
                setSharedState({
                  ...sharedState,
                  scrollY: window.scrollY,
                })
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
                  <h1 className="mapboxgl-marker-title text-2xl font-mont font-bold text-center underline decoration-benorange-500 cursor-pointer">{location.place_name}</h1>
                </Link>
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  navigation
                  pagination={{ clickable: true }}
                  onSlideChange={swiper => setCurrSlideIdx(swiper.activeIndex)}
                  className={location.gallery && location.gallery[currSlideIdx]?.file_extension !== '.jpg' && "video-slide w-full" || "w-full"}
                >
                  {location.gallery?.map((item, idx) => (
                    <SwiperSlide className="pb-16 overflow-hidden">
                      {item.file_extension === 'youtube' && item.public_url != '' && idx === currSlideIdx &&
                       <YouTube videoId={item.public_url.split("/").pop()} containerClassName="relative top-[-.75rem] flex justify-center items-center swiper-slide-vimeo" />
                      }
                      {item.file_extension === 'vimeo' && item.public_url != '' && idx === currSlideIdx &&
                        <Vimeo video={item.public_url} className="relative top-[-.75rem] flex justify-center items-center swiper-slide-vimeo" />
                      }
                      {item.file_extension === '.jpg' && item.public_url != '' &&
                        <div className="mx-auto text-center">
                          <img className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] grow-1" src={item.public_url} />
                        </div>
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Link href={`/projects/${location.id}`}>
                  <a className="flex flex-col justify-end">
                    <div className="overflow-hidden">
                      <p className="mapboxgl-marker-story text-sm mt-4 font-mont overflow-hidden line-clamp-2"><ReactMarkdown children={location.place_story} /></p>
                      <span className="block font-black underline text-center">Read full story here</span>
                    </div>
                  </a>
                </Link>
              </div>
            </Popup>
          )}
        </div>
      ))}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </ReactMapGL>
  );
}
