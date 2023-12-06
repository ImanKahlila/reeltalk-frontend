import React from 'react';

// Components
import TopMovies from '@/components/onboarding/top-movies/TopMovies';

// Util
import { useUserContext } from '@/lib/context';

const TopMoviesPage = () => {
  const { user } = useUserContext();
  if (!user) return;

  return (
    <>
      <section className='relative mx-auto pt-12 md:max-w-[696px] md:px-0 md:pb-48'>
        <TopMovies user={user} />
      </section>
    </>
  );
};

export default TopMoviesPage;
