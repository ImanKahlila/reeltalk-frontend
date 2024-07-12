import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../../ui/skeleton';
import toast from 'react-hot-toast';
import { FloaterSelection } from '@/hooks/useMediaSelection';

interface ComponentProps {
  title: string;
  year: number | string;
  posterUrl: string;
  director: string;
  creator: string;
  id: string;
  addSelectionHandler: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean,
  ) => void;
  removeSelectionHandler: (id: string, newVal: boolean, isApi: boolean) => void;
  floaterSelection: FloaterSelection;
  selectedLength: number; //Number of medias selected so far
  maxSelection: number; // Maximum title selections allowed
}

const SearchOption = ({
                        id,
                        posterUrl,
                        title,
                        year,
                        director,
                        creator,
                        addSelectionHandler,
                        removeSelectionHandler,
                        floaterSelection,
                        selectedLength,
                        maxSelection,
                      }: ComponentProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const placeholderUrl = '/Onboarding/placeholder-image-on-error.png';

  useEffect(() => {
    setIsSelected(floaterSelection?.some(e => e.id === id));
  }, [floaterSelection, id]);

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };

  const selectMovieHandler = () => {
    if (selectedLength < maxSelection && !isSelected) {
      addSelectionHandler(id, title, posterUrl, true);
      setIsSelected(true);
      toast.success(
        <div>
          <span className="font-bold">{title}</span> added
        </div>,
        { position: 'bottom-center' },
      );
    } else if (isSelected) {
      removeSelectionHandler!(id, false, true);
      setIsSelected(false);
      toast.success(
        <div>
          <span className="font-bold">{title}</span> removed
        </div>,
        { position: 'bottom-center' },
      );
    } else {
      toast.error(`Oops! select only ${maxSelection} options`);
    }
  };

  return (
    <div
      onClick={selectMovieHandler}
      className='flex h-fit cursor-pointer gap-3 px-4 py-2 transition-colors duration-150 hover:bg-neutral-400'
    >
      <picture className='relative block h-[84px] min-w-[56px]'>
        <Image
          src={posterUrl?posterUrl:placeholderUrl}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          fill
          alt=''
        ></Image>
        {!imageLoaded && <Skeleton className='h-[84px] rounded-none' />}
      </picture>
      <div className='flex flex-col items-start justify-center gap-3 text-left'>
        <h2 className='text-base tracking-[0.08px] text-secondary'>
          {title} {year ? `${title} (${year})` : ''}

        </h2>
        <p className="tracking-[0.08px] text-gray">{director || creator}</p>
      </div>
      <div className="mt-4 flex items-center justify-end ml-auto">
        {isSelected ? (
          <span
            className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
      <svg className="text-white w-5 h-5" fill="none" viewBox="0 0 24 24"
           stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M6 12h12" />
      </svg>
    </span>
        ) : (
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full border border-second-surface">
  <svg className="text-second-surface w-5 h-5" fill="none" viewBox="0 0 24 24"
       stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6v12m-6-6h12" />
  </svg>
</span>

        )}
      </div>
    </div>
  );
};

export default SearchOption;
