import React from 'react';
import Footer from './Footer';
import NavbarHeader from './NavbarHeader';
import Image from 'next/image';
import whatsapp from '../../public/whatsapp.png';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <a href="https://wa.me/51942194996" rel='noopener' target='_blank'>      
        <Image 
          src={whatsapp}
          alt='ícone whatsapp'
          className='fixed bottom-5 right-5 md:right-10 w-15 md:w-15 z-10'
        />
      </a>

      <NavbarHeader />
        <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}