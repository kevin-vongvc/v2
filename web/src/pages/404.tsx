import styled from '@emotion/styled/macro';
import Link from 'next/link';
import Layout from '@components/Layout';
import { DefaultSeo } from '@components/seo/DefaultSeo';
import siteConfig from '../siteSettings';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const ButtonLink = styled('a')({
  background: 'var(--colors-primary)',
  padding: '10px 15px',
  cursor: 'pointer',
  borderRadius: 5,
  margin: '15px auto',
  color: '#fff',
});

export default function NotFound() {
  return (
    <Layout>
      <DefaultSeo title={`Page not found - ${siteConfig.title}`} />
      <Container>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <ButtonLink>Go back to home</ButtonLink>
        </Link>
      </Container>
    </Layout>
  );
}
