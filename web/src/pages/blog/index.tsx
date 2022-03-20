import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import FuzzySearch from 'fuzzy-search';
import { motion } from 'framer-motion';
import fs from 'fs';

import Layout from '@components/Layout';
import { Breakpoints } from '@styles/breakpoints';
import { getClient, overlayDrafts } from '@lib/sanity.server';
import { postsIndexQuery } from '@lib/queries';
const SocialBar = dynamic(() => import('@components/SocialBar'));
const AlertPreview = dynamic(() => import('@components/AlertPreview'));
const BlogPostCard = dynamic(() => import('@components/cards/BlogPostCard'));
const SearchInput = dynamic(() => import('@components/SearchInput'));
import generateRss from '@lib/rss';
import { BlogPostType } from 'types/blogpost';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '85vh',
  paddingTop: 70,
  [Breakpoints.LargerThan1000]: {
    minHeight: '100vh',
  },
});

const Title = styled('h2')({
  fontSize: 'calc(0.875rem + 0.8vw)',
  textAlign: 'center',
  color: 'var(--colors-primary)',
  overflowWrap: 'break-word',
});

const PostList = styled(motion.ul)({
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

const BlogPostWrapper = styled(motion.li)({
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

const Blog = ({ allPosts, preview }) => {
  const [searchText, setSearchText] = React.useState('');
  const searcher = new FuzzySearch(allPosts, ['tags', 'title'], {
    caseSensitive: false,
  });

  const handleClick = (value: string) => {
    setSearchText(value);
  };

  const filteredPosts = searcher.search(searchText);

  return (
    <Layout title="Chi Vong | Blog">
      <Container>
        <Title>Blog</Title>
        <SearchInput
          handleClick={handleClick}
          placeholder="Search by keyword or tag"
        />
        {preview && <AlertPreview redirect="blog" />}
        <PostList>
          {filteredPosts.map((post: BlogPostType, index) => {
            return (
              <BlogPostWrapper
                key={index}
                initial="hidden"
                animate="visible"
                variants={moveUp}
                whileHover="hover"
                whileFocus="hover"
              >
                <BlogPostCard data={post} />
              </BlogPostWrapper>
            );
          })}
        </PostList>
      </Container>
      <SocialBar />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const allPosts = overlayDrafts(
    await getClient(preview).fetch(postsIndexQuery),
  );

  if (!preview) {
    const rss = generateRss(allPosts);

    try {
      fs.writeFileSync('./public/rss.xml', rss);
    } catch (err) {
      console.log("Can't write to file ./public/rss.xml", err);
    }
  }

  return {
    props: { allPosts, preview },
    revalidate: 10,
  };
}

export default Blog;
