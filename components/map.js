import { useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Vimeo from '@u-wave/react-vimeo';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const MediaType = {
  none: 'none',
  image: 'image',
  video: 'video',
}

const navigationControlStyle = {
  top: 36,
  right: 0,
  padding: '10px',
};

export default function Map({ locations }) {
  const isLatitude = num => isFinite(num) && Math.abs(num) <= 90;
  const isLongitude = num => isFinite(num) && Math.abs(num) <= 180;
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    // The latitude and longitude of the center of London
    latitude: 0,
    longitude: 0,
    zoom: 1,
  });
  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <ReactMapGL
      mapStyle="/mapboxstyle.json"
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navigationControlStyle} />
      {locations.map((location) => isLatitude(location.center[1]) && isLongitude(location.center[0]) && (
        <div key={location.id} className={'mapboxgl-marker-overlay ' + (location === selectedLocation ? 'selected' : '')}>
          <Marker latitude={location.center[1]} longitude={location.center[0]}>
            <a
              onClick={() => {
                setSelectedLocation(location);
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
              <div className="absolute lg:relative top-0 max-w-7xl mx-auto p-4 w-[inherit] h-[inherit]">
                <Link href={`/projects/${location.id}`}>
                  <h1 className="mapboxgl-marker-title text-2xl font-mont font-bold text-center mb-4">{location.place_name}</h1>
                </Link>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {location.gallery?.map(item => (
                    <SwiperSlide className="pb-16">
                      {item.file_extension === '.mp4' && item.public_url != '' &&
                        <Vimeo video={item.public_url} className="flex justify-center items-center swiper-slide-vimeo" />
                      }
                      {item.file_extension !== '.mp4' && item.public_url != '' &&
                        <div className="h-[30vh] mx-auto text-center">
                          <img className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]" src={item.public_url} />
                        </div>
                      }
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Link href={`/projects/${location.id}`}>
                  <a>
                    <div className="h-40 overflow-hidden">
                      <p className="mapboxgl-marker-story text-sm mt-4 font-mont overflow-hidden" dangerouslySetInnerHTML={{ __html: location.place_story }}></p>
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
