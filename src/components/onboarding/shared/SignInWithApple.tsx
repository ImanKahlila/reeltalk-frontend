import React from 'react';
import { useRouter } from 'next/router';

// Firebase Auth and Firestore
import {
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
  UserCredential,
  OAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

import AppleIcon from '../AppleIcon';

// Google Analytics
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../firebase/firebase-config';

// util
import toast from 'react-hot-toast';

// Variables
const auth = getAuth(app);
const db = getFirestore(app);

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
  const { push } = useRouter();

  const appleProvider = new OAuthProvider('apple.com');
  appleProvider.addScope('name');
  appleProvider.addScope('email');

  const signInWithApple = async () => {
    try {
      const userCredential: CustomAppleUserCredential = await signInWithPopup(auth, appleProvider);
      const additionalUserInfo = getAdditionalUserInfo(userCredential);
      const responseToken = userCredential._tokenResponse;

      if (additionalUserInfo?.isNewUser) {
        const colRef = collection(db, 'users');
        const userId = userCredential.user.uid;
        const userDocRef = doc(colRef, userId);

        await updateProfile(userCredential.user, {
          displayName: responseToken?.displayName,
        });

        await setDoc(userDocRef, { displayName: responseToken?.displayName }, { merge: true });

        // Google Analytics
        logEvent(analytics, 'signed_up', {
          method: 'apple',
        });
        push('/onboarding/birthday');
      } else {
        logEvent(analytics, 'user_logged_in', { method: 'apple' }); // Google Analytics
        push('/dashboard');
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
