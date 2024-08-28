import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

// Components
import Buttons from '@/components/onboarding/shared/Buttons';
import Header from '@/components/onboarding/personalize/Header';

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from '@/firebase/firebase-config';

import useLocationHandler from '@/hooks/useLocationHandler';

const db = getFirestore(app);

interface ILocationProps {
  user: User;
}

const Location = (props: ILocationProps) => {
  const { user } = props;
  const { push } = useRouter();

  const {selectedLocation,handleLocationSelect,searchKey,locations,handleInputChange} = useLocationHandler();
  const handlePageSubmit = () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      setDoc(
        docRef,
        {
          location: selectedLocation ? selectedLocation : ""
        },
        { merge: true },
      )
        .then(() => {
          push('/onboarding/top-genres');
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)' srcSet='/Onboarding/mobile-progress-2.png' />
        <Image
          src={'/Onboarding/desktop-progress-2.png'}
          fill
          sizes='(max-width: 767px) 100vw, 437.75px'
          alt='progress'
        ></Image>
      </picture>

      <div className="mx-auto mt-14 max-w-[343px] md:max-w-[536px]">
        <Header user={user} personalize="location" />
        <input
          className="form-input w-full mt-4 h-9 p-2 flex gap-2 bg-transparent justify-start text-pure-white placeholder-disabled focus:outline-none border-0 border-b-2 border-medium-emphasis"
          placeholder="Your location (Optional)"
          value={searchKey}
          onChange={handleInputChange}
        />

        {(locations && locations.results.length > 0 && selectedLocation === null )? (
          <ul className="bg-second-surface mt-0 p-0 rounded text-pure-white">
            {locations.results.map((location, index) => (
              <li key={index} className="p-2 cursor-pointer" onClick={() => handleLocationSelect(location)}>
                {location}
              </li>
            ))}
          </ul>
        ) : (
          <label className="w-full h-9 p-2 flex gap-2 bg-transparent justify-start text-high-emphasis">
            Enter your location name and select from the menu.
          </label>
        )}
      </div>

      <div>
        <picture className="relative items-center mt-3 justify-center h-40 mx-auto block w-[258px] md:w-[437.75px]">
          <source media="(max-width: 767px)" srcSet="/Onboarding/connect-by-location.png" />
          <Image
            src={'/Onboarding/connect-by-location.png'}
            fill
            sizes='(max-width: 767px) 200vw, 437.75px'
            alt='location'
          ></Image>
        </picture>
      </div>

      <Buttons
        valid={true}
        prevPage="/onboarding/birthday"
        nextPage="/onboarding/top-genres"
        onPageSubmit={handlePageSubmit}
        required
      />
    </>
  );
};

export default Location;
