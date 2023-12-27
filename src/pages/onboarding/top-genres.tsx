import React from 'react';

// Util
import { useUserContext } from '@/lib/context';
import { useAuthRequired } from '@/hooks/routeProtection';
import axios from 'axios';
import nookies from 'nookies';

// Genres Data
import TopGenres from '@/components/onboarding/top-genres/TopGenres';
import { NextPageContext } from 'next';
import { Genre } from '@/components/onboarding/top-genres/TopGenres.hooks';

const TopGenresPage = ({ genres }: { genres: string }) => {
  const initialGenres: Genre = JSON.parse(genres);

  // Handles route protection
  useAuthRequired();
  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='mx-auto max-w-sm px-4 py-12 md:min-h-[101vh] md:max-w-none md:px-0'>
      <TopGenres user={user} initialGenres={initialGenres} />
    </section>
  );
};

export default TopGenresPage;

export async function getServerSideProps(context: NextPageContext) {
  const idToken = nookies.get(context).idToken;

  let response;
  try {
    response = await axios.get(
      'https://us-central1-reeltalk-app.cloudfunctions.net/api/api/movies/getPossibleGenres',
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
  } catch (error: any) {
    console.log(error.message);
  }

  const genres = response?.data.data.genres;

  return {
    props: {
      genres: JSON.stringify(genres),
    },
  };
}
