import React, { useState } from 'react';
import Image from 'next/image';

// Components
import UserIcon from '@/components/Icons/userIcon';
import Spinner from '@/components/shared/Spinner';

// ShadCN/UI
import { Skeleton } from '@/components/ui/skeleton';

import { ICommunityObject } from '@/pages/community/[communityId]';
import { cn } from '@/lib/utils';
import useJoinLeaveCommunity from '@/hooks/useJoinLeaveCommunity';

const Header = ({ pageData }: { pageData: ICommunityObject }) => {
  // Skeleton Image Loader logic
  const [communityImageLoaded, setCommunityImageLoaded] = useState(false);
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);

  const handleCommunityImageLoad = () => {
    setCommunityImageLoaded(true);
  };
  const handleCoverImageload = () => {
    setCoverImageLoaded(true);
  };

  const { isAdmin, isMember, pendingJoin, spinnerActive, joinCommunityHandler } =
    useJoinLeaveCommunity(
      pageData.userId,
      pageData.isPublic,
      pageData.members,
      pageData.communityId,
      pageData.joinRequests,
    );

  return (
    <header className='relative mx-auto block h-[11.11vw] max-h-[170px] min-h-[160px] max-w-screen-2xl'>
      {pageData.coverPhoto ? (
        <>
          <Image
            className={`object-cover ${!coverImageLoaded ? 'invisible' : 'visible'}`}
            src={pageData.coverPhoto || ''}
            onLoad={handleCoverImageload}
            onError={handleCoverImageload}
            fill
            alt=''
          ></Image>
          {!coverImageLoaded && <Skeleton className='absolute h-full w-full rounded-none' />}
        </>
      ) : null}
      <div className='bg-custom-gradient relative h-full w-full bg-black'></div>

      <div className='relative bottom-[126px] mx-auto flex h-[106.667px] max-w-[1120px] gap-3 md:bottom-[107px] md:gap-8 md:pl-4'>
        <picture className='relative block min-w-[80px] overflow-hidden rounded-md'>
          <Image
            className={`object-cover ${!communityImageLoaded ? 'invisible' : 'visible'}`}
            src={pageData?.communityImage || '/Pixel-160.png'}
            onLoad={handleCommunityImageLoad}
            onError={handleCommunityImageLoad}
            fill
            alt=''
          ></Image>
          {!communityImageLoaded && <Skeleton className='h-full w-full rounded-none' />}
        </picture>

        <div className='flex h-full flex-col justify-between md:justify-end md:gap-1'>
          <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
            {pageData?.name}
          </h1>
          <div className='flex h-full flex-col justify-between md:h-fit md:flex-row md:items-center md:justify-start md:gap-6'>
            <div className='tracking-eight text-high-emphasis'>
              <span className=''>{pageData.isPublic ? 'Public' : 'Private'}</span>
              <span className='px-2'>·</span>{' '}
              <UserIcon className='relative bottom-[1px] inline-block' />{' '}
              <span className='pl-1'>{pageData?.members?.length + 1}</span>
            </div>
            <MemberButton
              joinCommunityHandler={joinCommunityHandler}
              isAdmin={isAdmin}
              isMember={isMember}
              pendingJoin={pendingJoin}
              isPublic={pageData.isPublic}
              spinnerActive={spinnerActive}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isAdmin: boolean;
  isMember: boolean;
  pendingJoin: boolean;
  isPublic: boolean;
  spinnerActive: boolean;
  joinCommunityHandler(): Promise<void>;
}

function MemberButton({
  isAdmin,
  isMember,
  joinCommunityHandler,
  pendingJoin,
  isPublic,
  spinnerActive,
}: CustomButtonProps) {
  const display = isAdmin
    ? 'Admin'
    : pendingJoin
      ? 'Pending'
      : isMember
        ? 'Joined'
        : isPublic
          ? 'Join'
          : 'Ask to join';

  return (
    <button
      type='button'
      onClick={joinCommunityHandler}
      className={cn(
        'h-[34px] w-fit rounded-[4px] bg-primary px-4 font-semibold tracking-eight text-secondary transition-all duration-300',
        (isMember || isAdmin || pendingJoin) && 'bg-gray text-disabled',
      )}
    >
      {spinnerActive ? <Spinner /> : display}
    </button>
  );
}
