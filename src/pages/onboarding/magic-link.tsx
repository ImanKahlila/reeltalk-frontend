import React, { useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Firebase Auth and Firestore
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';

// Components
import Buttons from '@/components/onboarding/Buttons';
import GreenCheckIcon from '@/components/onboarding/GreenCheckIcon';

const ContinueWithMagicLink = () => {
  const auth = getAuth();

  // Input Validation
  const [emailValid, setEmailValid] = useState(false);

  // Refs
  const emailRef = useRef<HTMLInputElement | null>(null);

  // Submit Button Enabled
  const inputsValid = emailValid;

  function emailChangeHandler() {
    const email = emailRef.current!.value.toLowerCase().trim();
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://reeltalk.us/onboarding/birthday',
    // This must be true.
    handleCodeInApp: true,
  };

  async function sendSignInLinkHandler() {
    const email = emailRef.current!.value;

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
    <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
      {/* Main */}
      <div className='mx-auto mt-14 max-w-[320px] text-center text-pure-white md:max-w-[448px]'>
        <h3 className='text-[28px] font-medium leading-normal tracking-[-0.42px] md:text-4xl'>
          Continue with Magic Link
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

        <form className='mx-auto mt-[40px] flex max-w-xs flex-col gap-6'>
          <div
            className={`flex items-center justify-between gap-[10px] rounded-lg border border-solid bg-first-surface pl-6 pr-3 transition-all duration-500  ${
              emailValid ? 'border-primary' : 'border-medium-emphasis'
            }`}
          >
            <input
              className={`w-full bg-transparent py-[13px] text-base placeholder-gray outline-none`}
              type='text'
              placeholder='Email'
              ref={emailRef}
              onChange={emailChangeHandler}
            />
            <div>
              <GreenCheckIcon
                className={`opacity-0 transition-opacity duration-500 ${
                  emailValid ? 'opacity-100' : ''
                }`}
              />
            </div>
          </div>
        </form>

        <p className='mt-10 text-sm leading-normal tracking-[0.07px] md:mt-14'>
          Already have an account?{' '}
          <Link className='text-primary' href={'/login'}>
            Log in
          </Link>
          .
        </p>
      </div>
      <Buttons
        valid={inputsValid}
        prevPage='/onboarding'
        onPageSubmit={sendSignInLinkHandler}
        required
      />
    </section>
  );
};

export default ContinueWithMagicLink;
