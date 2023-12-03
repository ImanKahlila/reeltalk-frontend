import { useEffect } from 'react';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';

// Firebase
import { getFirestore, setDoc, doc, collection } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
  updateProfile,
} from 'firebase/auth';

// Google Analytics
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../firebase/firebase-config';

export const usePasswordlessSignin = () => {
  const { push } = useRouter();

  useEffect(() => {
    async function passwordlessSignIn() {
      const auth = getAuth();
      let email = window.localStorage.getItem('emailForSignIn');

      if (isSignInWithEmailLink(auth, window.location.href)) {
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        try {
          const credential = await signInWithEmailLink(auth, email!, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          const additionalInfo = getAdditionalUserInfo(credential);

          if (!additionalInfo?.isNewUser) {
            logEvent(analytics, 'user_logged_in', {
              method: 'email',
            }); // Google Analytics
            push('/dashboard');
          } else {
            const userId = credential.user.uid;
            const db = getFirestore(app);
            const colRef = collection(db, 'users');
            const userDocRef = doc(colRef, userId);
            let displayName = credential.user.email?.split('@')[0];

            await updateProfile(credential.user, {
              displayName: displayName,
            });
            await setDoc(userDocRef, { displayName: displayName }, { merge: true });

            // Google Analytics
            logEvent(analytics, 'signed_up', {
              method: 'email',
            });
            push('/onboarding/birthday');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    }

    passwordlessSignIn();
    //eslint-disable-next-line
  }, []);
};
