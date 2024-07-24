import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Spin as Hamburger } from 'hamburger-react';
import { signOut, getAuth, User } from 'firebase/auth';
import app from '@/firebase/firebase-config';

// SHADCN
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { useUserContext } from '@/lib/context';
import ChevronIcon from './ChevronIcon';
import SearchIcon from './SearchIcon';

// Variables
const auth = getAuth(app);

// Component Props
interface ComponentProps {
  onToggleMobileMenu: () => void;
  isOpen: boolean;
}

const NavBarApp = ({ onToggleMobileMenu, isOpen }: ComponentProps) => {
  // UserContext
  const { user } = useUserContext();

  return (
    <nav className='relative z-20 h-14 bg-pure-white'>
      <menu className='mx-auto flex h-full max-w-[1120px] items-center justify-between px-4 py-[5.5px] pr-2'>
        <NavigationLinks />

        {/* Search Input */}
        <form className='hidden h-[34px] w-[351px] items-center gap-[10px] rounded-lg bg-[#00000014] p-[6px] pl-6 lg:flex'>
          <button
            type='submit'
            className='flex h-full cursor-pointer items-center border-none bg-transparent  outline-none'
            aria-label='Search'
          >
            <SearchIcon />
          </button>
          <input
            className='w-full border-none bg-transparent text-base text-secondary'
            type='text'
            placeholder='Search'
          />
        </form>

        {/* Desktop Buttons */}
        {user ? (
          <div className='hidden items-center gap-4 lg:flex'>
            <p className='text-base tracking-[0.08px]'>Watchlist</p>

            {/* SHADCN/UI POPOVER */}
            <AccountDropDown user={user} />
          </div>
        ) : (
          <AuthenticationLinks />
        )}

        {/* Mobile Buttons */}
        <MobileButtons user={user} isOpen={isOpen} onToggleMobileMenu={onToggleMobileMenu} />
      </menu>
    </nav>
  );
};

export default NavBarApp;

// Navigation Links and Reel Talk Logo
const NavigationLinks = () => {
  const router = useRouter();
  return (
    <ul className='flex list-none items-center gap-4'>
      {/* Logo-Link */}
      <Link className='flex gap-1' href={'/'}>
        <Image
          src={'/Layout/logo-reel.png'}
          height={26}
          width={24}
          alt='Reel Talk Logo Reel'
        ></Image>
        <h1 className='hidden text-[17px] font-bold text-secondary md:block'>REEL TALK</h1>
      </Link>
      <li
        className={`hidden text-base  text-secondary lg:block ${
          router.pathname == '/browse' ? 'font-medium' : 'font-normal'
        }`}
      >
        <Link href={'/'}>Browse</Link>
      </li>
      <li
        className={`hidden text-base  text-secondary lg:block ${
          router.pathname == '/community' ? 'font-medium' : 'font-normal'
        }`}
      >
        <Link href={'/community'}>Community</Link>
      </li>
      <li
        className={`hidden text-base  text-secondary lg:block ${
          router.pathname == '/discussions' ? 'font-medium' : 'font-normal'
        }`}
      >
        <Link href={'/discussions'}>Discussions</Link>
      </li>
    </ul>
  );
};

// User Authenticated DropDown to view account details
const AccountDropDown = ({ user }: { user: User }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    // onOpenChange prop API Root Reference https://www.radix-ui.com/primitives/docs/components/popover#api-reference
    <Popover onOpenChange={open => setDropdownOpen(open)}>
      <PopoverTrigger>
        <div className='flex items-center gap-[8px]'>
          <div className='relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray'>
            {user.photoURL ? (
              <Image src={user.photoURL!} fill alt=''></Image>
            ) : (
              <p className='text-xl font-medium tracking-[0.1px] text-pure-white'>
                {user.displayName ? user.displayName![0].toUpperCase() : '?'}
              </p>
            )}
          </div>
          <ChevronIcon
            className={`h-5 w-5 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className='absolute -left-32 top-1 w-[173px] rounded-none bg-pure-white py-8 pl-[35px] pr-0'>
        <menu className='flex w-[138px] flex-col items-end gap-4 px-8'>
          <Link className='tracking-[0.08px] text-secondary' href={`/profile/view`}>
            My profile
          </Link>
          <button
            onClick={async () => {
              await signOut(auth);
              router.push('/onboarding');
            }}
            className='text-base tracking-[0.08px] text-[#e70000] '
          >
            Log out
          </button>
        </menu>
      </PopoverContent>
    </Popover>
  );
};

// Login and Signup Links for when user is not Authenticated
const AuthenticationLinks = () => {
  return (
    <div className='hidden h-[34px] w-[207px] items-center justify-between gap-4 lg:flex'>
      <Link
        className='flex h-full w-fit items-center justify-center rounded px-4 py-1 text-base font-semibold leading-[21.86px] tracking-wider text-secondary'
        href={'/login'}
        aria-label='Login'
      >
        Login
      </Link>
      <Link
        className='flex h-full w-fit items-center justify-center rounded bg-primary px-4 py-1 text-base font-semibold leading-[21.86px] tracking-wider text-secondary'
        href={'/onboarding'}
        aria-label='Sign Up'
      >
        Signup
      </Link>
    </div>
  );
};

// Buttons for Mobile screen size
const MobileButtons = ({ user, onToggleMobileMenu, isOpen }: any) => {
  return (
    <div className='flex items-center lg:hidden'>
      {!user ? (
        <Link
          className=' rounded bg-primary px-4 py-[6px] font-semibold tracking-[0.08px] text-secondary md:left-0'
          href={'/'}
        >
          Get Started
        </Link>
      ) : (
        <p className='text-base tracking-[0.08px]'>Watchlist</p>
      )}
      <button onClick={onToggleMobileMenu} className='lg:hidden'>
        {/* Third-party import */}
        <Hamburger
          size={20}
          color='black'
          rounded
          label='show-menu'
          direction='left'
          distance='lg'
          duration={0.5}
          toggled={isOpen}
        />
      </button>
    </div>
  );
};
