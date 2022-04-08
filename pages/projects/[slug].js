import { useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectIdsFromMonday, getProjectFromMonday } from '../../services';
import { MediaType } from '../../components/map';
import Footer from '../../components/footer';
import Header from "../../components/header";
import StandardButton from '../../components/standardButton';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import YouTube from 'react-youtube';
import Vimeo from '@u-wave/react-vimeo';
import ReactMarkdown from 'react-markdown'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

const Project = ({ project }) => {
  const router = useRouter()
  const [currSlideIdx, setCurrSlideIdx] = useState(0)
  const [isShowingZoomModal, setShowingZoomModal] = useState(false)
  if ( Object.keys(project).length === 0 ) {
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  return (
    <>
      <div id="student-story">
        <Header />
        <div className="w-11/12 pt-3 lg:pt-20 max-w-7xl mx-auto">
          <h1 className="font-mont text-center text-black font-black text-2xl lg:text-3xl py-4 mb-6">{project.place_name}</h1>
        </div>
        <div className="pb-24 max-w-7xl mx-auto space-x-0 lg:space-x-10 flex flex-col lg:flex-row w-11/12 overflow-hidden">
          <div className="w-full max-w-3xl mx-auto">
            { !isShowingZoomModal &&
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={swiper => setCurrSlideIdx(swiper.activeIndex)}
              onClick={() => setShowingZoomModal(true)}
              onInit={swiper => swiper.slideTo(currSlideIdx)}
              className={project.gallery && project.gallery[currSlideIdx]?.file_extension === '.mp4' && "video-slide"}
            >
              {project.gallery?.map((item, idx) => (
                <SwiperSlide className="w-4/5 pb-24">
                  {item.file_extension === 'youtube' && item.public_url != '' && idx === currSlideIdx &&
                   <YouTube videoId={item.public_url.split("/").pop()} opts={{playerVars: { autoplay: 1 }}} containerClassName="h-[30vh] flex justify-center items-center swiper-slide-vimeo" />
                  }
                  {item.file_extension === 'vimeo' && item.public_url != '' && idx === currSlideIdx &&
                    <Vimeo video={item.public_url} className="h-[30vh] flex justify-center items-center swiper-slide-vimeo" autoplay />
                  }
                  {item.file_extension === '.jpg' && item.public_url != '' &&
                    <div className="h-[30vh] mx-auto">
                      <img className="absolute top-1/2 translate-y-[-50%] grow-1" src={item.public_url} />
                    </div>
                  }
                </SwiperSlide>
              ))}
            </Swiper> }
            <StandardButton
              link="/#home-map"
              text="Back"
              color="orange"
              styling="px-10 flex"
            />
            <p className="text-lg font-bold mt-14 mb-2">Summary:</p>
            <p className="text-black text-md lg:pr-10 lg:pb-14"><ReactMarkdown children={project.place_story} /></p>
            <div>
              <div className="w-full gap-y-7 flex-wrap flex flex-col lg:flex-row items-center justify-center py-14 lg:space-y-0 lg:py-0 mt-14 lg:mt-0 space-x-0 lg:space-x-7">
                <StandardButton
                  link="/#home-map"
                  text="More Student Stories"
                  color="orange"
                  styling="px-10 flex m-auto"
                />
                {project.testimonial_url !== "" &&
                  <StandardButton
                    link={project.testimonial_url}
                    text="Student Testimonial"
                    color="orange"
                    styling="px-10 flex m-auto"
                  />
                }
                {project.podcast_url !== "" &&
                  <StandardButton
                    link={project.podcast_url}
                    text="Podcast"
                    color="orange"
                    styling="px-10 flex m-auto"
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      { isShowingZoomModal &&
      <div id="zoomModal" className="lightbox-modal w-full h-full max-h-[100vh] overflow-hidden">
        <span className="close cursor-pointer text-orange" onClick={() => setShowingZoomModal(false)}>&times;</span>
        <div className="modal-content h-full bg-transparent flex items-center justify-center">
          {project.gallery?.map((item, idx) => (
            <>
              {item.file_extension === 'youtube' && item.public_url != '' && idx === currSlideIdx &&
                <div className="my-slides w-full h-full" style={{ display: currSlideIdx === idx ? "block" : "none" }}>
                  <div className="numbertext text-2xl">{idx + 1} / {project.gallery.length}</div>
                  <YouTube videoId={item.public_url.split("/").pop()} opts={{playerVars: { autoplay: 1 }}} containerClassName="w-full h-full lightbox-slide-vimeo" />
                </div>
              }
              {item.file_extension === 'vimeo' && item.public_url != '' && idx === currSlideIdx &&
                <div className="my-slides w-full h-full" style={{ display: currSlideIdx === idx ? "block" : "none" }}>
                  <div className="numbertext text-2xl">{idx + 1} / {project.gallery.length}</div>
                  <Vimeo video={item.public_url} className="w-full h-full lightbox-slide-vimeo" />
                </div>
              }
              {item.file_extension === '.jpg' && item.public_url != '' &&
                <div className="my-slides w-full" style={{ display: currSlideIdx === idx ? "block" : "none" }}>
                  <div className="numbertext text-2xl">{idx + 1} / {project.gallery.length}</div>
                  <img src={item.public_url} className="w-full max-h-[100%]" />
                </div>
              }
            </>
          ))}
          <a className="prev cursor-pointer absolute top-1/2 left-0 text-orange" onClick={() => currSlideIdx > 0 && setCurrSlideIdx(currSlideIdx - 1)}>&#10094;</a>
          <a className="next cursor-pointer absolute top-1/2 right-0 text-orange" onClick={() => currSlideIdx < project.gallery.length - 1 && setCurrSlideIdx(currSlideIdx + 1)}>&#10095;</a>
        </div>
      </div> }
    </>
  )
}

export default Project

export async function getStaticProps({ params }) {
  const id = params.slug
  const project = await getProjectFromMonday(id) || {}
  return {
    props: { project },
    revalidate: Object.keys(project).length ? 3600 : 1
  }
}

export async function getStaticPaths() {
  let fetchedProjects = []
  while ( fetchedProjects.length === 0 ) {
    fetchedProjects = await getProjectIdsFromMonday() || []
  }
  const projectSlugs = fetchedProjects.map((project) => project.id || '')

  return {
    paths: projectSlugs.map((slug) => {
      return {
        params: {
          slug,
        },
      }
    }),
    fallback: false,
  }
}
