import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';

const Navbar = dynamic(() => import('@components/navigations/Navbar'));
const Footer = dynamic(() => import('@components/Footer'));

const Container = styled('div')({
  position: 'relative',
});

export const ContentWrapper = styled('div')({
  maxWidth: 1000,
  margin: '0 auto',
  paddingBottom: '2.5rem',
});

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Navbar />
      <ContentWrapper>
        <main>{children}</main>
      </ContentWrapper>
      <Footer />
    </Container>
  );
};

export default Layout;
