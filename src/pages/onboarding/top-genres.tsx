import React from 'react';

// Util
import { useUserContext } from '@/lib/context';
import { useAuthRequired } from '@/hooks/routeProtection';

// Genres Data
import TopGenres from '@/components/onboarding/top-genres/TopGenres';

const TopGenresPage = () => {
  // Handles route protection
  useAuthRequired();
  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='mx-auto max-w-sm px-4 py-12 md:min-h-[101vh] md:max-w-none md:px-0'>
      <TopGenres user={user} />
    </section>
  );
};

export default TopGenresPage;
