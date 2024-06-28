import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import Buttons from '@/components/onboarding/shared/Buttons';
import Header from '../shared/Header';
import ShowMoreButton from '../shared/ShowMoreButton';
import SuggestedMedia from '../shared/SuggestedMedia';
import FloatingSelection from '../shared/FloatingSelection';

// Util
import useMediaSelection from '../../../hooks/useMediaSelection';
import { FloaterSelection } from '../../../hooks/useMediaSelection';
import { logEvent } from 'firebase/analytics';

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app, { analytics } from '@/firebase/firebase-config';
import { User } from 'firebase/auth';
const db = getFirestore(app);

interface ITopShowsProps {
  user: User;
}

const TopShows = ({ user }: ITopShowsProps) => {
  const { push } = useRouter();
  const [mediaToShow, setMediaToShow] = useState(8);

  const { media, floaterSelection, addSelectionHandler, removeSelectionHandler, errorFetching } =
    useMediaSelection('series');

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
      logEvent(analytics, 'favorite_shows_selected', { fav_shows: floaterSelection }); // Google Analytics

      setDoc(
        docRef,
        {
          favoriteShows: floaterSelection,
        },
        { merge: true },
      )
        .then(() => {
          push('/onboarding/guideline-agreement');
        })
        .catch(error => console.log(error));
    }
  }
  return (
    <>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-4.png' />
        <Image
          sizes='(max-width: 767px) 100vw, 437.75px'
          src={'/Onboarding/desktop-progress-4.png'}
          fill
          alt='progress'
        ></Image>
      </picture>

      {/* Header */}
      <Header
        titleType={'tvSeries'} // Determines what type of media will be queried, 'movies' | 'tvSeries'
        addSelectionHandler={addSelectionHandler}removeSelectionHandler={removeSelectionHandler}
        floaterSelection={floaterSelection}
        selectedLength={floaterSelection.length}
      />

      {/* Suggested Movies */}
      <SuggestedMedia
        media={media}
        mediaToShow={mediaToShow}
        addSelectionHandler={addSelectionHandler}
        floaterSelection={floaterSelection}
        removeSelectionHandler={removeSelectionHandler}
        errorFetching={errorFetching}
      />
      {media.length > 8 ? (
        <ShowMoreButton onShowMoreHandler={() => setMediaToShow(16)} mediaToShow={mediaToShow} />
      ) : null}

      <Buttons
        className='md:hidden'
        prevPage='/onboarding/top-movies'
        nextPage='/onboarding/guideline-agreement'
        onPageSubmit={onPageSubmitHandler}
        valid={floaterSelection.length === 5}
      />

      <FloatingSelection
        floaterSelection={floaterSelection}
        removeSelectionHandler={removeSelectionHandler}
        selectionPlaceholder={selectionPlaceholder}
        onPageSubmitHandler={onPageSubmitHandler}
        prevPage='/onboarding/top-movies'
        nextPage='/onboarding/guideline-agreement'
      />
    </>
  );
};

export default TopShows;
