import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Util
import { isExists } from 'date-fns';

// Components
import Buttons from '@/components/onboarding/Buttons';
import Carousel from '@/components/onboarding/birthday/Carousel';
import Header from './Header';
import Inputs from './Inputs';

// Firebase
import { getFirestore, setDoc, Timestamp, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from '@/firebase/firebase-config';
const db = getFirestore(app);

// Memoize Carousel to prevent uneccessary re-renders when input change handler causes page to rerender
const MemoizedCarousel = React.memo(Carousel);

interface IBirthdayProps {
  user: User;
}

const Birthday = (props: IBirthdayProps) => {
  const { user } = props;
  const { push } = useRouter();

  const [dayValue, setDayValue] = useState('');
  const [monthValue, setMonthValue] = useState('');
  const [yearValue, setYearValue] = useState('');

  const [birthdayValid, setBirthdayValid] = useState(false);

  function validateBirthday() {
    const { year, month, day } = extractDateValues();
    setBirthdayValid(isExists(year, month, day));
  }

  useEffect(() => {
    validateBirthday();
    //eslint-disable-next-line
  }, [dayValue, monthValue, yearValue]);

  function extractDateValues() {
    const year = +yearValue;
    const month = new Date(`${monthValue} 1, 2000`).getMonth();
    const day = +dayValue.replace(/\D/g, '');
    return { day, month, year };
  }

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

  function pageSubmitHandler() {
    const { year, month, day } = extractDateValues();
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
          push('/onboarding/top-genres');
        })
        .catch(error => console.log(error));
    }
  }
  return (
    <>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-2.png' />
        <Image src={'/Onboarding/desktop-progress-2.png'} fill alt='progress'></Image>
      </picture>

      <div className='mx-auto mt-14 max-w-[343px] md:max-w-[536px]'>
        <Header user={user} />

        <Inputs inputChangeHandler={inputChangeHandler} />

        <MemoizedCarousel />
      </div>

      <Buttons
        valid={birthdayValid}
        prevPage='/onboarding'
        onPageSubmit={pageSubmitHandler}
        required
      />
    </>
  );
};

export default Birthday;
