import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import Buttons from '@/components/onboarding/Buttons';
import Header from './Header';
import ShowMoreButton from './ShowMoreButton';
import SuggestedMedia from './SuggestedMedia';
import FloatingSelection from './FloatingSelection';

// Util
import useMovieSelection from './TopMovies.hooks';
import { FloaterSelection } from './TopMovies.hooks';

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { User } from 'firebase/auth';
const db = getFirestore(app);

interface ITopMovies {
  user: User;
}

const TopMovies = ({ user }: ITopMovies) => {
  const { push } = useRouter();
  const [moviesToShow, setMoviesToShow] = useState(8);

  const { movies, floaterSelection, addSelectionHandler, removeSelectionHandler } =
    useMovieSelection();

  // Placeholder tracker, tracks how many placeholders needed for selectionFloater
  const selectionPlaceholder: FloaterSelection = Array.from(
    { length: 5 - floaterSelection.length },
    (_, i) => ({
      id: i.toString(),
      title: '',
      poster: '',
      isApi: false,
    }),
  );

  function onPageSubmitHandler() {
    if (user) {
      const docRef = doc(db, 'users', user!.uid);

      setDoc(
        docRef,
        {
          top5Movies: floaterSelection,
        },
        { merge: true },
      )
        .then(() => {
          push('/onboarding/top-shows');
        })
        .catch(error => console.log(error));
    }
  }
  return (
    <>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-4.png' />
        <Image src={'/Onboarding/desktop-progress-4.png'} fill alt='progress'></Image>
      </picture>

      {/* Header */}
      <Header addSelectionHandler={addSelectionHandler} selectedLength={floaterSelection.length} />

      {/* Suggested Movies */}
      <SuggestedMedia
        movies={movies}
        moviesToShow={moviesToShow}
        addSelectionHandler={addSelectionHandler}
        floaterSelection={floaterSelection}
        removeSelectionHandler={removeSelectionHandler}
      />
      <ShowMoreButton onShowMoreHandler={() => setMoviesToShow(16)} moviesToShow={moviesToShow} />

      <Buttons
        className='md:hidden'
        prevPage='/onboarding/top-genres'
        nextPage='/onboarding/top-shows'
        onPageSubmit={onPageSubmitHandler}
        valid={floaterSelection.length === 5}
      />

      <FloatingSelection
        floaterSelection={floaterSelection}
        removeSelectionHandler={removeSelectionHandler}
        selectionPlaceholder={selectionPlaceholder}
        onPageSubmitHandler={onPageSubmitHandler}
      />
    </>
  );
};

export default TopMovies;
