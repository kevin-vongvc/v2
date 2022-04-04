import { useState } from 'react';
import styled from '@emotion/styled/macro';
import { FaSearch } from 'react-icons/fa';

const Container = styled('div')({
  width: '90%',
  maxWidth: 400,
  display: 'flex',
  position: 'relative',
  margin: '20px 10px 15px',
});

const Icon = styled(FaSearch)({
  position: 'absolute',
  top: '50%',
  left: 18,
  transform: 'translate(-50%, -50%)',
  color: 'var(--colors-tag)',
});

const Input = styled.input({
  background: 'transparent',
  border: 'none',
  width: '100%',
  height: '100%',
  padding: 16,
  paddingLeft: 34,
  color: '#fff',
  boxShadow: '0 0 2px var(--colors-primary)',
  borderRadius: 5,
  '::placeholder': {
    fontSize: '1rem',
    color: 'var(--colors-tag)',
  },
});

const Button = styled('button')({
  border: 'none',
  background: 'var(--colors-primary)',
  color: '#fff',
  padding: '16px 20px',
  borderRadius: 5,
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
});

const SearchInput = ({ handleClick, ...rest }) => {
  const [text, setText] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick(text);
    }
  };

  return (
    <Container onKeyDown={handleKeyPress}>
      <Icon />
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        {...rest}
      />
      <Button
        aria-label="Click here to search"
        onClick={() => handleClick(text)}
      >
        Search
      </Button>
    </Container>
  );
};

export default SearchInput;
