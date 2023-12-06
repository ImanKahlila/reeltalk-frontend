import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Util
import { extractDateValues } from './Birthday';
import { isExists, subYears, isAfter, isBefore, isEqual } from 'date-fns';
import toast from 'react-hot-toast';

// Firebase
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  DocumentReference,
  DocumentData,
  getDoc,
} from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
  updateProfile,
  UserCredential,
} from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth();

// Google Analytics
import { logEvent } from 'firebase/analytics';
import { analytics } from '../../../firebase/firebase-config';

export const usePasswordlessSignin = () => {
  const { push } = useRouter();

  useEffect(() => {
    async function passwordlessSignIn() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        try {
          const userCredential = await signInWithEmailLink(auth, email!, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          const additionalInfo = getAdditionalUserInfo(userCredential);

          const userId = userCredential.user.uid;
          const colRef = collection(db, 'users');
          const userDocRef = doc(colRef, userId);

          if (additionalInfo?.isNewUser) {
            handleNewUser(userCredential, userDocRef);
          } else {
            await handleExistingUser(userDocRef);
          }
        } catch (error: any) {
          handleSignInError(error);
        }
      }
    }

    passwordlessSignIn();
    //eslint-disable-next-line
  }, []);

  async function handleNewUser(userCredential: UserCredential, userDocRef: DocumentReference) {
    let displayName = userCredential.user.email?.split('@')[0];

    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
    await setDoc(userDocRef, { displayName: displayName }, { merge: true });

    // Google Analytics
    logEvent(analytics, 'signed_up', {
      method: 'email',
    });
    push('/onboarding/birthday');
  }

  async function handleExistingUser(userDocRef: DocumentReference) {
    logEvent(analytics, 'user_logged_in', { method: 'email' });

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
