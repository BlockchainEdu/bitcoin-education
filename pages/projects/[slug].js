import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectsFromMonday, getProjectFromMonday } from '../../services';
import { MediaType } from '../../components/map';
import Footer from '../../components/footer';
import Header from "../../components/header";
import StandardButton from '../../components/standardButton';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Vimeo from '@u-wave/react-vimeo';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

const Project = ({project}) => {
  const router = useRouter()
  return (
    <>
      <div id="student-story">
        <Header />
        <div className="pt-40 max-w-7xl mx-auto">
          <h1 className="font-mont text-black font-black text-2xl lg:text-3xl py-4">{project.place_name}</h1>
        </div>
        <div className="pb-24 max-w-7xl mx-auto space-x-10 flex flex-col lg:flex-row w-11/12 overflow-hidden">
          <div className="w-full lg:w-8/12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {project.gallery?.map(item => (
                <SwiperSlide className="w-4/5 pb-16">
                  {item.file_extension === '.mp4' && item.public_url != '' &&
                   <Vimeo video={item.public_url} className="h-[30vh] flex justify-center items-center swiper-slide-vimeo" autoplay />
                  }
                  {item.file_extension !== '.mp4' && item.public_url != '' &&
                   <div className="h-[30vh] mx-auto">
                     <img className="absolute top-1/2 translate-y-[-50%]" src={item.public_url} />
                   </div>
                  }
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="text-lg font-bold mt-14 mb-2">Summary:</p>
            <p className="text-black text-md lg:pr-10 lg:pb-14" dangerouslySetInnerHTML={{ __html: project.place_story }}></p>
          </div>
          <div className="w-full lg:w-4/12 bg-benorange-500 flex items-center justify-center py-36 lg:py-0 mt-14 lg:mt-0">
            <StandardButton
              link="/map"
              text="More Students"
              color=""
              styling="px-16 flex m-auto bg-white hover:bg-benorange-500"
            />
          </div>
        </div>
        <Footer />
      </div>
    <div id="zoomModal" class="lightbox-modal">
      <span class="close cursor" onclick="closeModal()">&times;</span>
      <div class="modal-content">
      <div class="mySlides">
        {project.gallery?.map((item, idx) => (
          <>
          <div class="numbertext">{idx + 1} / 4</div>
          {item.file_extension === '.mp4' && item.public_url != '' &&
            <Vimeo video={item.public_url} className="h-[30vh] flex justify-center items-center swiper-slide-vimeo" autoplay />
          }
          {item.file_extension !== '.mp4' && item.public_url != '' &&
            <img src={item.public_url} style={{width: "100%"}} />
          }
          </>
        ))}
      </div>
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
      </div>
    </div>
    </>
  )
}

export default Project

export async function getStaticProps({ params }) {
  const id = params.slug
  const project = await getProjectFromMonday(id) || {}
  return { props: { project } }
}

export async function getStaticPaths() {
  const fetchedProjects = await getProjectsFromMonday() || []
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
