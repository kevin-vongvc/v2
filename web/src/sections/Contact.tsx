import React from 'react';
import styled from '@emotion/styled/macro';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Breakpoints } from '@styles/breakpoints';

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

const Text = styled('p')({
  fontSize: 'calc(1rem + 0.5vw)',
  margin: '15px 20px 0',
  [Breakpoints.LargerThan1000]: {
    margin: '15px 0 0',
  },
});

const moveLeft = {
  end: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
    },
  },
  start: {
    opacity: 0,
    x: 200,
  },
};

const Contact = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView) {
      controls.start('end');
    }
  }, [controls, inView]);

  return (
    <Container
      id="contact"
      initial="start"
      animate={controls}
      variants={moveLeft}
    >
      <Title ref={ref}>Let's work together</Title>
      <Text>
        I would love to hear about what project you are working on and discuss
        how I can contribute with my knowledge and experiences.
      </Text>
    </Container>
  );
};

export default Contact;
