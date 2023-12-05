import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import { SignInWithFacebook } from '@/components/onboarding/shared/SignInWithFacebook';
import { SignInWithApple } from '@/components/onboarding/shared/SignInWithApple';
import { SignInWithGoogle } from '@/components/onboarding/shared/SignInWithGoogle';

const CreateAccountPage = () => {
  return (
    <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-1.png' />
        <Image src={'/Onboarding/desktop-progress-1.png'} fill alt='progress'></Image>
      </picture>

      <div className='mx-auto mt-14 max-w-[277px] text-center text-pure-white md:max-w-[448px]'>
        <h3 className='text-[28px] font-medium leading-normal tracking-[-0.42px] md:text-4xl'>
          Create your account
        </h3>
        <p className='mt-4 text-sm leading-normal tracking-[0.07px]'>
          By continuing, you agree to our{' '}
          <Link className='text-primary' href={'/legal/terms'}>
            User Agreement
          </Link>{' '}
          and{' '}
          <Link className='text-primary' href={'/legal/privacy'}>
            Privacy Policy
          </Link>
          .
        </p>

        <div className='mt-10 flex flex-col items-center gap-4 md:mt-14'>
          <SignInWithApple />
          <SignInWithGoogle />
          <SignInWithFacebook />
          <Link
            href={'/onboarding/email-link'}
            className='mt-[22px] flex h-12 w-64 items-center justify-center rounded-lg border-2 border-solid border-high-emphasis'
          >
            Continue with Email
          </Link>
        </div>

        <p className='mt-10 text-sm leading-normal tracking-[0.07px] md:mt-14'>
          Already have an account?{' '}
          <Link className='text-primary' href={'/login'}>
            Log in
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default CreateAccountPage;
