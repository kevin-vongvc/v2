import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { motion } from 'framer-motion';

import Layout from '@components/Layout';
import { Breakpoints } from '@styles/breakpoints';
import { getClient, overlayDrafts } from '@lib/sanity.server';
import { notesIndexQuery } from '@lib/queries';
const SocialBar = dynamic(() => import('@components/SocialBar'));
const AlertPreview = dynamic(() => import('@components/AlertPreview'));
const NotePostCard = dynamic(() => import('@components/cards/NotePostCard'));
import { NotePost } from 'types/notepost';
import { NAVBAR_HEIGHT } from '@utils/constants';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '85vh',
  paddingTop: NAVBAR_HEIGHT + 10,
  [Breakpoints.LargerThan1000]: {
    minHeight: '100vh',
  },
});

const Title = styled('h2')({
  fontSize: 'calc(0.875rem + 0.8vw)',
  textAlign: 'center',
  color: 'var(--colors-primary)',
  overflowWrap: 'break-word',
  paddingTop: 10,
});

const NoteList = styled(motion.ul)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  width: '100%',
  margin: '20px auto 15px',
  gap: 20,
  listStyle: 'none',
  [Breakpoints.TabletOrLarger]: {
    margin: '20px auto 15px',
  },
});

const NotePostWrapper = styled(motion.li)({
  '> div': {
    width: '100vw',
    maxWidth: 450,
  },
});

const moveUp = {
  hidden: { opacity: 0, y: 200 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  },
  hover: {
    boxShadow: `3px 3px 5px var(--colors-primary), -2px -2px 7px var(--colors-primary)`,
  },
};

const Notes = ({ allNotes, preview }) => {
  return (
    <Layout title="Chi Vong | Notes">
      <Container>
        <Title>Code Notes</Title>
        {preview && <AlertPreview redirect="notes" />}
        <NoteList>
          {allNotes.map((note: NotePost, index) => {
            return (
              <NotePostWrapper
                key={index}
                initial="hidden"
                animate="visible"
                variants={moveUp}
                whileHover="hover"
                whileFocus="hover"
              >
                <NotePostCard data={note} />
              </NotePostWrapper>
            );
          })}
        </NoteList>
      </Container>
      <SocialBar />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const allNotes = overlayDrafts(
    await getClient(preview).fetch(notesIndexQuery),
  );

  return {
    props: { allNotes, preview },
    revalidate: 10,
  };
}

export default Notes;
