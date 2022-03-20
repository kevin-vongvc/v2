import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { FrontProjectType } from 'types/project';

const FrontProjectCard = dynamic(
  () => import('@components/cards/FrontProjectCard'),
);

const Container = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1000,
  minHeight: '70vh',
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

const moveUp = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  },
};

const moveRight = {
  end: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
    },
  },
  start: {
    opacity: 0,
    x: -200,
  },
};

type Props = {
  projects: FrontProjectType[];
};

const FrontProjects: React.FC<Props> = ({ projects }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView) {
      controls.start('end');
    }
  }, [controls, inView]);

  if (projects && projects.length > 0) {
    return (
      <Container
        id="works"
        initial="start"
        animate={controls}
        variants={moveRight}
      >
        <Title>Some Things I&#39;ve Built</Title>
        <ProjectList ref={ref} animate={controls} variants={moveUp}>
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
