import React from 'react';
import { useRouter } from 'next/router';

// Firebase Auth and Firestore
import { GoogleAuthProvider, getAuth, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

import { handleNewUser, handleSignInError, handleExistingUser } from '@/lib/auth-helpers';

import GoogleIcon from '@/components/onboarding/GoogleIcon';

// util

// Variables
const auth = getAuth(app);
const db = getFirestore(app);

export const SignInWithGoogle = () => {
    const { push } = useRouter();
    const googleProvider = new GoogleAuthProvider();

    async function signInWithGoogle() {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            const additionalUserInfo = getAdditionalUserInfo(userCredential);

            const colRef = collection(db, 'users');
            const userId = userCredential.user.uid;
            const userDocRef = doc(colRef, userId);

            let userInfo = {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                imageUrl: "",
                
            };

            if (additionalUserInfo?.profile) {
                userInfo = { ...additionalUserInfo.profile, ...userInfo }
                if (additionalUserInfo.profile?.picture) {
                    userInfo.imageUrl = `${additionalUserInfo.profile.picture}`;
                    delete (userInfo as any).picture;
                }
            }
            if (additionalUserInfo?.isNewUser) {
                await handleNewUser(userCredential, userDocRef, push, 'google');
                await setDoc(userDocRef, userInfo);
            } else {
                await handleExistingUser(userDocRef, push, 'google');
                await updateDoc(userDocRef, userInfo);
            }
        } catch (error) {
            handleSignInError(error);
        }
    }


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
