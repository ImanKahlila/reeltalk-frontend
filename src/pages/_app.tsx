import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';

import { UserContextProvider } from '@/lib/context';

import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </UserContextProvider>
    </>
  );
}
