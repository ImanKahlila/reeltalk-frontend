import React from 'react';
import Birthday from '@/components/onboarding/personalize/birthday/Birthday';

// Util
import { useUserContext } from '@/lib/context';
import { useAuthRequired } from '@/hooks/routeProtection';
import { usePasswordlessSignin } from '@/components/onboarding/personalize/birthday/Birthday.hooks';
import Location from '@/components/onboarding/personalize/location/Location';

const BirthdayPage = () => {
  // Handles passwordlessSignIn Logic
  usePasswordlessSignin();

  // Route Protection
  useAuthRequired();
  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='mx-auto px-[17.5px] py-12 md:max-w-[544px] md:px-0'>
      <Location user={user} />
    </section>
  );
};

export default BirthdayPage;
