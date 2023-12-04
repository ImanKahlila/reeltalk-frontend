import React from 'react';
import Link from 'next/link';
import MediaSelection from '../MediaSelection';
import { FloaterSelection } from './TopMovies.hooks';

interface IFloatingSelection {
  floaterSelection: FloaterSelection;
  removeSelectionHandler: (id: string, newVal: boolean, isApi: boolean) => void;
  selectionPlaceholder: FloaterSelection;
  onPageSubmitHandler: () => void;
}

const FloatingSelection = ({
  floaterSelection,
  removeSelectionHandler,
  selectionPlaceholder,
  onPageSubmitHandler,
}: IFloatingSelection) => {
  return (
    <div className='glass mt-6 h-fit w-screen justify-center bg-[#333333] p-4 pb-[22px] md:fixed md:bottom-0 md:left-0 md:flex md:gap-12 md:border-t-[1px] md:border-first-surface md:bg-primary-rgba md:p-6'>
      <div className='flex flex-col gap-6'>
        <h2 className='md:trackin-[0.1px] text-center font-semibold tracking-[0.08px] text-high-emphasis md:text-start md:text-xl md:font-medium'>
          Your top 5 selections
        </h2>
        <div className='mx-auto mt-2 flex justify-between gap-3'>
          {floaterSelection.map(media => (
            <MediaSelection
              key={media.id}
              id={media.id}
              poster={media.poster}
              removeSelectionHandler={removeSelectionHandler}
              isApi={media.isApi}
            />
          ))}
          {selectionPlaceholder.map(media => (
            <MediaSelection key={media.id} poster={''} isApi={media.isApi} />
          ))}
        </div>
      </div>

      <div className='hidden w-[236px] flex-col gap-4 md:flex md:justify-end'>
        <Link
          href={'/onboarding/top-genres'}
          className='w-full rounded-lg border-2 border-high-emphasis p-[10px] text-center font-semibold tracking-[0.08px] text-high-emphasis'
        >
          Back
        </Link>
        {floaterSelection.length === 5 ? (
          <button
            onClick={onPageSubmitHandler}
            className='w-full rounded-lg border-2 border-primary bg-primary p-[10px] text-center font-semibold tracking-[0.08px] text-black'
          >
            Next
          </button>
        ) : (
          <Link
            href={'/onboarding/top-shows'}
            className='w-full rounded-lg border-2 border-high-emphasis p-[10px] text-center font-semibold tracking-[0.08px] text-high-emphasis'
          >
            Skip
          </Link>
        )}
      </div>
    </div>
  );
};

export default FloatingSelection;
