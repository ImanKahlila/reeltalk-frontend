import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Skeleton } from '../../ui/skeleton';

interface MediaProps {
  id: string;
  title: string; // media title
  year: number | string; // media release year
  posterUrl: string; //url string of media poster
  addSelectionHandler: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean,
  ) => void; // Fn to add medias to selection onclick
  removeSelectionHandler: (id: string, newVal: boolean, isApi: boolean) => void; // Fn to remove medias from selection on click
  selectedLength: number; //Number of medias selected so far
  selected: boolean;
}

const Media = ({
                 id,
                 title,
                 year,
                 posterUrl,
                 addSelectionHandler,
                 removeSelectionHandler,
                 selectedLength,
                 selected,
               }: MediaProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isPlaceholder = !posterUrl || posterUrl === '/Onboarding/placeholder-image-on-error.png'; // Assuming this is how you determine placeholder images

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const toggleMedia = () => {
    if (isPlaceholder) {
      // Disable onClick for placeholder images
      return;
    }

    if (selectedLength < 5 && !selected) {
      addSelectionHandler(id, title, posterUrl, false, true);
    } else if (selected) {
      removeSelectionHandler(id, false, false);
    } else {
      toast.error('Oops! select only 5 options');
    }
  };

  return (
    <button
      className='relative flex w-min flex-col gap-1'
      onClick={toggleMedia}
      disabled={isPlaceholder} // Disable the button click for placeholder images
    >
      <picture
        className={`relative block h-[142.127px] w-24 cursor-pointer overflow-hidden rounded transition-all duration-75 ${
          selected ? 'outline outline-[3px] outline-primary' : ''
        }`}
      >
        {!imageLoaded && <Skeleton className='h-[142.127px] w-24 rounded' />}
        {imageError ? (
          <Image
            src='/Onboarding/placeholder-image-on-error.png'
            alt='Placeholder'
            className='h-[142.127px] w-24 rounded'
          />
        ) : (
          <Image
            src={posterUrl}
            fill
            sizes='(max-width: 767px) 100vw, 96px'
            alt=''
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`${!imageLoaded ? 'invisible' : 'visible'}`}
          />
        )}
      </picture>
      <div
        className={`mx-auto text-center mt-1 text-xs leading-normal tracking-[0.06px] text-high-emphasis ${
          !title ? 'h-[8px] w-12 bg-first-surface rounded' : ''
        }`}
      >
        {/*{title ? `${title} (${year})` : ''}*/}
      </div>
      <div
        className={`mx-auto text-center text-xs leading-normal tracking-[0.06px] text-high-emphasis ${
          !year ? 'h-[8px] w-full bg-first-surface rounded' : ''
        }`}
      >
        {title && year ? `${title} (${year})` : ''}
        {/*/!*<div onClick={toggleMedia} className="mx-auto text-center mt-1 text-xs leading-normal tracking-[0.06px] text-high-emphasis">*!/*/}
        {/*  <p className='mx-auto text-center text-xs leading-normal tracking-[0.06px] text-high-emphasis'>{`${title} (${year})`}</p>*/}
        {/*/!*</div>*!/*/}
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='37'
        height='37'
        viewBox='0 0 37 37'
        fill='none'
        className={`absolute right-2 top-2 h-[20px] w-[20px] transition-all duration-75 ${
          selected ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <rect x='0.578125' y='0.257812' width='36' height='36' rx='18' fill='#FFA724' />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M28.3926 12.3399C28.8694 12.7984 28.8694 13.5416 28.3926 14.0001L16.9978 24.9566C16.521 25.4151 15.748 25.4151 15.2712 24.9566L8.75993 18.6957C8.28315 18.2373 8.28315 17.494 8.75993 17.0356C9.23671 16.5771 10.0097 16.5771 10.4865 17.0356L16.1345 22.4664L26.666 12.3399C27.1428 11.8815 27.9158 11.8815 28.3926 12.3399Z'
          fill='#222222'
        />
      </svg>
    </button>
  );
};

export default Media;
