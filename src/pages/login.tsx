import React from 'react';
import Link from 'next/link';

// SignInButtons
import { SignInWithApple } from './onboarding';
import { SignInWithGoogle } from './onboarding';
import { SignInWithFacebook } from './onboarding';

const LoginPage = () => {
    return (
        <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
            {/* Main */}
            <div className='mx-auto max-w-[277px] text-center text-pure-white md:max-w-[448px]'>
                <h3 className='text-[28px] font-medium leading-normal tracking-[-0.42px] md:text-4xl'>
                    Log in
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
                        href={'/onboarding/magic-link'}
                        className='mt-[22px] flex h-12 w-64 items-center justify-center rounded-lg border-2 border-solid border-high-emphasis'
                    >
                        Continue with Email
                    </Link>
                </div>

                <p className='mt-10 text-sm leading-normal tracking-[0.07px] md:mt-14'>
                    Don&apos;t have an account?{' '}
                    <Link className='text-primary' href={'/onboarding'}>
                        Sign up
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
};

export default LoginPage;
