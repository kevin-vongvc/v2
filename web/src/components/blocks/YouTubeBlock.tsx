import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import styled from '@emotion/styled/macro';
import { PortableTextComponent } from '@portabletext/react';

export type YouTubeBlockProps = {
  _type: 'youtube';
  url: string;
};

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const YouTubeBlock: PortableTextComponent<YouTubeBlockProps> = ({ value }) => {
  if (typeof value === 'undefined' || !value || !value.url) {
    return null;
  }

  const { url } = value;
  const id = getYouTubeId(url);
  return (
    <Container>
      <YouTube videoId={id} />
    </Container>
  );
};

export default YouTubeBlock;
