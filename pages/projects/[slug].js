import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectsFromMonday } from '../../services';
import { MediaType } from '../../components/map';

const Project = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [ project, setProject ] = useState({slug});

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
      {project.media_type === MediaType.image && <img className="mapboxgl-marker-image mx-auto w-full" src={project.image} />}
      {project.media_type === MediaType.video && <Vimeo video={project.video} className="mapboxgl-marker-video" autoplay />}
      <h1>{project.place_name}</h1>
      <p>{project.place_story}</p>
    </>
  )
}

export default Project
