import React from 'react';
import { useRouter } from 'next/router';
import Buttons from '@/components/onboarding/shared/Buttons';
import { useUserContext } from '@/lib/context';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

const db = getFirestore(app);

const GuidlineAgreementPage = () => {
  const { user } = useUserContext();
  const { push } = useRouter();

  function pageSubmitHandler() {
    if (user) {
      const docRef = doc(db, 'users', user!.uid);
      setDoc(
        docRef,
        {
          agreedToGuideline: true,
        },
        { merge: true },
      )
        .then(() => {
          push('/dashboard');
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <section className='whitespace-pre-line px-4 py-12'>
      <header className='mx-auto max-w-[340px] text-4xl font-medium tracking-[-0.54px] text-high-emphasis md:max-w-[504px] md:text-center'>
        <h1>🚧 Keep it reel, but be kind</h1>
      </header>

      <div className='mx-auto mt-[10px] max-w-[340px] tracking-eight text-pure-white md:max-w-[504px] md:text-center'>
        <p>Welcome, we’re so excited to have you here!</p>
        <br />
        <p>
          At Reel Talk, we believe that every individual brings something unique to our community.
          We are committed to fostering a safe and respectful troll-free environment for everyone to
          engage in exciting conversations.
        </p>
        <br />
        <p>
          In our mission to encourage respect, we ask that you join us by adhering to our guidelines
          <strong className='text-primary'>
            {' '}
            - no cyber-bullying or inappropriate content.
          </strong>{' '}
          Failure to adhere to them may result in being banned from our community. Thanks for your
          cooperation.
        </p>
        <br />
        <p>{`With love, \nThe Reel Talk Team`}</p>
      </div>
      <Buttons guideline prevPage='/onboarding/top-shows' onPageSubmit={pageSubmitHandler} />
    </section>
  );
};

export default GuidlineAgreementPage;
