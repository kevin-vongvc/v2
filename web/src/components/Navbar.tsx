import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';
import { Breakpoints } from '@styles/breakpoints';
const SocialBar = dynamic(() => import('./SocialBar'));
const ToggleModeButton = dynamic(() => import('./buttons/ToggleModeButton'));
const Cube = dynamic(() => import('@icons/Cube'));

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

const Inner = styled('div')({
  width: '100%',
  maxWidth: 1000,
  padding: '12px 0 10px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const MenuToggle = styled.button<{ showMenu: boolean }>(({ showMenu }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'column',
  border: 'none',
  background: 'transparent',
  outline: 'none',
  cursor: 'pointer',
  width: 24,
  height: 24,
  position: 'relative',
  zIndex: 1001,
  '> span': {
    background: 'var(--colors-text)',
    height: 3,
    width: '100%',
    transformOrigin: 1,
    transition: 'all 0.5s ease',
    borderRadius: 10,
  },
  '> span:nth-of-type(1)': {
    transform: showMenu ? 'rotate(45deg)' : 'rotate(0)',
  },
  '> span:nth-of-type(2)': {
    opacity: showMenu ? 0 : 1,
    transition: 'opacity 0.2s ease',
  },
  '> span:nth-of-type(3)': {
    transform: showMenu ? 'rotate(-45deg)' : 'rotate(0)',
  },
  [Breakpoints.Small]: {
    display: 'none',
  },
  '&:hover > span': {
    backgroundColor: 'var(--colors-tag)',
    transition: 'all 0.2s liear',
  },
}));

const NavList = styled('nav')<{ showMenu: boolean }>(({ showMenu }) => ({
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
    transform: showMenu ? 'translateX(100vw)' : 'translateX(0)',
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
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <Container>
      <Inner>
        <Link href="/">
          <a>
            <Cube width="24" height="24" />
          </a>
        </Link>
        <NavList showMenu={showMenu}>
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
            <ToggleModeButton />
          </div>
          {showMenu && <SocialBar />}
        </NavList>
        <MenuToggle
          type="button"
          onClick={() => setShowMenu((prev) => !prev)}
          showMenu={showMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </MenuToggle>
      </Inner>
    </Container>
  );
};

export default Navbar;
