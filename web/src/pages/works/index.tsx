import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { motion, useAnimation } from 'framer-motion';

import { worksIndexQuery } from '@lib/queries';
import { getClient, overlayDrafts } from '@lib/sanity.server';
import { Breakpoints } from '@styles/breakpoints';
import Layout from '@components/Layout';
const ProjectCard = dynamic(() => import('@components/cards/ProjectCard'));
const SocialBar = dynamic(() => import('@components/SocialBar'));
const AlertPreview = dynamic(() => import('@components/AlertPreview'));

const Container = styled('div')({
  display: 'flex',
  minHeight: '85vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 50,
  [Breakpoints.LargerThan1000]: {
    minHeight: '100vh',
  },
});

const ProjectList = styled(motion.ul)({
  marginBottom: 20,
  listStyle: 'none',
});

const ProjectCardWrapper = styled(motion.li)({
  maxWidth: 1100,
  minWidth: 300,
});

const animations = {
  hidden: { opacity: 0, y: 200 },
  visible: { opacity: 1, y: 0 },
};

const Works = ({ allWorks, preview }) => {
  const controls = useAnimation();

  React.useEffect(() => {
    if (controls) {
      controls.start('visible');
    }
  }, [controls]);

  return (
    <Layout title="Chi Vong | Works">
      <Container>
        {preview && <AlertPreview redirect="works" />}
        <ProjectList>
          {allWorks
            ? allWorks.map((project, i) =>
                project ? (
                  <ProjectCardWrapper
                    key={project._id}
                    initial="hidden"
                    animate="visible"
                    variants={animations}
                    transition={{ delay: i * 0.3, duration: 1.5 }}
                  >
                    <ProjectCard data={project} />
                  </ProjectCardWrapper>
                ) : null,
              )
            : null}
        </ProjectList>
      </Container>
      <SocialBar />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const allWorks = overlayDrafts(
    await getClient(preview).fetch(worksIndexQuery),
  );
  return {
    props: { allWorks, preview },
    revalidate: 1,
  };
}

export default Works;
