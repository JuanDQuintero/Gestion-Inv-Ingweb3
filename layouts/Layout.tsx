import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import React from 'react';
import { NavigationContextProvider } from '@context/NavigationContext';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <main className='flex h-screen md:flex-row flex-col selection:w-full'>
    <NavigationContextProvider>
      <Navbar />
      <Sidebar />
    </NavigationContextProvider>
    <section className='flex h-full w-full'>{children}</section>
  </main>
);

export default Layout;
