import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Components
import GoogleIcon from '@/components/onboarding/GoogleIcon';
import FacebookIcon from '@/components/onboarding/FacebookIcon';
import AppleIcon from '@/components/onboarding/AppleIcon';

// Firebase Auth and Firestore
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    getAuth,
    signInWithPopup,
    OAuthProvider,
    updateProfile,
    UserCredential,
    getAdditionalUserInfo,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import toast from 'react-hot-toast';

// Variables
const auth = getAuth(app);

const CreateAccountPage = () => {
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
            <div className='mx-auto mt-14 max-w-[277px] text-center text-pure-white md:max-w-[448px]'>
                <h3 className='text-[28px] font-medium leading-normal tracking-[-0.42px] md:text-4xl'>
                    Create your account
                </h3>
                <p className='mt-4 text-sm leading-normal tracking-[0.07px]'>
                    By continuing, you agree to our{' '}
                    <Link className='text-primary' href={'/'}>
                        User Agreement
                    </Link>{' '}
                    and{' '}
                    <Link className='text-primary' href={'/'}>
                        Privacy Policy
                    </Link>
                    .
                </p>

                <div className='mt-10 flex flex-col items-center gap-4 md:mt-14'>
                    <SignInWithApple />
                    <SignInWithGoogle />
                    <SignInWithFacebook />
                    <Link
                        href={'/onboarding/create-email'}
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

//
//
//
//
//
// Extend Apple Response Token in FireBase User Object
interface CustomAppleUserCredential extends UserCredential {
    _tokenResponse?: {
        context: string;
        displayName?: string;
        email: string;
        emailVerified: boolean;
        expiresIn: string;
        federatedId: string;
        firstName?: string;
        idToken: string;
        isNewUser?: boolean;
        kind: string;
        lastName?: string;
        localId: string;
        oauthAccessToken: string;
        oauthExpireIn: number;
        oauthIdToken: string;
        pendingToken: string;
        providerId: string;
        rawUserInfo: string;
        refreshToken: string;
    };
}

export const SignInWithApple = () => {
    const router = useRouter();

    const appleProvider = new OAuthProvider('apple.com');
    appleProvider.addScope('name');
    appleProvider.addScope('email');

    const signInWithApple = async () => {
        try {
            const userCredential: CustomAppleUserCredential =
                await signInWithPopup(auth, appleProvider);
            const userId = userCredential.user.uid;

            const additionalUserInfo = getAdditionalUserInfo(userCredential);
            console.log(additionalUserInfo);

            // TODO: Will be sending this to backend apple response token
            const responseToken = userCredential._tokenResponse;

            console.log(additionalUserInfo?.isNewUser);

            // TODO: When user doesn't share email with app, onboarding flow gets messed up here
            const db = getFirestore(app);
            const colRef = collection(db, 'users');
            const userDocRef = doc(colRef, userId);

            if (additionalUserInfo?.isNewUser) {
                await updateProfile(userCredential.user, {
                    displayName: responseToken?.displayName,
                });
                await setDoc(
                    userDocRef,
                    { displayName: responseToken?.displayName },
                    { merge: true },
                );
                router.push('/onboarding/birthday');
            } else {
                router.push('/dashboard');
            }
        } catch (error: any) {
            let errorCode = error.code;
            if (errorCode == 'auth/popup-closed-by-user') {
                toast.error('Popup was closed by user', {
                    position: 'bottom-right',
                    ariaProps: { role: 'status', 'aria-live': 'polite' },
                });
            } else {
                toast.error(error.message);
            }
        }
    };
    return (
        <button
            onClick={signInWithApple}
            className='flex h-12 w-64 items-center justify-center gap-[10px] rounded-lg border-2 border-solid border-high-emphasis'
        >
            <AppleIcon />
            Continue with Apple
        </button>
    );
};

// Google Button
export const SignInWithGoogle = () => {
    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const additionalUserInfo = getAdditionalUserInfo(userCredential);

            if (additionalUserInfo?.isNewUser) {
                const db = getFirestore(app);
                const colRef = collection(db, 'users');
                const userId = userCredential.user.uid;
                const userDocRef = doc(colRef, userId);

                await setDoc(
                    userDocRef,
                    { displayName: userCredential.user.displayName },
                    { merge: true },
                );
                router.push('/onboarding/birthday');
            } else {
                router.push('/dashboard');
            }
        } catch (error: any) {
            let errorCode = error.code;
            if (errorCode == 'auth/popup-closed-by-user') {
                toast.error('Popup was closed by user', {
                    position: 'bottom-right',
                    ariaProps: { role: 'status', 'aria-live': 'polite' },
                });
            } else {
                toast.error(error.message);
            }
        }
    };

    return (
        <button
            onClick={signInWithGoogle}
            className='flex h-12 w-64 items-center justify-center gap-[10px] rounded-lg border-2 border-solid border-high-emphasis'
        >
            <GoogleIcon />
            Continue with Google
        </button>
    );
};

// Facebook Button
export const SignInWithFacebook = () => {
    const router = useRouter();
    const provider = new FacebookAuthProvider();

    async function signInWithFacebook() {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const additionalUserInfo = getAdditionalUserInfo(userCredential);

            if (additionalUserInfo?.isNewUser) {
                const db = getFirestore(app);
                const colRef = collection(db, 'users');
                const userId = userCredential.user.uid;
                const userDocRef = doc(colRef, userId);

                await setDoc(
                    userDocRef,
                    { displayName: userCredential.user.displayName },
                    { merge: true },
                );
                router.push('/onboarding/birthday');
            } else {
                router.push('/dashboard');
            }
        } catch (error: any) {
            let errorCode = error.code;
            if (errorCode == 'auth/popup-closed-by-user') {
                toast.error('Popup was closed by user', {
                    position: 'bottom-right',
                    ariaProps: { role: 'status', 'aria-live': 'polite' },
                });
            } else {
                toast.error(error.message);
            }
        }
    }
    return (
        <button
            onClick={signInWithFacebook}
            className='flex h-12 w-64 items-center justify-center gap-[10px] rounded-lg border-2 border-solid border-high-emphasis'
        >
            <FacebookIcon />
            Continue with Facebook
        </button>
    );
};
