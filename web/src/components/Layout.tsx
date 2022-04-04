import { ReactNode } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled/macro';

const Navbar = dynamic(() => import('@components/navigations/Navbar'));
const Footer = dynamic(() => import('@components/Footer'));

const Container = styled('div')({
  position: 'relative',
});

const ContentWrapper = styled('div')({
  maxWidth: 1000,
  margin: '0 auto',
  paddingBottom: '2.5rem',
});

type Props = {
  children: ReactNode;
  title: string;
};

const Layout = ({ children, ...customMeta }: Props) => {
  const meta = {
    title: 'Chi Vong',
    description: `Fullstack Developer, Software Engineer`,
    type: 'website',
    ...customMeta,
  };

  return (
    <Container>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Chi Vong" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <ContentWrapper>
        <main>{children}</main>
      </ContentWrapper>
      <Footer />
    </Container>
  );
};

export default Layout;
