import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut, getAuth } from 'firebase/auth';
import app from '@/firebase/firebase-config';

const auth = getAuth(app);

interface ComponentProps {
  isOpen: boolean;
  toggleMobileMenu: () => void;
}
const MobileMenu = ({ isOpen, toggleMobileMenu }: ComponentProps) => {
  const router = useRouter();
  return (
    <nav
      className={`absolute ${
        isOpen ? 'top-14' : '-top-96'
      } left-1/2 z-10 h-fit w-full -translate-x-1/2 transform bg-pure-white pb-8  pl-8 pt-3 transition-all duration-500 ease-in-out lg:hidden`}
    >
      <ul className='flex flex-col gap-4'>
        <li>
          <Link
            className='text-base font-normal tracking-wide'
            href={'/'}
            onClick={toggleMobileMenu}
          >
            Browse
          </Link>
        </li>
        <li>
          <Link
            className='text-base font-normal tracking-wide'
            href={'/community'}
            onClick={toggleMobileMenu}
          >
            Community
          </Link>
        </li>
        <li>
          <Link
            className='text-base font-normal tracking-wide'
            href={'/'}
            onClick={toggleMobileMenu}
          >
            Discussions
          </Link>
        </li>
        <li className='text-base font-normal text-secondary'>
          <button
            onClick={() => {
              signOut(auth);
              router.push('/onboarding');
            }}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
