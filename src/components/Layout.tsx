import React from 'react';
import Footer from './Footer';
import NavbarHeader from './NavbarHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavbarHeader />
        <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}