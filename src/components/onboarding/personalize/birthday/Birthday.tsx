import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Util
import { isExists } from 'date-fns';
import { useValidateBirthday } from './Birthday.hooks';

// Components
import Buttons from '@/components/onboarding/shared/Buttons';
import Carousel from '@/components/onboarding/personalize/birthday/Carousel';
import Header from '../Header';
import Inputs from './Inputs';

// Firebase
import { getFirestore, setDoc, Timestamp, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from '@/firebase/firebase-config';
import { getFirstName } from '@/lib/utils';
const db = getFirestore(app);

// Memoize Carousel to prevent uneccessary re-renders when input change handler causes page to rerender
const MemoizedCarousel = React.memo(Carousel);

interface IBirthdayProps {
  user: User;
  personalize: string;
}

const Birthday = (props: IBirthdayProps) => {
  const { user,personalize } = props;
  const { push } = useRouter();

  const { birthdayValid, inputChangeHandler, yearValue, monthValue, dayValue } =
    useValidateBirthday();

  function pageSubmitHandler() {
    const { year, month, day } = extractDateValues(yearValue, monthValue, dayValue);
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
          push('/onboarding/location');
        })
        .catch(error => console.log(error));
    }
  }
  return (
    <>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-2.png' />
        <Image
          src={'/Onboarding/desktop-progress-2.png'}
          fill
          sizes='(max-width: 767px) 100vw, 437.75px'
          alt='progress'
        ></Image>
      </picture>

      <div className="mx-auto mt-14 max-w-[343px] md:max-w-[536px]">
        <Header user={user} personalize="birthday"/>
        <input
          className='min-w-full mt-4 h-9 p-2 flex gap-2 bg-second-surface justify-between text-medium-emphasis border border-primary rounded'
          disabled placeholder={getFirstName(user.displayName)}/>
        <Inputs inputChangeHandler={inputChangeHandler} />

        <MemoizedCarousel />
      </div>

      <Buttons
        valid={birthdayValid}
        prevPage="/onboarding"
        onPageSubmit={pageSubmitHandler}
        required
      />
    </>
  );
};

export default Birthday;

export function extractDateValues(yearValue: string, monthValue: string, dayValue: string) {
  const year = +yearValue;
  const month = new Date(`${monthValue} 1, 2000`).getMonth();
  const day = +dayValue.replace(/\D/g, '');
  return { day, month, year };
}
