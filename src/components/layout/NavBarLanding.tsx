import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavBarLanding = () => {
  return (
    <nav className='relative z-20 h-14 bg-white'>
      <menu className='mx-auto my-0 flex h-full max-w-[1120px] items-center justify-between px-[16px] py-[8px]'>
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

        <div className='flex items-center justify-between gap-2'>
          <Link
            href={'/onboarding'}
            className='inline-flex h-[34px] items-center justify-center rounded bg-primary px-4 py-[6px] font-semibold tracking-[0.08px] text-secondary'
          >
            Sign in/Join
          </Link>
          <Link
            href={'/onboarding'}
            className='hidden h-[34px] w-[110px] items-center justify-center rounded border-[3px] border-solid border-black bg-pure-white font-semibold tracking-[0.08px] text-secondary md:inline-flex'
          >
            Download
          </Link>
        </div>
      </menu>
    </nav>
  );
};

export default NavBarLanding;
