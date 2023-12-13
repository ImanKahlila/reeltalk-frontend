import Head from 'next/head';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';

import { UserContextProvider } from '@/lib/context';

import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicons/favicon.ico' />
        <title>Reel Talk</title>
        <meta name='theme-color' content='#000000' />
        <meta name='description' content='' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <meta property='og:image' content='/favicons/Primary-favicon.png' />
        <meta property='og:title' content='Reel Talk' />
        <meta property='og:site_name' content='Reel Talk' />
        <meta property='og:url' content='https://reeltalk.us' />
        <meta property='og:description' content='' />
        <link rel='canonical' href='https://reeltalk.us' />
        <link rel='manifest' href='/favicons/site.webmanifest' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16' />
        <link rel='icon' type='image/png' sizes='24x24' href='/favicons/favicon-32x32' />
      </Head>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </UserContextProvider>
    </>
  );
}
