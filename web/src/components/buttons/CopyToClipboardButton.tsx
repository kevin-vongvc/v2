import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from '@emotion/styled';

const duration = 0.4;

type Props = {
  text: string;
};

const CopyToClipboardButton = ({ text }: Props) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const svgVariants = {
    hover: (isClicked: boolean) => ({
      scale: isClicked ? 1 : 1.05,
    }),
    pressed: (isClicked: boolean) => ({
      scale: isClicked ? 1 : 0.95,
    }),
    idle: {
      scale: 1,
    },
  };

  const clipboardIconVariants = {
    clicked: { opacity: 0 },
    unclicked: { opacity: 1 },
  };

  const checkmarkIconVariants = {
    clicked: { pathLength: 1 },
    unclicked: { pathLength: 0 },
  };

  const handleClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  React.useEffect(() => {
    let id = null;

    if (isClicked) {
      id = setTimeout(() => setIsClicked(false), 2000);
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [isClicked]);

  return (
    <Button
      aria-label={isClicked ? 'Copied to clipboard' : 'Copy to clipboard'}
      title={isClicked ? 'Copied to clipboard' : 'Copy to clipboard'}
      isClicked={isClicked}
      disabled={isClicked}
      onClick={() => {
        handleClick();
        setIsClicked(true);
      }}
    >
      <motion.svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        initial="idle"
        whileHover="hover"
        whileTap="pressed"
        variants={svgVariants}
        transition={{ duration }}
        custom={isClicked}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20.8511 9.46338H11.8511C10.7465 9.46338 9.85107 10.3588 9.85107 11.4634V20.4634C9.85107 21.5679 10.7465 22.4634 11.8511 22.4634H20.8511C21.9556 22.4634 22.8511 21.5679 22.8511 20.4634V11.4634C22.8511 10.3588 21.9556 9.46338 20.8511 9.46338Z"
          stroke="#ececec"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={isClicked ? 'clicked' : 'unclicked'}
          variants={clipboardIconVariants}
          transition={{ duration }}
        />
        <motion.path
          d="M5.85107 15.4634H4.85107C4.32064 15.4634 3.81193 15.2527 3.43686 14.8776C3.06179 14.5025 2.85107 13.9938 2.85107 13.4634V4.46338C2.85107 3.93295 3.06179 3.42424 3.43686 3.04917C3.81193 2.67409 4.32064 2.46338 4.85107 2.46338H13.8511C14.3815 2.46338 14.8902 2.67409 15.2653 3.04917C15.6404 3.42424 15.8511 3.93295 15.8511 4.46338V5.46338"
          stroke="#ececec"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={isClicked ? 'clicked' : 'unclicked'}
          variants={clipboardIconVariants}
          transition={{ duration }}
        />
        <motion.path
          d="M4 12L9 17L20 6"
          stroke="var(--colors-highlight)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={isClicked ? 'clicked' : 'unclicked'}
          variants={checkmarkIconVariants}
          style={{ pathLength, opacity }}
          transition={{ duration }}
        />
      </motion.svg>
    </Button>
  );
};

export default CopyToClipboardButton;

const Button = styled('button')<{ isClicked: boolean }>(({ isClicked }) => ({
  padding: 5,
  margin: 0,
  border: 'none',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.875rem',
  '> svg': {
    marginRight: 5,
  },
}));
