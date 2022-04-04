import React from 'react';
import styled from '@emotion/styled';
import { Breakpoints } from '@styles/breakpoints';

const SectionNav = ({ sections = [] }) => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  const handleClick = (idx) => {
    setActiveIdx(idx);
  };

  return (
    <Container>
      {sections.map((sectionId: string, idx) => {
        return (
          <Dot
            key={sectionId}
            title={`Navigate to ${sectionId}`}
            aria-label={`Navigate to ${sectionId}`}
            isActive={activeIdx === idx}
            onClick={() => handleClick(idx)}
            href={`#${sectionId}`}
          />
        );
      })}
    </Container>
  );
};

export default SectionNav;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  position: 'fixed',
  top: '50%',
  right: 0,
  [Breakpoints.Mobile]: {
    display: 'none',
  },
});

const Dot = styled('a')<{ isActive: boolean }>(({ isActive }) => ({
  height: 10,
  width: 10,
  borderRadius: '50%',
  backgroundColor: isActive ? 'var(--colors-primary)' : 'var(--colors-tag)',
  margin: '0.25em',
  '&:hover': {
    backgroundColor: 'var(--colors-primary)',
  },
  [Breakpoints.Mobile]: {
    display: 'none',
  },
}));
