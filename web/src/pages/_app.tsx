import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { DefaultSeo } from '@components/seo/DefaultSeo';
import '@styles/globals.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <AnimatePresence>
        <motion.div key={router.route} exit={{ opacity: 0 }}>
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <DefaultSeo />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default MyApp;
