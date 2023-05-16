import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import React from 'react';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <main className='flex h-screen w-full flex-row'>
    <Sidebar />
    <Navbar />
    <section className='flex h-full'>{children}</section>
  </main>
);

export default Layout;
