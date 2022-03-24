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
  alignItems: 'center',
  justifyContent: 'center',
  [Breakpoints.LargerThan1000]: {
    minHeight: '100vh',
  },
  '@media (orientation: landscape)': {
    paddingTop: 100,
  },
});

const Title = styled(motion.h2)({
  fontSize: 'calc(1rem + 2.5vw)',
  lineHeight: 1.5,
  marginBottom: 10,
});

const SubTitle = styled(motion.h3)({
  fontSize: 'calc(1rem + 1.5vw)',
  maxWidth: 800,
  width: '85vw',
  lineHeight: 1.3,
  textAlign: 'center',
  marginBottom: 25,
  color: 'transparent',
  backgroundColor: 'var(--colors-background)',
  backgroundImage: 'var(--colors-role)',
  backgroundClip: 'text',
});

const Anchor = styled(motion.a)({
  marginTop: 15,
  backgroundColor: 'var(--colors-primary)',
  color: '#fff',
  position: 'relative',
  padding: '10px 15px',
  borderRadius: 4,
  '::selection': {
    backgroundColor: 'initial',
    color: 'initial',
  },
  '@media screen and (min-width: 594px)': {
    marginTop: 100,
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
    <Container initial="hidden" animate="visible">
      <Title>
        Hi, I'm <span className="highlight">Chi</span> and I'm
      </Title>
      <SubTitle>{roles[0]}</SubTitle>
      <Link href="/#works" passHref>
        <Anchor variants={moveUp} transition={{ delay: 0.5, duration: 2 }}>
          Read more
        </Anchor>
      </Link>
    </Container>
  );
};

export default Hero;
