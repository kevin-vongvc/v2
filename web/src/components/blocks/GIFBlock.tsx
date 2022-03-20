import styled from '@emotion/styled/macro';
import { PortableTextComponent } from '@portabletext/react';
import { urlForFile } from '@utils/urlForFile';

export type GIFBlockProps = {
  _type: 'gif';
  title: string;
  mp4?: File;
  webm?: File;
  ogg?: File;
  caption?: string;
};

const Container = styled('div')({
  maxWidth: 600,
  margin: '0 auto',
});

const Caption = styled('figcaption')({
  textAlign: 'center',
});

const GIFBlock: PortableTextComponent<GIFBlockProps> = ({ value }) => {
  if (!value || (!value.mp4 && !value.webm && !value.ogg)) {
    return null;
  }

  return (
    <Container>
      <video width="100%" autoPlay loop muted>
        {value.webm && (
          <source src={`${urlForFile(value.webm)}`} type="video/webm" />
        )}
        {value.mp4 && (
          <source src={`${urlForFile(value.mp4)}`} type="video/mp4" />
        )}
        {value.ogg && (
          <source src={`${urlForFile(value.ogg)}`} type="video/ogg" />
        )}
        Your browser does not support the video tag.
      </video>
      {value.caption && <Caption>{value.caption}</Caption>}
    </Container>
  );
};

export default GIFBlock;
