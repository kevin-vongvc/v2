import styled from '@emotion/styled/macro';
import { FaGithub, FaGitlab, FaExternalLinkAlt } from 'react-icons/fa';

import { Breakpoints } from '@styles/breakpoints';
import { urlFor } from '@lib/sanity';
import { urlForFile } from '@utils/urlForFile';

const Container = styled('div')({
  width: '100%',
  borderRadius: 10,
  boxShadow: `3px 3px 7px var(--colors-shadow), 
            -2px -2px 7px var(--colors-shadow)`,
  marginBottom: 20,
});

const TwoCol = styled('div')({
  marginTop: 15,
  [Breakpoints.LargerThan800]: {
    display: 'flex',
    minHeight: 250,
  },
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '10px 15px',
  minHeight: 200,
  fontSize: '0.875rem',
  width: '100%',
  textAlign: 'center',
});

const ProjectLinks = styled('div')({
  display: 'flex',
  justifyContent: 'center',
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
  [Breakpoints.LargerThan800]: {
    justifyContent: 'flex-start',
  },
});

const Name = styled('a')({
  margin: '10px 0 7px',
  fontSize: 'calc(0.8rem + 0.4vw)',
  color: 'var(--colors-primary)',
});

const Body = styled('div')({
  flex: 1,
  fontSize: '0.875rem',
  p: {
    marginBottom: 10,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  ul: {
    marginLeft: 25,
  },
});

const Thumbnail = styled('div')({
  width: '100%',
  maxWidth: '100vw',
  background: 'var(--colors-thumbnail-background)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  borderRadius: 5,
  img: {
    objectFit: 'cover',
    borderRadius: '5px 5px 0 0',
    maxHeight: 400,
    maxWidth: '100vw',
  },
  video: {
    borderRadius: '5px 5px 0 0',
    maxWidth: 400,
  },
  [Breakpoints.LargerThan800]: {
    maxWidth: 400,
  },
  [Breakpoints.LargerThan1000]: {
    maxWidth: 600,
  },
});

const TagList = styled('ul')({
  listStyleType: 'none',
  display: 'flex',
  width: '100%',
  margin: '10px 0 0',
  justifyContent: 'center',
  'li:last-child': {
    marginRight: 0,
  },
  [Breakpoints.LargerThan800]: {
    justifyContent: 'flex-start',
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

const ProjectCard = ({ data }) => {
  if (data) {
    const { title, source, demo, gif, coverImage, tags, slug, excerpt } = data;

    return (
      <Container>
        <TwoCol>
          <Content>
            {title ? (
              <Name
                href={`/works/${encodeURIComponent(slug)}`}
                rel="nofollow noopener noreferrer"
              >
                {title}
              </Name>
            ) : null}
            <Body>
              <p>{excerpt}</p>
            </Body>
            {source || demo ? (
              <ProjectLinks>
                {demo ? (
                  <a
                    href={demo}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                ) : null}
                {source ? (
                  <a
                    href={source}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {IconSelector(source)} Source
                  </a>
                ) : null}
              </ProjectLinks>
            ) : null}
            <TagList>
              {tags
                ? tags.map((tag, j) => {
                    return <Tag key={j}>{tag}</Tag>;
                  })
                : null}
            </TagList>
          </Content>
          <Thumbnail>
            {gif ? (
              <video width="100%" autoPlay loop muted>
                {gif.webm && (
                  <source src={`${urlForFile(gif.webm)}`} type="video/webm" />
                )}
                {gif.mp4 && (
                  <source src={`${urlForFile(gif.mp4)}`} type="video/mp4" />
                )}
                {gif.ogg && (
                  <source src={`${urlForFile(gif.ogg)}`} type="video/ogg" />
                )}
                Your browser does not support the video tag.
              </video>
            ) : coverImage ? (
              <img
                loading="lazy"
                src={urlFor(coverImage).width(400).url()}
                alt={title}
              />
            ) : null}
          </Thumbnail>
        </TwoCol>
      </Container>
    );
  }

  return null;
};

export default ProjectCard;
