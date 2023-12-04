import React from 'react';

// Components
import TopShows from '@/components/onboarding/top-shows/TopShows';

// Util
import { useUserContext } from '@/lib/context';

const TopShowsPage = () => {
  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='relative mx-auto px-4 pt-12 md:max-w-[696px] md:px-0 md:pb-48'>
      <TopShows user={user} />
    </section>
  );
};

export default TopShowsPage;
