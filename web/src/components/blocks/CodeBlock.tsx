import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styled from '@emotion/styled/macro';
import { FiCopy } from 'react-icons/fi';

import syntaxTheme from '@styles/syntax-theme';
import { mapCodeLanguages } from '@utils/codeLanguages-utils';
import { PortableTextComponent } from '@portabletext/react';

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
});

const Title = styled('span')({
  fontSize: '0.875rem',
  ':hover': {
    color: 'var(--colors-primary)',
  },
});

const Button = styled('button')({
  padding: 5,
  margin: 0,
  border: 'none',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.875rem',
  '> svg': {
    marginRight: 5,
  },
  ':hover': {
    color: 'var(--colors-tag)',
  },
});

const Highlight = styled('span')({
  fontWeight: 700,
  color: '#1fb742',
});

const CodeWrapper = styled(SyntaxHighlighter)({
  maxHeight: 500,
  overflow: 'auto',
});

const CodeBlock: PortableTextComponent<CodeBlockProps> = ({ value }) => {
  if (typeof value === 'undefined' || !value) {
    return null;
  }
  const [copied, setCopied] = React.useState(false);
  const { language, code, filename } = value;

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
      navigator.clipboard.writeText(code);
      setCopied(true);
    }
  };

  return (
    <div>
      <Header>
        <Title>{mapCodeLanguages(language)}</Title>
        {filename && <Title>{filename}</Title>}
        <Button onClick={handleClick} title="Copy to clipboard">
          {copied ? (
            <Highlight>Copied!</Highlight>
          ) : (
            <>
              <FiCopy /> Copy
            </>
          )}
        </Button>
      </Header>
      <CodeWrapper language={language || 'text'} style={syntaxTheme}>
        {code}
      </CodeWrapper>
    </div>
  );
};

export default CodeBlock;
