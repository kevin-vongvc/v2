import styled from '@emotion/styled/macro';
import { FaGithub, FaGitlab, FaExternalLinkAlt } from 'react-icons/fa';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: 15,
  borderRadius: 10,
  transition: 'transform 0.2s linear',
  boxShadow: `3px 3px 5px var(--colors-shadow), -2px -2px 7px var(--colors-shadow)`,
  width: '100%',
  height: '100%',
  minHeight: 200,
  justifyContent: 'center',
});

const ProjectLinks = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: 10,

  a: {
    marginRight: 15,
    color: 'var(--colors-text)',
    ':hover, :focus': {
      color: 'var(--colors-primary)',
    },
    svg: {
      marginRight: 3,
    },
  },
  'a:last-child': {
    marginRight: 0,
  },
});

const Name = styled('h2')({
  fontSize: 'calc(0.6rem + 0.4vw)',
  margin: '10px 0 7px',
  color: 'var(--colors-primary)',
});

const Body = styled.div({
  flex: 1,
  lineHeight: 1.5,
  '::selection': {
    backgroundColor: 'none',
    color: 'var(--colors-primary)',
  },
});

const TagList = styled.ul({
  listStyleType: 'none',
  display: 'flex',
  width: '100%',
  margin: '20px 0 0',
  'li:last-child': {
    marginRight: 0,
  },
});

const Tag = styled.li({
  color: 'var(--colors-tag)',
  marginRight: 10,
  marginBottom: 7,
  ':hover, :focus': {
    color: 'var(--colors-primary)',
  },
});

const IconSelector = (link = 'github') => {
  if (link.includes('github')) {
    return <FaGithub />;
  } else {
    return <FaGitlab />;
  }
};

const FrontProjectCard = ({ data }) => {
  if (data) {
    const { title, source, demo, excerpt, tags } = data;

    return (
      <Container>
        {source || demo ? (
          <ProjectLinks>
            {source ? (
              <a
                href={source}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {IconSelector(source)} Source
              </a>
            ) : null}
            {demo ? (
              <a href={demo} target="_blank" rel="nofollow noopener noreferrer">
                <FaExternalLinkAlt /> Demo
              </a>
            ) : null}
          </ProjectLinks>
        ) : null}
        {title ? <Name>{title}</Name> : null}
        <Body>{excerpt}</Body>
        <TagList>
          {tags
            ? tags.map((tag, j) => {
                return <Tag key={j}>{tag}</Tag>;
              })
            : null}
        </TagList>
      </Container>
    );
  }

  return null;
};

export default FrontProjectCard;
