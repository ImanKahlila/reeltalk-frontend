import '@/styles/globals.css';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '@/lib/context';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' href='/favicons/favicon.ico' />
        <title>Reel Talk</title>
        <meta name='theme-color' content='#000000' />
        <meta
          name='description'
          content='The ultimate community for movie and TV show enthusiasts! Connect with fellow cinephiles and TV buffs to discuss your favorite films, scenes, episodes, and more. Check out movie and TV show reviews and ratings, top lists, and communities, and manage your watchlist with Reel Talk. Fancy yourself a true movie or tv show buff, then this app is for you.'
        />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <meta property='og:image' content='/favicons/Primary-favicon.png' />
        <meta property='og:title' content='Reel Talk' />
        <meta property='og:site_name' content='Reel Talk' />
        <meta property='og:url' content='https://reeltalk.us' />
        <meta
          property='og:description'
          content='The ultimate community for movie and TV show enthusiasts! Connect with fellow cinephiles and TV buffs to discuss your favorite films, scenes, episodes, and more. Check out movie and TV show reviews and ratings, top lists, and communities, and manage your watchlist with Reel Talk. Fancy yourself a true movie or tv show buff, then this app is for you.'
        />
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
