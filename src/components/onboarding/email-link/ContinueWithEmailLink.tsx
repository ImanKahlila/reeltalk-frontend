import React, { useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Firebase Auth and Firestore
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';

// Components
import Buttons from '@/components/onboarding/shared/Buttons';
import EmailInput from './EmailInput';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://reeltalk.us/onboarding/birthday',
  // This must be true.
  handleCodeInApp: true,
};

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const ContinueWithEmailLink = () => {
  const auth = getAuth();

  const [emailValid, setEmailValid] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  function emailChangeHandler() {
    const email = emailRef.current!.value.toLowerCase().trim();
    setEmailValid(emailRegex.test(email));
  }

  async function sendSignInLinkHandler() {
    const email = emailRef.current!.value.toLowerCase().trim();
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      toast.success(`Magic signin link sent to ${email}`, {
        duration: 4000,
        position: 'bottom-center',
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <div className='mx-auto mt-14 max-w-[320px] text-center text-pure-white md:max-w-[448px]'>
        <h3 className='text-[28px] font-medium leading-normal tracking-[-0.42px] md:text-4xl'>
          Continue with Email Link
        </h3>

        <p className='mt-4 text-sm leading-normal tracking-[0.07px]'>
          By continuing, you agree to our{' '}
          <Link className='text-primary' href={'/legal/terms'}>
            User Agreement
          </Link>{' '}
          and{' '}
          <Link className='text-primary' href={'/legal/privacy'}>
            Privacy Policy
          </Link>
          .
        </p>
        <EmailInput
          ref={emailRef}
          emailValid={emailValid}
          emailChangeHandler={emailChangeHandler}
        />

        <p className='mt-10 text-sm leading-normal tracking-[0.07px] md:mt-14'>
          Already have an account?{' '}
          <Link className='text-primary' href={'/login'}>
            Log in
          </Link>
          .
        </p>
      </div>
      <Buttons
        valid={emailValid}
        prevPage='/onboarding'
        onPageSubmit={sendSignInLinkHandler}
        required
      />
    </>
  );
};

export default ContinueWithEmailLink;
