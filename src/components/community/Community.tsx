import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserIcon from '../Icons/userIcon';
import { Skeleton } from '../ui/skeleton';

interface CommunityProps {
  name: string;
  communityId: string;
  isPublic: boolean;
  communityImage: string;
  members: string[];
}

const Community = (props: CommunityProps) => {
  const { communityId, name, isPublic, communityImage, members } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };
  return (
    <Link href={`community/${communityId}`} className='w-[102.188px]'>
      <picture className='relative block h-[153.787px] overflow-hidden rounded-md'>
        <Image
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          className={`object-cover ${!imageLoaded ? 'invisible' : 'visible'}`}
          src={communityImage}
          fill
          alt=''
        ></Image>
        {!imageLoaded && <Skeleton className='h-[153.787px] flex-grow rounded-md' />}
      </picture>
      <h2 className='mt-2 text-sm tracking-eight text-high-emphasis'>{truncateString(name)}</h2>
      <div className='mt-[10px] text-xs tracking-[0.06px] text-medium-emphasis'>
        <span>{isPublic ? 'Public' : 'Private'}</span>
        <span className='px-2'>
          ·
        </span> <UserIcon className='relative bottom-[1px] inline-block' />{' '}
        <span className='pl-1'>{members.length + 1}</span>
      </div>
    </Link>
  );
};

export default Community;

// Helper Function
function truncateString(str: string) {
  if (str.length > 12) {
    return str.substring(0, 12) + '...';
  } else {
    return str;
  }
}
