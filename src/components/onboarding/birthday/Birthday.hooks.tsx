import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Util
import { extractDateValues } from './Birthday';
import { isExists, subYears, isAfter, isBefore, isEqual } from 'date-fns';
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

export const useValidateBirthday = () => {
  const [dayValue, setDayValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const [yearValue, setYearValue] = useState('');

  const [birthdayValid, setBirthdayValid] = useState<boolean>(false);

  function validateBirthday() {
    const { year, month, day } = extractDateValues(yearValue, monthValue, dayValue);

    // Check if the date exists
    const isValidDate = isExists(year, month, day);

    // Check if the date is within the specified range
    const currentDate = new Date();
    const minDate = subYears(currentDate, 101); // 101 years ago from now
    const maxDate = subYears(currentDate, 13); // 13 years ago from now

    const isAfterMinDate = isAfter(new Date(year, month, day), minDate);
    const isBeforeMaxDate =
      isBefore(new Date(year, month, day), maxDate) || isEqual(new Date(year, month, day), maxDate);

    const isWithinRange = isValidDate && isAfterMinDate && isBeforeMaxDate;

    setBirthdayValid(isWithinRange);
  }

  useEffect(() => {
    validateBirthday();
    //eslint-disable-next-line
  }, [dayValue, monthValue, yearValue]);

  function inputChangeHandler(inputType: string, value: string) {
    switch (inputType) {
      case 'day':
        setDayValue(value);
        break;
      case 'month':
        setMonthValue(value);
        break;
      case 'year':
        setYearValue(value);
        break;
      default:
        break;
    }
  }

  return { birthdayValid, inputChangeHandler, yearValue, monthValue, dayValue };
};
