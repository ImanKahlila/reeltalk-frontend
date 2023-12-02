import React, { useState, useEffect } from 'react';
import { isExists } from 'date-fns';

// Components
import Buttons from '@/components/onboarding/Buttons';
import Carousel from '@/components/onboarding/Carousel';

// Util
import { useUserContext } from '@/lib/context';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuthRequired } from '@/hooks/routeProtection';
import toast from 'react-hot-toast';

// Firebase
import { getFirestore, setDoc, doc, Timestamp, collection } from 'firebase/firestore';
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
import { analytics } from '../../firebase/firebase-config';
import { BirthdayComboBox } from '@/components/onboarding/BirthdayComboBox';

const db = getFirestore(app);

// Memoize Carousel to prevent uneccessary re-renders when input change handler causes page to rerender
const MemoizedCarousel = React.memo(Carousel);

// Values for Birthday Inputs
import { daysOfMonth, monthsOfYear } from '@/lib/inputsData';
export type Keys = { value: string; label: string }[];
const years: Keys = [];
for (let year = 2023; year >= 1923; year--) {
  years.push({ value: year.toString(), label: year.toString() });
}

const BirthdayPage = () => {
  const router = useRouter();

  // Magic Link passwordless Sign In Check
  // TODO: Extract into seperate hook, and possibly do this logic on a redirect page
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
            router.push('/dashboard');
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
            router.push('/onboarding/birthday');
          }
        } catch (error: any) {
          toast.error(error.message);
        }
      }
    }

    passwordlessSignIn();
    //eslint-disable-next-line
  }, []);

  useAuthRequired();

  // User Context
  const { user } = useUserContext();

  const [dayValue, setDayValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const [yearValue, setYearValue] = useState('');

  const [birthdayValid, setBirthdayValid] = useState(false);

  useEffect(() => {
    const year = +yearValue;
    const month = new Date(`${monthValue} 1, 2000`).getMonth();
    const day = +dayValue.replace(/\D/g, '');
    setBirthdayValid(isExists(year, month, day));
  }, [dayValue, monthValue, yearValue]);

  function dayInputChangeHandler(value: string) {
    setDayValue(value);
  }
  function monthInputChangeHandler(value: string) {
    setMonthValue(value);
  }
  function yearInputChangeHandler(value: string) {
    setYearValue(value);
  }

  function pageSubmitHandler() {
    const year = +yearValue;
    const month = new Date(`${monthValue} 1, 2000`).getMonth();
    const day = +dayValue.replace(/\D/g, '');
    if (!birthdayValid || !isExists(year, month, day)) return;

    const birthday = new Date(year, month, day);
    if (user) {
      const docRef = doc(db, 'users', user!.uid);
      setDoc(
        docRef,
        {
          birthday: Timestamp.fromDate(birthday),
        },
        { merge: true },
      )
        .then(() => {
          router.push('/onboarding/top-genres');
        })
        .catch(error => console.log(error));
    }
  }

  if (!user) return;

  return (
    <section className='mx-auto px-[17.5px] py-12 md:max-w-[536px] md:px-0'>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-2.png' />
        <Image src={'/Onboarding/desktop-progress-2.png'} fill alt='progress'></Image>
      </picture>

      {/* Main */}
      <div className=' mx-auto mt-14 max-w-[343px] md:max-w-[572px]'>
        <form className='w-full text-center text-high-emphasis'>
          <h1 className='text-[28px] font-medium tracking-[-0.42px] '>
            Welcome{' '}
            {user?.displayName
              ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)
              : 'User'}
            {/* Code above is capitalizing the username string */}
            !
            <br className='hidden md:block' /> Mind sharing your birthdate?
          </h1>
          <p className='mx-auto mt-[10px] text-base leading-[21.86px] tracking-[0.08px] md:max-w-[504px]'>
            To personalize your content recommendations and to ensure it&apos;s all age-appropriate,
            could you kindly share your date of birth with us?
          </p>

          <div className='mx-auto mt-4 flex gap-2'>
            <BirthdayComboBox
              placeholder={'Day'}
              keys={daysOfMonth}
              inputMode='numeric'
              inputChangeHandler={dayInputChangeHandler}
            />
            <BirthdayComboBox
              placeholder={'Month'}
              keys={monthsOfYear}
              inputMode='text'
              inputChangeHandler={monthInputChangeHandler}
            />
            <BirthdayComboBox
              placeholder={'Year'}
              keys={years}
              inputMode='numeric'
              inputChangeHandler={yearInputChangeHandler}
            />
          </div>
        </form>

        <div className='mx-auto mt-10 flex max-w-[536px] flex-col gap-3 rounded-lg bg-first-surface p-6 pb-[30px]'>
          <h2 className='mb-4 text-center font-semibold text-high-emphasis'>
            We love our birthday movies 🎉
          </h2>
          <MemoizedCarousel />
        </div>
      </div>

      <Buttons
        valid={birthdayValid}
        prevPage='/onboarding'
        onPageSubmit={pageSubmitHandler}
        required
      />
    </section>
  );
};

export default BirthdayPage;
