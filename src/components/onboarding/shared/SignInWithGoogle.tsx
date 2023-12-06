import React from 'react';
import { useRouter } from 'next/router';

// Firebase Auth and Firestore
import { GoogleAuthProvider, getAuth, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { getFirestore, collection, doc } from 'firebase/firestore';
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

      if (additionalUserInfo?.isNewUser) {
        await handleNewUser(userCredential, userDocRef, push, 'google');
      } else {
        await handleExistingUser(userDocRef, push, 'google');
      }
    } catch (error: any) {
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
