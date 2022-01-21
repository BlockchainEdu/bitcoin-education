import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getProjectsFromMonday } from '../../services';

const Project = ({ project }) => {
  const router = useRouter()
  if (!router.isFallback && !project?.slug) {
    return <ErrorPage statusCode={404} />
  }
  console.log(project);
  return (
    <>
      <h1>Project Page: {project.place_name}</h1>
    </>
  )
}

export default Project

export async function getStaticProps({ params }) {
  const projects = await getProjectsFromMonday();
  const project = projects.find(elem => encodeURIComponent(elem.place_name) === params.slug);

  return { props: { project } }
}

export async function getStaticPaths() {
  const projects = await getProjectsFromMonday();

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      }
    }),
    fallback: false,
  }
}
