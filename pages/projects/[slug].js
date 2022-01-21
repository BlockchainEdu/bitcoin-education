import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectsFromMonday } from '../../services';

const Project = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [ project, setProject ] = useState({slug});

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
      <h1>Project Page: {project.place_name}</h1>
    </>
  )
}

export default Project
