import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Buttons from '@/components/onboarding/Buttons';
import GreenCheckIcon from '@/components/onboarding/GreenCheckIcon';
import Carousel from '@/components/onboarding/Carousel';
import toast from 'react-hot-toast';

import { useRouter } from 'next/router';
import { useUserContext } from '@/lib/context';

import {
    getFirestore,
    setDoc,
    doc,
    Timestamp,
    collection,
} from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { useAuthRequired } from '@/hooks/routeProtection';
import {
    getAuth,
    isSignInWithEmailLink,
    signInWithEmailLink,
    getAdditionalUserInfo,
    updateProfile,
} from 'firebase/auth';
const db = getFirestore(app);

// Memoize Carousel to prevent uneccessary re-renders when input change handler causes page to rerender
const MemoizedCarousel = React.memo(Carousel);

const BirthdayPage = () => {
    const router = useRouter();

    // Magic Link passwordless Sign In Check
    useEffect(() => {
        async function passwordlessSignIn() {
            const auth = getAuth();
            let email = window.localStorage.getItem('emailForSignIn');

            if (isSignInWithEmailLink(auth, window.location.href)) {
                if (!email) {
                    email = window.prompt(
                        'Please provide your email for confirmation',
                    );
                }

                try {
                    const credential = await signInWithEmailLink(
                        auth,
                        email!,
                        window.location.href,
                    );
                    window.localStorage.removeItem('emailForSignIn');
                    const additionalInfo = getAdditionalUserInfo(credential);
                    if (!additionalInfo?.isNewUser) {
                        router.push('/dashboard');
                    } else {
                        const userId = credential.user.uid;
                        const db = getFirestore(app);
                        const colRef = collection(db, 'users');
                        const userDocRef = doc(colRef, userId);
                        let displayName = credential.user.email?.split('@')[0];

                        await updateProfile(credential.user, {
                            displayName: displayName,
                        });
                        await setDoc(
                            userDocRef,
                            { displayName: displayName },
                            { merge: true },
                        );
                        router.push('/onboarding/birthday');
                    }
                } catch (error: any) {
                    toast.error(error.message);
                }
            }
        }

        passwordlessSignIn();
        //eslint-disable-next-line
    }, []);

    useAuthRequired();

    // User Context
    const { user } = useUserContext();

    const [inputValue, setInputValue] = useState('');
    const [birthdayValid, setBirthdayValid] = useState(false);
    const birthdayRef = useRef<HTMLInputElement | null>(null);

    function birthdayChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;

        // Check if the length of the current value is smaller than the previous value: Handles backspace
        if (value.length < inputValue.length) {
            // Handle backspace by reseting the input
            setInputValue('');
            setBirthdayValid(false);
            return;
        }

        // Automatically format the input
        const formattedDate = formatBirthday(value);

        setInputValue(formattedDate);

        // Validate Input
        const birthday = formattedDate;
        const birthdayRegex =
            /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/;

        if (birthdayRegex.test(birthday)) {
            setBirthdayValid(true);
        } else {
            setBirthdayValid(false);
        }
    }

    function pageSubmitHandler() {
        if (user) {
            const birthday = new Date(inputValue);
            const docRef = doc(db, 'users', user!.uid);
            setDoc(
                docRef,
                {
                    birthday: Timestamp.fromDate(birthday),
                },
                { merge: true },
            )
                .then(() => {
                    router.push('/onboarding/top-genres');
                })
                .catch(error => console.log(error));
        }
    }

    if (!user) return;

    return (
        <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
            {/* Progress Image Container */}
            <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
                <source
                    media='(max-width: 767px)'
                    srcSet='/Onboarding/mobile-progress-2.png'
                />
                <Image
                    src={'/Onboarding/desktop-progress-2.png'}
                    fill
                    alt='progress'
                ></Image>
            </picture>

            {/* Main */}
            <div className=' mx-auto mt-14 max-w-[343px] md:max-w-[572px]'>
                <form className='w-full text-center text-high-emphasis'>
                    <h1 className='text-[28px] font-medium tracking-[-0.42px] '>
                        Welcome{' '}
                        {user?.displayName
                            ? user.displayName.charAt(0).toUpperCase() +
                              user.displayName.slice(1)
                            : 'User'}
                        {/* Code above is capitalizing the username string */}
                        !
                        <br className='hidden md:block' /> Mind sharing your
                        birthdate?
                    </h1>
                    <p className='mx-auto mt-[10px] text-base leading-[21.86px] tracking-[0.08px] md:max-w-[504px]'>
                        To personalize your content recommendations and to
                        ensure it&apos;s all age-appropriate, could you kindly
                        share your date of birth with us?
                    </p>
                    <div
                        className={`mx-auto mt-8 flex max-w-[320px] items-center justify-between gap-[10px] rounded-lg border border-solid bg-first-surface pl-6 pr-3 transition-all duration-500  ${
                            birthdayValid
                                ? 'border-primary'
                                : 'border-medium-emphasis'
                        }`}
                    >
                        <label htmlFor='birthdate' className='sr-only'>
                            Your Birthdate:
                        </label>
                        <input
                            className={`w-full bg-transparent py-[13px] text-base placeholder-gray outline-none`}
                            id='birthdate'
                            type='text'
                            value={inputValue}
                            placeholder='MM/DD/YYYY'
                            ref={birthdayRef}
                            onChange={birthdayChangeHandler}
                            inputMode='numeric'
                        />
                        <div>
                            <GreenCheckIcon
                                className={`opacity-0 transition-opacity duration-500 ${
                                    birthdayValid ? 'opacity-100' : ''
                                }`}
                            />
                        </div>
                    </div>
                </form>

                <div className='mx-auto mt-10 flex max-w-[536px] flex-col gap-3 rounded-lg bg-first-surface p-6 pb-[30px]'>
                    <h2 className='mb-4 text-center font-semibold text-high-emphasis'>
                        We love our birthday movies 🎉
                    </h2>
                    <MemoizedCarousel />
                </div>
            </div>

            <Buttons
                valid={birthdayValid}
                prevPage='/onboarding'
                onPageSubmit={pageSubmitHandler}
                required
            />
        </section>
    );
};

export default BirthdayPage;

// Helper FN
function formatBirthday(input: string) {
    // Format the date as MM/DD/YYYY
    const sanitizedInput = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (sanitizedInput.length >= 2 && sanitizedInput.length < 4) {
        return sanitizedInput.slice(0, 2) + '/' + sanitizedInput.slice(2);
    } else if (sanitizedInput.length >= 4) {
        return (
            sanitizedInput.slice(0, 2) +
            '/' +
            sanitizedInput.slice(2, 4) +
            '/' +
            sanitizedInput.slice(4, 8)
        );
    }
    return sanitizedInput;
}
