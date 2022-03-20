import useCollapse from 'react-collapsed';
import styled from '@emotion/styled/macro';
import { IoIosArrowDown } from 'react-icons/io';
import { PortableText, PortableTextComponent } from '@portabletext/react';

export type AccordionBlockProps = {
  _type: 'accordion';
  showMoreText: string;
  showLessText: string;
  content: any;
  isOpen?: boolean;
  collapseDirection: string;
};

const Container = styled('div')({
  marginBottom: '1.5em',
  background: 'var(--colors-thumbnail-background)',
  ':empty': {
    width: '100%',
    height: 200,
  },
});

const Header = styled('button')<{ isOpen: boolean }>(({ isOpen }) => ({
  width: '100%',
  height: 36,
  border: 'none',
  color: isOpen ? '#a3acb9' : 'var(--colors-primary)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '7px 7px 0 0',
  backgroundColor: 'hsl(220, 13%, 22%)',
  padding: '10px 12px 10px 20px',
  cursor: 'pointer',
}));

const Title = styled('span')({
  fontSize: '1rem',
  ':hover': {
    color: 'var(--colors-primary)',
  },
});

const Arrow = styled('div')<{ isOpen: boolean }>(({ isOpen }) => ({
  svg: {
    width: 30,
    height: 30,
  },
  display: 'flex',
  justifyContent: 'center',
  ':hover': {
    color: 'var(--colors-primary)',
  },
  transform: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
  transition: 'transform 600ms ease-in-out',
}));

const Content = styled('section')({
  '> div': {
    padding: '10px',
  },
});

const AccordionBlock: PortableTextComponent<AccordionBlockProps> = ({
  value,
}) => {
  if (typeof window === 'undefined') {
    return null;
  }
  if (typeof value === 'undefined' || !value || !value.content) {
    return null;
  }

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    easing: 'ease-in-out',
    defaultExpanded: value.isOpen || false,
  });

  const { showMoreText, showLessText, content, collapseDirection } = value;

  if (collapseDirection === 'up') {
    return (
      <Container>
        <Content {...getCollapseProps()}>
          <PortableText value={content} />
        </Content>
        <Header isOpen={isExpanded} {...getToggleProps()}>
          <Title>{isExpanded ? showLessText : showMoreText}</Title>
          <Arrow isOpen={isExpanded}>
            <IoIosArrowDown />
          </Arrow>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header isOpen={isExpanded} {...getToggleProps()}>
        <Title>{isExpanded ? showLessText : showMoreText}</Title>
        <Arrow isOpen={isExpanded}>
          <IoIosArrowDown />
        </Arrow>
      </Header>
      <Content {...getCollapseProps()}>
        <PortableText value={content} />
      </Content>
    </Container>
  );
};

export default AccordionBlock;
