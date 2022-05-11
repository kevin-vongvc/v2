import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';

import { FrontProjectType } from 'types/project';

const FrontProjectCard = dynamic(
  () => import('@components/cards/FrontProjectCard'),
);

const Container = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1000,
  minHeight: '90vh',
  margin: '0 auto',
  padding: '30px 0',
});

const Title = styled(motion.h2)({
  fontSize: 'calc(0.875rem + 0.8vw)',
  textAlign: 'center',
  color: 'var(--colors-primary)',
});

const ProjectList = styled(motion.ul)({
  marginTop: 20,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 20,
  listStyle: 'none',
});

const Wrapper = styled(motion.div)({
  display: 'flex',
  justifyContent: 'center',
  margin: '20px 0 0',
});

const Anchor = styled('a')({
  color: '#fff',
  background: 'var(--colors-primary)',
  borderRadius: 5,
  padding: '10px 16px',
  '::selection': {
    backgroundColor: 'initial',
    color: 'initial',
  },
});

type Props = {
  projects: FrontProjectType[];
};

const FrontProjects: React.FC<Props> = ({ projects }) => {
  if (projects && projects.length > 0) {
    return (
      <Container id="works">
        <Title>Some Things I&#39;ve Built</Title>
        <ProjectList>
          {projects.map((project, i) => {
            if (project) {
              return (
                <motion.li
                  key={project._id}
                  whileHover={{ translateY: -10 }}
                  whileFocus={{ translateY: -10 }}
                >
                  <FrontProjectCard data={project} />
                </motion.li>
              );
            }
            return null;
          })}
        </ProjectList>
        <Wrapper>
          <Link href="/works" passHref>
            <Anchor>See more works</Anchor>
          </Link>
        </Wrapper>
      </Container>
    );
  }

  return null;
};

export default FrontProjects;
