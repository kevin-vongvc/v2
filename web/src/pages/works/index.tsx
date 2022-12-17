import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { motion, useAnimation } from 'framer-motion';

import { worksIndexQuery } from '@lib/queries';
import { getClient, overlayDrafts } from '@lib/sanity.server';
import { Breakpoints } from '@styles/breakpoints';
import Layout from '@components/Layout';
import { NAVBAR_HEIGHT } from '@utils/constants';
import { DefaultSeo } from '@components/seo/DefaultSeo';
const Pagination = dynamic(() => import('@components/navigations/Pagination'));
const ToTopButton = dynamic(() => import('@components/buttons/ToTopButton'));
const ProjectCard = dynamic(() => import('@components/cards/ProjectCard'));
const SocialBar = dynamic(() => import('@components/SocialBar'));
const AlertPreview = dynamic(() => import('@components/AlertPreview'));

const pageSize = 3;

const Container = styled('div')({
  display: 'flex',
  minHeight: '85vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: NAVBAR_HEIGHT + 10,
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

const Works = ({ allWorks, preview }) => {
  const controls = useAnimation();
  const [state, setState] = React.useState({
    currentPage: 1,
    filteredWorks: allWorks.slice(0, pageSize),
  });
  const { currentPage, filteredWorks } = state;

  const handlePageChange = (page: number) => {
    setState({
      currentPage: page,
      filteredWorks: allWorks.slice((page - 1) * pageSize, page * pageSize),
    });
  };

  React.useEffect(() => {
    if (controls) {
      controls.start('visible');
    }
  }, [controls]);

  return (
    <Layout>
      <DefaultSeo title="Chi Vong | Works" />
      <Container>
        {preview && <AlertPreview redirect="works" />}
        <ProjectList>
          {filteredWorks ? (
            <>
              {filteredWorks.map((project, i) =>
                project ? (
                  <ProjectCardWrapper key={project._id}>
                    <ProjectCard data={project} />
                  </ProjectCardWrapper>
                ) : null,
              )}
              <Pagination
                totalCount={allWorks.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : null}
        </ProjectList>
      </Container>
      <SocialBar />
      <ToTopButton />
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
