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
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  DocumentReference,
  getDoc,
  DocumentData,
} from 'firebase/firestore';
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

      const colRef = collection(db, 'users');
      const userId = userCredential.user.uid;
      const userDocRef = doc(colRef, userId);

      if (additionalUserInfo?.isNewUser) {
        await handleNewUser(userCredential, userDocRef, responseToken);
      } else {
        await handleExistingUser(userDocRef);
      }
    } catch (error: any) {
      handleSignInError(error);
    }
  };

  async function handleNewUser(
    userCredential: UserCredential,
    userDocRef: DocumentReference,
    responseToken: CustomAppleUserCredential['_tokenResponse'],
  ) {
    await updateProfile(userCredential.user, {
      displayName: responseToken?.displayName,
    });

    await setDoc(userDocRef, { displayName: responseToken?.displayName }, { merge: true });

    logEvent(analytics, 'signed_up', {
      method: 'apple',
    });

    push('/onboarding/birthday');
  }

  async function handleExistingUser(userDocRef: DocumentReference) {
    logEvent(analytics, 'user_logged_in', { method: 'apple' });

    const userData = (await getDoc(userDocRef)).data();
    if (!userData) {
      push('/login');
      return;
    }

    verifyOnboardingComplete(userData);
  }

  function handleSignInError(error: any) {
    if (error.code === 'auth/popup-closed-by-user') {
      toast.error('Popup was closed by user', {
        position: 'bottom-right',
        ariaProps: { role: 'status', 'aria-live': 'polite' },
      });
    } else {
      toast.error(error.message);
    }
  }

  function verifyOnboardingComplete(userData: DocumentData) {
    // Redirect to unfinished onboarding step as long as the user hasn't agreed to the guideline
    if (!userData['agreedToGuideline']) {
      if (!userData['birthday']) {
        push('/onboarding/birthday');
      } else if (!userData['topGenres']) {
        push('/onboarding/top-genres');
      } else if (!userData['top5Movies']) {
        push('/onboarding/top-movies');
      } else if (!userData['top5Shows']) {
        push('/onboarding/top-shows');
      } else {
        push('/onboarding/guideline-agreement');
      }
    } else {
      push('/community');
    }
  }
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
