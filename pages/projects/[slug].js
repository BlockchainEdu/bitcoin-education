import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectsFromMonday } from '../../services';
import { MediaType } from '../../components/map';
import Footer from '../../components/footer';
import Header from "../../components/header";
import StandardButton from '../../components/standardButton';

const Project = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState({ slug });

  useEffect(() => {
    const fetchProjects = async () => {
      const fetchedProjects = await getProjectsFromMonday();
      const project = fetchedProjects.find(elem => elem.place_name === slug);
      console.log(project);
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
        <div className="pt-40 py-24 max-w-7xl mx-auto flex flex-col lg:flex-row space-x-0 lg:space-x-14 w-11/12">
          <div className="w-full lg:w-8/12">
            <div>
              <h1 className="font-mont font-black text-2xl lg:text-3xl mb-4">{project.place_name}</h1>
            </div>
            {project.media_type === MediaType.image && <img className="mapboxgl-marker-image w-full" src={project.image} />}
            {project.media_type === MediaType.video && <Vimeo video={project.video} className="mapboxgl-marker-video" autoplay />}
            <p className="text-lg font-bold mt-14 mb-2">Summary:</p>
            <p className="text-black text-md">{project.place_story}</p>
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
