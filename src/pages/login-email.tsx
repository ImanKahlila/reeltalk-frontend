import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// Firebase Auth and Firestore
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Components
import Buttons from '@/components/onboarding/Buttons';
import GreenCheckIcon from '@/components/onboarding/GreenCheckIcon';
import EyeIcon from '@/components/onboarding/EyeIcon';
import EyeSlashIcon from '@/components/onboarding/EyeSlashIcon';
import { useRedirectIfAuthenticated } from '@/hooks/routeProtection';

const LoginEmailPage = () => {
    useRedirectIfAuthenticated();
    const auth = getAuth();
    const router = useRouter();

    // Input Validation
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Refs
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // Submit Button Enabled
    const inputsValid = emailValid && passwordValid;

    // Handler Functions
    function emailChangeHandler() {
        const email = emailRef.current!.value.toLowerCase().trim();
        const emailRegex =
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

        if (emailRegex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    function passwordChangeHandler() {
        const password = passwordRef.current!.value.trim();

        if (password.length > 6) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    }

    function toggleShowPassword() {
        setShowPassword(prev => !prev);
    }

    async function loginWithEmailAndPassword() {
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (error: any) {
            const errorMessage = error.message;

            toast.error(errorMessage);
        }
    }

    return (
        <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
            {/* Main */}
            <div className='mx-auto max-w-[320px] text-center text-pure-white md:max-w-[448px]'>
                <h3 className='text-[28px] font-medium leading-normal tracking-[-0.42px] md:text-4xl'>
                    Log in with Email
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

                <form className='mx-auto mt-[40px] flex max-w-xs flex-col gap-6'>
                    <div
                        className={`flex items-center justify-between gap-[10px] rounded-lg border border-solid bg-first-surface pl-6 pr-3 transition-all duration-500  ${
                            emailValid
                                ? 'border-primary'
                                : 'border-medium-emphasis'
                        }`}
                    >
                        <input
                            className={`w-full bg-transparent py-[13px] text-base placeholder-gray outline-none`}
                            type='text'
                            placeholder='Email'
                            ref={emailRef}
                            onChange={emailChangeHandler}
                        />
                        <div>
                            <GreenCheckIcon
                                className={`opacity-0 transition-opacity duration-500 ${
                                    emailValid ? 'opacity-100' : ''
                                }`}
                            />
                        </div>
                    </div>
                    <div
                        className={`flex items-center justify-between gap-[10px] rounded-lg border border-solid bg-first-surface pl-6 pr-3  ${
                            passwordValid
                                ? 'border-primary'
                                : 'border-medium-emphasis'
                        }`}
                    >
                        <input
                            className={`w-full bg-transparent py-[13px] text-base placeholder-gray outline-none`}
                            type={`${showPassword ? 'text' : 'password'}`}
                            placeholder='Password'
                            ref={passwordRef}
                            onChange={passwordChangeHandler}
                        />
                        <div>
                            <GreenCheckIcon
                                className={`opacity-0 transition-opacity duration-500 ${
                                    passwordValid ? 'opacity-100' : ''
                                }`}
                            />
                        </div>
                        <button type='button' onClick={toggleShowPassword}>
                            {!showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    </div>
                </form>
                <Link
                    href={'/'}
                    className='mx-auto mt-2 block max-w-xs text-start text-sm tracking-[0.07px] text-primary'
                >
                    Forgot your password?
                </Link>

                <p className='mt-10 text-sm leading-normal tracking-[0.07px] md:mt-14'>
                    Don&apos;t have an account?{' '}
                    <Link className='text-primary' href={'/onboarding'}>
                        Sign up
                    </Link>
                </p>
            </div>
            <Buttons
                valid={inputsValid}
                prevPage='/onboarding'
                onPageSubmit={loginWithEmailAndPassword}
            />
        </section>
    );
};

export default LoginEmailPage;
