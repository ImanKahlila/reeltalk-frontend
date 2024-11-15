import React from 'react';
import Birthday from '@/components/onboarding/personalize/birthday/Birthday';

// Util
import { useUserContext } from '@/lib/context';
import { useAuthRequired } from '@/hooks/routeProtection';
import { usePasswordlessSignin } from '@/components/onboarding/personalize/birthday/Birthday.hooks';

const BirthdayPage = () => {
  // Handles passwordlessSignIn Logic
  usePasswordlessSignin();

  // Route Protection
  useAuthRequired();
  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
      <Birthday user={user} personalize="birthday"/>
    </section>
  );
};

export default BirthdayPage;
