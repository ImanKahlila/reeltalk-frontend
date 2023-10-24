// Search option in the combobox on top 5 movies/shows page

import React from 'react';
import Image from 'next/image';

interface ComponentProps {
    title: string;
    year: number | string;
    posterUrl: string;
}

const SearchOption = ({ posterUrl, title, year }: ComponentProps) => {
    return (
        <div className='flex h-24 gap-3 px-4 py-2'>
            <picture className='relative block h-[84px] min-w-[56px]'>
                <Image src={posterUrl} fill alt=''></Image>
            </picture>
            <div className='flex flex-col justify-center gap-3'>
                <h2 className='text-base tracking-[0.08px] text-secondary'>
                    {title}
                </h2>
                <p className='tracking-[0.08px] text-gray'>{year}</p>
            </div>
        </div>
    );
};

export default SearchOption;
