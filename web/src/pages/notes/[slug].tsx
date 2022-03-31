import { FC } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import styled from '@emotion/styled/macro';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';

import { NotePost } from 'types/notepost';
import { Breakpoints } from '@styles/breakpoints';
import { getClient, overlayDrafts, sanityClient } from '@lib/sanity.server';
import { noteQuery, noteSlugsQuery } from '@lib/queries';
import { usePreviewSubscription } from '@lib/sanity';
const AlertPreview = dynamic(() => import('@components/AlertPreview'));
const Layout = dynamic(() => import('@components/Layout'));
const NotFound = dynamic(() => import('@pages/404'));
const ToTopButton = dynamic(() => import('@components/buttons/ToTopButton'));
const SocialBar = dynamic(() => import('@components/SocialBar'));
import { formatDate } from '@utils/datetime-utils';
import { BackTo, Time } from '@components/sharedPosts';

const Container = styled('article')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  paddingTop: 70,
  minHeight: '100vh',
});

const NoteTitle = styled('h1')({
  color: 'var(--colors-primary)',
  marginBottom: 10,
});

const ImageWrapper = styled('div')({
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
  img: {
    borderRadius: 2,
  },
});

const NoteBody = styled('section')({
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

const NoteLinks = styled('div')({
  textAlign: 'right',
});

const NoteLink = styled('a')({
  color: 'var(--colors-primary)',
});

type Props = {
  data: {
    note: NotePost;
  };
  preview: boolean;
};

const Note: FC<Props> = ({ data, preview }) => {
  const router = useRouter();
  const slug = data?.note?.slug;
  const { data: mdata } = usePreviewSubscription(noteQuery, {
    params: { slug },
    initialData: data,
    enabled: Boolean(preview && slug),
  });

  if (!mdata || (!router.isFallback && !slug)) {
    return <NotFound />;
  }

  const { note } = mdata;

  const noteURL = `https://chivongv.vercel.app/notes/${slug}`;

  return (
    <Layout
      title={
        router.isFallback ? 'Loading...' : `${note.title} | Chi Vong's Notes`
      }
    >
      <Container>
        {router.isFallback ? (
          <NoteTitle>Loading…</NoteTitle>
        ) : (
          <>
            <Head>
              <title>
                {note.title} | {note.author?.name}
              </title>
            </Head>
            <NoteTitle>{note.title}</NoteTitle>
            {note.coverImage && (
              <ImageWrapper>
                <Image src={note.coverImage} width="800" height="600" />
              </ImageWrapper>
            )}
            <NoteBody>
              <ContentWrapper>
                <PortableText value={note.body} />
                <Link href="/notes" passHref>
                  <BackTo>
                    <FaLongArrowAltLeft /> Back to notes
                  </BackTo>
                </Link>
                <Time title="Last updated date">
                  {formatDate(note.updatedDate)}
                </Time>
              </ContentWrapper>
              {preview && <AlertPreview redirect="notes" />}
              <NoteLinks>
                <NoteLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/search?q=${encodeURIComponent(
                    noteURL,
                  )}`}
                >
                  Discuss on Twitter
                </NoteLink>
                {` • `}
                <NoteLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/intent/tweet/?text=Great post by @chivongv ${encodeURIComponent(
                    noteURL,
                  )}`}
                >
                  Tweet about this note
                </NoteLink>
              </NoteLinks>
            </NoteBody>
          </>
        )}
        <SocialBar />
        <ToTopButton />
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { note } = await getClient(preview).fetch(noteQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: {
        note,
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(noteSlugsQuery);
  return {
    paths: paths?.map((slug) => ({ params: { slug } })) || [],
    fallback: true,
  };
}

export default Note;
