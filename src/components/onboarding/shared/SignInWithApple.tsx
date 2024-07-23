import React from 'react';
import { useRouter } from 'next/router';

import { handleNewUser, handleExistingUser, handleSignInError } from '@/lib/auth-helpers';

// Firebase Auth and Firestore
import {
    getAuth,
    signInWithPopup,
    getAdditionalUserInfo,
    UserCredential,
    OAuthProvider,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

import AppleIcon from '../AppleIcon';

// Variables
const auth = getAuth(app);
const db = getFirestore(app);

// Extend Apple Response Token in FireBase User Object
export interface CustomAppleUserCredential extends UserCredential {
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
    const { push } = useRouter();

    const appleProvider = new OAuthProvider('apple.com');
    appleProvider.addScope('name');
    appleProvider.addScope('email');

    const signInWithApple = async () => {
        try {
            const userCredential: CustomAppleUserCredential = await signInWithPopup(auth, appleProvider);
            const additionalUserInfo = getAdditionalUserInfo(userCredential);
            const responseToken = userCredential._tokenResponse;

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
                await handleNewUser(userCredential, userDocRef, push, 'apple', responseToken);
                await setDoc(userDocRef, userInfo);
            } else {
                await handleExistingUser(userDocRef, push, 'apple');
                await updateDoc(userDocRef, userInfo);
            }
        } catch (error: any) {
            handleSignInError(error);
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
