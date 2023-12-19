import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import LikeIcon from '../Icons/likeIcon';
import MessageBubbleIcon from '../Icons/messageBubbleIcon';
import UserIcon from '../Icons/userIcon';

import { CommunitiesProps } from './Community';

function DesktopPopularCommunity(props: CommunitiesProps) {
  const { title, isPublic, imageUrl, members, description, url } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };

  return (
    <div className='flex h-fit gap-8 rounded-[8px] bg-first-surface p-2'>
      {/* Community Poster */}
      <div className='flex min-w-[102.188px] flex-col gap-3'>
        <Link href={url}>
          <picture className='relative block h-[153.787px] overflow-hidden rounded-md'>
            <Image
              onLoad={handleImageLoad}
              onError={handleImageLoad}
              className={`object-cover ${!imageLoaded ? 'invisible' : 'visible'}`}
              src={imageUrl}
              fill
              alt=''
            ></Image>
            {!imageLoaded && <Skeleton className='h-[153.787px] flex-grow rounded-md' />}
          </picture>
        </Link>
        <button className='flex h-[34px] w-full items-center justify-center rounded bg-primary px-4 font-semibold tracking-[0.24px] text-secondary'>
          Join
        </button>
      </div>

      {/* Community Info */}
      <div className='w-full'>
        <h2 className='font-medium tracking-[0.24px] text-high-emphasis'>{title}</h2>
        <div className='mt-1 text-xs tracking-[0.06px] text-medium-emphasis'>
          <span>{isPublic ? 'Public' : 'Private'}</span>
          <span className='px-2'>·</span>{' '}
          <UserIcon className='relative bottom-[1px] inline-block' />{' '}
          <span className='pl-1'>{members.toString()}</span>
        </div>

        <p className='tracking-eight text-high-emphasis'>{description}</p>

        <div className='mt-4 flex flex-col gap-2 rounded-lg bg-second-surface p-2 text-high-emphasis'>
          <div className='flex gap-4'>
            <picture className='relative block  h-[35px] min-w-[35px]'>
              <Image src={'/memoji.png'} fill alt=''></Image>
            </picture>
            <div>
              <h3 className='text-high-emphasis'>
                Jennifer L. <span className='pl-2 text-sm text-medium-emphasis'>2h ago</span>
              </h3>
              <p>In your opinion, what are the top 5 scenes of Frozen?</p>
            </div>
          </div>
          <div className='flex gap-[10px] text-xs tracking-[0.24px] text-medium-emphasis'>
            <div className='flex items-center gap-[10px]'>
              <LikeIcon className='inline-block' />
              <span>30 likes</span>{' '}
            </div>
            <div className='flex items-center gap-[5px]'>
              <MessageBubbleIcon className='inline-block' /> <span>52 replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopPopularCommunity;
