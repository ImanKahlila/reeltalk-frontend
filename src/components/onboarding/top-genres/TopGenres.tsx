import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import Buttons from '@/components/onboarding/Buttons';
import SearchHeader from './SearchHeader';
import Genres from './Genres';

// Util
import debounce from 'lodash/debounce';
import { logEvent } from 'firebase/analytics';
import initialGenres from '@/lib/genresData';

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app, { analytics } from '@/firebase/firebase-config';
import { User } from 'firebase/auth';
const db = getFirestore(app);

interface ITopGenres {
  user: User;
}
export interface IGenre {
  Genre: { name: string; selected: boolean; id: string; emoji: string }[];
}

const TopGenres = (props: ITopGenres) => {
  const { user } = props;
  const { push } = useRouter();

  const [genres, setGenres] = useState<IGenre['Genre']>(initialGenres);
  const [filteredGenres, setFilteredGenres] = useState(initialGenres);

  // Tracks number of selected genres
  const totalSelected = calculateTotalSelected(genres);

  const inputChangeHandler = debounce(e => {
    const value = e.target.value.toLowerCase();
    setFilteredGenres(genres.filter(genre => genre.name.toLowerCase().includes(value)));
  }, 100);

  function toggleSelectedGenre(id: string, newVal: boolean) {
    if (totalSelected < 5 || !newVal) {
      setGenres(prevState =>
        prevState.map(genre => (genre.id === id ? { ...genre, selected: newVal } : genre)),
      );
      setFilteredGenres(genres);
    }
  }

  function pageSubmitHandler() {
    if (user) {
      const top5Genres = genres.filter(genre => genre.selected === true).map(genre => genre.name);
      const docRef = doc(db, 'users', user!.uid);
      logEvent(analytics, 'genre_selected', { fav_genres: top5Genres }); // Google Analytics
      logEvent(analytics, 'profile_created'); // Google Analytics
      setDoc(
        docRef,
        {
          topGenres: top5Genres,
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
        <Image src={'/Onboarding/desktop-progress-3.png'} fill alt='progress'></Image>
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
        valid={totalSelected === 5}
        required
      />
    </div>
  );
};

export default TopGenres;

// Helper
const calculateTotalSelected = (genres: IGenre['Genre']) => {
  return genres.reduce((accumulator, currentValue) => {
    return currentValue.selected ? accumulator + 1 : accumulator;
  }, 0);
};
