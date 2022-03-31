import * as React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from '@emotion/styled/macro';
import { useReducedMotion } from 'framer-motion';
import { Breakpoints } from '@styles/breakpoints';

const Button = styled('button')({
  position: 'fixed',
  bottom: 30,
  right: 10,
  zIndex: 99,
  padding: 10,
  color: '#fff',
  backgroundColor: 'var(--colors-primary)',
  borderRadius: '50%',
  boxShadow: '0 2px 2px rgba(0, 0, 0, 0.15)',
  border: 'none',
  cursor: 'pointer',
  svg: {
    width: 20,
    height: 20,
  },
  '@media all and  (min-width: 500px)': {
    right: 20,
  },
  [Breakpoints.LargerThan1000]: {
    right: 30,
  },
});

const ToTop = (props) => {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const { showAtPosition } = props;

  function scrollListener() {
    if (window.scrollY > showAtPosition) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  function handleClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  }

  if (!visible) {
    return null;
  }

  return (
    <Button
      aria-label="Click here to get to the top of the page"
      onClick={() => handleClick()}
    >
      <FaArrowUp />
    </Button>
  );
};

ToTop.defaultProps = {
  showAtPosition: 150,
};

export default ToTop;
