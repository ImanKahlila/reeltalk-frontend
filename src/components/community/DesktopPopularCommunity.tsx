import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import LikeIcon from '../Icons/likeIcon';
import MessageBubbleIcon from '../Icons/messageBubbleIcon';
import UserIcon from '../Icons/userIcon';
import Spinner from '../shared/Spinner';
import useJoinLeaveCommunity from '@/hooks/useJoinLeaveCommunity';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface DesktopPopularCommunityProps {
  name: string;
  isPublic: boolean;
  communityImage: string;
  members: string[];
  description: string;
  communityId: string;
  userId: string;
  joinRequests?: string[];
}

function DesktopPopularCommunity(props: DesktopPopularCommunityProps) {
  const {
    name,
    isPublic,
    communityImage,
    members,
    description,
    communityId,
    userId,
    joinRequests,
  } = props;
  // Skeleton Loader Logic
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };

  const { isAdmin, isMember, pendingJoin, spinnerActive, joinCommunityHandler } =
    useJoinLeaveCommunity(userId, isPublic, members, communityId, joinRequests);

  const display = isAdmin ? 'Admin' : pendingJoin ? 'Pending' : isMember ? 'Joined' : 'Join';
  return (
    <div className='flex max-h-[212px] gap-8 rounded-[8px] bg-first-surface p-2'>
      {/* Community Poster */}
      <div className='flex min-w-[102.188px] flex-col gap-2'>
        <Link href={`community/${communityId}`}>
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
        </Link>
        <button
          onClick={joinCommunityHandler}
          className={cn(
            'flex h-[34px] w-full items-center justify-center rounded bg-primary px-4 font-semibold tracking-[0.24px] text-secondary',
            (isMember || isAdmin || pendingJoin) && 'bg-gray text-disabled',
          )}
        >
          {spinnerActive ? <Spinner /> : display}
        </button>
      </div>

      {/* Community Info */}
      <div className='flex w-full flex-col'>
        <h2 className='font-medium tracking-[0.24px] text-high-emphasis'>{name}</h2>
        <div className='mt-1 text-xs tracking-[0.06px] text-medium-emphasis'>
          <span>{isPublic ? 'Public' : 'Private'}</span>
          <span className='px-2'>·</span>{' '}
          <UserIcon className='relative bottom-[1px] inline-block' />{' '}
          <span className='pl-1'>
            {/* Plus one to account for Admin as a member */}
            {(members.length + 1).toString()}
          </span>
        </div>

        <ScrollArea className='mb-3'>
          <p className='tracking-eight text-high-emphasis'>{description}</p>
        </ScrollArea>

        {/* Embedded Comment */}
        <div className='custom-desktop-style mt-auto hidden flex-col gap-2 rounded-lg bg-second-surface p-2 text-high-emphasis'>
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
