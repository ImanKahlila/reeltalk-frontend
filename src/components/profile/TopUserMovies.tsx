import React from 'react';
import PlusIcon from '../Icons/plusIcon';
import Image from 'next/image';

const TopUserMovies = ({ poster }: any) => {
  return (
    <div className='mb-8 flex space-x-2'>
      <div
        className='relative flex h-[120px]
           w-[80px] cursor-pointer items-center justify-center 
          border-2 border-gray'
      >
          <Image src={poster} fill sizes="100%"  alt=''></Image>
          <PlusIcon />
      </div>
    </div>
  );
};

export default TopUserMovies;
