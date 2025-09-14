import React from 'react';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Add Header/Navbar if needed */}
      <main className="flex-grow">{children}</main>
      {/* Add Footer */}
      <Footer />
    </div>
  );
}