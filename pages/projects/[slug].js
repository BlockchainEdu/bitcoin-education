import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectsFromMonday } from '../../services';
import { MediaType } from '../../components/map';
import Footer from '../../components/footer';
import Header from "../../components/header";
import StandardButton from '../../components/standardButton';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Project = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState({ slug });

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjectsFromMonday();
      const project = fetchedProjects.find(elem => elem.place_name === slug);
      setProject(project);
    };
    fetchProjects();
  }, []);

  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <div id="student-story">
        <Header />
        <div className="pt-40 max-w-7xl mx-auto">
          <h1 className="font-mont text-black font-black text-2xl lg:text-3xl py-4">{project.place_name}</h1>
        </div>
        <div className="pb-24 max-w-7xl mx-auto space-x-10 flex flex-col lg:flex-row w-11/12">
          <div className="w-full lg:w-8/12">
            <Swiper>
              {project.gallery.map(item => (
                <SwiperSlide>{item.public_url}</SwiperSlide>
              ))}
            </Swiper>
            {project.media_type === MediaType.image && <img className="mapboxgl-marker-image w-full" src={project.image} />}
            {project.media_type === MediaType.video && <Vimeo video={project.video} className="mapboxgl-marker-video" autoplay />}
            <p className="text-lg font-bold mt-14 mb-2">Summary:</p>
            <p className="text-black text-md pr-10 pb-14" dangerouslySetInnerHTML={{ __html: project.place_story }}></p>
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
    </>
  )
}

export default Project
