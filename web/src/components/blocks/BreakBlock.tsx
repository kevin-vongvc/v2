import styled from '@emotion/styled/macro';
import { PortableTextComponent } from '@portabletext/react';

export type BreakBlockProps = {
  _type: 'object';
  style: string;
  height: number;
};

const EmptyBreak = styled('div')<{ height?: number }>(({ height }) => ({
  height: height ? height : 50,
}));

const LineBreak = styled('div')<{ height?: number }>(({ height }) => ({
  height: height ? height : 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const BreakBlock: PortableTextComponent<BreakBlockProps> = ({ value }) => {
  if (typeof value === 'undefined' || !value) {
    return null;
  }

  switch (value.style) {
    case 'emptyBreak': {
      return <EmptyBreak height={value.height} />;
    }
    case 'lineBreak': {
      return (
        <LineBreak height={value.height}>
          <hr />
        </LineBreak>
      );
    }
    default:
      return <EmptyBreak />;
  }
};

export default BreakBlock;
