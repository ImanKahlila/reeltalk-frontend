// Search option in the combobox on top 5 movies/shows page

import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import toast from 'react-hot-toast';

interface ComponentProps {
    title: string;
    year: number | string;
    posterUrl: string;
    director: string;
    id: string;
    addSelectionHandler: (
        id: number | string,
        title: string,
        poster: string,
        newVal: boolean,
        isApi: boolean,
    ) => void;
    selectedLength: number; //Number of medias selected so far
}

const SearchOption = ({
    id,
    posterUrl,
    title,
    year,
    director,
    addSelectionHandler,
    selectedLength,
}: ComponentProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        // When the image is loaded, set the state to indicate that the image is ready
        setImageLoaded(true);
    };

    const selectMovieHandler = () => {
        if (selectedLength < 5) {
            addSelectionHandler(id, title, posterUrl, false, true);
            toast.success(
                <div>
                    <span className='font-bold'>{title}</span> added
                </div>,
                { position: 'bottom-center' },
            );
        } else {
            toast.error('Oops! select only 5 options');
        }
    };

    return (
        <div
            onClick={selectMovieHandler}
            className='flex h-24 cursor-pointer gap-3 px-4 py-2 transition-colors duration-150 hover:bg-neutral-400'
        >
            <picture className='relative block h-[84px] min-w-[56px]'>
                <Image
                    src={posterUrl}
                    onLoadingComplete={handleImageLoad}
                    onError={handleImageLoad}
                    fill
                    alt=''
                ></Image>
                {!imageLoaded && <Skeleton className='h-[84px] rounded-none' />}
            </picture>
            <div className='flex flex-col justify-center gap-3'>
                <h2 className='text-base tracking-[0.08px] text-secondary'>
                    {title} ({year})
                </h2>
                <p className='tracking-[0.08px] text-gray'>{director}</p>
            </div>
        </div>
    );
};

export default SearchOption;
