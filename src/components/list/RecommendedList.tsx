import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';


interface PopularListProps {
    title: string;
    imageUrl: string;
    createdBy: string;
}

function RecommendedList(props: PopularListProps) {
    const { title, imageUrl, createdBy } = props;
    const [imageLoaded, setImageLoaded] = useState(false);
  
    const handleImageLoad = () => {
      setImageLoaded(true); 
    };
  
    return (
      <div className=''>
        {/* List Poster */}
        <div className='flex min-w-[102.188px] flex-col gap-3'>
            <picture className='relative block overflow-hidden rounded-md h-56'>
              <Image
                onLoadingComplete={handleImageLoad}
                onError={handleImageLoad}
                className={`object-cover ${!imageLoaded ? 'invisible' : 'visible'}`}
                src={imageUrl}
                fill
                alt=''
              />
              {!imageLoaded && <Skeleton className='h-[153.787px] flex-grow rounded-md' />}
            </picture>
        </div>
  
        {/* List Info */}
        <div className='w-full'>
          <h2 className='font-medium tracking-[0.24px] text-high-emphasis'>{title}</h2>
          <div className='mt-1 text-xs tracking-[0.06px] text-medium-emphasis'>
            <span>By</span> <span className='font-semibold'>{createdBy}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default RecommendedList;