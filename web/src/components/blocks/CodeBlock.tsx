import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styled from '@emotion/styled/macro';

import syntaxTheme from '@styles/syntax-theme';
import { mapCodeLanguages } from '@utils/codeLanguages-utils';
import { PortableTextComponent } from '@portabletext/react';
import CopyToClipboardButton from '@components/buttons/CopyToClipboardButton';

export type CodeBlockProps = {
  _type: 'code';
  code: string;
  language?: string;
  filename?: string;
};

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#a3acb9',
  borderRadius: '7px 7px 0 0',
  backgroundColor: 'hsl(220, 13%, 22%)',
  padding: '5px 12px 5px 20px',
  ':hover': {
    '> span': {
      color: 'var(--colors-primary)',
    },
  },
});

const Title = styled('span')({
  fontSize: '0.875rem',
});

const CodeWrapper = styled(SyntaxHighlighter)({
  maxHeight: 500,
  overflow: 'auto',
});

const CodeBlock: PortableTextComponent<CodeBlockProps> = ({ value }) => {
  if (typeof value === 'undefined' || !value) {
    return null;
  }
  const { language, code, filename } = value;

  return (
    <div>
      <Header>
        <Title>{mapCodeLanguages(language)}</Title>
        {filename && <Title>{filename}</Title>}
        <CopyToClipboardButton text={code} />
      </Header>
      <CodeWrapper
        language={language || 'text'}
        style={syntaxTheme}
        showLineNumbers
      >
        {code}
      </CodeWrapper>
    </div>
  );
};

export default CodeBlock;
