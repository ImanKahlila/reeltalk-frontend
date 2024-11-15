import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppStoreSVG from '@/components/LandingPage/AppStoreSVG';
import GooglePlaySVG from '@/components/LandingPage/GooglePlaySVG';

const HeroSection = () => {
  return (
    <section className='h-fit bg-secondary px-4'>
      {/* HERO CONTAINER */}
      <div className='mx-auto flex max-w-[960px] flex-col pb-[120px] pt-[63px] md:flex-row md:pb-0 lg:flex-row lg:gap-[218px] lg:px-0'>
        {/* Left Side */}
        <div className='mr-auto flex max-w-sm flex-col justify-end lg:max-w-lg'>
          <header className='max-w-prose text-left text-pure-white md:mt-5 lg:text-left '>
            <h1
              data-aos='fade-down'
              data-aos-duration='500'
              data-aos-delay='400'
              className='text-[28px] font-semibold leading-[38.25px] tracking-wider md:text-4xl'
            >
              Elevate your film experience with reel conversations.
            </h1>
            <p
              data-aos='fade-down'
              data-aos-duration='500'
              data-aos-delay='300'
              className='mt-[10px] text-[17px] font-normal'
            >
              Discover, delve into your community, and discuss your favorite movies and TV shows.
            </p>
          </header>

          {/* App Redirects on Mobile */}
          <div
            data-aos='zoom-in-up'
            data-aos-duration='500'
            data-aos-delay='100'
            className='mt-14 flex w-fit flex-col gap-4 lg:hidden'
          >
            <Link href={'/'}>
              <AppStoreSVG height={48} width={158} />
            </Link>
            <Link href={'/'}>
              <GooglePlaySVG height={48} width={158} />
            </Link>
          </div>

          {/* APP REDIRECTS DESKTOP */}
          <div
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-delay='200'
            className='mt-4 hidden h-fit flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12 lg:flex lg:justify-start'
          >
            {/* APP STORES */}
            <div className='flex flex-col gap-4'>
              <Link href={'/'}>
                <AppStoreSVG height={60} width={192} />
              </Link>
              <Link href={'/'}>
                <GooglePlaySVG height={59} width={192} />
              </Link>
            </div>

            {/* Line Break */}
            <div className='h-[1px] w-[110px] bg-[#6d6d6d] sm:h-[110px] sm:w-[1px]'></div>

            {/* QR Code */}
            <div className='flex flex-col items-center gap-1'>
              <Image src={'/LandingPage/qr-code.png'} width={96} height={96} alt='qr-code'></Image>
              <p className='text-xl font-medium text-pure-white'>Scan me</p>
            </div>
          </div>
          <Link
            data-aos='fade-up'
            data-aos-duration='500'
            data-aos-delay='100'
            className='mt-[70px] hidden h-[34px] w-[112px] items-center justify-center rounded-[4px] bg-pure-white py-[6px] font-medium tracking-eight text-secondary md:flex'
            href={'/onboarding'}
          >
            Sign Up
          </Link>
        </div>

        {/* Right Side Phone Placeholder Image */}
        <picture
          data-aos='fade-down'
          data-aos-duration='800'
          data-aos-delay='100'
          className='relative hidden aspect-[512/1035] w-[34.5%] md:block md:max-w-[242.433px]'
        >
          <Image className='' src={'/LandingPage/Hero-Image.png'} alt='placeholder' fill></Image>
        </picture>
      </div>

      {/* Learn More */}
      <div
        onClick={() => {
          const section = document.getElementById('value-section');
          section?.scrollIntoView({ behavior: 'smooth' });
        }}
        className=' hidden flex-col items-center pb-6 md:block lg:mt-0 lg:flex'
      >
        <a className='flex cursor-pointer flex-col items-center gap-1 text-xl  text-pure-white'>
          learn more
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            className='animate-bounce'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z'
              fill='white'
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
