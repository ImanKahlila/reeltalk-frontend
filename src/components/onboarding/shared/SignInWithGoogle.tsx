import React from 'react';
import { useRouter } from 'next/router';

// Firebase Auth and Firestore
import { GoogleAuthProvider, getAuth, signInWithPopup, getAdditionalUserInfo } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
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

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const additionalUserInfo = getAdditionalUserInfo(userCredential);

      if (additionalUserInfo?.isNewUser) {
        const colRef = collection(db, 'users');
        const userId = userCredential.user.uid;
        const userDocRef = doc(colRef, userId);

        await setDoc(userDocRef, { displayName: userCredential.user.displayName }, { merge: true });

        // Google Analytics
        logEvent(analytics, 'signed_up', {
          method: 'google',
        });
        push('/onboarding/birthday');
      } else {
        logEvent(analytics, 'user_logged_in', { method: 'google' }); // Google Analytics
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
      onClick={signInWithGoogle}
      className='flex h-12 w-64 items-center justify-center gap-[10px] rounded-lg border-2 border-solid border-high-emphasis'
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
};
