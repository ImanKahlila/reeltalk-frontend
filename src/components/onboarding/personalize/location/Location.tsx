import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';


// Components
import Buttons from '@/components/onboarding/shared/Buttons';

// Firebase
import { getFirestore, setDoc, Timestamp, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import app from '@/firebase/firebase-config';
import { getFirstName } from '@/lib/utils';
import Header from '@/components/onboarding/personalize/Header';
import useLocationSelection
  from '@/components/onboarding/personalize/location/UseLocationSelection';
const db = getFirestore(app);

interface ILocationProps {
  user: User;
}

const Location = (props: ILocationProps) => {
  const { user } = props;
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { locations, errorFetching } = useLocationSelection(inputValue);

  function pageSubmitHandler() {

    if (user) {
      const docRef = doc(db, 'users', user!.uid);
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
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleLocationSelect = (location: string) => {
    setInputValue(location);
    setSelectedLocation(location);
  };
  return (
    <>
      {/* Progress Image Container */}
      <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
        <source media='(max-width: 767px)'
                srcSet='/Onboarding/mobile-progress-2.png' />
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
          className="w-full mt-4 h-9 p-2 flex gap-2 bg-transparent justify-start text-pure-white placeholder-disabled focus:outline-none border-0 border-b-2 border-medium-emphasis"
          placeholder="Your location (Optional)"
          value={inputValue}
          onChange={handleInputChange}
        />

        {locations && locations.results.length > 0 ? (
          <ul className="bg-second-surface mt-0 p-1 rounded shadow text-pure-white">
            {locations.results.map((location, index) => (
              <li key={index} className="p-2  cursor-pointer" onClick={() => handleLocationSelect(location)}>
                {location}
              </li>
            ))}
          </ul>
        ): (<label
          className="w-full h-9 p-2 flex gap-2 bg-transparent justify-start text-high-emphasis">Enter
          your location name and select from the menu.</label>)}
      </div>
      <div>
        <picture
          className="relative items-center mt-3 justify-center h-40 mx-auto block w-[258px] md:w-[437.75px]">
          <source media="(max-width: 767px)"
                  srcSet="/Onboarding/connect-by-location.png" />
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
        onPageSubmit={pageSubmitHandler}
        required
      />
    </>
  );
};

export default Location;

export function extractDateValues(yearValue: string, monthValue: string, dayValue: string) {
  const year = +yearValue;
  const month = new Date(`${monthValue} 1, 2000`).getMonth();
  const day = +dayValue.replace(/\D/g, '');
  return { day, month, year };
}
