import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppStoreSVG from '../LandingPage/AppStoreSVG';
import GooglePlaySVG from '../LandingPage/GooglePlaySVG';

const Footer = () => {
  return (
    <footer className='bg-secondary'>
      {/* Container */}
      <div className='mx-auto flex max-w-sm flex-col items-center gap-12 px-4 pb-[65px] pt-10 text-pure-white md:max-w-[960px] md:flex-row-reverse md:justify-between md:py-11'>
        {/* Call To Action */}
        <div className='flex flex-col items-center justify-between gap-7 text-center'>
          <h1 className='text-[22px] font-semibold tracking-wide'>Ready to start?</h1>

          {/* App Store Links */}
          <div className='flex gap-20'>
            <div className='flex flex-col gap-3'>
              <Link href={'/'}>
                <AppStoreSVG height={56.5} width={184} />
              </Link>
              <Link href={'/'}>
                <GooglePlaySVG height={55} width={184} />
              </Link>
            </div>

            {/* QR Code */}
            <div className='hidden flex-col items-center gap-1 md:flex'>
              <Image src={'/LandingPage/qr-code.png'} width={96} height={96} alt='qr-code'></Image>
              <p className='text-xl font-medium text-pure-white'>Scan me</p>
            </div>
          </div>
        </div>

        {/* Site Map */}
        <div className='hidden flex-col gap-24 md:flex'>
          <div className='flex gap-9'>
            <ul className='flex flex-col gap-1 md:gap-3'>
              <h1 className='whitespace-nowrap text-[17px] font-bold'>Who we are</h1>
              <li>
                <Link href={'/'}>About us</Link>
              </li>
            </ul>
            <ul className='flex flex-col gap-1 md:gap-3'>
              <h1 className='whitespace-nowrap text-[17px] font-bold'>Learn more</h1>
              <li>
                <Link href={'/'}>Pricing</Link>
              </li>
            </ul>
            <ul className='flex flex-col gap-1 md:gap-3'>
              <h1 className='whitespace-nowrap text-[17px] font-bold'>Help</h1>
              <li>
                <Link href={'/'}>Support</Link>
              </li>
              <li>
                <Link href={'/'}>Contact us</Link>
              </li>
            </ul>
          </div>

          {/* Logo-Link */}
          <Link className='hidden w-fit gap-1 md:flex' href={'/'}>
            <Image
              src={'/Layout/logo-reel-white.png'}
              height={24}
              width={23}
              alt='Reel Talk Logo Reel'
            ></Image>
            <h1 className='text-[17px] font-bold text-pure-white '>REEL TALK</h1>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
