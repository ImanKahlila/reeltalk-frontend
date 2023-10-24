import React, { useState } from 'react';
import { useRouter } from 'next/router';
import NavBarLanding from './NavBarLanding';
import NavBarApp from './NavBarApp';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { useAuthRequired } from '@/hooks/useAuthRequired';

interface ComponentProps {
    children: React.ReactNode;
}

const Layout: React.FC<ComponentProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMobileMenu() {
        setIsOpen(!isOpen);
    }

    const router = useRouter();
    useAuthRequired();

    return (
        <>
            {router.pathname === '/' ? (
                <NavBarLanding />
            ) : (
                <NavBarApp onToggleMobileMenu={toggleMobileMenu} />
            )}
            <MobileMenu isOpen={isOpen} />
            <main className='relative'>{children}</main>
            {router.pathname === '/' ? <Footer /> : null}
        </>
    );
};

export default Layout;
