import React, { useState } from 'react';
import Image from 'next/image';

// Components
import { Skeleton } from '@/components/ui/skeleton';

interface IPosterProps {
  poster: string;
}

export function Poster({ poster }: IPosterProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };
  return (
    <picture className='relative block aspect-[2/3] max-h-[120px] max-w-[80px] flex-grow'>
      <Image
        src={poster}
        fill
        alt=''
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        className={`${!imageLoaded ? 'invisible' : 'visible'}`}
      ></Image>
      {!imageLoaded && (
        <Skeleton className='aspect-[2/3] max-h-[120px] max-w-[80px] flex-grow rounded-none' />
      )}
    </picture>
  );
}
