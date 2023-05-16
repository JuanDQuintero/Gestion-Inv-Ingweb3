import Layout from '@layouts/Layout';
import Head from 'next/head';
import { data } from 'utils/data';
import _ from 'lodash';
import { NextPage } from 'next';
import { useState } from 'react';
import { MdFilterAlt, MdFilterAltOff } from 'react-icons/md';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Create Next App</title>
      <meta name='description' content='Generated by create next app' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Layout>
        <RecogidasDespachos />
    </Layout>
  </>
);

const RecogidasDespachos = () => {
  return (
    <div className='flex h-full w-full flex-col gap-2'>
      
    </div>
  );
};

const DesktopTable = () => {
  const datos = _.groupBy(data, 'Fecha');

  return (
    <div className='hidden h-full flex-col md:flex'>
      
    </div>
  );
};

const MobileCards = () => (
  <div className='grid h-full grid-cols-2 items-center justify-items-center gap-2 sm:grid-cols-4 md:hidden'>
    
  </div>
);

export default Home;