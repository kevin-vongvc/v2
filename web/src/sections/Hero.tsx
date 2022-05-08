import * as React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';
import { Breakpoints } from '@styles/breakpoints';
import { allRoles } from '@data/roles';
import { shuffleArray } from '@utils/array-utils';

const Container = styled(motion.div)({
  display: 'flex',
  minHeight: '85vh',
  flexDirection: 'column',
  justifyContent: 'center',
  [Breakpoints.LargerThan1000]: {
    minHeight: '100vh',
  },
  '@media (orientation: landscape)': {
    paddingTop: 100,
  },
});

const Title = styled(motion.h1)({
  padding: '0 20px',
  fontSize: 'calc(1rem + 1.5vw)',
  lineHeight: 1.5,
  marginBottom: 10,
  [Breakpoints.LargerThan1000]: {
    padding: 0,
    fontSize: 'calc(1rem + 2.5vw)',
  },
});

const SubTitle = styled(motion.h2)({
  padding: '0 20px',
  fontSize: 'calc(1rem + 1.75vw)',
  maxWidth: 800,
  width: '85vw',
  lineHeight: 1.3,
  marginBottom: 25,
  [Breakpoints.LargerThan1000]: {
    padding: 0,
  },
});

const RoleHighlight = styled('span')({
  color: 'transparent',
  backgroundColor: 'var(--colors-background)',
  backgroundImage: 'var(--colors-role)',
  backgroundClip: 'text',
});

const Text = styled('p')({
  fontSize: 'calc(0.9rem + 0.7vw)',
  margin: '0 20px',
  [Breakpoints.LargerThan1000]: {
    margin: 0,
  },
});

const Anchor = styled(motion.a)({
  marginLeft: 20,
  marginTop: 15,
  backgroundColor: 'var(--colors-primary)',
  color: '#fff',
  position: 'relative',
  padding: '10px 15px',
  borderRadius: 4,
  alignSelf: 'center',
  '::selection': {
    backgroundColor: 'initial',
    color: 'initial',
  },
  width: 120,
  '@media screen and (min-width: 594px)': {
    marginTop: 100,
  },
  [Breakpoints.LargerThan1000]: {
    marginLeft: 0,
  },
});

const moveUp = {
  hidden: { opacity: 0, y: 200 },
  visible: { opacity: 1, y: 0 },
};

const RESELECT_INTERVAL = 3000;

const Hero = () => {
  const [firstRole, ...otherRoles] = allRoles;
  const [roles, setRoles] = React.useState([
    firstRole,
    ...shuffleArray(otherRoles),
  ]);

  React.useEffect(() => {
    const id = setInterval(() => {
      if (!document?.hasFocus()) return;

      setRoles((currentRoles) =>
        currentRoles.length > 1
          ? currentRoles.slice(1)
          : shuffleArray(allRoles),
      );
    }, RESELECT_INTERVAL);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Container id="home" initial="hidden" animate="visible">
      <Title>
        <span className="highlight">Chi Vong</span> - Fullstack Engineer
      </Title>
      <SubTitle>I'm <RoleHighlight>{roles[0]}</RoleHighlight></SubTitle>
      <Text>Currently, focused on building great web experiences. Available for work</Text>
      <Link href="/#works" passHref>
        <Anchor
          aria-label="Navigate to works"
          variants={moveUp}
          transition={{ delay: 0.5, duration: 2 }}
        >
          Read more
        </Anchor>
      </Link>
    </Container>
  );
};

export default Hero;
