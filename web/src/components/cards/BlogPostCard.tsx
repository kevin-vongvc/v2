import * as React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled/macro';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { BlogPostType } from 'types/blogpost';

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

const Title = styled('h2')({
  fontSize: '1rem',
  margin: '10px 0 7px',
  color: 'var(--colors-primary)',
  textAlign: 'center',
});

const Body = styled('div')({
  flex: 1,
  lineHeight: 1.5,
  textAlign: 'justify',
  '::selection': {
    backgroundColor: 'none',
    color: 'var(--colors-primary)',
  },
});

const ButtonLink = styled('a')({
  padding: '10px 35px',
  cursor: 'pointer',
  borderRadius: 5,
  margin: '20px auto 0',
  span: {
    marginRight: 10,
  },
  color: 'var(--colors-primary)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Button = styled('button')({
  background: 'var(--colors-thumbnail-background)',
  border: 'none',
  color: 'var(--colors-tag)',
  padding: '10px',
  borderRadius: 5,
  cursor: 'pointer',
  marginTop: 5,
  fontWeight: 500,
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

const Text = styled('span')({
  ':hover': {
    color: 'var(--colors-primary)',
  },
});

const Highlight = styled('span')({
  fontWeight: 700,
  color: 'var(--colors-highlight)',
});

type Props = {
  data: BlogPostType;
};

const BlogPostCard: React.FC<Props> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  if (!data) {
    return null;
  }

  const { title, slug, excerpt, tags } = data;

  React.useEffect(() => {
    let id = null;

    if (copied) {
      id = setTimeout(() => setCopied(false), 5000);
    }

    return () => {
      if (id) {
        clearTimeout(id);
      }
    };
  }, [copied]);

  const handleClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `https://chivongv.vercel.app/blog/${encodeURIComponent(slug)}`,
      );
      setCopied(true);
    }
  };

  return (
    <Container>
      {title ? (
        <Link href={`/blog/${encodeURIComponent(slug)}`}>
          <a>
            <Title>{title}</Title>
          </a>
        </Link>
      ) : null}
      <Body>{excerpt}</Body>
      <Link href={`/blog/${encodeURIComponent(slug)}`} passHref>
        <ButtonLink>
          <span>Read more</span>
          <FaLongArrowAltRight />
        </ButtonLink>
      </Link>
      <Button onClick={handleClick}>
        {copied ? <Highlight>Copied!</Highlight> : <Text>Copy URL</Text>}
      </Button>
      <TagList>
        {tags
          ? tags.map((tag, j) => {
              return <Tag key={j}>#{tag}</Tag>;
            })
          : null}
      </TagList>
    </Container>
  );
};

export default BlogPostCard;
