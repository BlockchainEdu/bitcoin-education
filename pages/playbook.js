export async function getServerSideProps() {
  return {
    redirect: {
      destination: "https://blockchainedu.org",
      permanent: true,
    },
  };
}

export default function Playbook() {
  return null;
}
