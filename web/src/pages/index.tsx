import dynamic from 'next/dynamic';

import { frontProjectsQuery } from '@lib/queries';
import { getClient, overlayDrafts } from '@lib/sanity.server';
import Layout from '@components/Layout';
import { FrontProjectType } from 'types/project';
import SectionNav from '@components/navigations/SectionNav';
const Hero = dynamic(() => import('@sections/Hero'));
const FrontProjects = dynamic(() => import('@sections/FrontProjects'));
const SocialBar = dynamic(() => import('@components/SocialBar'));

const homeSections = ['home', 'works'];

type Props = {
  projects: FrontProjectType[];
};

const Home = ({ projects }: Props) => {
  return (
    <Layout title="Chi Vong | Software Engineer">
      <SectionNav sections={homeSections} />
      <Hero />
      <FrontProjects projects={projects} />
      <SocialBar />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const projects = overlayDrafts(
    await getClient(preview).fetch(frontProjectsQuery),
  );
  return {
    props: { projects, preview },
    revalidate: 60,
  };
}

export default Home;
