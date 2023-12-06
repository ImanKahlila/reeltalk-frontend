import React from 'react';
import { useRouter } from 'next/router';

// Firebase Auth and Firestore
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import app from '@/firebase/firebase-config';

import GoogleIcon from '@/components/onboarding/GoogleIcon';

// Google Analytics
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../firebase/firebase-config';

// util
import toast from 'react-hot-toast';

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

      if (additionalUserInfo?.isNewUser) {
        await handleNewUser(userCredential, userDocRef);
      } else {
        await handleExistingUser(userDocRef);
      }
    } catch (error: any) {
      handleSignInError(error);
    }
  }

  async function handleNewUser(userCredential: UserCredential, userDocRef: DocumentReference) {
    await setDoc(userDocRef, { displayName: userCredential.user.displayName }, { merge: true });

    logEvent(analytics, 'signed_up', {
      method: 'google',
    });

    push('/onboarding/birthday');
  }

  async function handleExistingUser(userDocRef: DocumentReference) {
    logEvent(analytics, 'user_logged_in', { method: 'google' });

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
      onClick={signInWithGoogle}
      className='flex h-12 w-64 items-center justify-center gap-[10px] rounded-lg border-2 border-solid border-high-emphasis'
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
};
