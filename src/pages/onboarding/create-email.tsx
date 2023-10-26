import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// Firebase Auth and Firestore
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from 'firebase/auth';
import { collection, getFirestore, setDoc, doc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

// Components
import Buttons from '@/components/onboarding/Buttons';
import GreenCheckIcon from '@/components/onboarding/GreenCheckIcon';
import EyeIcon from '@/components/onboarding/EyeIcon';
import EyeSlashIcon from '@/components/onboarding/EyeSlashIcon';
import { useRedirectIfAuthenticated } from '@/hooks/routeProtection';

const CreateWithEmail = () => {
    useRedirectIfAuthenticated();
    const auth = getAuth();
    const router = useRouter();

    // Input Validation
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Refs
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    // Submit Button Enabled
    const inputsValid = nameValid && emailValid && passwordValid;

    // Handler Functions
    function nameChangeHandler() {
        const name = nameRef.current!.value.trim();

        if (name.length > 1 && name.length < 50) {
            setNameValid(true);
        } else {
            setNameValid(false);
        }
    }

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

    function createUserHandler() {
        const name = nameRef.current!.value;
        const email = emailRef.current!.value;
        const password = passwordRef.current!.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(cred => {
                const db = getFirestore(app);
                const colRef = collection(db, 'users');
                const user = cred.user;
                const userDocRef = doc(colRef, user.uid);

                updateProfile(user, { displayName: name });

                // Create user id doc under users collection, set DisplayName in userDocs
                setDoc(userDocRef, { displayName: name }); //TODO: Batch write the display name and the photoURL
                router.push({
                    pathname: '/onboarding/birthday',
                    query: { displayName: name },
                });
            })
            .catch(error => {
                let errorCode = error.code;
                if (errorCode == 'auth/email-already-in-use') {
                    toast.error('Email already in use');
                } else if (errorCode == 'auth/invalid-email') {
                    toast.error('Invalid Email');
                }
            });
    }

    return (
        <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
            {/* Progress Image Container */}
            <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
                <source
                    media='(max-width: 767px)'
                    srcSet='/Onboarding/mobile-progress-1.png'
                />
                <Image
                    src={'/Onboarding/desktop-progress-1.png'}
                    fill
                    alt='progress'
                ></Image>
            </picture>

            {/* Main */}
            <div className='mx-auto mt-14 max-w-[320px] text-center text-pure-white md:max-w-[448px]'>
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

                <form className='mx-auto mt-[40px] flex max-w-xs flex-col gap-6'>
                    <input
                        className={`rounded-lg border border-solid ${
                            nameValid
                                ? 'border-primary'
                                : 'border-medium-emphasis'
                        } bg-first-surface py-[13px] pl-6 pr-3 text-base placeholder-gray outline-none`}
                        type='text'
                        placeholder='Full name'
                        ref={nameRef}
                        onChange={nameChangeHandler}
                        minLength={2}
                        maxLength={50}
                    />

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

                <p className='mt-10 text-sm leading-normal tracking-[0.07px] md:mt-14'>
                    Already have an account?{' '}
                    <Link className='text-primary' href={'/login'}>
                        Log in
                    </Link>
                    .
                </p>
            </div>
            <Buttons
                valid={inputsValid}
                prevPage='/onboarding'
                onPageSubmit={createUserHandler}
            />
        </section>
    );
};

export default CreateWithEmail;
