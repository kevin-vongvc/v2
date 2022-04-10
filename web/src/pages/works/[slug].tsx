import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import styled from '@emotion/styled/macro';
import {
  FaExternalLinkAlt,
  FaGithub,
  FaGitlab,
  FaLongArrowAltLeft,
} from 'react-icons/fa';
import { PortableText } from '@portabletext/react';

import { Breakpoints } from '@styles/breakpoints';
import { getClient, sanityClient } from '@lib/sanity.server';
import { postQuery, projectQuery, projectSlugsQuery } from '@lib/queries';
import { ptComponents, urlFor, usePreviewSubscription } from '@lib/sanity';
const AlertPreview = dynamic(() => import('@components/AlertPreview'));
const Layout = dynamic(() => import('@components/Layout'));
const NotFound = dynamic(() => import('@pages/404'));
const ToTopButton = dynamic(() => import('@components/buttons/ToTopButton'));
const SocialBar = dynamic(() => import('@components/SocialBar'));
import { formatDate } from '@utils/datetime-utils';
import { urlForFile } from '@utils/urlForFile';
import { BackTo, Time } from '@components/sharedPosts';
import { ProjectType } from 'types/project';
import { DefaultSeo } from '@components/seo/DefaultSeo';

const Container = styled('article')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  paddingTop: 70,
  minHeight: '100vh',
});

const ProjectTitle = styled('h1')({
  color: 'var(--colors-primary)',
  margin: '0 10px 10px',
});

const VideoWrapper = styled('div')({
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
  video: {
    borderRadius: 2,
  },
});

const ImageWrapper = styled('div')({
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
  img: {
    borderRadius: 2,
  },
});

const ProjectBody = styled('section')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'initial',
  padding: '15px',
  width: '100%',
  maxWidth: 800,
  height: '100%',
  margin: '0 auto',
});

const ContentWrapper = styled('div')({
  flex: 1,
  paddingBottom: '1.5rem',
  marginBottom: 10,
  fontSize: '1.25rem',
  position: 'relative',
  'h1,h2,h3,h4,h5,h6,p': {
    marginTop: '1.2em',
    marginBottom: '1.2em',
    ':first-of-type': {
      marginTop: 0,
    },
  },
  p: {
    lineHeight: 1.7,
    code: {
      color: 'var(--colors-tag)',
    },
  },
  a: {
    color: 'var(--colors-primary)',
  },
  ul: {
    paddingLeft: '1em',
    marginTop: '-0.6em',
    marginBottom: '1em',
    li: {
      paddingTop: '0.25em',
    },
    'li:first-of-type': {
      paddingTop: 0,
    },
  },
  ol: {
    paddingLeft: '1em',
    li: {
      paddingTop: '0.5em',
    },
  },
  blockquote: {
    borderLeft: '5px solid var(--colors-primary)',
    background: 'hsla(221.9, 88.8%, 64.9%, 0.15)',
    marginBottom: '1em',
    padding: '1em 1.5em',
    borderRadius: 4,
    lineHeight: 1.5,
    letterSpacing: 0.5,
  },
  figure: {
    maxWidth: 600,
    margin: '1.5em auto',
    '> img': {
      width: '100%',
      height: '100%',
    },
  },
  [Breakpoints.Medium]: {
    marginBottom: 15,
  },
});

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const SourceLinks = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: 15,
  a: {
    marginRight: 25,
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

const ProjectLinks = styled('div')({
  textAlign: 'right',
});

const ProjectLink = styled('a')({
  color: 'var(--colors-primary)',
});

const IconSelector = (link = 'github') => {
  if (link.includes('github')) {
    return <FaGithub />;
  } else {
    return <FaGitlab />;
  }
};

type Props = {
  data: {
    project: ProjectType;
  };
  preview: boolean;
};

const ProjectPost: React.FC<Props> = ({ data, preview }) => {
  const router = useRouter();
  const slug = data?.project?.slug;
  const { data: mdata } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: data,
    enabled: Boolean(preview && slug),
  });

  if (!mdata || (!router.isFallback && !slug)) {
    return <NotFound />;
  }

  const { project } = mdata;
  const { title, author, gif, coverImage, body, updatedDate, source, demo } =
    project;
  const projectURL = `https://chivongv.vercel.app/works/${slug}`;

  return (
    <Layout>
      <DefaultSeo
        title={router.isFallback ? 'Loading...' : `${title} | Chi Vong's works`}
      />
      <Container>
        {router.isFallback ? (
          <ProjectTitle>Loading…</ProjectTitle>
        ) : (
          <>
            <ProjectTitle>{title}</ProjectTitle>
            {gif ? (
              <VideoWrapper>
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
              </VideoWrapper>
            ) : coverImage ? (
              <ImageWrapper>
                <img
                  loading="lazy"
                  src={urlFor(coverImage).width(400).url()}
                  alt={title}
                />
              </ImageWrapper>
            ) : null}
            {source || demo ? (
              <Center>
                <SourceLinks>
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
                </SourceLinks>
              </Center>
            ) : null}
            <ProjectBody>
              <ContentWrapper>
                <PortableText value={body} components={ptComponents} />
                <Link href="/works" passHref>
                  <BackTo>
                    <FaLongArrowAltLeft /> Back to works
                  </BackTo>
                </Link>
                {updatedDate ? (
                  <Time title="Last updated date">
                    Last updated date {formatDate(updatedDate)}
                  </Time>
                ) : null}
              </ContentWrapper>
              {preview && <AlertPreview redirect="works" />}
              <ProjectLinks>
                <ProjectLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/search?q=${encodeURIComponent(
                    projectURL,
                  )}`}
                >
                  Discuss on Twitter
                </ProjectLink>
                {` • `}
                <ProjectLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/intent/tweet/?text=Great project by @chivongv ${encodeURIComponent(
                    projectURL,
                  )}`}
                >
                  Tweet about this project
                </ProjectLink>
              </ProjectLinks>
            </ProjectBody>
          </>
        )}
        <SocialBar />
        <ToTopButton />
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { project } = await getClient(preview).fetch(projectQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: {
        project,
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(projectSlugsQuery);

  return {
    paths: paths?.map((slug) => ({ params: { slug } })) || [],
    fallback: true,
  };
}

export default ProjectPost;
