import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import Buttons from '@/components/onboarding/shared/Buttons';
import SearchHeader from './SearchHeader';
import Genres from './Genres';

// Util
import debounce from 'lodash/debounce';
import { logEvent } from 'firebase/analytics';

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app, { analytics } from '@/firebase/firebase-config';
import { User } from 'firebase/auth';
import { Genre, useGetGenres } from './TopGenres.hooks';
const db = getFirestore(app);

interface ITopGenres {
  user: User;
  initialGenres: Genre;
}

const TopGenres = (props: ITopGenres) => {
  const { user, initialGenres } = props;
  const { push } = useRouter();

  const { genres, filteredGenres, totalSelected, setFilteredGenres, toggleSelectedGenre } =
    useGetGenres(initialGenres);

  const inputChangeHandler = debounce(e => {
    const value = e.target.value.toLowerCase();
    setFilteredGenres(genres.filter(genre => genre.name.toLowerCase().includes(value)));
  }, 100);

  function pageSubmitHandler() {
    if (user) {
      const top3Genres = genres.filter(genre => genre.selected === true).map(({ name, id, emoji }) => ({ name, id, emoji }));

      const docRef = doc(db, 'users', user!.uid);
      logEvent(analytics, 'genre_selected', { fav_genres: top3Genres }); // Google Analytics
      logEvent(analytics, 'profile_created'); // Google Analytics
      setDoc(
        docRef,
        {
          favoriteGenres: top3Genres,
        },
        { merge: true },
      )
        .then(() => {
          push('/onboarding/top-movies');
        })
        .catch(error => console.log(error));
    }
  }
  return (
    <div>
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-3.png' />
        <Image
          src={'/Onboarding/desktop-progress-3.png'}
          sizes='(max-width: 767px) 100vw, 437.75px'
          fill
          alt='progress'
        ></Image>
      </picture>

      <SearchHeader inputChangeHandler={inputChangeHandler} />

      <Genres
        filteredGenres={filteredGenres}
        toggleSelectedGenre={toggleSelectedGenre}
        totalSelected={totalSelected}
      />

      <Buttons
        prevPage='/onboarding/birthday'
        onPageSubmit={pageSubmitHandler}
        valid={totalSelected === 3}
        required
      />
    </div>
  );
};

export default TopGenres;
