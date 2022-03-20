import styled from '@emotion/styled/macro';
import { urlFor } from '@lib/sanity';
import { PortableTextComponent } from '@portabletext/react';

export type FigureBlockProps = {
  _type: 'figure';
  alt: string;
  caption: string;
};

const Caption = styled('figcaption')({
  textAlign: 'center',
});

const FigureBlock: PortableTextComponent<FigureBlockProps> = ({ value }) => {
  if (typeof value === 'undefined' || !value) {
    return null;
  }

  return (
    <figure>
      <img
        src={urlFor(value).width(400).url()}
        alt={value.alt}
        style={{ borderRadius: 2 }}
      />
      {value.caption && <Caption>{value.caption}</Caption>}
    </figure>
  );
};

export default FigureBlock;
