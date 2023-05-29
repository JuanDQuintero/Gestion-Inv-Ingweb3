import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { InventarioContextProvider } from '@context/InventarioContext';
import Head from 'next/head';


const App = ({ Component, pageProps: {session, ...pageProps} }: AppProps) => {
  const client = new ApolloClient({
    uri: '/api/graphql',
    cache: new InMemoryCache(),
  });

  return (<>
          <Head>
                <title>Create Next App</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <InventarioContextProvider>
              <SessionProvider session={session}>
                <ApolloProvider client={client}>
                  <Component {...pageProps} />
                  <ToastContainer />
                </ApolloProvider>
              </SessionProvider>
            </InventarioContextProvider>
  </>
  );
};

export default App;
