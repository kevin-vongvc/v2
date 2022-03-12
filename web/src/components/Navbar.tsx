import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { Breakpoints } from '@styles/breakpoints';
const SocialBar = dynamic(() => import('./SocialBar'));
const ToggleMode = dynamic(() => import('./ToggleMode'));
const Bars = dynamic(() => import('@icons/Bars'));
const Cube = dynamic(() => import('@icons/Cube'));
const X = dynamic(() => import('@icons/X'));

const Container = styled('header')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  width: '100vw',
  margin: '0 auto',
  paddingLeft: 20,
  paddingRight: 20,
  height: 50,
  position: 'fixed',
  backgroundColor: 'var(--colors-nav-background)',
  boxShadow: `3px 3px 5px var(--colors-shadow)`,
  zIndex: 999,
});

const InnerContainer = styled('div')({
  width: '100%',
  maxWidth: 1000,
  padding: '12px 0 10px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
});

const MenuToggle = styled.button({
  border: 'none',
  background: 'transparent',
  outline: 'none',
  cursor: 'pointer',
  color: 'var(--colors-text)',
  [Breakpoints.Small]: {
    display: 'none',
  },
});

const Nav = styled('nav')<{ isOpen: boolean }>(({ isOpen }) => ({
  display: 'flex',
  [Breakpoints.Mobile]: {
    position: 'absolute',
    top: 0,
    left: '-100vw',
    flexDirection: 'column',
    background: 'var(--colors-background)',
    padding: '30px 10px 10px',
    width: '100vw',
    height: '100vh',
    ['> a, div']: {
      padding: 5,
      margin: 5,
    },
    transform: isOpen ? 'translateX(100vw)' : 'translateX(0)',
    transition: 'transform 500ms ease-in-out',
    zIndex: 1000,
  },
  [Breakpoints.Small]: {
    justifyContent: 'flex-end',
    '> a:not(:last-child)': {
      background: 'var(--colors-text)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginRight: 20,
      fontWeight: 600,
    },
  },
}));

const MenuExit = styled.button({
  border: 'none',
  background: 'transparent',
  outline: 'none',
  color: 'var(--colors-text)',
  cursor: 'pointer',
  padding: 10,
  position: 'absolute',
  top: 5,
  right: 10,
});

const Anchor = styled('a')<{ isActive: boolean }>(({ isActive }) => ({
  cursor: 'pointer',
  color: isActive ? 'var(--colors-primary)' : 'var(--colors-text)',
  [Breakpoints.Small]: {
    borderBottom: isActive ? '3px solid var(--colors-primary)' : '',
    [':hover, :focus']: {
      borderBottom: `3px solid var(--colors-primary)`,
    },
  },
}));

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container>
      <InnerContainer>
        <Link href="/">
          <a>
            <Cube width="24" height="24" />
          </a>
        </Link>
        <Nav isOpen={isOpen}>
          <Link href="/" passHref>
            <Anchor isActive={router.pathname === '/'}>Home</Anchor>
          </Link>
          <Link href="/works" passHref>
            <Anchor isActive={router.pathname.includes('/works')}>Works</Anchor>
          </Link>
          <Link href="/blog" passHref>
            <Anchor isActive={router.pathname.includes('/blog')}>Blog</Anchor>
          </Link>
          <div>
            <ToggleMode />
          </div>
          {isOpen && (
            <>
              <SocialBar />
              <MenuExit
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <X width="24" height="24" />
              </MenuExit>
            </>
          )}
        </Nav>
        <MenuToggle type="button" onClick={() => setIsOpen((prev) => !prev)}>
          <Bars width="24" height="24" />
        </MenuToggle>
      </InnerContainer>
    </Container>
  );
};

export default Navbar;
