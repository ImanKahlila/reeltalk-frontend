import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Util
import { extractDateValues } from './Birthday';
import { isExists, subYears, isAfter, isBefore, isEqual } from 'date-fns';
import { handleSignInError, handleExistingUser, handleNewUser } from '@/lib/auth-helpers';

// Firebase
import { getFirestore, doc, collection } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { formattedBirthday } from '@/components/profile/shared/UserDetails';

const db = getFirestore(app);
const auth = getAuth();

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
            handleNewUser(userCredential, userDocRef, push, 'email');
          } else {
            await handleExistingUser(userDocRef, push, 'email');
          }
        } catch (error: any) {
          handleSignInError(error);
        }
      }
    }

    passwordlessSignIn();
    //eslint-disable-next-line
  }, []);
};

export const useValidateBirthday = (dob?:string) => {

  let formattedDate = formattedBirthday(dob);
  let [month, day, year] = formattedDate !== 'Invalid Date'
    ? formattedDate.replace(',', '').split(' ')
    : ['', '', ''];
  const [dayValue, setDayValue] = useState(day);
  const [monthValue, setMonthValue] = useState(month);
  const [yearValue, setYearValue] = useState(year);
  const [birthdayValid, setBirthdayValid] = useState<boolean>(false);
  const [isValueModified,setIsValueModified]=useState(false)
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
        setIsValueModified(true)
        break;
      case 'month':
        setMonthValue(value);
        setIsValueModified(true)
        break;
      case 'year':
        setYearValue(value);
        setIsValueModified(true)
        break;
      default:
        break;
    }
  }

  return { birthdayValid, inputChangeHandler, yearValue, monthValue, dayValue,isValueModified };
};
