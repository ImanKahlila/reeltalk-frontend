import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NavBarLanding from './NavBarLanding';
import NavBarApp from './NavBarApp';
import Footer from './Footer';
import MobileMenu from './MobileMenu';

interface ComponentProps {
  children: React.ReactNode;
}

const Layout: React.FC<ComponentProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMobileMenu() {
    setIsOpen(!isOpen);
  }

  const router = useRouter();

  return (
    <>
      {router.pathname === '/' ? (
        <NavBarLanding />
      ) : (
        <NavBarApp isOpen={isOpen} onToggleMobileMenu={toggleMobileMenu} />
      )}
      <MobileMenu isOpen={isOpen} toggleMobileMenu={toggleMobileMenu} />
      <main className='relative'>{children}</main>
      {router.pathname === '/' ? <Footer /> : null}
    </>
  );
};

export default Layout;
